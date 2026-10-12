import { ArrowDown, Download, GraduationCap, MapPin } from "lucide-react";
import { brands, experiences, projects } from "@/data/portfolio";
import { usePortfolio } from "@/hooks/use-portfolio";
import { publicPath } from "@/lib/public-path";
import { Logo } from "./logo";
import { ResponsiveImage } from "./responsive-image";

const projectIds = new Set(projects.map((project) => project.id));
// Une entrée par entreprise, dans l'ordre du parcours.
const heroBrands = [...new Set(experiences.map((experience) => experience.brandId))].map(
  (id) => brands[id],
);

// Toute la largeur de la grille sur mobile, puis à hauteur bornée par la fenêtre (styles.css, .hero-portrait).
const portraitSizes = "(max-width: 720px) calc(100vw - 32px), (max-width: 980px) 19rem, 24rem";

export function Hero() {
  const { impactStats, profile, sectionContent, seo } = usePortfolio();
  const content = sectionContent.hero;
  const portrait = profile.portrait;

  return (
    <section id="accueil" className="hero" aria-labelledby="hero-title">
      <div className="site-wrap hero-grid">
        <div className="hero-intro">
          <p className="chip chip-outline hero-chip enter enter-1">
            {profile.role + " · " + seo.addressLocality}
          </p>
          <h1 id="hero-title" className="enter-still">
            {profile.name}
          </h1>
          <p className="hero-lead enter enter-2">{content.lead}</p>
        </div>
        <p className="hero-facts enter enter-3">
          <GraduationCap size={18} aria-hidden />
          {content.credentials}
        </p>
        <div className="hero-actions enter enter-3">
          <a className="action action-primary" href="#projets">
            {content.primaryAction}
            <ArrowDown size={16} aria-hidden />
          </a>
          {profile.cvPath && (
            <a
              className="action action-secondary"
              href={publicPath(profile.cvPath)}
              download={profile.cvPath.split("/").pop()}
            >
              <Download size={16} aria-hidden />
              <span>
                <span className="action-label-long">{content.cvActionPrefix}</span>
                {content.cvActionLabel}
              </span>
            </a>
          )}
        </div>
        <div className="hero-brands enter enter-4">
          <p className="hero-brands-label" id="hero-brands-label">
            {content.brandsLabel}
          </p>
          <ul className="hero-brands-list" role="list" aria-labelledby="hero-brands-label">
            {heroBrands.map((brand) => (
              <li key={brand.id}>
                <Logo logo={brand.logo} alt={brand.name} />
              </li>
            ))}
          </ul>
        </div>
        <ul className="hero-kpis enter enter-4" aria-label={content.statsLabel}>
          {impactStats.map((stat, index) => {
            const classes = ["hero-kpi"];
            if (index === 0) classes.push("is-featured");
            if (!projectIds.has(stat.targetId)) classes.push("is-tenure");
            return (
              <li key={stat.id}>
                <a className={classes.join(" ")} href={"#" + stat.targetId}>
                  <strong className="hero-kpi-value">{stat.value}</strong>
                  <span className="hero-kpi-label">{stat.label}</span>
                  <span className="hero-kpi-source">
                    <span className="hero-kpi-source-text">{stat.source}</span>
                    <span className="hero-kpi-arrow" aria-hidden>
                      <ArrowDown size={14} />
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        {portrait && (
          <div className="hero-visual enter-still enter-1">
            <div className="hero-portrait">
              <ResponsiveImage
                image={portrait}
                alt={portrait.alt}
                sizes={portraitSizes}
                fetchPriority="high"
              />
            </div>
            <p className="hero-places">
              <span className="hero-places-icon" aria-hidden>
                <MapPin size={16} />
              </span>
              <span className="hero-places-text">{profile.places}</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
