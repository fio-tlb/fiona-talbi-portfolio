import { useEffect, type ReactNode, type RefObject } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { introVideo, profile, sectionContent } from "@/data/portfolio";
import { IntroVideoProvider } from "./portfolio/intro-video";
import { SiteHeader } from "./portfolio/site-header";

type SiteShellProps = {
  /** Section mise en valeur dans le menu (« projets » sur une page projet). */
  activeSection: string;
  progressRef: RefObject<HTMLDivElement | null>;
  /** Faux sans portrait : le bandeau vidéo n'a pas de visuel où se poser (accueil seulement). */
  canInvite: boolean;
  mainRef?: RefObject<HTMLElement | null>;
  mainClassName?: string;
  /** Cible du lien « Haut de page » du pied de page. */
  topId: string;
  children: ReactNode;
};

/**
 * Cadre commun à toutes les pages (accueil et pages projet) : lien d'évitement, en-tête,
 * contenu, pied de page et calque vidéo (pastille, lecteur). Ajouter ici ce qui doit
 * apparaître partout, comme le bouton flottant de la vidéo.
 */
export function SiteShell({
  activeSection,
  progressRef,
  canInvite,
  mainRef,
  mainClassName,
  topId,
  children,
}: SiteShellProps) {
  const footer = sectionContent.footer;

  useEffect(() => {
    // Smooth anchor scrolling only after a first gesture: a shared link to #projets jumps
    // straight to its target on load instead of animating down the whole page.
    const root = document.documentElement;
    const enable = () => root.classList.add("smooth-scroll");
    const options = { once: true, capture: true } as const;
    window.addEventListener("pointerdown", enable, options);
    window.addEventListener("keydown", enable, options);
    return () => {
      window.removeEventListener("pointerdown", enable, options);
      window.removeEventListener("keydown", enable, options);
    };
  }, []);

  return (
    <IntroVideoProvider video={introVideo} canInvite={canInvite}>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <SiteHeader activeSection={activeSection} progressRef={progressRef} />
      <main id="contenu" ref={mainRef} className={mainClassName} tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="site-wrap footer-inner">
          <p className="footer-signature">{footer.copyright}</p>
          <ul className="footer-links" role="list">
            <li>
              <a href={"mailto:" + profile.email}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                {footer.linkedinLabel}
                <ArrowUpRight size={14} aria-hidden />
                <span className="sr-only">{sectionContent.newTabLabel}</span>
              </a>
            </li>
            <li>
              <a className="footer-top" href={"#" + topId}>
                {footer.topLabel}
                <ArrowUp size={14} aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </IntroVideoProvider>
  );
}
