import { useEffect, useRef, type RefObject } from "react";
import { Mail, Menu, X } from "lucide-react";
import {
  navigation,
  profile,
  recommendations,
  sectionContent,
  type NavigationItem,
} from "@/data/portfolio";

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
    const desktop = window.matchMedia("(min-width: 981px)");
    const onDesktop = () => {
      if (desktop.matches) closeMenu();
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuRef.current?.open) {
        closeMenu();
        menuRef.current.querySelector("summary")?.focus();
      }
    };
    const onOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) closeMenu();
    };
    document.addEventListener("keydown", onEscape);
    document.addEventListener("pointerdown", onOutsideClick);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("pointerdown", onOutsideClick);
      desktop.removeEventListener("change", onDesktop);
    };
  }, []);

  const renderLink = (item: NavigationItem) => (
    <a
      key={item.id}
      href={"#" + item.id}
      className={activeSection === item.id ? "nav-link is-active" : "nav-link"}
      aria-current={activeSection === item.id ? "location" : undefined}
      onClick={closeMenu}
    >
      {item.label}
    </a>
  );

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          href="#accueil"
          className="header-brand"
          aria-label={profile.name + ", accueil"}
          onClick={closeMenu}
        >
          <span className="logo-mark" aria-hidden>
            {profile.initials.toLowerCase()}.
          </span>
          <span>
            {profile.name}
            <span className="brand-dot">.</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {items.map(renderLink)}
        </nav>
        <a
          className="header-contact"
          href="#contact"
          aria-label={"Contacter " + profile.name}
          aria-current={activeSection === "contact" ? "location" : undefined}
          onClick={closeMenu}
        >
          <span>{content.contactLabel}</span>
          <Mail size={16} aria-hidden />
        </a>
        <details className="mobile-menu" ref={menuRef}>
          <summary aria-label={content.menuLabel}>
            <Menu className="menu-open-icon" size={20} aria-hidden />
            <X className="menu-close-icon" size={20} aria-hidden />
          </summary>
          <nav className="mobile-nav" aria-label="Navigation mobile">
            <div className="mobile-nav-primary">
              {items.filter((item) => item.tier === "primary").map(renderLink)}
              <a
                className={activeSection === "contact" ? "nav-link is-active" : "nav-link"}
                aria-current={activeSection === "contact" ? "location" : undefined}
                href="#contact"
                onClick={closeMenu}
              >
                {content.contactLabel}
                <Mail size={16} aria-hidden />
              </a>
            </div>
            <div className="mobile-nav-secondary">
              <p className="mobile-nav-label">{content.secondaryLabel}</p>
              {items.filter((item) => item.tier === "secondary").map(renderLink)}
            </div>
          </nav>
        </details>
      </div>
      <div className="scroll-track" aria-hidden>
        <div className="scroll-progress" ref={progressRef} />
      </div>
    </header>
  );
}
