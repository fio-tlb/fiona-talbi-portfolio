import { ArrowDown, ArrowUpRight, Globe2, MapPin, TrendingUp } from "lucide-react";
import deskImage from "@/assets/creative-desk.jpg";
import { brands, impactStats, profile, sectionContent } from "@/data/portfolio";

export function Hero() {
  const content = sectionContent.hero;
  const highlight = impactStats.find((stat) => stat.id === "sales-growth");

  return (
    <section id="accueil" className="hero" aria-labelledby="hero-title">
      <div className="site-wrap">
        <div className="hero-grid">
          <div className="hero-intro">
            <p className="hero-eyebrow enter">
              <span className="eyebrow-dot" aria-hidden />
              {content.eyebrow}
            </p>
            <p className="hero-name enter enter-1">{profile.name}</p>
            <h1 id="hero-title" className="enter enter-2">
              {content.title}
              <br />
              <span>{content.accent}</span>
            </h1>
            <p className="hero-role enter enter-3">{profile.role}</p>
            <p className="hero-description enter enter-3">{content.description}</p>
            <div className="hero-actions enter enter-4">
              <a className="action action-primary" href="#projets">
                {content.primaryAction}
                <ArrowDown size={16} aria-hidden />
              </a>
              <a className="action action-secondary" href="#contact">
                {content.secondaryAction}
                <ArrowUpRight size={16} aria-hidden />
              </a>
            </div>
            <div className="hero-meta enter enter-5">
              <span>
                <MapPin size={13} aria-hidden />
                {profile.location}
              </span>
              <span>
                <Globe2 size={13} aria-hidden />
                {profile.internationalLabel}
              </span>
            </div>
          </div>
          <div className="hero-visual enter enter-3">
            <div className="visual-orbit" aria-hidden />
            <div className="hero-photo">
              <img
                src={deskImage}
                width={1440}
                height={1024}
                fetchPriority="high"
                alt="Un carnet, un ordinateur et une tasse sur un bureau baigné de lumière."
              />
              <p className="photo-caption">{content.visualCaption}</p>
            </div>
            <div className="location-pill">
              <MapPin size={13} aria-hidden />
              {profile.location}
            </div>
            {highlight && (
              <div className="floating-note">
                <span className="note-icon">
                  <TrendingUp size={22} aria-hidden />
                </span>
                <div>
                  <strong>{highlight.value}</strong>
                  <p>{highlight.label}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="impact-strip enter enter-5" aria-label={content.statsLabel}>
          {impactStats.map((stat) => (
            <div className="impact-stat" key={stat.id}>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
              <span>{stat.company}</span>
            </div>
          ))}
        </div>
        <div className="brand-strip enter enter-5">
          <p>{sectionContent.career.title}</p>
          <div className="brand-list" aria-label={sectionContent.career.label}>
            {brands.map((brand) => (
              <span key={brand.id}>{brand.displayName}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
