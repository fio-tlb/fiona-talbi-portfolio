import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RecommendationsSection } from "@/components/portfolio/sections";
import { sectionContent, type Recommendation } from "@/data/portfolio";

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

const pending: Recommendation = {
  id: "pending-letter",
  title: "Lettre en attente",
  status: "pending",
  description: "Document à venir",
  documentPath: null,
};

describe("Recommendation documents", () => {
  it("shows one honest note without empty cards or download links while documents are missing", () => {
    render(<RecommendationsSection items={[pending]} />);
    expect(screen.getByText(sectionContent.recommendations.pendingNote)).toBeVisible();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("opens a supplied document with the Pages prefix while keeping remaining documents honest", () => {
    vi.stubEnv("BASE_URL", "/fiona-talbi-portfolio/");
    render(
      <RecommendationsSection
        items={[
          pending,
          {
            id: "supplied-letter",
            title: "Lettre fournie",
            status: "available",
            description: "Document fourni",
            documentPath: " /documents/lettre.pdf ",
          },
        ]}
      />,
    );
    const link = screen.getByRole("link", { name: "Ouvrir le document : Lettre fournie" });
    expect(link).toHaveAttribute("href", "/fiona-talbi-portfolio/documents/lettre.pdf");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByText(sectionContent.recommendations.remainingNote)).toBeVisible();
    expect(screen.queryByText(pending.title)).not.toBeInTheDocument();
  });

  it("keeps a record without a usable file path in the pending state", () => {
    render(
      <RecommendationsSection items={[{ ...pending, status: "available", documentPath: " " }]} />,
    );
    expect(screen.getByText(sectionContent.recommendations.pendingNote)).toBeVisible();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
