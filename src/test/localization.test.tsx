import { runInNewContext } from "node:vm";
import { existsSync } from "node:fs";
import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { browserLocale, localeBootstrap, localeFromPath, localizedPath } from "@/i18n/locale";
import { getPortfolio } from "@/data/localized";
import { buildPageHead, buildProjectHead } from "@/lib/seo";
import { Portfolio } from "@/components/portfolio";
import { ProjectPage } from "@/components/project-page";
import { ContactSection } from "@/components/portfolio/contact-section";
import { renderWithRouter } from "./render-with-router";

afterEach(cleanup);

function redirect(
  href: string,
  languages: string[],
  stored: string | null = null,
  blocked = false,
) {
  const replace = vi.fn();
  runInNewContext(localeBootstrap("/fiona-talbi-portfolio/"), {
    URL,
    location: { href, replace },
    navigator: { languages },
    localStorage: {
      getItem: () => {
        if (blocked) throw new Error("Blocked");
        return stored;
      },
    },
  });
  return replace.mock.calls.map((call) => call[0]);
}

describe("Language selection", () => {
  it("matches the first supported browser language and handles unsupported languages", () => {
    expect(browserLocale(["fr-CA", "en-US"])).toBe("fr");
    expect(browserLocale(["es-ES", "en-GB", "fr"])).toBe("en");
    expect(browserLocale(["de-DE"])).toBe("fr");
  });
  it("redirects before painting while preserving project, tracking and section", () => {
    expect(
      redirect(
        "https://fio-tlb.github.io/fiona-talbi-portfolio/projets/logitech-category-management/?utm_source=cv#projet-galerie",
        ["en-GB"],
      ),
    ).toEqual([
      "https://fio-tlb.github.io/fiona-talbi-portfolio/en/projets/logitech-category-management/?utm_source=cv#projet-galerie",
    ]);
  });
  it("prioritises a manual choice, then an explicit English URL, then the browser", () => {
    expect(redirect("https://fio-tlb.github.io/fiona-talbi-portfolio/", ["en"], "fr")).toEqual([]);
    expect(redirect("https://fio-tlb.github.io/fiona-talbi-portfolio/en/", ["fr"], "fr")).toEqual(
      [],
    );
    expect(
      redirect("https://fio-tlb.github.io/fiona-talbi-portfolio/en/?lang=fr", ["en"], "en"),
    ).toEqual(["https://fio-tlb.github.io/fiona-talbi-portfolio/?lang=fr"]);
    expect(
      redirect("https://fio-tlb.github.io/fiona-talbi-portfolio/", ["en"], null, true),
    ).toEqual(["https://fio-tlb.github.io/fiona-talbi-portfolio/en/"]);
    expect(
      redirect("https://fio-tlb.github.io/fiona-talbi-portfolio/?lang=fr", ["en"], null, true),
    ).toEqual([]);
  });
  it("keeps the same project identifiers under both deployment bases", () => {
    expect(
      localeFromPath("/fiona-talbi-portfolio/en/projets/demo/", "/fiona-talbi-portfolio/"),
    ).toBe("en");
    expect(
      localizedPath("/fiona-talbi-portfolio/en/projets/demo/", "fr", "/fiona-talbi-portfolio/"),
    ).toBe("/fiona-talbi-portfolio/projets/demo/");
    expect(localizedPath("/projets/demo", "en", "/")).toBe("/en/projets/demo/");
  });
});

