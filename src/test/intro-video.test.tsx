import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Portfolio } from "@/components/portfolio";
import { ProjectPage } from "@/components/project-page";
import { IntroVideoLayer } from "@/components/portfolio/intro-video";
import { introVideo, projects } from "@/data/portfolio";
import { WELCOME_DELAY_MS } from "@/hooks/use-intro-video";
import { renderWithRouter, renderToStringWithRouter } from "./render-with-router";

const video = introVideo!;
const storageKey = "ft-intro-video:" + video.id;
const href = import.meta.env.BASE_URL + video.src;
const welcomeTitle = "On dit qu’une image vaut mille mots…";

const fab = () => screen.getByRole("link", { name: /^Voir la vidéo de présentation \(20\ss\)$/ });
const welcome = () => screen.queryByRole("dialog", { name: welcomeTitle });
const player = () => document.querySelector<HTMLDialogElement>(".intro-video-dialog");

/** Laisse passer le délai de la modale d'accueil (minuteurs simulés). */
function waitForWelcome() {
  act(() => {
    vi.advanceTimersByTime(WELCOME_DELAY_MS + 50);
  });
}

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState(null, "", "/");
  vi.useFakeTimers({ shouldAdvanceTime: true });
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("Intro video", () => {
  it("renders nothing without a video, and titles the placeholder clip « Vidéo de test »", async () => {
    expect(video.isPlaceholder).toBe(true);
    render(<IntroVideoLayer video={null} offerWelcome />);
    waitForWelcome();
    expect(document.querySelector(".video-fab, dialog")).toBeNull();
    cleanup();

    window.localStorage.setItem(storageKey, "ignored");
    await renderWithRouter(<Portfolio />);
    fireEvent.click(fab());
    expect(screen.getByRole("dialog", { name: "Vidéo de test" })).toHaveAttribute("open");
  });

  it("prerenders the floating button as a plain link to the MP4, with no dialog and no close button", async () => {
    const html = await renderToStringWithRouter(<Portfolio />);
    expect(html).not.toMatch(/<dialog/);
    expect(html).toMatch(new RegExp(`<a[^>]*class="video-fab"[^>]*href="${href}"`));
    expect(html).toContain("Voir la vidéo");
    // Plus de bouton vidéo dans le hero ni de bandeau sur le portrait.
    expect(html).not.toMatch(/Ma présentation|Plus tard|intro-invite|intro-widget/);

    await renderWithRouter(<Portfolio />);
    expect(fab()).toHaveAttribute("href", href);
    expect(fab()).toHaveTextContent("Voir la vidéo");
    expect(screen.queryByRole("button", { name: /masquer|fermer/i })).toBeNull();
  });

  it("welcomes a first visit with the pun, then « Ignorer » is remembered and the modal never returns", async () => {
    await renderWithRouter(<Portfolio />);
    expect(welcome()).toBeNull(); // not before the hero has settled
    waitForWelcome();
    const dialog = welcome()!;
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAccessibleDescription(
      /^…alors j’ai préféré une vidéo\s: mon parcours en 20\ss, de vive voix\.$/,
    );
    expect(within(dialog).getByRole("button", { name: "Voir la vidéo" })).toHaveFocus();
    expect(fab()).toHaveAttribute("data-hidden");
    expect(document.querySelector("video")).toBeNull(); // nothing loads before a click

    fireEvent.click(within(dialog).getByRole("button", { name: "Ignorer" }));
    expect(dialog).not.toHaveAttribute("open");
    expect(window.localStorage.getItem(storageKey)).toBe("ignored");
    expect(fab()).not.toHaveAttribute("data-hidden");
    cleanup();

    await renderWithRouter(<Portfolio />);
    waitForWelcome();
    expect(welcome()).toBeNull();
    expect(fab()).toBeInTheDocument();
  });

  it("closes the welcome modal with Escape, as « Ignorer »", async () => {
    await renderWithRouter(<Portfolio />);
    waitForWelcome();
    const dialog = welcome() as HTMLDialogElement;
    // Échap ferme un <dialog> modal (événement « close ») ; jsdom ne le simule pas.
    act(() => dialog.close());
    expect(window.localStorage.getItem(storageKey)).toBe("ignored");
  });

  it("does not interrupt a visit that starts on an anchor, or a project page", async () => {
    window.history.replaceState(null, "", "/#projets");
    await renderWithRouter(<Portfolio />);
    waitForWelcome();
    expect(welcome()).toBeNull();
    cleanup();

    window.history.replaceState(null, "", "/");
    const project = projects[0]!;
    await renderWithRouter(<ProjectPage project={project} />, "/projets/" + project.id);
    waitForWelcome();
    expect(welcome()).toBeNull();
    expect(fab()).toHaveTextContent("Voir la vidéo");
    expect(window.localStorage.getItem(storageKey)).toBeNull();
  });

  it("switches from the welcome modal to the player in one gesture", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play");
    await renderWithRouter(<Portfolio />);
    waitForWelcome();
    const dialog = welcome()!;
    fireEvent.click(within(dialog).getByRole("button", { name: "Voir la vidéo" }));
    expect(dialog).not.toHaveAttribute("open");
    expect(player()).toHaveAttribute("open");
    expect(play).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem(storageKey)).toBe("watched");

    fireEvent.click(screen.getByRole("button", { name: "Fermer la vidéo" }));
    expect(player()).not.toHaveAttribute("open");
    expect(fab()).toHaveFocus(); // the welcome button is gone: focus lands on the floating one
  });

  it("opens the player from the floating button, then gives focus back to it", async () => {
    window.localStorage.setItem(storageKey, "ignored");
    const showModal = vi.spyOn(HTMLDialogElement.prototype, "showModal");
    const play = vi.spyOn(HTMLMediaElement.prototype, "play");
    const pause = vi.spyOn(HTMLMediaElement.prototype, "pause");
    await renderWithRouter(<Portfolio />);
    waitForWelcome();
    expect(welcome()).toBeNull();
    expect(document.querySelector("video")).toBeNull();

    fab().focus();
    fireEvent.click(fab());
    expect(showModal).toHaveBeenCalledTimes(1);
    expect(play).toHaveBeenCalledTimes(1);
    const dialog = player()!;
    expect(dialog).toHaveAttribute("open");
    const media = dialog.querySelector("video")!;
    expect(media).toHaveAttribute("src", href);
    expect(media.hasAttribute("autoplay")).toBe(false);
    expect(media.querySelector("track")).toBeNull(); // captions: null, nothing invented
    expect(screen.getByRole("button", { name: "Fermer la vidéo" })).toHaveFocus();
    expect(fab()).toHaveAttribute("data-hidden");

    fireEvent(media, new Event("ended"));
    expect(window.localStorage.getItem(storageKey)).toBe("watched");
    fireEvent.click(screen.getByRole("button", { name: "Fermer la vidéo" }));
    expect(pause).toHaveBeenCalled();
    expect(dialog).not.toHaveAttribute("open");
    expect(fab()).toHaveFocus();
    expect(fab()).not.toHaveAttribute("data-hidden");
  });

  it("lets modified clicks on the floating button reach the MP4 (new tab, download)", async () => {
    window.localStorage.setItem(storageKey, "ignored");
    await renderWithRouter(<Portfolio />);
    const event = new MouseEvent("click", { bubbles: true, cancelable: true, ctrlKey: true });
    fab().dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
    expect(player()).not.toHaveAttribute("open");
  });

  it("survives blocked storage: the modal shows once per visit and « Ignorer » still works", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });
    await renderWithRouter(<Portfolio />);
    waitForWelcome();
    fireEvent.click(within(welcome()!).getByRole("button", { name: "Ignorer" }));
    expect(welcome()).toBeNull();
    cleanup();

    await renderWithRouter(<Portfolio />); // back to the home page in the same visit
    waitForWelcome();
    expect(welcome()).toBeNull();
    expect(fab()).toBeInTheDocument();
  });

  it("points to files that exist in public/", async () => {
    const publicDir = path.resolve(__dirname, "../../public");
    const mp4 = path.join(publicDir, video.src);
    const files = [mp4, video.poster, video.poster.replace(/\.jpg$/, ".webp")].map((file) =>
      path.isAbsolute(file) ? file : path.join(publicDir, file),
    );
    for (const file of files) expect(existsSync(file), file).toBe(true);
    // Fast start: the index (moov) comes before the media data, so playback starts at once.
    const head = readFileSync(mp4).toString("latin1");
    expect(head.indexOf("moov")).toBeLessThan(head.indexOf("mdat"));
    if (video.isPlaceholder) expect(statSync(mp4).size).toBeLessThanOrEqual(300 * 1024);
    if (video.captions) {
      expect(readFileSync(path.join(publicDir, video.captions), "utf8")).toMatch(/^WEBVTT/);
    }
  });
});
