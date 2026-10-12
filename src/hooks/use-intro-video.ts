import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { flushSync } from "react-dom";
import type { IntroVideo } from "@/data/portfolio";

/** Choix mémorisé par vidéo : la modale d'accueil ne revient plus, quel qu'il soit. */
export type IntroVideoChoice = "ignored" | "watched";

const STORAGE_PREFIX = "ft-intro-video:";
/** Délai avant la modale d'accueil : le hero a fini d'entrer (550 ms) et la page est posée. */
export const WELCOME_DELAY_MS = 800;
/** Au-delà, le visiteur a commencé à lire la page : pas de modale. */
const WELCOME_MAX_SCROLL = 100;

// Repli en mémoire quand le stockage est bloqué (navigation privée, cookies refusés).
const memoryChoices = new Map<string, IntroVideoChoice>();

export function readIntroChoice(id: string): IntroVideoChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_PREFIX + id);
    return value === "ignored" || value === "watched" ? value : null;
  } catch {
    return memoryChoices.get(id) ?? null;
  }
}

function writeIntroChoice(id: string, choice: IntroVideoChoice) {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + id, choice);
  } catch {
    // Stockage indisponible : le choix vaut pour cette visite seulement.
    memoryChoices.set(id, choice);
  }
}

/** « 20 s », « 1 min », « 1 min 05 s » (espaces insécables). */
export function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.round(totalSeconds));
  if (seconds < 60) return seconds + " s";
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return minutes + " min" + (rest ? " " + String(rest).padStart(2, "0") + " s" : "");
}

/** Arrivée « propre » sur l'accueil : en haut, sans ancre, rien d'autre d'ouvert. */
function canWelcome() {
  return (
    !window.location.hash &&
    window.scrollY < WELCOME_MAX_SCROLL &&
    !document.querySelector("dialog[open], .mobile-menu[open], .language-switcher[open]")
  );
}

export type IntroVideoController = {
  video: IntroVideo;
  /** Faux avant l'hydratation (ou sans <dialog>) : le bouton flottant reste un lien vers le MP4. */
  ready: boolean;
  /** La modale d'accueil est montée (elle ne l'est qu'une fois, sur l'accueil). */
  welcomeMounted: boolean;
  /** Une des deux fenêtres est ouverte : le bouton flottant s'efface. */
  dialogOpen: boolean;
  /** La <video> n'existe qu'après le premier clic : aucun octet chargé avant. */
  playerMounted: boolean;
  playerError: boolean;
  duration: string;
  welcomeRef: RefObject<HTMLDialogElement | null>;
  welcomeWatchRef: RefObject<HTMLButtonElement | null>;
  dialogRef: RefObject<HTMLDialogElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  fabRef: RefObject<HTMLAnchorElement | null>;
  play: () => void;
  ignore: () => void;
  onWelcomeClose: () => void;
  onPlayerClose: () => void;
  onEnded: () => void;
  onError: () => void;
};

/**
 * Vidéo de présentation : modale d'accueil (première visite, accueil seulement), bouton
 * flottant permanent et lecteur. `offerWelcome` est vrai sur l'accueil uniquement.
 */
export function useIntroVideo(video: IntroVideo, offerWelcome: boolean): IntroVideoController {
  const [ready, setReady] = useState(false);
  const [welcomeMounted, setWelcomeMounted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [playerMounted, setPlayerMounted] = useState(false);
  const [playerError, setPlayerError] = useState(false);
  const choiceRef = useRef<IntroVideoChoice | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const welcomeRef = useRef<HTMLDialogElement>(null);
  const welcomeWatchRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const fabRef = useRef<HTMLAnchorElement>(null);
  const id = video.id;

  // Après l'hydratation seulement : le HTML pré-rendu ne contient que le lien flottant, et un
  // choix déjà fait ne peut pas faire clignoter la modale.
  useEffect(() => {
    // Sans <dialog> modal (très vieux navigateurs), le lien ouvre simplement le MP4.
    if (typeof HTMLDialogElement !== "function" || !("showModal" in HTMLDialogElement.prototype))
      return;
    setReady(true);
    choiceRef.current = readIntroChoice(id);
    if (!offerWelcome || choiceRef.current || !canWelcome()) return;

    // Montée tout de suite (fermée, donc invisible) pour que la vignette soit chargée à l'ouverture.
    setWelcomeMounted(true);
    const timer = window.setTimeout(() => {
      const dialog = welcomeRef.current;
      if (choiceRef.current || !canWelcome() || !dialog) {
        setWelcomeMounted(false);
        return;
      }
      dialog.showModal();
      setDialogOpen(true);
      welcomeWatchRef.current?.focus();
    }, WELCOME_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [id, offerWelcome]);

  const remember = useCallback(
    (choice: IntroVideoChoice) => {
      choiceRef.current = choice;
      writeIntroChoice(id, choice);
    },
    [id],
  );

  // Tout dans le même geste (iOS exige que play() suive le clic) : fermer la modale d'accueil,
  // créer la vidéo, ouvrir le lecteur, lire. Ouvrir le lecteur vaut choix « watched ».
  const play = useCallback(() => {
    remember("watched");
    const welcome = welcomeRef.current;
    const fromWelcome = Boolean(welcome?.open);
    const active = document.activeElement;
    openerRef.current = !fromWelcome && active instanceof HTMLElement ? active : null;
    if (welcome?.open) welcome.close();
    flushSync(() => setPlayerMounted(true));
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    setDialogOpen(true);
    closeButtonRef.current?.focus();
    const media = videoRef.current;
    if (media) {
      // Lecture refusée (économie d'énergie…) : la vidéo reste en pause avec ses contrôles.
      Promise.resolve(media.play()).catch(() => {});
    }
  }, [remember]);

  /** « Ignorer », Échap ou clic sur le voile : la modale se ferme et ne reviendra pas. */
  const ignore = useCallback(() => welcomeRef.current?.close(), []);

  const onWelcomeClose = useCallback(() => {
    if (choiceRef.current !== "watched") remember("ignored");
    // Le lecteur a pu prendre le relais dans le même geste.
    if (!dialogRef.current?.open) setDialogOpen(false);
  }, [remember]);

  // Échap, bouton Fermer ou clic sur le voile : pause, puis focus rendu au bouton d'origine
  // ou, si le lecteur a été ouvert depuis la modale d'accueil, au bouton flottant.
  const onPlayerClose = useCallback(() => {
    videoRef.current?.pause();
    // Le bouton flottant redevient visible avant de recevoir le focus.
    flushSync(() => setDialogOpen(false));
    const opener = openerRef.current;
    const target =
      opener && opener !== document.body && opener.isConnected ? opener : fabRef.current;
    target?.focus({ preventScroll: true });
    // Sans cible focalisable : le focus revient au contenu.
    if (!target || document.activeElement !== target)
      document.getElementById("contenu")?.focus({ preventScroll: true });
  }, []);

  const onEnded = useCallback(() => remember("watched"), [remember]);
  const onError = useCallback(() => setPlayerError(true), []);

  return {
    video,
    ready,
    welcomeMounted,
    dialogOpen,
    playerMounted,
    playerError,
    duration: formatDuration(video.durationSeconds),
    welcomeRef,
    welcomeWatchRef,
    dialogRef,
    videoRef,
    closeButtonRef,
    fabRef,
    play,
    ignore,
    onWelcomeClose,
    onPlayerClose,
    onEnded,
    onError,
  };
}
