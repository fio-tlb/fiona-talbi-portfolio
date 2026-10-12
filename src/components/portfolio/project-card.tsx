import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { brands, sectionContent, type Project } from "@/data/portfolio";
import { Logo } from "./logo";
import { ProjectPicture } from "./project-picture";

// Cartes sur 2 colonnes dès 900 px (≈ 600 px de large au plus), pleine largeur en dessous.
const coverSizes = "(min-width: 900px) min(600px, 50vw), 100vw";

/**
 * Carte-lien d'un projet sur l'accueil : couverture, entreprise, catégorie, titre, contexte et
 * deux chiffres. Un seul lien (le titre), étendu à toute la carte ; il mène à /projets/<id>.
 * L'article garde l'id du projet : les chiffres clés du hero y mènent (#id).
 */
export function ProjectCard({ project }: { project: Project }) {
  const content = sectionContent.projects;
  const brand = brands[project.brandId];
  const cover = project.gallery[0];
  const titleId = project.id + "-titre";

  return (
    <article id={project.id} className="project-card" aria-labelledby={titleId} data-reveal>
      <div className="project-cover">
        {cover ? (
          <ProjectPicture image={cover} alt="" sizes={coverSizes} />
        ) : (
          <div className="project-cover-fallback">
            <Logo logo={brand.logo} alt="" />
          </div>
        )}
      </div>
      <div className="project-body">
        <div className="project-meta">
          <Logo logo={brand.logo} alt={brand.name} />
          <p className="chip">{project.category}</p>
        </div>
        <h3 className="project-title" id={titleId}>
          <Link
            to="/projets/$projectId"
            params={{ projectId: project.id }}
            className="project-card-link"
          >
            {project.title}
          </Link>
        </h3>
        <p className="project-context">{project.context}</p>
        <ul className="project-stats" aria-label={content.resultsLabel}>
          {project.metrics.map((metric) => (
            <li key={metric.id}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </li>
          ))}
        </ul>
        <p className="project-cta" aria-hidden>
          {content.openLabel}
          <span className="project-cta-arrow">
            <ArrowRight size={18} />
          </span>
        </p>
      </div>
    </article>
  );
}
