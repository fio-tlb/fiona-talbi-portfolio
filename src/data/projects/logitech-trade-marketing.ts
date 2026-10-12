import type { Project } from "../types";
import { projectPhoto } from "../media";

export default {
  id: "logitech-trade-marketing",
  brandId: "logitech",
  brand: "Logitech",
  category: "Trade marketing",
  title: "La PLV en place dès le jour du lancement, dans 140 top stores",
  context:
    "Chez Logitech, rendre visibles en magasin les lancements produits et les campagnes comme les Logi Work Days.",
  mission:
    "Avec le responsable des ventes terrain, faire en sorte que la PLV soit en place dès le jour du lancement dans nos top stores.",
  details: [
    "J’ai managé une équipe de 7 merchandisers, aux côtés du responsable des ventes terrain.",
    "La PLV était disponible dès le jour du lancement dans nos 140 top stores.",
    "Pour les lancements produits comme pour les campagnes, dont les Logi Work Days.",
  ],
  metrics: [
    { id: "trade-stores", value: "140", label: "top stores équipés dès le lancement" },
    { id: "trade-merchandisers", value: "7", label: "merchandisers managés sur le terrain" },
  ],
  story: [],
  gallery: [
    projectPhoto(
      "logitech-trade-marketing",
      "presentoir",
      "Présentoir de PLV avec fronton, garni de produits",
      "Un présentoir de PLV installé pour un lancement produit.",
    ),
    projectPhoto(
      "logitech-trade-marketing",
      "kit-plv",
      "Éléments de PLV : affiche, réglette, stop-rayon, stickers et étiquettes",
      "Les éléments de PLV d’une campagne.",
    ),
    projectPhoto(
      "logitech-trade-marketing",
      "tete-de-gondole",
      "Tête de gondole avec bannière suspendue et sticker au sol",
      "Une tête de gondole aux couleurs d’une campagne.",
    ),
    projectPhoto(
      "logitech-trade-marketing",
      "deploiement",
      "Cartons de PLV empilés sur une palette",
      "La PLV conditionnée avant son déploiement dans les top stores.",
    ),
  ],
} satisfies Project;
