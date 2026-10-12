import { useEffect, useRef, type RefObject } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, profile } from "@/data/portfolio";

type SiteHeaderProps = {
  activeSection: string;
  progressRef: RefObject<HTMLDivElement | null>;
};

export function SiteHeader({ activeSection, progressRef }: SiteHeaderProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  useEffect(() => {
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
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("pointerdown", onOutsideClick);
    };
  }, []);

  const links = navigation.map((item) => (
    <a
      key={item.id}
      href={"#" + item.id}
      className={activeSection === item.id ? "nav-link is-active" : "nav-link"}
      aria-current={activeSection === item.id ? "location" : undefined}
      onClick={closeMenu}
    >
      {item.label}
    </a>
  ));

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
          {links}
        </nav>
        <a
          className="header-contact"
          href="#contact"
          aria-label={"Contacter " + profile.name}
          aria-current={activeSection === "contact" ? "location" : undefined}
          onClick={closeMenu}
        >
          <span>Contact</span>
          <ArrowUpRight size={17} aria-hidden />
        </a>
        <details className="mobile-menu" ref={menuRef}>
          <summary aria-label="Menu de navigation">
            <Menu className="menu-open-icon" size={21} aria-hidden />
            <X className="menu-close-icon" size={21} aria-hidden />
          </summary>
          <nav className="mobile-nav" aria-label="Navigation mobile">
            {links}
            <a
              className={activeSection === "contact" ? "nav-link is-active" : "nav-link"}
              aria-current={activeSection === "contact" ? "location" : undefined}
              href="#contact"
              onClick={closeMenu}
            >
              Contact <ArrowUpRight size={16} aria-hidden />
            </a>
          </nav>
        </details>
      </div>
      <div className="scroll-track" aria-hidden>
        <div className="scroll-progress" ref={progressRef} />
      </div>
    </header>
  );
}
