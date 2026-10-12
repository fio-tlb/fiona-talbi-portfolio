import type { Recommendation } from "@/data/portfolio";

export function isRecommendationAvailable(
  recommendation: Recommendation,
): recommendation is Recommendation & { documentPath: string } {
  return recommendation.status === "available" && Boolean(recommendation.documentPath?.trim());
}
