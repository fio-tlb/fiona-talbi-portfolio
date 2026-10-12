import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";
import { seo } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { property: "og:title", content: seo.socialTitle },
      { property: "og:description", content: seo.socialDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
