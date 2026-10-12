import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { act, cleanup, fireEvent, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Portfolio } from "@/components/portfolio";
import {
  brands,
  certifications,
  education,
  experiences,
  interests,
  languages,
  navigation,
  profile,
  recommendations,
  sectionContent,
  tools,
} from "@/data/portfolio";
import { renderWithRouter } from "./render-with-router";

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(navigator, "clipboard");
});

describe("Page structure", () => {
  it("links the six menu entries and Contact to sections of the home page, and keeps the language anchor", async () => {
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
    expect(links.map((link) => link.textContent)).toEqual([
      "Projets",
      "Expériences",
      "Compétences",
      "Formation",
      "Certifications",
      "Recommandations",
    ]);
    for (const id of [...navigation.map((item) => item.id), "contact"]) {
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
    for (const name of [
      "parcours",
      "competences",
      "formation",
      "certifications",
      "recommandations",
      "contact",
    ]) {
      const section = document.getElementById(name)!;
      const h2 = within(section).getByRole("heading", { level: 2 });
      expect(section).toHaveAccessibleName(h2.textContent!);
    }
    const career = document.getElementById("parcours")!;
    for (const experience of experiences) {
      expect(
        within(career).getByRole("heading", { level: 3, name: experience.role }),
      ).toBeVisible();
    }
    const formation = document.getElementById("formation")!;
    for (const item of education) {
      expect(within(formation).getByRole("heading", { level: 3, name: item.title })).toBeVisible();
    }
    // Each career category has its own section, rather than sitting inside another category.
    for (const id of ["parcours", "formation", "certifications"]) {
      expect(document.getElementById(id)!.parentElement).toBe(document.getElementById("contenu"));
    }
    expect(career.querySelector("#formation")).toBeNull();
    expect(document.getElementById("competences")!.querySelector("#certifications")).toBeNull();
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

describe("Cards and logos", () => {
  it("shows each experience as a card with its company logo next to the written name", async () => {
    await renderWithRouter(<Portfolio />);
    const career = document.getElementById("parcours")!;
    const cards = career.querySelectorAll(".experience-card");
    expect(cards).toHaveLength(experiences.length);
    experiences.forEach((experience, index) => {
      const logo = cards[index]!.querySelector("img")!;
      expect(logo).toHaveAttribute(
        "src",
        import.meta.env.BASE_URL + brands[experience.brandId].logo.src,
      );
      // The company name is written in the card: the logo is decorative.
      expect(logo).toHaveAttribute("alt", "");
      expect(cards[index]!.textContent).toContain(experience.company);
    });
    for (const interest of interests) {
      const label = interest.label.charAt(0).toUpperCase() + interest.label.slice(1);
      expect(within(career).getByText(label).closest("li")).not.toBeNull();
    }
  });

  it("lists every tool with its logo, or a generic icon when there is none", async () => {
    await renderWithRouter(<Portfolio />);
    const skills = document.getElementById("competences")!;
    const chips = skills.querySelectorAll(".tool-chip");
    expect(chips).toHaveLength(tools.length);
    tools.forEach((tool, index) => {
      const chip = chips[index]!;
      expect(chip.textContent).toBe(tool.name);
      if (tool.logo)
        expect(chip.querySelector("img")).toHaveAttribute(
          "src",
          import.meta.env.BASE_URL + tool.logo.src,
        );
      else expect(chip.querySelector("svg")).not.toBeNull();
    });
    const languageBlock = document.getElementById("langues")!;
    for (const language of languages) {
      expect(languageBlock.textContent).toContain(language.name + language.level);
    }
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
