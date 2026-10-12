import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Hero } from "@/components/portfolio/hero";
import { ProjectCard } from "@/components/portfolio/project-card";
import {
  brands,
  experiences,
  impactStats,
  profile,
  projects,
  sectionContent,
} from "@/data/portfolio";
import { renderWithRouter } from "./render-with-router";

afterEach(cleanup);

describe("Hero", () => {
  it("names Fiona in the h1 and links every key figure to the section that proves it", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(profile.name);

    const figures = within(screen.getByRole("list", { name: "Chiffres clés" })).getAllByRole(
      "link",
    );
    expect(figures).toHaveLength(impactStats.length);
    figures.forEach((link, index) => {
      const stat = impactStats[index]!;
      expect(link).toHaveAttribute("href", "#" + stat.targetId);
      // French spacing (non-breaking spaces) is part of the data: compare it verbatim.
      expect(link.textContent).toContain(stat.value);
      expect(link.textContent).toContain(stat.label);
    });
  });

  it("shows the portrait with its AVIF variants and offers the CV under its full name", () => {
    const { container } = render(<Hero />);
    expect(screen.getByRole("img", { name: "Portrait de Fiona Talbi" })).toHaveAttribute(
      "width",
      "1122",
    );
    expect(container.querySelector('source[type="image/avif"]')?.getAttribute("srcset")).toMatch(
      /portrait-fiona-v3-600\.avif 600w/,
    );
    // « CV » on phones, but the accessible name stays « Télécharger le CV ».
    const cv = screen.getByRole("link", { name: "Télécharger le CV" });
    expect(cv.getAttribute("href")).toMatch(/documents\/cv-fiona-talbi\.pdf$/);
    expect(cv).toHaveAttribute("download");
  });

  it("shows one logo per company, named by its alt text, from public/logos", () => {
    render(<Hero />);
    const list = screen.getByRole("list", { name: sectionContent.hero.brandsLabel });
    const names = [...new Set(experiences.map((experience) => brands[experience.brandId].name))];
    const logos = within(list).getAllByRole("img");
    expect(logos.map((logo) => logo.getAttribute("alt"))).toEqual(names);
    for (const logo of logos) {
      expect(logo.getAttribute("src")).toMatch(/^\/.*logos\/[a-z-]+\.svg$/);
    }
  });
});

describe("Key figure anchors", () => {
  it("point to an existing project, or to the career section", () => {
    const projectIds = new Set(projects.map((project) => project.id));
    for (const stat of impactStats) {
      expect(projectIds.has(stat.targetId) || stat.targetId === "parcours").toBe(true);
    }
  });
});

describe("Project card", () => {
  it("links the whole card to the project page, named by its title, with its key results", async () => {
    const project = projects[0]!;
    await renderWithRouter(<ProjectCard project={project} />);
    const card = screen.getByRole("article", { name: project.title });
    expect(card).toHaveAttribute("id", project.id); // target of the hero key figures
    expect(card.querySelector("details")).toBeNull();
    // A single link (no nested links), named by the title, to /projets/<id>.
    const links = within(card).getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName(project.title);
    expect(links[0]!.getAttribute("href")).toMatch(new RegExp("/projets/" + project.id + "$"));
    expect(card.textContent).toContain(project.context);
    expect(card.textContent).toContain(sectionContent.projects.openLabel);
    const results = within(screen.getByRole("list", { name: "Résultats" })).getAllByRole(
      "listitem",
    );
    expect(results).toHaveLength(project.metrics.length);
    // The company is named by its logo.
    expect(within(card).getByRole("img", { name: project.brand })).toBeInTheDocument();
  });

  it("uses the first gallery photo as cover, or a sober fallback without a photo", async () => {
    const project = projects[0]!;
    const photo = {
      src: "images/projets/" + project.id + "/photo-1.jpg",
      alt: "Rayon",
      caption: "Rayon",
      width: 1600,
      height: 1000,
    };
    const { container } = await renderWithRouter(
      <ProjectCard project={{ ...project, gallery: [photo] }} />,
    );
    expect(container.querySelector(".project-cover img")?.getAttribute("src")).toBe(
      import.meta.env.BASE_URL + photo.src,
    );
    cleanup();
    const fallback = await renderWithRouter(<ProjectCard project={{ ...project, gallery: [] }} />);
    expect(fallback.container.querySelector(".project-cover-fallback")).not.toBeNull();
  });
});
