import type { ProjectImage } from "@/data/portfolio";
import { ResponsiveImage } from "./responsive-image";

type ProjectPictureProps = {
  image: ProjectImage;
  /** Largeur affichée (attribut `sizes`), pour que le navigateur choisisse 800 ou 1600 px. */
  sizes: string;
  /** `""` quand la photo est décrite à côté (légende, titre de la carte). */
  alt?: string;
  loading?: "lazy" | "eager" | undefined;
  fetchPriority?: "high" | "low" | "auto" | undefined;
  className?: string | undefined;
};

/** Photo de projet ; les formats et variantes sont définis avec les données de l’image. */
export function ProjectPicture({
  image,
  sizes,
  alt = image.alt,
  loading = "lazy",
  fetchPriority,
  className,
}: ProjectPictureProps) {
  return (
    <ResponsiveImage
      image={image}
      alt={alt}
      sizes={sizes}
      loading={loading}
      fetchPriority={fetchPriority}
      className={className}
    />
  );
}
