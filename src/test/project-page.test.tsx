import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { act, cleanup, fireEvent, screen, within } from "@testing-library/react";
import { isNotFound } from "@tanstack/react-router";
import axe from "axe-core";
import { afterEach, describe, expect, it } from "vitest";
import { ProjectPage } from "@/components/project-page";
import { brands, experiences, profile, projects, sectionContent, seo } from "@/data/portfolio";
import { buildProjectHead } from "@/lib/seo";
import { Route } from "@/routes/projets.$projectId";
import { renderToStringWithRouter, renderWithRouter } from "./render-with-router";

afterEach(cleanup);

const text = sectionContent.projectPage;
const project = projects[1]!;
const path = "/projets/" + project.id;

function runLoader(projectId: string) {
  const loader = Route.options.loader as unknown as (context: {
    params: { projectId: string };
  }) => unknown;
  return () => loader({ params: { projectId } });
}

describe("Project route", () => {
  it("accepts every project id and answers 404 for an unknown one", () => {
    for (const item of projects) expect(runLoader(item.id)).not.toThrow();
    let error: unknown;
    try {
      runLoader("projet-inconnu")();
    } catch (caught) {
      error = caught;
    }
    expect(isNotFound(error)).toBe(true);
  });

  it("gives each page its own title, description, canonical URL and absolute share image", () => {
    const head = buildProjectHead(seo, profile, project, " — Fiona Talbi");
    const meta = (key: string) =>
      head.meta.find(
        (tag) => ("property" in tag && tag.property === key) || ("name" in tag && tag.name === key),
      ) as { content: string } | undefined;
    const url = seo.siteUrl + "projets/" + project.id + "/";
    expect(head.meta[0]).toEqual({ title: project.title + " — Fiona Talbi" });
    expect(meta("description")?.content).toBe(project.context);
    expect(head.links).toEqual([{ rel: "canonical", href: url }]);
    expect(meta("og:url")?.content).toBe(url);
    expect(meta("og:image")?.content).toBe(seo.siteUrl + project.gallery[0]!.src);
    expect(meta("twitter:image")?.content).toBe(meta("og:image")?.content);
  });
});

