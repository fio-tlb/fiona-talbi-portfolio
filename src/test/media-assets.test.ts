import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { profile, projects } from "@/data/portfolio";

describe("Published image assets", () => {
  it("ships every declared original and responsive variant with valid dimensions", () => {
    const images = [...projects.flatMap((project) => project.gallery)];
    if (profile.portrait) images.push({ ...profile.portrait, caption: "" });
    for (const image of images) {
      expect(image.width, image.src).toBeGreaterThan(0);
      expect(image.height, image.src).toBeGreaterThan(0);
      const files = [
        image.src,
        ...(image.srcSet ?? []).map((item) => item.src),
        ...(image.sources ?? []).flatMap((source) => source.variants.map((item) => item.src)),
      ];
      for (const file of files) expect(existsSync(resolve("public", file)), file).toBe(true);
    }
  });
});
