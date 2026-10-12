import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from '@/components/portfolio';
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Fiona Talbi — Portfolio Marketing 360 & Communication' },
    { name: 'description', content: 'Fiona Talbi, professionnelle du marketing 360 et de la communication à Paris. Découvrez mes projets chez Logitech, CosmétiCar et Massilia, mes résultats et mon parcours international.' },
    { property: 'og:title', content: 'Fiona Talbi — Marketing, créativité & impact' },
    { property: 'og:description', content: 'Plus de 3 ans d’expérience, +30 % de ventes et 140 top stores activés : découvrez le portfolio de Fiona Talbi.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Portfolio,
});
