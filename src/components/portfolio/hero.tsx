import { ArrowDown, ArrowUpRight } from "lucide-react";
import { impactStats, profile, projects, sectionContent } from "@/data/portfolio";
import { publicPath } from "@/lib/public-path";
import { HeroVideoLink, IntroInvite } from "./intro-video";

const projectIds = new Set(projects.map((project) => project.id));

/** « images/portrait.jpg » → « images/portrait-600.avif » (la plus grande largeur garde le nom de base). */
function variant(src: string, width: number, largest: number, extension: "jpg" | "avif") {
  const base = src.replace(/\.[a-z0-9]+$/i, "");
  return publicPath(
    width === largest ? base + "." + extension : base + "-" + width + "." + extension,
  );
}

// Affiché à 100 % de la colonne sur mobile, puis à hauteur bornée par la fenêtre (styles.css, .hero-portrait).
const portraitSizes =
  "(max-width: 720px) min(100vw - 40px, 22rem), (max-width: 980px) 15rem, 23rem";

export function Hero() {
  const content = sectionContent.hero;
  const portrait = profile.portrait;
  const largest = portrait ? Math.max(...portrait.widths) : 0;
  const srcSet = (extension: "jpg" | "avif") =>
    portrait?.widths
      .map((width) => variant(portrait.src, width, largest, extension) + " " + width + "w")
      .join(", ");

  return (
    <section id="accueil" className="hero" aria-labelledby="hero-title">
      <div className="site-wrap hero-grid">
        <div className="hero-intro">
          <h1 id="hero-title" className="enter-still">
            {profile.name}
          </h1>
          <p className="hero-role enter enter-1">{profile.role}</p>
          <p className="hero-lead enter enter-2">{content.lead}</p>
        </div>
        <div className="hero-facts enter enter-3">
          <p className="hero-credentials">{content.credentials}</p>
          <p className="hero-meta">
            <span>{profile.places}</span>
            <a
              className="hero-link"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.linkedinLabel}
              <ArrowUpRight size={14} aria-hidden />
              <span className="sr-only">{sectionContent.newTabLabel}</span>
            </a>
          </p>
        </div>
        <div className="hero-actions enter enter-3">
          <a className="action action-primary" href="#projets">
            {content.primaryAction}
            <ArrowDown size={16} aria-hidden />
          </a>
          <HeroVideoLink />
        </div>
        <ul className="hero-kpis enter enter-4" aria-label={content.statsLabel}>
          {impactStats.map((stat) => (
            <li key={stat.id}>
              <a
                className={projectIds.has(stat.targetId) ? "hero-kpi" : "hero-kpi is-tenure"}
                href={"#" + stat.targetId}
              >
                <strong className="hero-kpi-value">{stat.value}</strong>
                <span className="hero-kpi-label">{stat.label}</span>
                <span className="hero-kpi-source">
                  {stat.source}
                  <ArrowDown size={12} aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ul>
        {portrait && (
          <div className="hero-portrait enter-still enter-1">
            <picture>
              <source type="image/avif" srcSet={srcSet("avif")} sizes={portraitSizes} />
              <img
                src={publicPath(portrait.src)}
                srcSet={srcSet("jpg")}
                sizes={portraitSizes}
                width={portrait.width}
                height={portrait.height}
                alt={portrait.alt}
                decoding="async"
              />
            </picture>
            <IntroInvite />
          </div>
        )}
      </div>
    </section>
  );
}
