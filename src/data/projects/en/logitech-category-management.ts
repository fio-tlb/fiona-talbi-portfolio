import original from "../logitech-category-management";
import { translateProject } from "../localize";

export default translateProject(original, {
  category: "Category management",
  title: "Redesigning the computing aisle in top stores",
  context:
    "At Logitech, making the product range easier to navigate in the computing aisle of our top stores.",
  mission:
    "Roll out category management solutions across our top stores and rethink the layout of the computing aisle.",
  details: [
    "I rolled out more than 100 category management solutions in our top stores.",
    "The new computing aisle layout increased sales by 30%.",
  ],
  metrics: {
    "catman-solutions": { label: "category management solutions rolled out" },
    "catman-sales": { value: "+30%", label: "sales growth in the computing aisle" },
  },
  story: [],
  gallery: {
    rayon: {
      alt: "A top store’s computing aisle with mice, keyboards, webcams and headsets",
      caption: "The computing aisle in a top store after its redesign.",
    },
    plan: { alt: "A layout plan for the computing aisle", caption: "The aisle layout plan." },
    allee: {
      alt: "A store aisle lined with product displays",
      caption: "An overview of a store aisle.",
    },
    accessoires: {
      alt: "Computer accessories displayed on hooks with price labels",
      caption: "Accessories displayed on hooks.",
    },
  },
});
