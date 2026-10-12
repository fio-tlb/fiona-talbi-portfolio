import original from "../massilia-influencer-relations";
import { translateProject } from "../localize";

export default translateProject(original, {
  category: "Influencer relations",
  title: "Signing five French and Spanish influencers in one month",
  context:
    "At Massilia E-consulting, at the start of the pandemic: limited stock left little flexibility when working with influencers.",
  mission:
    "Build partnerships with French and Spanish influencers and manage relationships with Chinese suppliers.",
  details: [
    "I signed three French and two Spanish influencers in one month.",
    "I also managed relationships with Chinese suppliers at the start of the pandemic.",
    "With limited stock, there was little flexibility when working with the influencers.",
  ],
  metrics: {
    "influence-partners": { label: "French and Spanish influencers signed" },
    "influence-time": { value: "1 month", label: "to sign all five partnerships" },
  },
  story: [],
  gallery: {
    "france-espagne": {
      alt: "A map of France and Spain with five markers",
      caption: "Partnerships on both sides of the Pyrenees.",
    },
    influenceuses: {
      alt: "Five influencer profile cards",
      caption: "The five influencers signed in one month.",
    },
    contrats: {
      alt: "Signed partnership contracts with a pen",
      caption: "The partnership contracts.",
    },
    fournisseurs: {
      alt: "Parcels stacked and ready for shipping",
      caption: "Orders placed with suppliers.",
    },
  },
});
