import { describe, expect, it } from "vitest";
import { education, profile, seo } from "@/data/portfolio";
import { absoluteUrl, buildPageHead, buildPersonJsonLd, serializeJsonLd } from "@/lib/seo";

const head = buildPageHead(seo, profile);

function metaContent(key: string): string | undefined {
  for (const tag of head.meta) {
    if ("name" in tag && tag.name === key) return tag.content;
    if ("property" in tag && tag.property === key) return tag.content;
  }
  return undefined;
}

describe("Page head", () => {
  it("uses an absolute https site URL as canonical and og:url", () => {
    expect(seo.siteUrl).toMatch(/^https:\/\/.+\/$/);
    expect(head.links).toEqual([{ rel: "canonical", href: seo.siteUrl }]);
    expect(metaContent("og:url")).toBe(seo.siteUrl);
  });

  it("points og:image and twitter:image to the same absolute file under the site URL", () => {
    const image = metaContent("og:image");
    expect(image).toBe(seo.siteUrl + seo.ogImage);
    expect(image?.startsWith(seo.siteUrl)).toBe(true);
    expect(metaContent("twitter:image")).toBe(image);
    expect(metaContent("og:image:width")).toBe("1200");
    expect(metaContent("og:image:height")).toBe("630");
    expect(metaContent("og:image:alt")).toBe(seo.ogImageAlt);
    expect(metaContent("twitter:card")).toBe("summary_large_image");
  });

  it("describes the page in French within search-result limits", () => {
    expect(metaContent("og:locale")).toBe("fr_FR");
    expect(metaContent("og:site_name")).toBe(profile.name);
    expect(metaContent("description")).toBe(seo.description);
    expect(seo.description.length).toBeLessThanOrEqual(160);
    expect(seo.title).toContain(profile.name);
    expect(head.meta).toContainEqual({ title: seo.title });
  });

  it("keeps slogans out of the shared title", () => {
    for (const text of [seo.title, seo.socialTitle, seo.socialDescription]) {
      expect(text).not.toMatch(/impact|rayonn/i);
    }
  });

  it("declares each meta tag only once", () => {
    const keys = head.meta.map((tag) =>
      "title" in tag ? "title" : "name" in tag ? tag.name : tag.property,
    );
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("resolves public paths against the site URL", () => {
    expect(absoluteUrl("/og-image-v1.jpg", "https://example.org/portfolio/")).toBe(
      "https://example.org/portfolio/og-image-v1.jpg",
    );
  });
});

describe("Person structured data", () => {
  const person = buildPersonJsonLd(seo, profile, education);

  it("is derived from the portfolio data", () => {
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe(profile.name);
    expect(person.givenName).toBe(profile.firstName);
    expect(person.familyName).toBe(profile.lastName);
    expect(person.url).toBe(seo.siteUrl);
    expect(person.sameAs).toContain(profile.linkedin);
    expect(person.alumniOf.map((school) => school.name)).toEqual(
      education.map((item) => item.institution),
    );
  });

  it("never publishes an e-mail, a photo or an invented employer", () => {
    expect(person).not.toHaveProperty("email");
    expect(person).not.toHaveProperty("image");
    expect(person).not.toHaveProperty("worksFor");
    expect(JSON.stringify(person)).not.toContain(profile.email);
  });

  it("serialises safely inside a script tag", () => {
    const json = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(json).not.toContain("</script");
    expect(JSON.parse(json)).toEqual({ name: "</script><script>alert(1)</script>" });
    expect(JSON.parse(serializeJsonLd(person))).toEqual(person);
  });
});
