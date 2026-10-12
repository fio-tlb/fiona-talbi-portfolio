import type { Project } from "../types";
import logitechCategoryManagement from "./logitech-category-management";
import logitechTradeMarketing from "./logitech-trade-marketing";
import cosmeticarSocialMedia from "./cosmeticar-social-media";
import massiliaInfluencerRelations from "./massilia-influencer-relations";

// Cet ordre pilote les cartes de l’accueil et la navigation entre projets.
export const projects: readonly Project[] = [
  logitechCategoryManagement,
  logitechTradeMarketing,
  cosmeticarSocialMedia,
  massiliaInfluencerRelations,
];
