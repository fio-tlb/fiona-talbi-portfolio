import type { Project } from "../types";
import { projectPhoto } from "../media";

export default {
  id: "cosmeticar-social-media",
  brandId: "cosmeticar",
  brand: "CosmétiCar",
  category: "Communication & réseaux sociaux",
  title: "Faire connaître un réseau de lavage auto sur Instagram",
  context:
    "CosmétiCar, réseau de franchises de lavage automobile, un secteur de niche : plus de 30 agences ouvertes dans l’année.",
  mission:
    "Faire connaître le réseau sur les réseaux sociaux et accompagner en communication les franchisés des nouvelles agences.",
  details: [
    "J’ai géré Facebook, Instagram et TikTok, avec un focus sur Instagram.",
    "Instagram a dépassé 500 abonnés en moins d’un an, dans un secteur de niche.",
    "J’ai assuré 30 formations communication pour les franchisés des nouvelles agences.",
  ],
  metrics: [
    { id: "social-followers", value: "500+", label: "abonnés Instagram en moins d’un an" },
    { id: "social-training", value: "30", label: "formations communication pour les franchisés" },
  ],
  story: [],
  gallery: [
    projectPhoto(
      "cosmeticar-social-media",
      "instagram",
      "Profil Instagram sur un téléphone, avec sa grille de publications",
      "Le compte Instagram, au cœur de la stratégie réseaux sociaux.",
    ),
    projectPhoto(
      "cosmeticar-social-media",
      "publications",
      "Une publication et une story affichées sur deux téléphones",
      "Exemples de publication et de story.",
    ),
    projectPhoto(
      "cosmeticar-social-media",
      "formation",
      "Écran de présentation et carnets sur une table de formation",
      "Une formation communication pour les franchisés d’une nouvelle agence.",
    ),
  ],
} satisfies Project;
