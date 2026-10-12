import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { flushSync } from "react-dom";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { ProjectImage } from "@/data/portfolio";
import { usePortfolio } from "@/hooks/use-portfolio";
import { publicPath } from "@/lib/public-path";
import { ProjectPicture } from "./project-picture";

export type Lightbox = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  index: number | null;
  open: (index: number, opener: HTMLElement) => void;
  show: (index: number) => void;
  close: () => void;
  onClosed: () => void;
};

/**
 * Agrandissement des photos dans un <dialog> natif (showModal : focus piégé, Échap, fond inerte).
 * La photo n'est rendue qu'à l'ouverture ; à la fermeture, le focus revient sur la vignette.
 */
export function useLightbox(count: number): Lightbox {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((next: number, opener: HTMLElement) => {
    const dialog = dialogRef.current;
    if (!dialog || typeof dialog.showModal !== "function") {
      window.location.href = (opener as HTMLAnchorElement).href;
      return;
    }
    openerRef.current = opener;
    flushSync(() => setIndex(next));
    if (!dialog.open) dialog.showModal();
  }, []);

  const show = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  const close = useCallback(() => dialogRef.current?.close(), []);

  const onClosed = useCallback(() => {
    setIndex(null);
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  }, []);

  return { dialogRef, index, open, show, close, onClosed };
}

type PhotoLinkProps = {
  image: ProjectImage;
  index: number;
  lightbox: Lightbox;
  sizes: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  className?: string;
  children?: ReactNode;
};

/**
 * Vignette cliquable : un vrai lien vers la photo (sans JavaScript, elle s'ouvre seule),
 * qui ouvre l'agrandissement une fois la page hydratée.
 */
export function PhotoLink({
  image,
  index,
  lightbox,
  sizes,
  loading,
  fetchPriority,
  className,
  children,
}: PhotoLinkProps) {
  const text = usePortfolio().sectionContent.projectPage;
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (modified || event.button !== 0) return;
    event.preventDefault();
    lightbox.open(index, event.currentTarget);
  };
  return (
    <a
      className={className ? "photo-link " + className : "photo-link"}
      href={publicPath(image.src)}
      onClick={onClick}
    >
      <span className="sr-only">{text.enlargeLabel + " : "}</span>
      <ProjectPicture image={image} sizes={sizes} loading={loading} fetchPriority={fetchPriority} />
      <span className="photo-link-zoom" aria-hidden>
        <Maximize2 size={16} />
      </span>
      {children}
    </a>
  );
}

/** Fenêtre d'agrandissement : photo, légende, compteur, précédent / suivant (flèches, balayage). */
export function GalleryLightbox({
  images,
  lightbox,
}: {
  images: readonly ProjectImage[];
  lightbox: Lightbox;
}) {
  const text = usePortfolio().sectionContent.projectPage;
  const { dialogRef, index, show, close, onClosed } = lightbox;
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const image = index === null ? null : images[index];
  const several = images.length > 1;

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (index === null || !several) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(index + 1);
    }
  };
  // Un clic sur le fond (hors photo, légende et boutons) ferme la fenêtre.
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    const target = event.target as HTMLElement;
    const backdrop = ["lightbox-stage", "lightbox-bar"].some((name) =>
      target.classList.contains(name),
    );
    if (target === event.currentTarget || backdrop) close();
  };
  const onPointerDown = (event: PointerEvent<HTMLDialogElement>) => {
    swipeRef.current =
      event.pointerType === "mouse" ? null : { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: PointerEvent<HTMLDialogElement>) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start || index === null || !several) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(event.clientY - start.y) * 1.5) {
      show(dx < 0 ? index + 1 : index - 1);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={text.lightboxLabel}
      onClose={onClosed}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {image && index !== null && (
        <>
          <div className="lightbox-bar">
            <p className="lightbox-counter" aria-live="polite">
              {text.photoCounter.prefix + (index + 1) + text.photoCounter.separator + images.length}
            </p>
            <button
              type="button"
              className="lightbox-button lightbox-close"
              onClick={close}
              aria-label={text.closeLabel}
              autoFocus
            >
              <X size={20} aria-hidden />
            </button>
          </div>
          <div className="lightbox-stage">
            <figure className="lightbox-figure">
              <ProjectPicture
                key={image.src}
                image={image}
                sizes="(max-width: 900px) 100vw, min(1400px, 100vw - 160px)"
                loading="eager"
                fetchPriority="high"
                className="lightbox-picture"
              />
              <figcaption className="lightbox-caption">{image.caption}</figcaption>
            </figure>
          </div>
          {several && (
            <>
              <button
                type="button"
                className="lightbox-button lightbox-nav is-previous"
                onClick={() => show(index - 1)}
                aria-label={text.previousPhotoLabel}
              >
                <ChevronLeft size={22} aria-hidden />
              </button>
              <button
                type="button"
                className="lightbox-button lightbox-nav is-next"
                onClick={() => show(index + 1)}
                aria-label={text.nextPhotoLabel}
              >
                <ChevronRight size={22} aria-hidden />
              </button>
            </>
          )}
        </>
      )}
    </dialog>
  );
}