describe("Project data", () => {
  it("has a mission, actions, an empty-or-filled story and 3 to 5 photos whose files exist", () => {
    for (const item of projects) {
      expect(item.mission.length).toBeGreaterThan(0);
      expect(item.details.length).toBeGreaterThan(0);
      expect(Array.isArray(item.story)).toBe(true);
      expect(item.gallery.length).toBeGreaterThanOrEqual(3);
      expect(item.gallery.length).toBeLessThanOrEqual(5);
      for (const photo of item.gallery) {
        expect(photo.src).toMatch(new RegExp("^images/projets/" + item.id + "/[a-z0-9-]+\\.jpg$"));
        const base = resolve("public", photo.src.replace(/\.jpg$/, ""));
        for (const variant of [".jpg", ".avif", "-800.jpg", "-800.avif"]) {
          expect(existsSync(base + variant), base + variant).toBe(true);
        }
        expect(photo.alt.length).toBeGreaterThan(0);
        expect(photo.caption.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("Project page", () => {
  it("renders the title, the key results, the cards and the gallery", async () => {
    await renderWithRouter(<ProjectPage project={project} />, path);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(project.title);
    expect(screen.getByText(project.context)).toBeInTheDocument();

    const results = screen.getByRole("region", { name: text.resultsTitle });
    const figures = within(results).getAllByRole("listitem");
    expect(figures).toHaveLength(project.metrics.length);
    project.metrics.forEach((metric, index) => {
      expect(figures[index]!.textContent).toContain(metric.value);
      expect(figures[index]!.textContent).toContain(metric.label);
    });

    for (const title of [text.contextTitle, text.missionTitle, text.detailsTitle]) {
      expect(screen.getByRole("heading", { level: 2, name: title })).toBeInTheDocument();
    }
    expect(screen.getByText(project.mission)).toBeInTheDocument();
    for (const detail of project.details) expect(screen.getByText(detail)).toBeInTheDocument();

    // Every photo is a real link to its file (works without JavaScript): cover + gallery.
    const photoLinks = screen.getAllByRole("link", { name: new RegExp(text.enlargeLabel) });
    expect(photoLinks).toHaveLength(project.gallery.length);
    photoLinks.forEach((link, index) =>
      expect(link).toHaveAttribute("href", import.meta.env.BASE_URL + project.gallery[index]!.src),
    );
    const gallery = screen.getByRole("region", { name: text.galleryTitle });
    expect(within(gallery).getAllByRole("listitem")).toHaveLength(project.gallery.length - 1);
    for (const photo of project.gallery)
      expect(screen.getByText(photo.caption)).toBeInTheDocument();
  });

  it("shows the long story only when it is filled in", async () => {
    const story = [{ heading: "Les coulisses", paragraphs: ["Premier paragraphe."] }];
    await renderWithRouter(<ProjectPage project={{ ...project, story }} />, path);
    expect(screen.getByRole("heading", { level: 2, name: "Les coulisses" })).toBeInTheDocument();
    expect(screen.getByText("Premier paragraphe.")).toBeInTheDocument();
    cleanup();
    await renderWithRouter(<ProjectPage project={project} />, path);
    expect(screen.queryByRole("heading", { name: "Les coulisses" })).toBeNull();
  });

  it("links back to the projects, to the neighbouring projects and to the home sections", async () => {
    await renderWithRouter(<ProjectPage project={project} />, path);
    expect(screen.getByRole("link", { name: sectionContent.projects.backLabel })).toHaveAttribute(
      "href",
      import.meta.env.BASE_URL + "#projets",
    );
    const pager = screen.getByRole("navigation", { name: text.pagerLabel });
    const [previous, next] = within(pager).getAllByRole("link");
    expect(previous!.getAttribute("href")).toMatch(new RegExp("/projets/" + projects[0]!.id + "$"));
    expect(next!.getAttribute("href")).toMatch(new RegExp("/projets/" + projects[2]!.id + "$"));
    const nav = screen.getAllByRole("navigation", {
      name: sectionContent.navigation.mainLabel,
    })[0]!;
    expect(within(nav).getByRole("link", { name: "Projets" })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  it("opens a photo in the dialog, moves with the arrow keys and gives the focus back", async () => {
    await renderWithRouter(<ProjectPage project={project} />, path);
    const dialog = document.querySelector("dialog.lightbox") as HTMLDialogElement;
    expect(dialog.open).toBe(false);
    const thumbnail = screen.getAllByRole("link", { name: new RegExp(text.enlargeLabel) })[1]!;
    act(() => thumbnail.focus());
    fireEvent.click(thumbnail);
    expect(dialog.open).toBe(true);
    expect(within(dialog).getByText(project.gallery[1]!.caption)).toBeInTheDocument();
    expect(within(dialog).getByText("Photo 2 sur " + project.gallery.length)).toBeInTheDocument();

    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(within(dialog).getByText(project.gallery[2]!.caption)).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: text.previousPhotoLabel }));
    fireEvent.click(within(dialog).getByRole("button", { name: text.previousPhotoLabel }));
    expect(within(dialog).getByText(project.gallery[0]!.caption)).toBeInTheDocument();
    fireEvent.keyDown(dialog, { key: "ArrowLeft" }); // du premier au dernier
    expect(within(dialog).getByText(project.gallery.at(-1)!.caption)).toBeInTheDocument();

    act(() => fireEvent.click(within(dialog).getByRole("button", { name: text.closeLabel })));
    expect(dialog.open).toBe(false);
    expect(document.activeElement).toBe(thumbnail);
  });

  it("pre-renders the photos, the results and no open dialog", async () => {
    const html = await renderToStringWithRouter(<ProjectPage project={project} />, path);
    expect(html).toContain(project.title);
    expect(html).toContain(project.gallery[0]!.src.replace(/\.jpg$/, "-800.avif"));
    expect(html).not.toMatch(/<dialog[^>]*\sopen/);
  });

  it("has no axe violation", async () => {
    const { container } = await renderWithRouter(<ProjectPage project={project} />, path);
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((violation) => violation.id)).toEqual([]);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
});

describe("Company names", () => {
  // Le nom est saisi dans `brands` et repris par les projets et les expériences : un seul nom.
  it("spells each company the same way as its brand", () => {
    for (const item of projects) expect(item.brand).toBe(brands[item.brandId].name);
    for (const item of experiences) expect(item.company).toBe(brands[item.brandId].name);
  });
});
