import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { renderToString } from "react-dom/server";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Portfolio } from "@/components/portfolio";
import { Hero } from "@/components/portfolio/hero";
import { IntroVideoProvider } from "@/components/portfolio/intro-video";
import { introVideo } from "@/data/portfolio";
import { triggerIntersection } from "./intersection-observer";

const video = introVideo!;
const storageKey = "ft-intro-video:" + video.id;

/** Fenêtre de bureau : le bandeau « Plus tard » se pose sur le portrait. */
function desktopViewport() {
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        matches: query.includes("min-width: 721px"),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList,
  );
}

const widget = () => document.querySelector(".intro-widget");
const invite = () => document.querySelector(".intro-invite");

beforeEach(() => window.localStorage.clear());
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Intro video", () => {
  it("renders nothing without a video, and titles the placeholder clip « Vidéo de test »", () => {
    expect(video.isPlaceholder).toBe(true);
    render(
      <IntroVideoProvider video={null} canInvite>
        <Hero />
      </IntroVideoProvider>,
    );
    expect(screen.queryByRole("link", { name: /Ma présentation/ })).toBeNull();
    expect(document.querySelector(".intro-invite, .intro-widget, dialog")).toBeNull();
    cleanup();

    render(<Portfolio />);
    fireEvent.click(screen.getByRole("link", { name: /Ma présentation/ }));
    expect(screen.getByRole("dialog", { name: "Vidéo de test" })).toHaveAttribute("open");
  });

  it("keeps floating elements out of the prerendered HTML and links the hero to the MP4", () => {
    const html = renderToString(<Portfolio />);
    expect(html).not.toMatch(/intro-invite|intro-widget|<dialog/);
    const href = import.meta.env.BASE_URL + video.src;
    expect(html).toContain(`href="${href}"`);
    render(<Portfolio />);
    expect(screen.getByRole("link", { name: "Ma présentation (vidéo, 20 s)" })).toHaveAttribute(
      "href",
      href,
    );
  });

  it("offers the video on the portrait, then « Plus tard » leaves the widget focused and remembered", () => {
    desktopViewport();
    render(<Portfolio />);
    expect(widget()).toBeNull();
    fireEvent.click(within(invite() as HTMLElement).getByRole("button", { name: "Plus tard" }));
    expect(invite()).toBeNull();
    expect(widget()).not.toBeNull();
    expect(screen.getByRole("button", { name: "Regarder ma présentation (20 s)" })).toHaveFocus();
    expect(window.localStorage.getItem(storageKey)).toBe("later");
  });

  it("shows the widget straight away with « later », and nothing floating with « dismissed »", () => {
    desktopViewport();
    window.localStorage.setItem(storageKey, "later");
    render(<Portfolio />);
    expect(invite()).toBeNull();
    expect(widget()).not.toBeNull();
    cleanup();

    window.localStorage.setItem(storageKey, "dismissed");
    render(<Portfolio />);
    act(() => triggerIntersection(document.getElementById("accueil")!, false));
    expect(invite()).toBeNull();
    expect(widget()).toBeNull();
    expect(screen.getByRole("link", { name: /Ma présentation/ })).toBeInTheDocument();
  });

  it("survives blocked storage and still brings the widget when the hero leaves the screen", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });
    render(<Portfolio />);
    expect(invite()).toBeNull(); // phone width in jsdom: no banner, the hero button is enough
    act(() => triggerIntersection(document.getElementById("accueil")!, false));
    expect(widget()).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Masquer la vidéo" }));
    expect(widget()).toBeNull();
  });

  it("plays in a named modal player, then hands over to the widget, and retires it once watched", () => {
    desktopViewport();
    const showModal = vi.spyOn(HTMLDialogElement.prototype, "showModal");
    const play = vi.spyOn(HTMLMediaElement.prototype, "play");
    const pause = vi.spyOn(HTMLMediaElement.prototype, "pause");
    render(<Portfolio />);
    expect(document.querySelector("video")).toBeNull(); // nothing loads before the click

    fireEvent.click(screen.getByRole("button", { name: "Regarder ma présentation (20 s)" }));
    const dialog = document.querySelector("dialog")!;
    expect(showModal).toHaveBeenCalledTimes(1);
    expect(play).toHaveBeenCalledTimes(1);
    expect(dialog).toHaveAttribute("open");
    const media = dialog.querySelector("video")!;
    expect(media).toHaveAttribute("src", import.meta.env.BASE_URL + video.src);
    expect(media.hasAttribute("autoplay")).toBe(false);
    expect(media.querySelector("track")).toBeNull(); // captions: null, nothing invented
    expect(screen.getByRole("button", { name: "Fermer la vidéo" })).toHaveFocus();

    fireEvent.click(screen.getByRole("button", { name: "Fermer la vidéo" }));
    expect(pause).toHaveBeenCalled();
    expect(dialog).not.toHaveAttribute("open");
    const widgetPlay = screen.getByRole("button", { name: "Regarder ma présentation (20 s)" });
    expect(widgetPlay.closest(".intro-widget")).not.toBeNull();
    expect(widgetPlay).toHaveFocus(); // the banner that opened the player is gone
    expect(window.localStorage.getItem(storageKey)).toBe("later");

    fireEvent.click(widgetPlay);
    fireEvent(media, new Event("ended"));
    fireEvent.click(screen.getByRole("button", { name: "Fermer la vidéo" }));
    expect(widget()).toBeNull();
    expect(window.localStorage.getItem(storageKey)).toBe("dismissed");
  });

  it("points to files that exist in public/", () => {
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
