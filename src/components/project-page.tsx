import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Mail } from "lucide-react";
import {
  brands,
  experiences,
  profile,
  projects,
  sectionContent,
  type Project,
} from "@/data/portfolio";
import { usePortfolioNavigation } from "@/hooks/use-portfolio-navigation";
import { useReveal } from "@/hooks/use-reveal";
import { HomeLink } from "./portfolio/home-link";
import { Logo } from "./portfolio/logo";
import { GalleryLightbox, PhotoLink, useLightbox } from "./portfolio/project-gallery";
import { ProjectPicture } from "./portfolio/project-picture";
import { SiteShell } from "./site-shell";

const noSections: readonly string[] = [];
const text = sectionContent.projectPage;

// Largeurs affichées des photos (attribut sizes) : couverture sur toute la largeur du contenu,
// galerie sur 2 colonnes dès 640 px, vignettes de la navigation entre projets.
const coverSizes = "(min-width: 1280px) 1200px, calc(100vw - 32px)";
const gallerySizes = "(min-width: 1280px) 600px, (min-width: 640px) 50vw, 100vw";
const wideGallerySizes = coverSizes;
const pagerSizes = "160px";

/** Projets voisins dans l'ordre de l'accueil (le premier et le dernier se suivent). */
function neighbours(project: Project) {
  const index = projects.findIndex((item) => item.id === project.id);
  const count = projects.length;
  return {
    previous: projects[(index - 1 + count) % count]!,
    next: projects[(index + 1) % count]!,
  };
}

/**
 * Page d'un projet (/projets/<id>) : en-tête et résultats, couverture, contexte, mission,
 * actions, récit détaillé (`story`, s'il est renseigné), galerie avec agrandissement,
 * projets voisins et contact. Mêmes en-tête, pied de page et calque vidéo que l'accueil.
 */
