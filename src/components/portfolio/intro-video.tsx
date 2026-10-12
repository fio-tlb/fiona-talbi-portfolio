import {
  createContext,
  useContext,
  useEffect,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Play, X } from "lucide-react";
import { sectionContent, type IntroVideo } from "@/data/portfolio";
import { formatDuration, useIntroVideo, type IntroVideoController } from "@/hooks/use-intro-video";
import { publicPath } from "@/lib/public-path";

const text = sectionContent.introVideo;

type IntroVideoContextValue = { video: IntroVideo | null; controller: IntroVideoController | null };
const IntroVideoContext = createContext<IntroVideoContextValue>({ video: null, controller: null });

/** Rend la vidéo disponible au hero (bouton, bandeau) et au calque flottant (pastille, lecteur). */
export function IntroVideoProvider({
  video,
  canInvite,
  children,
}: {
  video: IntroVideo | null;
  /** Faux sans portrait : le bandeau n'a pas de visuel où se poser. */
  canInvite: boolean;
  children: ReactNode;
}) {
  if (!video) {
    return (
      <IntroVideoContext.Provider value={{ video: null, controller: null }}>
        {children}
      </IntroVideoContext.Provider>
    );
  }
  return (
    <ControlledIntroVideo video={video} canInvite={canInvite}>
      {children}
    </ControlledIntroVideo>
  );
}

function ControlledIntroVideo({
  video,
  canInvite,
  children,
}: {
  video: IntroVideo;
  canInvite: boolean;
  children: ReactNode;
}) {
  const controller = useIntroVideo(video, canInvite);
  return (
    <IntroVideoContext.Provider value={{ video, controller }}>
      {children}
      <IntroWidget controller={controller} />
      <IntroVideoDialog controller={controller} />
    </IntroVideoContext.Provider>
  );
}

/** « images/x.jpg » → « images/x.webp ». */
function withExtension(path: string, extension: string) {
  return path.replace(/\.[a-z0-9]+$/i, "." + extension);
}

/**
 * Bouton secondaire du hero : un vrai lien vers le MP4, qui fonctionne sans JavaScript ;
 * une fois la page hydratée, il ouvre le lecteur. Rond seul sous 1000 px (styles.css).
 */
export function HeroVideoLink() {
  const { video, controller } = useContext(IntroVideoContext);
  if (!video) return null;
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (!controller?.ready || modified || event.button !== 0) return;
    event.preventDefault();
    controller.play();
  };
  return (
    <a
      className="action action-secondary hero-video-link"
      href={publicPath(video.src)}
      onClick={onClick}
    >
      <Play className="hero-video-icon" size={14} fill="currentColor" aria-hidden />
      <span className="hero-video-label">{text.heroLabel}</span>
      <span className="sr-only">
        {" (" + text.videoLabel + ", " + formatDuration(video.durationSeconds) + ")"}
      </span>
    </a>
  );
}

/** Bandeau posé en bas du portrait (≥ 721 px), seulement tant qu'aucun choix n'est fait. */
export function IntroInvite() {
  const { controller } = useContext(IntroVideoContext);
  if (!controller || controller.ui !== "invite") return null;
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      controller.later();
    }
  };
  return (
    <aside className="intro-invite" aria-label={text.inviteLabel} onKeyDown={onKeyDown}>
      <button
        type="button"
        className="intro-invite-watch"
        aria-label={text.watchLabel + " (" + controller.duration + ")"}
        onClick={controller.play}
      >
        <span className="intro-play-mark" aria-hidden>
          <Play size={13} fill="currentColor" />
        </span>
        <span className="intro-invite-text">
          {text.watchLabel}
          <span className="intro-invite-duration">
            <span className="intro-invite-sep">{" · "}</span>
            {controller.duration}
          </span>
        </span>
      </button>
      <button type="button" className="intro-invite-later" onClick={controller.later}>
        {text.laterLabel}
      </button>
    </aside>
  );
}

/** Pastille fixe en bas à droite : lecture et masquage, deux cibles de 44 px. */
function IntroWidget({ controller }: { controller: IntroVideoController }) {
  const [away, setAway] = useState(false);
  const visible = controller.ui === "widget";

  // Masquée au-dessus du pied de page, pour libérer « Haut de page » et les liens de contact.
  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!visible || !footer || typeof window.IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver(([entry]) => setAway(Boolean(entry?.isIntersecting)));
    observer.observe(footer);
    return () => observer.disconnect();
  }, [visible]);

  if (!visible) return null;
  const poster = controller.video.poster;
  return (
    <aside className="intro-widget" aria-label={text.inviteLabel} data-away={away || undefined}>
      <button
        ref={controller.widgetPlayRef}
        type="button"
        className="intro-widget-play"
        aria-label={text.widgetPlayLabel + " (" + controller.duration + ")"}
        title={text.widgetPlayLabel + " (" + controller.duration + ")"}
        onClick={controller.play}
      >
        <picture>
          <source type="image/webp" srcSet={publicPath(withExtension(poster, "webp"))} />
          <img src={publicPath(poster)} alt="" width={44} height={44} decoding="async" />
        </picture>
        <span className="intro-widget-mark" aria-hidden>
          <Play size={10} fill="currentColor" />
        </span>
      </button>
      <button
        type="button"
        className="intro-widget-dismiss"
        aria-label={text.widgetDismissLabel}
        title={text.widgetDismissLabel}
        onClick={controller.dismiss}
      >
        <X size={18} aria-hidden />
      </button>
    </aside>
  );
}

/** Lecteur : <dialog> natif (top layer, Échap, page inerte), vidéo créée au premier clic. */
function IntroVideoDialog({ controller }: { controller: IntroVideoController }) {
  const { video } = controller;
  if (!controller.ready) return null;
  const src = publicPath(video.src);
  // Un clic sur le voile (hors du lecteur) cible le <dialog> lui-même.
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  };
  return (
    <dialog
      ref={controller.dialogRef}
      className="intro-video-dialog"
      aria-labelledby="intro-video-title"
      onClose={controller.onPlayerClose}
      onClick={onClick}
    >
      <div className="intro-video-bar">
        <p className="intro-video-title">
          <span id="intro-video-title">{video.title}</span>
          <span className="intro-video-duration">
            <span aria-hidden> · </span>
            {controller.duration}
          </span>
        </p>
        <button
          ref={controller.closeButtonRef}
          type="button"
          className="intro-video-close"
          aria-label={text.closeLabel}
          title={text.closeLabel}
          onClick={() => controller.dialogRef.current?.close()}
        >
          <X size={20} aria-hidden />
        </button>
      </div>
      {controller.playerMounted &&
        (controller.playerError ? (
          <div className="intro-video-error">
            <p>{text.errorText}</p>
            <a href={src}>{text.errorOpenLabel}</a>
          </div>
        ) : (
          <video
            ref={controller.videoRef}
            className="intro-video-media"
            src={src}
            poster={publicPath(video.poster)}
            width={video.width}
            height={video.height}
            controls
            playsInline
            preload="metadata"
            onEnded={controller.onEnded}
            onError={controller.onError}
          >
            {video.captions && (
              <track
                kind="captions"
                src={publicPath(video.captions)}
                srcLang="fr"
                label="Français"
                default
              />
            )}
          </video>
        ))}
    </dialog>
  );
}
