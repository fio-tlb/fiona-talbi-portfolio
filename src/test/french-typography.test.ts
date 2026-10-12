import { describe, expect, it } from "vitest";
import * as content from "@/data/portfolio";

// Every displayed string lives in src/data/portfolio.ts: collect them all, with their path.
function collectStrings(value: unknown, path: string, out: [string, string][]) {
  if (typeof value === "string") out.push([path, value]);
  else if (Array.isArray(value))
    value.forEach((item, i) => collectStrings(item, `${path}[${i}]`, out));
  else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) collectStrings(item, `${path}.${key}`, out);
  }
  return out;
}

const strings = collectStrings(content, "portfolio", []);

const rules: [RegExp, string][] = [
  [/[ \u00a0][%?!;]/, "espace fine insécable (U+202F) avant % ? ! ;"],
  [/[ \u202f]:/, "espace insécable (U+00A0) avant :"],
  [
    /\d\+? (ans|an|mois)\b/,
    "espace insécable entre un nombre et son unité (« 3+ ans », « 1 mois »)",
  ],
  [/\d ?\/ ?\d/, "espaces insécables autour de « / » dans un score (« 910 / 990 »)"],
  [/'/, "apostrophe typographique (’)"],
];

describe("French typography in the portfolio content", () => {
  it("finds the displayed strings", () => {
    expect(strings.length).toBeGreaterThan(100);
  });

  for (const [pattern, expected] of rules) {
    it(`uses ${expected}`, () => {
      const offenders = strings
        .filter(([, text]) => pattern.test(text))
        .map(([path, text]) => `${path}: ${JSON.stringify(text)}`);
      expect(offenders).toEqual([]);
    });
  }
});
