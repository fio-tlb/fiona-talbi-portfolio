import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { flushSync } from "react-dom";
import type { IntroVideo } from "@/data/portfolio";

/** Ce qui flotte à l'écran : rien, le bandeau du portrait (« Plus tard »), ou la pastille. */
export type IntroVideoUi = "none" | "invite" | "widget";
/** Choix mémorisé par vidéo : `later` garde la pastille, `dismissed` ne laisse que le bouton du hero. */
export type IntroVideoChoice = "later" | "dismissed";

const STORAGE_PREFIX = "ft-intro-video:";
// Bandeau posé sur le portrait à partir de 721 px de large et 521 px de haut (mêmes seuils que
// styles.css) ; sur téléphone, le bouton du hero suffit et la pastille arrive quand on quitte le hero.
const INVITE_QUERY = "(min-width: 721px) and (min-height: 521px)";

// Repli en mémoire quand le stockage est bloqué (navigation privée, cookies refusés).
const memoryChoices = new Map<string, IntroVideoChoice>();

export function readIntroChoice(id: string): IntroVideoChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_PREFIX + id);
    return value === "later" || value === "dismissed" ? value : null;
  } catch {
    return memoryChoices.get(id) ?? null;
  }
}

function writeIntroChoice(id: string, choice: IntroVideoChoice) {
  memoryChoices.set(id, choice);
  try {
    window.localStorage.setItem(STORAGE_PREFIX + id, choice);
  } catch {
    // Stockage indisponible : le choix vaut pour cette visite seulement.
  }
}

/** « 20 s », « 1 min », « 1 min 05 s » (espaces insécables). */
export function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.round(totalSeconds));
  if (seconds < 60) return seconds + " s";
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return minutes + " min" + (rest ? " " + String(rest).padStart(2, "0") + " s" : "");
}

export type IntroVideoController = {
  video: IntroVideo;
  /** Faux avant l'hydratation : le lien du hero reste un simple lien vers le MP4. */
  ready: boolean;
  ui: IntroVideoUi;
  /** La <video> n'existe qu'après le premier clic : aucun octet chargé avant. */
  playerMounted: boolean;
  playerError: boolean;
  duration: string;
  dialogRef: RefObject<HTMLDialogElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  widgetPlayRef: RefObject<HTMLButtonElement | null>;
  play: () => void;
  later: () => void;
  dismiss: () => void;
  onPlayerClose: () => void;
  onEnded: () => void;
  onError: () => void;
};

export function useIntroVideo(video: IntroVideo, canInvite: boolean): IntroVideoController {
  const [ready, setReady] = useState(false);
  const [ui, setUi] = useState<IntroVideoUi>("none");
  const [playerMounted, setPlayerMounted] = useState(false);
  const [playerError, setPlayerError] = useState(false);
  const choiceRef = useRef<IntroVideoChoice | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const widgetPlayRef = useRef<HTMLButtonElement>(null);
  const id = video.id;

  // Après l'hydratation seulement : le HTML pré-rendu ne contient rien de flottant, et le
  // choix mémorisé ne peut pas faire clignoter un bandeau déjà refusé.
  useEffect(() => {
    setReady(true);
    const choice = readIntroChoice(id);
    choiceRef.current = choice;
    if (choice === "dismissed") return;
    if (choice === "later") setUi("widget");
    else if (canInvite && window.matchMedia(INVITE_QUERY).matches) setUi("invite");

    // Quitter le hero sans avoir choisi : la pastille prend le relais du bandeau.
    const hero = document.getElementById("accueil");
    if (!hero || typeof window.IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry && !entry.isIntersecting && choiceRef.current === null) setUi("widget");
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [id, canInvite]);

  const remember = useCallback(
    (choice: IntroVideoChoice) => {
      choiceRef.current = choice;
      writeIntroChoice(id, choice);
    },
    [id],
  );

  // Tout dans le même geste (iOS exige que play() suive le clic) : créer la vidéo, ouvrir, lire.
  const play = useCallback(() => {
    const active = document.activeElement;
    openerRef.current = active instanceof HTMLElement ? active : null;
    flushSync(() => setPlayerMounted(true));
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    closeButtonRef.current?.focus();
    const media = videoRef.current;
    if (media) {
      // Lecture refusée (économie d'énergie…) : la vidéo reste en pause avec ses contrôles.
      Promise.resolve(media.play()).catch(() => {});
    }
  }, []);

  const later = useCallback(() => {
    remember("later");
    flushSync(() => setUi("widget"));
    widgetPlayRef.current?.focus();
  }, [remember]);

  const dismiss = useCallback(() => {
    remember("dismissed");
    setUi("none");
    document.getElementById("contenu")?.focus({ preventScroll: true });
  }, [remember]);

  // Échap, bouton Fermer ou clic sur le voile : pause, choix « plus tard » (sauf vidéo finie ou
  // pastille déjà masquée), puis focus rendu au bouton d'origine ou, s'il a disparu, à la pastille.
  const onPlayerClose = useCallback(() => {
    videoRef.current?.pause();
    if (choiceRef.current !== "dismissed") remember("later");
    flushSync(() => setUi(choiceRef.current === "dismissed" ? "none" : "widget"));
    const opener = openerRef.current;
    if (opener && opener !== document.body && opener.isConnected)
      opener.focus({ preventScroll: true });
    else if (widgetPlayRef.current) widgetPlayRef.current.focus({ preventScroll: true });
    else document.getElementById("contenu")?.focus({ preventScroll: true });
  }, [remember]);

  const onEnded = useCallback(() => remember("dismissed"), [remember]);
  const onError = useCallback(() => setPlayerError(true), []);

  return {
    video,
    ready,
    ui,
    playerMounted,
    playerError,
    duration: formatDuration(video.durationSeconds),
    dialogRef,
    videoRef,
    closeButtonRef,
    widgetPlayRef,
    play,
    later,
    dismiss,
    onPlayerClose,
    onEnded,
    onError,
  };
}
