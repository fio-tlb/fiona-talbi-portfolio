// Balises de partage et données structurées de la page, calculées uniquement à partir des données.
// Fonctions pures : testées dans src/test/seo.test.ts, appelées par src/routes/index.tsx
// (accueil) et src/routes/projets.$projectId.tsx (pages projet).
import type { Education, PortfolioProfile, PortfolioSeo, Project } from "@/data/portfolio";
import type { Locale } from "@/i18n/locale";

type MetaTag =
  { title: string } | { name: string; content: string } | { property: string; content: string };

export interface PageHead {
  meta: MetaTag[];
  links: { rel: string; href: string; hrefLang?: string }[];
}

/** URL absolue d'un fichier de public/ : les robots de LinkedIn ou Slack ignorent les chemins relatifs. */
export function absoluteUrl(path: string, siteUrl: string): string {
  return new URL(path.replace(/^\/+/, ""), siteUrl).href;
}

function languageLinks(siteUrl: string, projectId?: string) {
  const path = projectId ? "projets/" + projectId + "/" : "";
  return [
    { rel: "alternate", hrefLang: "fr", href: absoluteUrl(path, siteUrl) },
    { rel: "alternate", hrefLang: "en", href: absoluteUrl("en/" + path, siteUrl) },
    { rel: "alternate", hrefLang: "x-default", href: absoluteUrl(path, siteUrl) },
  ];
}

export function buildPageHead(
  seo: PortfolioSeo,
  profile: PortfolioProfile,
  locale: Locale = "fr",
): PageHead {
  const image = absoluteUrl(seo.ogImage, seo.siteUrl);
  const url = locale === "en" ? absoluteUrl("en/", seo.siteUrl) : seo.siteUrl;

  return {
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "author", content: profile.name },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: profile.name },
      { property: "og:locale", content: seo.locale },
      { property: "og:url", content: url },
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
    links: [{ rel: "canonical", href: url }, ...languageLinks(seo.siteUrl)],
  };
}

/** Adresse publique d'une page projet, avec la barre finale (fichier projets/<id>/index.html). */
export function projectUrl(projectId: string, siteUrl: string, locale: Locale = "fr"): string {
  return absoluteUrl((locale === "en" ? "en/" : "") + "projets/" + projectId + "/", siteUrl);
}

/**
 * Balises d'une page projet : titre « <projet> — Fiona Talbi », description tirée du contexte,
 * adresse canonique propre à la page et couverture du projet comme image de partage
 * (image du site à défaut).
 */
export function buildProjectHead(
  seo: PortfolioSeo,
  profile: PortfolioProfile,
  project: Project,
  titleSuffix: string,
  locale: Locale = "fr",
): PageHead {
  const url = projectUrl(project.id, seo.siteUrl, locale);
  const title = project.title + titleSuffix;
  const cover = project.gallery[0];
  const image = cover
    ? { src: cover.src, width: cover.width, height: cover.height, alt: cover.alt }
    : { src: seo.ogImage, width: seo.ogImageWidth, height: seo.ogImageHeight, alt: seo.ogImageAlt };
  const imageUrl = absoluteUrl(image.src, seo.siteUrl);

  return {
    meta: [
      { title },
      { name: "description", content: project.context },
      { name: "author", content: profile.name },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: profile.name },
      { property: "og:locale", content: seo.locale },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: project.context },
      { property: "og:image", content: imageUrl },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: String(image.width) },
      { property: "og:image:height", content: String(image.height) },
      { property: "og:image:alt", content: image.alt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: project.context },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: image.alt },
    ],
    links: [{ rel: "canonical", href: url }, ...languageLinks(seo.siteUrl, project.id)],
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
  locale: Locale = "fr",
) {
  const schools = [...new Set(education.map((item) => item.institution.trim()))].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    givenName: profile.firstName,
    familyName: profile.lastName,
    jobTitle: profile.role,
    url: locale === "en" ? absoluteUrl("en/", seo.siteUrl) : seo.siteUrl,
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
