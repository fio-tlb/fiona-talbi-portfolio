import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";
import { getPortfolio } from "@/data/localized";
import { buildPageHead, buildPersonJsonLd, serializeJsonLd } from "@/lib/seo";

const { education, profile, seo } = getPortfolio("en");

export const Route = createFileRoute("/en/")({
  head: () => ({
    ...buildPageHead(seo, profile, "en"),
    scripts: [
      {
        type: "application/ld+json",
        children: serializeJsonLd(buildPersonJsonLd(seo, profile, education, "en")),
      },
    ],
  }),
  component: Portfolio,
});
