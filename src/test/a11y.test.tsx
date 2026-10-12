import { cleanup, render } from "@testing-library/react";
import axe from "axe-core";
import { afterEach, describe, expect, it } from "vitest";
import { Portfolio } from "@/components/portfolio";

afterEach(() => {
  cleanup();
});

// jsdom does not compute rendered colours: contrast is checked in a real browser (Playwright).
const options: axe.RunOptions = {
  rules: { "color-contrast": { enabled: false } },
};

describe("Accessibility (axe-core)", () => {
  it("renders the whole portfolio without any axe violation", async () => {
    const { container } = render(<Portfolio />);

    const results = await axe.run(container, options);

    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        targets: violation.nodes.map((node) => node.target.join(" ")),
      })),
    ).toEqual([]);
  });

  it("keeps a single h1 and named landmarks", () => {
    const { container } = render(<Portfolio />);

    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(container.querySelector("main")).not.toBeNull();
    expect(container.querySelector("header nav[aria-label]")).not.toBeNull();
  });
});
