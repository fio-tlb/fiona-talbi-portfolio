import { useEffect, useRef } from "react";
import { useRouter } from "@tanstack/react-router";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useLocale, usePortfolio } from "@/hooks/use-portfolio";
import {
  homeRoute,
  locales,
  localizedPath,
  rememberLocale,
  sitePath,
  type Locale,
} from "@/i18n/locale";

const names: Record<Locale, string> = { fr: "Français", en: "English" };

/** Sélecteur natif accessible, avec de vrais liens vers les pages traduites. */
export function LanguageSwitcher({ activeSection }: { activeSection: string }) {
  const locale = useLocale();
  const { sectionContent } = usePortfolio();
  const content = sectionContent.navigation;
  const router = useRouter({ warn: false });
  const ref = useRef<HTMLDetailsElement>(null);
  const location = router?.state.location;
  const pathname = location?.pathname ?? homeRoute(locale);
  const neutral = sitePath(pathname).replace(/^\/en(?=\/|$)/, "") || "/";
  const isHome = neutral === "/";

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target) && ref.current)
        ref.current.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector("summary")?.focus();
      }
    };
    const focusOut = (event: FocusEvent) => {
      if (
        event.relatedTarget instanceof Node &&
        !ref.current?.contains(event.relatedTarget) &&
        ref.current
      )
        ref.current.open = false;
    };
    const details = ref.current;
    document.addEventListener("click", close);
    document.addEventListener("keydown", escape);
    details?.addEventListener("focusout", focusOut);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", escape);
      details?.removeEventListener("focusout", focusOut);
    };
  }, []);

  const href = (next: Locale) => {
    const search = new URLSearchParams(location?.searchStr ?? "");
    // Choix explicite dans l’URL : reste valable même si localStorage est inaccessible.
    search.set("lang", next);
    const hash = isHome ? activeSection : location?.hash?.replace(/^#/, "");
    return localizedPath(pathname, next) + "?" + search.toString() + (hash ? "#" + hash : "");
  };

  return (
    <details className="language-switcher" ref={ref}>
      <summary
        aria-label={content.languageLabel + ": " + names[locale]}
        title={content.languageLabel}
      >
        <Globe2 className="language-globe" size={16} strokeWidth={1.75} aria-hidden />
        <span className="language-code">{locale.toUpperCase()}</span>
        <ChevronDown className="language-chevron" size={14} aria-hidden />
      </summary>
      <div className="language-options">
        <p className="language-options-title">{content.languageTitle}</p>
        <nav aria-label={content.languageLabel}>
          {locales.map((next) => (
            <a
              key={next}
              href={href(next)}
              hrefLang={next}
              aria-current={next === locale ? "true" : undefined}
              onClick={() => {
                rememberLocale(next);
                if (ref.current) ref.current.open = false;
              }}
            >
              <span className="language-option-code" aria-hidden>
                {next.toUpperCase()}
              </span>
              <span className="language-option-name" lang={next}>
                {names[next]}
              </span>
              {next === locale && (
                <span className="language-option-check" aria-hidden>
                  <Check size={15} strokeWidth={2.25} />
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>
    </details>
  );
}
