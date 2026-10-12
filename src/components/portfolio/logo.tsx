import type { CSSProperties } from "react";
import type { LogoImage } from "@/data/portfolio";
import { publicPath } from "@/lib/public-path";

type LogoProps = {
  logo: LogoImage;
  /** Nom de la marque quand il n'est pas écrit à côté ; `""` si le logo double un texte visible. */
  alt: string;
  className?: string;
  /** « lazy » sous la ligne de flottaison : React ne précharge alors pas l'image dans le <head>. */
  loading?: "lazy" | "eager";
};

/**
 * Logo SVG monochrome de public/logos. La hauteur vient de `--logo-h` (fixée par le conteneur),
 * corrigée par `logo.scale` pour que des logos de formes différentes paraissent de même taille.
 */
export function Logo({ logo, alt, className, loading }: LogoProps) {
  const style = logo.scale ? ({ "--logo-scale": logo.scale } as CSSProperties) : undefined;
  return (
    <img
      className={className ? "brand-logo " + className : "brand-logo"}
      src={publicPath(logo.src)}
      alt={alt}
      width={logo.width}
      height={logo.height}
      style={style}
      loading={loading}
      decoding="async"
    />
  );
}
