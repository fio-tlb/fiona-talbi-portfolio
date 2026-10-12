import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { act, cleanup, fireEvent, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Portfolio } from "@/components/portfolio";
import {
  certifications,
  experiences,
  navigation,
  profile,
  recommendations,
  sectionContent,
} from "@/data/portfolio";
import { renderWithRouter } from "./render-with-router";

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(navigator, "clipboard");
});

describe("Page structure", () => {
  it("links the four menu entries and Contact to sections of the home page, and keeps the sub-anchors", async () => {
    const { container } = await renderWithRouter(<Portfolio />);
    const nav = screen.getAllByRole("navigation", {
      name: sectionContent.navigation.mainLabel,
    })[0]!;
    const links = within(nav).getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual(navigation.map((item) => item.label));
    // Absolute links to the home page: they keep working from a project page.
    links.forEach((link, index) =>
      expect(link).toHaveAttribute("href", import.meta.env.BASE_URL + "#" + navigation[index]!.id),
    );
    expect(navigation).toHaveLength(4);
    for (const id of [...navigation.map((item) => item.id), "contact", "formation"]) {
      expect(container.querySelector("#" + id), id).not.toBeNull();
    }
    expect(container.querySelector("#certifications")).not.toBeNull();
    expect(container.querySelector("#langues")).not.toBeNull();
    // Contact keeps its visible label as accessible name.
    expect(
      screen.getAllByRole("link", { name: sectionContent.navigation.contactLabel })[0],
    ).toHaveAttribute("href", import.meta.env.BASE_URL + "#contact");
  });

  it("orders headings h2 > h3 > h4 and names each section with its h2", async () => {
    await renderWithRouter(<Portfolio />);
    for (const name of ["parcours", "competences", "recommandations", "contact"]) {
      const section = document.getElementById(name)!;
      const h2 = within(section).getByRole("heading", { level: 2 });
      expect(section).toHaveAccessibleName(h2.textContent!);
    }
    const career = document.getElementById("parcours")!;
    expect(within(career).getAllByRole("heading", { level: 4 })).toHaveLength(experiences.length);
    expect(
      within(career).getByRole("heading", { level: 3, name: sectionContent.about.educationTitle }),
    ).toBeVisible();
  });

  it("shows certifications without an invented organisation", async () => {
    await renderWithRouter(<Portfolio />);
    const block = document.getElementById("certifications")!;
    expect(within(block).getAllByRole("listitem")).toHaveLength(certifications.length);
    const unknown = certifications.find((cert) => cert.organization === null)!;
    const badge = within(block).getByText(unknown.name).closest("li")!;
    expect(badge.textContent).toBe(unknown.name + unknown.year);
  });
});

describe("Contact and footer", () => {
  it("offers the e-mail, a copy button with a fixed name, LinkedIn in a new tab and the CV", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    await renderWithRouter(<Portfolio />);
    const contact = document.getElementById("contact")!;
    expect(within(contact).getByRole("link", { name: profile.email })).toHaveAttribute(
      "href",
      "mailto:" + profile.email,
    );
    const copy = within(contact).getByRole("button", { name: sectionContent.contact.copyLabel });
    await act(async () => fireEvent.click(copy));
    expect(writeText).toHaveBeenCalledWith(profile.email);
    expect(within(contact).getByRole("status")).toHaveTextContent(
      sectionContent.contact.copiedLabel,
    );
    // The visible label switches to « Copiée », the accessible name stays the same.
    expect(copy).toHaveAccessibleName(sectionContent.contact.copyLabel);
    expect(copy).toHaveAttribute("data-copied");
    expect(
      within(contact).getByRole("link", {
        name: sectionContent.contact.linkedinLabel + sectionContent.newTabLabel,
      }),
    ).toHaveAttribute("target", "_blank");
    const cv = within(contact).getByRole("link", { name: sectionContent.contact.cvLabel });
    expect(cv.getAttribute("href")).toMatch(/documents\/cv-fiona-talbi\.pdf$/);
    expect(cv).toHaveAttribute("download");
  });

  it("repeats the exits in the footer", async () => {
    await renderWithRouter(<Portfolio />);
    const footer = screen.getByRole("contentinfo");
    expect(footer.textContent).toContain(sectionContent.footer.copyright);
    expect(within(footer).getByRole("link", { name: profile.email })).toBeVisible();
    expect(within(footer).getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(
      within(footer).getByRole("link", { name: sectionContent.footer.topLabel }),
    ).toHaveAttribute("href", "#accueil");
  });
});

describe("Files in public/", () => {
  it("exist for the CV and every recommendation letter", async () => {
    const paths = [profile.cvPath, ...recommendations.map((item) => item.documentPath)];
    for (const path of paths.filter((item): item is string => Boolean(item?.trim()))) {
      expect(existsSync(resolve("public", path.trim())), path).toBe(true);
    }
  });
});