describe("English content and documents", () => {
  const fr = getPortfolio("fr"),
    en = getPortfolio("en");
  it("preserves career facts, identifiers and media while translating project text", () => {
    expect(en.projects.map((p) => p.id)).toEqual(fr.projects.map((p) => p.id));
    en.projects.forEach((project, index) => {
      const original = fr.projects[index]!;
      expect(project.brandId).toBe(original.brandId);
      expect(project.title).not.toBe(original.title);
      expect(project.metrics.map((m) => [m.id, m.value.replace(/\D/g, "")])).toEqual(
        original.metrics.map((m) => [m.id, m.value.replace(/\D/g, "")]),
      );
      expect(project.gallery.map(({ alt: _alt, caption: _caption, ...asset }) => asset)).toEqual(
        original.gallery.map(({ alt: _alt, caption: _caption, ...asset }) => asset),
      );
      expect(
        project.gallery.every(
          (image, i) =>
            image.alt !== original.gallery[i]!.alt &&
            image.caption !== original.gallery[i]!.caption,
        ),
      ).toBe(true);
    });
    expect(en.education.map((e) => [e.id, e.period, e.institution])).toEqual(
      fr.education.map((e) => [e.id, e.period, e.institution]),
    );
    expect(en.experiences.map((e) => [e.id, e.period, e.company, e.location])).toEqual(
      fr.experiences.map((e) => [e.id, e.period, e.company, e.location]),
    );
  });
  it("renders English sections and links only to the English CV and English project pages", async () => {
    await renderWithRouter(<Portfolio />, "/en/");
    expect(screen.getByRole("heading", { name: "Professional experience" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "My academic background" })).toBeVisible();
    expect(
      screen
        .getAllByRole("link", { name: /^Download.*CV/ })
        .every((link) => link.getAttribute("href")?.endsWith("cv-fiona-talbi-en.pdf")),
    ).toBe(true);
    expect(screen.getByRole("link", { name: en.projects[0]!.title })).toHaveAttribute(
      "href",
      "/en/projets/" + en.projects[0]!.id,
    );
    expect(screen.getByRole("heading", { name: "Two reference letters" })).toBeVisible();
  });
  it("keeps English gallery labels and neighbouring project links on a project page", async () => {
    await renderWithRouter(
      <ProjectPage project={en.projects[0]!} />,
      "/en/projets/" + en.projects[0]!.id,
    );
    expect(screen.getByRole("heading", { name: "What I did" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "In pictures" })).toBeVisible();
    const next = screen.getByRole("link", {
      name: new RegExp("Next project.*" + en.projects[1]!.title),
    });
    expect(next.getAttribute("href")).toBe("/en/projets/" + en.projects[1]!.id);
  });
  it("exposes the cover letter when its matching language file is configured", async () => {
    const previous = en.documents.coverLetter;
    en.documents.coverLetter = "documents/cover-letter-en.pdf";
    try {
      await renderWithRouter(<ContactSection />, "/en/");
      expect(screen.getByRole("link", { name: "Cover letter (PDF)" })).toHaveAttribute(
        "href",
        "/documents/cover-letter-en.pdf",
      );
    } finally {
      en.documents.coverLetter = previous;
    }
  });
  it("ships every configured PDF rather than silently substituting a French document", () => {
    for (const data of [fr, en]) {
      for (const path of [
        data.documents.cv,
        data.documents.coverLetter,
        ...Object.values(data.documents.recommendations),
      ]) {
        if (path) expect(existsSync("public/" + path), path).toBe(true);
      }
    }
    expect(en.profile.cvPath).not.toBe(fr.profile.cvPath);
    expect(en.recommendations.every((letter) => letter.documentPath === null)).toBe(true);
  });
  it("uses translated metadata, language alternatives and shared media URLs", () => {
    const home = buildPageHead(en.seo, en.profile, "en");
    expect(home.links).toContainEqual({ rel: "canonical", href: en.seo.siteUrl + "en/" });
    expect(home.links).toContainEqual({ rel: "alternate", hrefLang: "fr", href: en.seo.siteUrl });
    const project = buildProjectHead(
      en.seo,
      en.profile,
      en.projects[0]!,
      en.errorContent.documentTitleSuffix,
      "en",
    );
    expect(project.links[0]!.href).toBe(en.seo.siteUrl + "en/projets/" + en.projects[0]!.id + "/");
    expect(project.meta).toContainEqual({
      property: "og:image",
      content: en.seo.siteUrl + en.projects[0]!.gallery[0]!.src,
    });
  });
});
