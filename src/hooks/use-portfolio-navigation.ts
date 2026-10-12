import { useEffect, useRef, useState, type RefObject } from "react";

type PortfolioNavigation = {
  activeSection: string;
  progressRef: RefObject<HTMLDivElement | null>;
};

export function usePortfolioNavigation(sectionIds: readonly string[]): PortfolioNavigation {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const activeSectionRef = useRef(activeSection);
  const progressRef = useRef<HTMLDivElement>(null);
  // Keep the effect stable even when the caller maps its navigation items during rendering.
  const sectionIdsKey = sectionIds.join("\u0000");

  useEffect(() => {
    const ids = sectionIdsKey ? sectionIdsKey.split("\u0000") : [];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const header = document.querySelector<HTMLElement>(".site-header");
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = Math.max(0, window.scrollY);
      const progress = distance > 0 ? Math.min(1, scrollPosition / distance) : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      const sectionOffset = header ? Math.max(0, header.getBoundingClientRect().bottom) + 28 : 140;
      let currentSection = ids[0] ?? "";

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= sectionOffset) {
          currentSection = section.id;
        }
      }
      // The final section may never reach the header when the document ends. Keep the section
      // the visitor asked for (URL hash) when it is visible in the upper half of the screen.
      if (distance > 0 && distance - scrollPosition <= 2) {
        const requested = sections.find((section) => "#" + section.id === window.location.hash);
        const top = requested?.getBoundingClientRect().top ?? -1;
        currentSection =
          requested && top >= 0 && top < window.innerHeight / 2
            ? requested.id
            : (sections.at(-1)?.id ?? currentSection);
      }

      if (currentSection !== activeSectionRef.current) {
        activeSectionRef.current = currentSection;
        setActiveSection(currentSection);
      }
    };

    const scheduleUpdate = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);

      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [sectionIdsKey]);

  return { activeSection, progressRef };
}
