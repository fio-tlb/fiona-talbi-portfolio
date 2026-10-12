import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RecommendationsSection } from "@/components/portfolio/sections";
import { profile, sectionContent, type Recommendation } from "@/data/portfolio";

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

const letter: Recommendation = {
  id: "recommendation-01",
  title: "Lettre de recommandation 01",
  documentPath: null,
};

describe("Recommendation documents", () => {
  it("presents the letter normally with a useful email action when no PDF is configured", () => {
    render(<RecommendationsSection items={[letter]} />);
    expect(screen.getByRole("heading", { name: letter.title })).toBeVisible();
    expect(
      screen.queryByText(/indisponible|pas encore|à venir|bientôt|en attente/i),
    ).not.toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Demander la lettre : " + letter.title });
    const href = new URL(link.getAttribute("href")!);
    expect(href.protocol).toBe("mailto:");
    expect(href.pathname).toBe(profile.email);
    expect(href.searchParams.get("subject")).toBe(
      sectionContent.recommendations.requestSubject + " : " + letter.title,
    );
    expect(link).not.toHaveAttribute("target");
  });

  it("opens a supplied document with the Pages prefix and keeps all recommendation cards visible", () => {
    vi.stubEnv("BASE_URL", "/fiona-talbi-portfolio/");
    render(
      <RecommendationsSection
        items={[
          letter,
          {
            id: "supplied-letter",
            title: "Lettre fournie",
            description: "Document fourni",
            documentPath: " /documents/lettre.pdf ",
          },
        ]}
      />,
    );
    const link = screen.getByRole("link", { name: "Ouvrir le document : Lettre fournie" });
    expect(link).toHaveAttribute("href", "/fiona-talbi-portfolio/documents/lettre.pdf");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      screen.getByRole("link", { name: "Demander la lettre : " + letter.title }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: letter.title })).toBeVisible();
    expect(
      screen.queryByText(/indisponible|pas encore|à venir|bientôt|en attente/i),
    ).not.toBeInTheDocument();
  });

  it("offers the email action when the file path only contains whitespace", () => {
    render(<RecommendationsSection items={[{ ...letter, documentPath: " " }]} />);
    expect(
      screen.getByRole("link", { name: "Demander la lettre : " + letter.title }),
    ).toHaveAttribute("href", expect.stringContaining("mailto:" + profile.email));
    expect(screen.queryByRole("link", { name: /Ouvrir le document/ })).not.toBeInTheDocument();
  });
});
