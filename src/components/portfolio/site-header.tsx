import { useEffect, useRef, type RefObject } from "react";
import { Mail, Menu, X } from "lucide-react";
import {
  navigation,
  profile,
  recommendations,
  sectionContent,
  type NavigationItem,
} from "@/data/portfolio";
import { HomeLink } from "./home-link";

// Même seuil que le @media (max-width: 767px) de styles.css : liens en ligne dès 768 px.
const INLINE_NAV_QUERY = "(min-width: 768px)";

type SiteHeaderProps = {
  activeSection: string;
  progressRef: RefObject<HTMLDivElement | null>;
};

export function SiteHeader({ activeSection, progressRef }: SiteHeaderProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const content = sectionContent.navigation;
  const items = navigation.filter(
    (item) => item.id !== "recommandations" || recommendations.length > 0,
  );
  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  useEffect(() => {
    const desktop = window.matchMedia(INLINE_NAV_QUERY);
    const onDesktop = () => {
      if (desktop.matches) closeMenu();
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuRef.current?.open) {
        closeMenu();
        menuRef.current.querySelector("summary")?.focus();
      }
    };
    // Taps outside land on the scrim (body::after). Closing on click (not pointerdown) keeps the
    // scrim in place until the click is dispatched, so the element below is never activated.
    const onOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) closeMenu();
    };
    // Close when keyboard focus leaves the open panel, so the focused element is never hidden under it.
    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget;
      if (menuRef.current?.open && next instanceof Node && !menuRef.current.contains(next)) {
        closeMenu();
      }
    };
    const menu = menuRef.current;
    document.addEventListener("keydown", onEscape);
    document.addEventListener("click", onOutsideClick);
    menu?.addEventListener("focusout", onFocusOut);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("click", onOutsideClick);
      menu?.removeEventListener("focusout", onFocusOut);
      desktop.removeEventListener("change", onDesktop);
    };
  }, []);

  // Liens vers les sections de l'accueil, valables depuis toutes les pages (home-link.tsx).
  const renderLink = (item: NavigationItem) => (
    <HomeLink
      key={item.id}
      section={item.id}
      className={activeSection === item.id ? "nav-link is-active" : "nav-link"}
      aria-current={activeSection === item.id ? "location" : undefined}
      onClick={closeMenu}
    >
      {item.label}
    </HomeLink>
  );

  return (
    <header className="site-header">
      <div className="site-wrap header-inner">
        <HomeLink
          section="accueil"
          className="header-brand"
          aria-label={profile.name + ", accueil"}
          onClick={closeMenu}
        >
          {profile.name}
        </HomeLink>
        <nav className="desktop-nav" aria-label={content.mainLabel}>
          {items.map(renderLink)}
        </nav>
        <div className="header-end">
          <HomeLink
            section="contact"
            className="header-contact"
            aria-current={activeSection === "contact" ? "location" : undefined}
            onClick={closeMenu}
          >
            <span>{content.contactLabel}</span>
            <Mail size={16} aria-hidden />
          </HomeLink>
          <details className="mobile-menu" ref={menuRef}>
            <summary aria-label={content.menuLabel}>
              <Menu className="menu-open-icon" size={20} aria-hidden />
              <X className="menu-close-icon" size={20} aria-hidden />
            </summary>
            {/* Un seul niveau : les 4 sections. Contact reste dans la barre, à côté du bouton. */}
            <nav className="mobile-nav" aria-label={content.mainLabel}>
              {items.map(renderLink)}
            </nav>
          </details>
        </div>
      </div>
      <div className="scroll-track" aria-hidden>
        <div className="scroll-progress" ref={progressRef} />
      </div>
    </header>
  );
}
