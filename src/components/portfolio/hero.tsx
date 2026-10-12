import { ArrowDown, Globe2, Mail, MapPin } from "lucide-react";
import deskImage from "@/assets/creative-desk.jpg";
import { brands, impactStats, profile, sectionContent } from "@/data/portfolio";

export function Hero() {
  const content = sectionContent.hero;

  return (
    <section id="accueil" className="hero" aria-labelledby="hero-title">
      <div className="site-wrap">
        <div className="hero-grid">
          <div className="hero-intro">
            <p className="hero-name enter">{profile.name}</p>
            <h1 id="hero-title" className="enter enter-1">
              {content.title}
              <br />
              <span>{content.accent}</span>
            </h1>
            <p className="hero-role enter enter-2">{profile.role}</p>
            <p className="hero-description enter enter-2">{content.description}</p>
            <div className="hero-actions enter enter-3">
              <a className="action action-primary" href="#projets">
                {content.primaryAction}
                <ArrowDown size={16} aria-hidden />
              </a>
              <a className="action action-secondary" href="#contact">
                {content.secondaryAction}
                <Mail size={16} aria-hidden />
              </a>
            </div>
            <div className="hero-meta enter enter-4">
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
          <div className="impact-strip enter enter-3" aria-label={content.statsLabel}>
            {impactStats.map((stat) => (
              <div className="impact-stat" key={stat.id}>
                <strong>{stat.value}</strong>
                <p>{stat.label}</p>
                <span>{stat.company}</span>
              </div>
            ))}
          </div>
          <div className="hero-visual enter enter-2">
            <div className="visual-orbit" aria-hidden />
            <figure className="hero-photo">
              <div className="hero-photo-frame">
                <img
                  src={deskImage}
                  width={1440}
                  height={1024}
                  fetchPriority="high"
                  alt="Un carnet, un ordinateur et une tasse sur un bureau baigné de lumière."
                />
              </div>
              <figcaption className="photo-caption">{content.visualCaption}</figcaption>
            </figure>
          </div>
        </div>
        <div className="brand-strip enter enter-4">
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
