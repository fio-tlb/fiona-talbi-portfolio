import type { Project } from "../types";
import { projectPhoto } from "../media";

export default {
  id: "logitech-category-management",
  brandId: "logitech",
  brand: "Logitech",
  category: "Category management",
  title: "Réagencer le rayon informatique des top stores",
  context:
    "Chez Logitech, rendre l’offre plus lisible dans le rayon informatique de nos top stores.",
  mission:
    "Déployer nos solutions de category management dans les top stores et repenser l’agencement du rayon informatique.",
  details: [
    "J’ai déployé plus de 100 solutions de category management (catman) dans nos top stores.",
    "Ce nouvel agencement du rayon informatique a augmenté ses ventes de 30 %.",
  ],
  metrics: [
    {
      id: "catman-solutions",
      value: "100+",
      label: "solutions de category management déployées",
    },
    { id: "catman-sales", value: "+30 %", label: "de ventes sur le rayon informatique" },
  ],
  story: [],
  gallery: [
    projectPhoto(
      "logitech-category-management",
      "rayon",
      "Rayon informatique d’un top store : souris, claviers, webcams et casques",
      "Le rayon informatique d’un top store, après le réagencement.",
    ),
    projectPhoto(
      "logitech-category-management",
      "plan",
      "Plan d’implantation du rayon informatique",
      "Le plan d’implantation du rayon.",
    ),
    projectPhoto(
      "logitech-category-management",
      "allee",
      "Allée d’un magasin bordée de rayons",
      "Une allée du magasin, vue d’ensemble.",
    ),
    projectPhoto(
      "logitech-category-management",
      "accessoires",
      "Accessoires informatiques présentés sur crochets, avec leurs étiquettes",
      "Les accessoires en présentation sur crochets.",
    ),
  ],
} satisfies Project;
