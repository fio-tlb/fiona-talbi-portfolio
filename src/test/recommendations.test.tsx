import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RecommendationsSection } from "@/components/portfolio/sections";
import { profile, sectionContent, type Recommendation } from "@/data/portfolio";

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

const content = sectionContent.recommendations;
const noPendingMessage = /indisponible|pas encore|à venir|bientôt|en attente|provisoire/i;

const letter: Recommendation = {
  id: "recommendation-01",
  title: "Lettre de recommandation 01",
  documentPath: null,
};

describe("Recommendation documents", () => {
  it("presents the letter normally with a useful email action when no PDF is configured", () => {
    render(<RecommendationsSection items={[letter]} />);
    expect(screen.getByRole("heading", { name: letter.title })).toBeVisible();
    expect(screen.getByText(content.requestDescription)).toBeVisible();
    expect(screen.queryByText(noPendingMessage)).not.toBeInTheDocument();
    // The visible label is the accessible name; the card title describes which letter it is.
    const link = screen.getByRole("link", { name: content.requestLabel });
    expect(link).toHaveAccessibleDescription(letter.title);
    const href = new URL(link.getAttribute("href")!);
    expect(href.protocol).toBe("mailto:");
    expect(href.pathname).toBe(profile.email);
    expect(href.searchParams.get("subject")).toBe(content.requestSubject + letter.title);
    expect(href.searchParams.get("body")).toBe(content.requestBody);
    expect(link).not.toHaveAttribute("target");
  });

  it("opens a supplied PDF in a new tab with the Pages prefix and keeps every card visible", () => {
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
    const link = screen.getByRole("link", {
      name: content.openLabel + sectionContent.newTabLabel,
    });
    expect(link).toHaveAccessibleDescription("Lettre fournie");
    expect(link).toHaveAttribute("href", "/fiona-talbi-portfolio/documents/lettre.pdf");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByText(content.mixedDescription)).toBeVisible();
    expect(screen.getByRole("link", { name: content.requestLabel })).toBeVisible();
    expect(screen.getByRole("heading", { name: letter.title })).toBeVisible();
    expect(screen.queryByText(noPendingMessage)).not.toBeInTheDocument();
  });

  it("describes the letters as PDFs when every file is supplied", () => {
    render(
      <RecommendationsSection items={[{ ...letter, documentPath: "documents/lettre.pdf" }]} />,
    );
    expect(screen.getByText(content.documentsDescription)).toBeVisible();
    expect(screen.queryByRole("link", { name: content.requestLabel })).not.toBeInTheDocument();
  });

  it("offers the email action when the file path only contains whitespace", () => {
    render(<RecommendationsSection items={[{ ...letter, documentPath: " " }]} />);
    expect(screen.getByRole("link", { name: content.requestLabel })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:" + profile.email),
    );
    expect(screen.queryByRole("link", { name: /Lire la lettre/ })).not.toBeInTheDocument();
  });
});
