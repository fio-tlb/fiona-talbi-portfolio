import type { Project } from "../../types";
import { projects as original } from "../index";
import categoryManagement from "./logitech-category-management";
import tradeMarketing from "./logitech-trade-marketing";
import socialMedia from "./cosmeticar-social-media";
import influencerRelations from "./massilia-influencer-relations";

const translations = [categoryManagement, tradeMarketing, socialMedia, influencerRelations];
// L’ordre des projets français reste la référence dans toutes les langues.
export const projects: readonly Project[] = original.map((project) => {
  const translated = translations.find((item) => item.id === project.id);
  if (!translated) throw new Error("Missing English project: " + project.id);
  return translated;
});
