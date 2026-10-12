import type { Project } from "../types";
import { projectPhoto } from "../media";

export default {
  id: "massilia-influencer-relations",
  brandId: "massilia",
  brand: "Massilia E-consulting",
  category: "Relations influenceurs",
  title: "Signer 5 influenceuses françaises et espagnoles en un mois",
  context:
    "Chez Massilia E-consulting, au début de la crise sanitaire : des stocks limités, donc peu de marge de manœuvre avec les influenceuses.",
  mission:
    "Nouer des partenariats avec des influenceuses françaises et espagnoles, et gérer les fournisseurs chinois.",
  details: [
    "En un mois, j’ai signé 3 influenceuses françaises et 2 espagnoles.",
    "Je gérais aussi les fournisseurs chinois, au début de la crise sanitaire.",
    "Avec des stocks limités, il fallait composer avec peu de marge de manœuvre auprès des influenceuses.",
  ],
  metrics: [
    {
      id: "influence-partners",
      value: "5",
      label: "influenceuses signées, françaises et espagnoles",
    },
    { id: "influence-time", value: "1 mois", label: "pour signer les cinq partenariats" },
  ],
  story: [],
  gallery: [
    projectPhoto(
      "massilia-influencer-relations",
      "france-espagne",
      "Carte de la France et de l’Espagne avec cinq repères",
      "Des partenariats des deux côtés des Pyrénées.",
    ),
    projectPhoto(
      "massilia-influencer-relations",
      "influenceuses",
      "Cinq fiches de profils d’influenceuses",
      "Les cinq influenceuses signées en un mois.",
    ),
    projectPhoto(
      "massilia-influencer-relations",
      "contrats",
      "Contrats de partenariat signés, avec un stylo",
      "Les contrats de partenariat.",
    ),
    projectPhoto(
      "massilia-influencer-relations",
      "fournisseurs",
      "Colis empilés, prêts à l’expédition",
      "Les commandes passées auprès des fournisseurs.",
    ),
  ],
} satisfies Project;
