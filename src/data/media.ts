import type { ImageAsset, ProjectImage } from "./types";

/** Pour les JPEG dont les variantes -<largeur>.jpg/.avif ont déjà été générées. */
export function jpegWithAvif(
  src: string,
  width: number,
  height: number,
  widths: readonly number[],
): ImageAsset {
  const base = src.replace(/\.[a-z0-9]+$/i, "");
  const variants = (extension: "jpg" | "avif") =>
    widths.map((size) => ({
      src:
        size === width && extension === "jpg"
          ? src
          : base + (size === width ? "" : "-" + size) + "." + extension,
      width: size,
    }));
  return {
    src,
    width,
    height,
    srcSet: variants("jpg"),
    sources: [{ type: "image/avif", variants: variants("avif") }],
  };
}

/** Photos existantes, en 800/1600 px. Pour une nouvelle image seule, saisir directement son objet. */
export function projectPhoto(
  projectId: string,
  name: string,
  alt: string,
  caption: string,
): ProjectImage {
  return {
    ...jpegWithAvif("images/projets/" + projectId + "/" + name + ".jpg", 1600, 1000, [800, 1600]),
    alt,
    caption,
  };
}
