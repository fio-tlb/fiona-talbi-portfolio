import { cleanup, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ErrorScreen } from "@/components/error-screen";
import { errorContent, profile } from "@/data/portfolio";
import { renderErrorPage } from "@/lib/error-page";

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

describe("Error screens", () => {
  it("shows the French not-found screen with a way back under the Pages prefix", async () => {
    vi.stubEnv("BASE_URL", "/fiona-talbi-portfolio/");
    const { container } = render(<ErrorScreen content={errorContent.notFound} />);

    expect(screen.getByRole("heading", { level: 1, name: "Page introuvable" })).toBeVisible();
    expect(screen.getByRole("link", { name: errorContent.notFound.homeLabel })).toHaveAttribute(
      "href",
      "/fiona-talbi-portfolio/",
    );
    expect(screen.getByRole("link", { name: profile.email })).toHaveAttribute(
      "href",
      "mailto:" + profile.email,
    );
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((violation) => violation.id)).toEqual([]);
  });

  it("renders the server fallback page in French with the site base", () => {
    vi.stubEnv("BASE_URL", "/fiona-talbi-portfolio/");
    const html = renderErrorPage();

    expect(html).toContain('<html lang="fr">');
    expect(html).toContain(errorContent.error.title);
    expect(html).toContain('href="/fiona-talbi-portfolio/"');
    expect(html).not.toMatch(/Try again|Go home|didn't load/);
  });
});
