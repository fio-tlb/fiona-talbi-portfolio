import type { MouseEvent } from "react";
import { Play, X } from "lucide-react";
import { sectionContent, type IntroVideo } from "@/data/portfolio";
import { formatDuration, useIntroVideo, type IntroVideoController } from "@/hooks/use-intro-video";
import { publicPath } from "@/lib/public-path";

const text = sectionContent.introVideo;

/** « images/x.jpg » → « images/x.webp ». */
function withExtension(path: string, extension: string) {
  return path.replace(/\.[a-z0-9]+$/i, "." + extension);
}

/** « …mon parcours en {durée}, de vive voix. » → durée réelle de la vidéo. */
function withDuration(template: string, duration: string) {
  return template.replace("{durée}", duration);
}

/**
 * Vidéo de présentation, montée une fois pour toutes les pages (site-shell.tsx) : bouton
 * flottant « Voir la vidéo » partout, modale d'accueil sur l'accueil (`offerWelcome`), lecteur.
 * `video: null` : rien du tout.
 */
export function IntroVideoLayer({
  video,
  offerWelcome,
}: {
  video: IntroVideo | null;
  offerWelcome: boolean;
}) {
  if (!video) return null;
  return <ControlledIntroVideo video={video} offerWelcome={offerWelcome} />;
}

function ControlledIntroVideo({
  video,
  offerWelcome,
}: {
  video: IntroVideo;
  offerWelcome: boolean;
}) {
  const controller = useIntroVideo(video, offerWelcome);
  return (
    <>
      <VideoFab controller={controller} />
      {controller.welcomeMounted && <WelcomeDialog controller={controller} />}
      <IntroVideoDialog controller={controller} />
    </>
  );
}

/** Un clic sur le voile (hors du contenu) cible le <dialog> lui-même. */
function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
  if (event.target === event.currentTarget) event.currentTarget.close();
}

/**
 * Bouton flottant permanent, en bas à droite, sans croix : un vrai lien vers le MP4 dans le
 * HTML pré-rendu (il fonctionne sans JavaScript), qui ouvre le lecteur une fois la page hydratée.
 */
function VideoFab({ controller }: { controller: IntroVideoController }) {
  const { video } = controller;
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (!controller.ready || modified || event.button !== 0) return;
    event.preventDefault();
    controller.play();
  };
  // Dans un repère : les lecteurs d'écran le trouvent dans la liste des régions.
  return (
    <aside aria-label={text.welcomeLabel}>
      <a
        ref={controller.fabRef}
        className="video-fab"
        href={publicPath(video.src)}
        onClick={onClick}
        data-hidden={controller.dialogOpen || controller.fabCovering || undefined}
      >
        <span className="video-fab-mark" aria-hidden>
          <Play size={14} fill="currentColor" strokeWidth={0} />
        </span>
        {text.fabLabel}
        <span className="sr-only">
          {" " + text.fabNameSuffix + " (" + formatDuration(video.durationSeconds) + ")"}
        </span>
      </a>
    </aside>
  );
}

/** Modale d'accueil : vignette, jeu de mots, « Voir la vidéo » ou « Ignorer ». */
function WelcomeDialog({ controller }: { controller: IntroVideoController }) {
  const { video, duration } = controller;
  return (
    <dialog
      ref={controller.welcomeRef}
      className="video-welcome"
      aria-labelledby="video-welcome-title"
      aria-describedby="video-welcome-text"
      onClose={controller.onWelcomeClose}
      onClick={closeOnBackdrop}
    >
      <div className="video-welcome-body">
        {/* Raccourci souris : la vignette lance aussi la vidéo (le clavier a le bouton). */}
        <div className="video-welcome-poster" onClick={controller.play} aria-hidden>
          <picture>
            <source type="image/webp" srcSet={publicPath(withExtension(video.poster, "webp"))} />
            <img
              src={publicPath(video.poster)}
              alt=""
              width={video.width}
              height={video.height}
              decoding="async"
            />
          </picture>
          <span className="video-welcome-play">
            <Play size={22} fill="currentColor" strokeWidth={0} />
          </span>
          <span className="video-welcome-duration">{duration}</span>
        </div>
        <div className="video-welcome-copy">
          <p className="chip video-welcome-eyebrow">{text.welcomeLabel}</p>
          <h2 id="video-welcome-title" className="video-welcome-title">
            {text.welcomeTitle}
          </h2>
          <p id="video-welcome-text" className="video-welcome-text">
            {withDuration(text.welcomeText, duration)}
          </p>
          <div className="video-welcome-actions">
            <button
              ref={controller.welcomeWatchRef}
              type="button"
              className="action action-primary"
              onClick={controller.play}
            >
              <Play size={15} fill="currentColor" strokeWidth={0} aria-hidden />
              {text.watchLabel}
            </button>
            <button type="button" className="action action-secondary" onClick={controller.ignore}>
              {text.ignoreLabel}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

/** Lecteur : <dialog> natif (top layer, Échap, page inerte), vidéo créée au premier clic. */
function IntroVideoDialog({ controller }: { controller: IntroVideoController }) {
  const { video } = controller;
  if (!controller.ready) return null;
  const src = publicPath(video.src);
  return (
    <dialog
      ref={controller.dialogRef}
      className="intro-video-dialog"
      aria-labelledby="intro-video-title"
      onClose={controller.onPlayerClose}
      onClick={closeOnBackdrop}
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