export function ProjectPage({ project }: { project: Project }) {
  const mainRef = useRef<HTMLElement>(null);
  const { progressRef } = usePortfolioNavigation(noSections);
  useReveal(mainRef);
  const lightbox = useLightbox(project.gallery.length);

  const brand = brands[project.brandId];
  const experience = experiences.find((item) => item.brandId === project.brandId);
  const [cover, ...photos] = project.gallery;
  const { previous, next } = neighbours(project);
  const facts: { label: string; value: string | null }[] = [
    { label: text.companyLabel, value: brand.name },
    { label: text.roleLabel, value: experience?.role ?? null },
    { label: text.locationLabel, value: experience?.location ?? null },
  ];

  return (
    <SiteShell
      activeSection="projets"
      progressRef={progressRef}
      canInvite={false}
      mainRef={mainRef}
      mainClassName="project-page"
      topId="contenu"
    >
      <article aria-labelledby="projet-titre">
        <header className="site-wrap project-hero">
          <HomeLink section="projets" className="project-back">
            <ArrowLeft size={16} aria-hidden />
            {sectionContent.projects.backLabel}
          </HomeLink>
          <div className="project-hero-grid">
            <div className="project-hero-text">
              <div className="project-hero-meta">
                <span className="project-logo-tile">
                  <Logo logo={brand.logo} alt={brand.name} />
                </span>
                <p className="chip">{project.category}</p>
              </div>
              <h1 id="projet-titre" className="project-hero-title">
                {project.title}
              </h1>
              <p className="project-hero-lead">{project.context}</p>
            </div>
            <section className="project-results" aria-labelledby="projet-resultats">
              <h2 id="projet-resultats" className="project-label">
                {text.resultsTitle}
              </h2>
              <ul className="project-kpis" role="list">
                {project.metrics.map((metric, index) => (
                  <li
                    key={metric.id}
                    className={index === 0 ? "project-kpi is-featured" : "project-kpi"}
                  >
                    <strong className="project-kpi-value">{metric.value}</strong>
                    <span className="project-kpi-label">{metric.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </header>

        {cover && (
          <figure className="site-wrap project-cover-figure">
            <PhotoLink
              image={cover}
              index={0}
              lightbox={lightbox}
              sizes={coverSizes}
              loading="eager"
              className="project-cover-link"
            />
            <figcaption className="photo-caption">{cover.caption}</figcaption>
          </figure>
        )}

        <div className="site-wrap project-panels">
          <section
            className="project-panel is-context"
            aria-labelledby="projet-contexte"
            data-reveal
          >
            <h2 id="projet-contexte" className="project-panel-title">
              {text.contextTitle}
            </h2>
            <dl className="project-facts">
              {facts.map((fact) =>
                fact.value ? (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ) : null,
              )}
            </dl>
            {experience && <p className="project-panel-text">{experience.description}</p>}
          </section>
          <section
            className="project-panel is-mission"
            aria-labelledby="projet-mission"
            data-reveal
          >
            <h2 id="projet-mission" className="project-panel-title">
              {text.missionTitle}
            </h2>
            <p className="project-mission">{project.mission}</p>
          </section>
          <section
            className="project-panel is-details"
            aria-labelledby="projet-actions"
            data-reveal
          >
            <h2 id="projet-actions" className="project-panel-title">
              {text.detailsTitle}
            </h2>
            <ul className="project-checklist" role="list">
              {project.details.map((detail) => (
                <li key={detail}>
                  <span className="project-check" aria-hidden>
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  {detail}
                </li>
              ))}
            </ul>
          </section>
          {project.story.map((part, index) => (
            <section
              key={part.heading}
              className="project-panel is-story"
              aria-labelledby={"projet-recit-" + index}
              data-reveal
            >
              <h2 id={"projet-recit-" + index} className="project-panel-title">
                {part.heading}
              </h2>
              {part.paragraphs.map((paragraph) => (
                <p key={paragraph} className="project-panel-text">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        {photos.length > 0 && (
          <section className="site-wrap project-gallery" aria-labelledby="projet-galerie">
            <h2 id="projet-galerie" className="project-section-title" data-reveal>
              {text.galleryTitle}
            </h2>
            <ul className="gallery-grid" role="list">
              {photos.map((photo, index) => {
                const wide = photos.length % 2 === 1 && index === 0;
                return (
                  <li key={photo.src} className={wide ? "is-wide" : undefined} data-reveal>
                    <figure className="gallery-item">
                      <PhotoLink
                        image={photo}
                        index={index + 1}
                        lightbox={lightbox}
                        sizes={wide ? wideGallerySizes : gallerySizes}
                      />
                      <figcaption className="photo-caption">{photo.caption}</figcaption>
                    </figure>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <nav className="site-wrap project-pager" aria-label={text.pagerLabel}>
          {[
            { project: previous, label: text.previousLabel, rel: "prev", isNext: false },
            { project: next, label: text.nextLabel, rel: "next", isNext: true },
          ].map((item) => {
            const thumbnail = item.project.gallery[0];
            return (
              <Link
                key={item.rel}
                to="/projets/$projectId"
                params={{ projectId: item.project.id }}
                rel={item.rel}
                className={item.isNext ? "pager-card is-next" : "pager-card"}
              >
                {thumbnail && (
                  <span className="pager-thumb">
                    <ProjectPicture image={thumbnail} alt="" sizes={pagerSizes} />
                  </span>
                )}
                <span className="pager-text">
                  <span className="pager-label">
                    {!item.isNext && <ArrowLeft size={14} aria-hidden />}
                    {item.label}
                    {item.isNext && <ArrowRight size={14} aria-hidden />}
                  </span>
                  <span className="pager-title">{item.project.title}</span>
                  <span className="pager-brand">{item.project.brand}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        <section className="site-wrap project-contact" aria-labelledby="projet-contact" data-reveal>
          <div className="project-contact-card">
            <div>
              <h2 id="projet-contact" className="project-contact-title">
                {text.contactTitle}
              </h2>
              <p className="project-contact-text">{text.contactText}</p>
            </div>
            <div className="project-contact-actions">
              <a className="action action-light" href={"mailto:" + profile.email}>
                <Mail size={16} aria-hidden />
                {text.contactEmailLabel}
              </a>
              <a
                className="action action-outline-light"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {text.contactLinkedinLabel}
                <ArrowUpRight size={16} aria-hidden />
                <span className="sr-only">{sectionContent.newTabLabel}</span>
              </a>
            </div>
          </div>
        </section>
      </article>
      <GalleryLightbox images={project.gallery} lightbox={lightbox} />
    </SiteShell>
  );
}
