import { useEffect, type RefObject } from "react";

export function useReveal(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;

    if (!root || typeof window.IntersectionObserver !== "function") {
      return;
    }

    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!elements.length || elements.some((element) => typeof element.animate !== "function")) {
      return;
    }

    const pending = new Set(elements);
    const animations = new Set<Animation>();
    const motionPreference =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    let observer: IntersectionObserver | null = null;
    let disposed = false;

    const cancelAnimations = () => {
      for (const animation of animations) {
        animation.cancel();
      }
      animations.clear();
    };

    const observe = () => {
      if (disposed || motionPreference?.matches || !pending.size) {
        return;
      }

      try {
        observer = new IntersectionObserver(
          (entries) => {
            if (disposed) {
              return;
            }

            for (const entry of entries) {
              const element = entry.target as HTMLElement;

              if (!entry.isIntersecting || !pending.has(element)) {
                continue;
              }

              observer?.unobserve(element);
              pending.delete(element);

              if (motionPreference?.matches) {
                continue;
              }

              const requestedDelay = Number(element.dataset["delay"] ?? 0);
              const delay = Number.isFinite(requestedDelay)
                ? Math.min(600, Math.max(0, requestedDelay))
                : 0;

              try {
                // Visibility belongs to the temporary animation, never to the base styles.
                const animation = element.animate(
                  [
                    { opacity: 0, transform: "translateY(18px)" },
                    { opacity: 1, transform: "translateY(0)" },
                  ],
                  {
                    duration: 650,
                    delay,
                    easing: "cubic-bezier(0.2, 0.65, 0.3, 1)",
                    fill: "both",
                  },
                );

                animations.add(animation);
                void animation.finished.then(
                  () => {
                    animation.cancel();
                    animations.delete(animation);
                  },
                  () => {
                    animations.delete(animation);
                  },
                );
              } catch {
                // Unsupported animation details must leave the original content visible.
                cancelAnimations();
              }
            }
          },
          { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
        );

        for (const element of pending) {
          observer.observe(element);
        }
      } catch {
        observer?.disconnect();
        observer = null;
        cancelAnimations();
      }
    };

    const onMotionPreferenceChange = () => {
      observer?.disconnect();
      observer = null;
      cancelAnimations();
      observe();
    };

    observe();

    if (motionPreference) {
      if (typeof motionPreference.addEventListener === "function") {
        motionPreference.addEventListener("change", onMotionPreferenceChange);
      } else {
        motionPreference.addListener(onMotionPreferenceChange);
      }
    }

    return () => {
      disposed = true;
      observer?.disconnect();
      cancelAnimations();

      if (motionPreference) {
        if (typeof motionPreference.removeEventListener === "function") {
          motionPreference.removeEventListener("change", onMotionPreferenceChange);
        } else {
          motionPreference.removeListener(onMotionPreferenceChange);
        }
      }
    };
  }, [rootRef]);
}
