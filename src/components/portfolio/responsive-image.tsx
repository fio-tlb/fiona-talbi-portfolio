import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ImageOff } from "lucide-react";
import type { ImageAsset, ImageVariant } from "@/data/types";
import { publicPath } from "@/lib/public-path";

type ResponsiveImageProps = {
  image: ImageAsset;
  alt: string;
  sizes: string;
  loading?: "lazy" | "eager" | undefined;
  fetchPriority?: "high" | "low" | "auto" | undefined;
  className?: string | undefined;
};

const srcSet = (variants?: readonly ImageVariant[]) =>
  variants?.map((variant) => publicPath(variant.src) + " " + variant.width + "w").join(", ");

/** Dimensions réservées, formats explicites et repli sur l’original si une variante échoue. */
export function ResponsiveImage(props: ResponsiveImageProps) {
  return <ImageLoader key={props.image.src} {...props} />;
}

function ImageLoader({
  image,
  alt,
  sizes,
  loading = "lazy",
  fetchPriority = "auto",
  className,
}: ResponsiveImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [originalOnly, setOriginalOnly] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "loaded" | "error">("idle");
  const hasVariants = Boolean(image.sources?.length || image.srcSet?.length);

  const onError = useCallback(() => {
    if (hasVariants && !originalOnly) {
      setOriginalOnly(true);
      setStatus("loading");
    } else {
      setStatus("error");
    }
  }, [hasVariants, originalOnly]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) setStatus("ready");
    else if (img.complete) onError();
    else setStatus("loading");
  }, [image.src, onError]);

  return (
    <picture
      className={className ? "responsive-image " + className : "responsive-image"}
      data-state={status}
      style={{ "--media-aspect": image.width + " / " + image.height } as CSSProperties}
    >
      {!originalOnly &&
        image.sources?.map((source) => (
          <source
            key={source.type}
            type={source.type}
            srcSet={srcSet(source.variants)}
            sizes={sizes}
          />
        ))}
      <img
        ref={imgRef}
        src={publicPath(image.src)}
        srcSet={originalOnly ? undefined : srcSet(image.srcSet)}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        aria-hidden={status === "error" ? true : undefined}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onLoad={() => setStatus("loaded")}
        onError={onError}
      />
      {status === "error" && (
        <span
          className="responsive-image-fallback"
          role={alt ? "img" : undefined}
          aria-label={alt || undefined}
          aria-hidden={alt ? undefined : true}
        >
          <ImageOff size={28} aria-hidden />
        </span>
      )}
    </picture>
  );
}
