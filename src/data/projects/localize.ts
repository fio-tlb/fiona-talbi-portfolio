import type { Project } from "../types";

type Translation = Pick<
  Project,
  "title" | "category" | "context" | "mission" | "details" | "story"
> & {
  metrics: Record<string, { label: string; value?: string }>;
  gallery: Record<string, { alt: string; caption: string }>;
};

/** Conserve les identifiants, chiffres et fichiers ; les textes sont traduits explicitement. */
export function translateProject(project: Project, translation: Translation): Project {
  return {
    ...project,
    ...translation,
    metrics: project.metrics.map((metric) => {
      const text = translation.metrics[metric.id];
      if (!text) throw new Error("Missing project metric translation: " + metric.id);
      return { ...metric, ...text };
    }),
    gallery: project.gallery.map((image) => {
      const name = image.src
        .split("/")
        .at(-1)!
        .replace(/\.[^.]+$/, "");
      const text = translation.gallery[name];
      if (!text) throw new Error("Missing project photo translation: " + project.id + "/" + name);
      return { ...image, ...text };
    }),
  };
}
