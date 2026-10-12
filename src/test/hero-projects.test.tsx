import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Hero } from "@/components/portfolio/hero";
import { ProjectCard } from "@/components/portfolio/project-card";
import { impactStats, profile, projects } from "@/data/portfolio";

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

  it("shows the portrait with its AVIF variants and announces the LinkedIn new tab", () => {
    const { container } = render(<Hero />);
    expect(screen.getByRole("img", { name: "Portrait de Fiona Talbi" })).toHaveAttribute(
      "width",
      "1200",
    );
    expect(container.querySelector('source[type="image/avif"]')?.getAttribute("srcset")).toMatch(
      /portrait-fiona-600\.avif 600w/,
    );
    const linkedin = screen.getByRole("link", { name: /LinkedIn/ });
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAccessibleName("LinkedIn (nouvel onglet)");
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
  it("is an anchored article with its issue, action and results all visible", () => {
    const project = projects[0]!;
    render(<ProjectCard project={project} />);
    const card = screen.getByRole("article", { name: project.title });
    expect(card).toHaveAttribute("id", project.id);
    expect(card.querySelector("details")).toBeNull();
    expect(card.textContent).toContain(project.context);
    expect(card.textContent).toContain(project.action);
    const results = within(screen.getByRole("list", { name: "Résultats" })).getAllByRole(
      "listitem",
    );
    expect(results).toHaveLength(project.metrics.length);
  });
});
