// Balises de partage et données structurées de la page, calculées uniquement à partir des données.
// Fonctions pures : testées dans src/test/seo.test.ts, appelées par src/routes/index.tsx.
import type { Education, PortfolioProfile, PortfolioSeo } from "@/data/portfolio";

type MetaTag =
  { title: string } | { name: string; content: string } | { property: string; content: string };

export interface PageHead {
  meta: MetaTag[];
  links: { rel: string; href: string }[];
}

/** URL absolue d'un fichier de public/ : les robots de LinkedIn ou Slack ignorent les chemins relatifs. */
export function absoluteUrl(path: string, siteUrl: string): string {
  return new URL(path.replace(/^\/+/, ""), siteUrl).href;
}

export function buildPageHead(seo: PortfolioSeo, profile: PortfolioProfile): PageHead {
  const image = absoluteUrl(seo.ogImage, seo.siteUrl);

  return {
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "author", content: profile.name },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: profile.name },
      { property: "og:locale", content: seo.locale },
      { property: "og:url", content: seo.siteUrl },
      { property: "og:title", content: seo.socialTitle },
      { property: "og:description", content: seo.socialDescription },
      { property: "og:image", content: image },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: String(seo.ogImageWidth) },
      { property: "og:image:height", content: String(seo.ogImageHeight) },
      { property: "og:image:alt", content: seo.ogImageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.socialTitle },
      { name: "twitter:description", content: seo.socialDescription },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: seo.ogImageAlt },
    ],
    links: [{ rel: "canonical", href: seo.siteUrl }],
  };
}

/**
 * Données structurées « Person » (schema.org). Volontairement minimales : ni e-mail, ni photo,
 * ni employeur actuel, seulement des faits déjà publiés sur la page.
 */
export function buildPersonJsonLd(
  seo: PortfolioSeo,
  profile: PortfolioProfile,
  education: readonly Education[],
) {
  const schools = [...new Set(education.map((item) => item.institution.trim()))].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    givenName: profile.firstName,
    familyName: profile.lastName,
    jobTitle: profile.role,
    url: seo.siteUrl,
    sameAs: [profile.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: seo.addressLocality,
      addressCountry: seo.addressCountry,
    },
    alumniOf: schools.map((name) => ({ "@type": "CollegeOrUniversity", name })),
  };
}

/** JSON sûr dans un <script> : « < » échappé pour qu'aucune donnée ne puisse fermer la balise. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
