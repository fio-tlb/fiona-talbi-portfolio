import type { ProjectImage } from "@/data/portfolio";
import { publicPath } from "@/lib/public-path";

/** Largeurs disponibles pour chaque photo de projet : `-800` et la taille d'origine (1600 px). */
const SMALL_WIDTH = 800;

/** « images/projets/x/rayon.jpg » → « …/rayon-800.avif » (la grande taille garde le nom de base). */
export function projectImageVariant(src: string, small: boolean, extension: "jpg" | "avif") {
  const base = src.replace(/\.[a-z0-9]+$/i, "");
  return publicPath(base + (small ? "-" + SMALL_WIDTH : "") + "." + extension);
}

function srcSet(image: ProjectImage, extension: "jpg" | "avif") {
  return (
    projectImageVariant(image.src, true, extension) +
    " " +
    SMALL_WIDTH +
    "w, " +
    projectImageVariant(image.src, false, extension) +
    " " +
    image.width +
    "w"
  );
}

type ProjectPictureProps = {
  image: ProjectImage;
  /** Largeur affichée (attribut `sizes`), pour que le navigateur choisisse 800 ou 1600 px. */
  sizes: string;
  /** `""` quand la photo est décrite à côté (légende, titre de la carte). */
  alt?: string;
  loading?: "lazy" | "eager" | undefined;
  className?: string | undefined;
};

/** Photo de projet : AVIF puis JPEG de repli, en 800 et 1600 px de large. */
export function ProjectPicture({
  image,
  sizes,
  alt = image.alt,
  loading = "lazy",
  className,
}: ProjectPictureProps) {
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet(image, "avif")} sizes={sizes} />
      <img
        src={publicPath(image.src)}
        srcSet={srcSet(image, "jpg")}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={loading}
        decoding="async"
      />
    </picture>
  );
}
