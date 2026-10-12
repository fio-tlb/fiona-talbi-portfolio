import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";
import { education, profile, seo } from "@/data/portfolio";
import { buildPageHead, buildPersonJsonLd, serializeJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  // Toutes les balises de la page (titre, description, partage, canonical, JSON-LD) vivent ici ;
  // __root.tsx ne garde que les réglages communs (encodage, viewport, couleurs, icônes, polices).
  head: () => ({
    ...buildPageHead(seo, profile),
    scripts: [
      {
        type: "application/ld+json",
        children: serializeJsonLd(buildPersonJsonLd(seo, profile, education)),
      },
    ],
  }),
  component: Portfolio,
});
