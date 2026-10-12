import { ArrowLeft } from "lucide-react";
import { brands, sectionContent, type Project } from "@/data/portfolio";
import { usePortfolioNavigation } from "@/hooks/use-portfolio-navigation";
import { HomeLink } from "./portfolio/home-link";
import { Logo } from "./portfolio/logo";
import { SiteHeader } from "./portfolio/site-header";

const noSections: readonly string[] = [];

/**
 * Page d'un projet (/projets/<id>) — version minimale : en-tête du projet, chiffres et action.
 * Le détail (récit, galerie, navigation entre projets) s'ajoute ici, à partir de `project`.
 */
export function ProjectPage({ project }: { project: Project }) {
  const content = sectionContent.projects;
  const brand = brands[project.brandId];
  const { progressRef } = usePortfolioNavigation(noSections);

  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <SiteHeader activeSection="" progressRef={progressRef} />
      <main id="contenu" className="project-page site-wrap" tabIndex={-1}>
        <HomeLink section="projets" className="project-back">
          <ArrowLeft size={16} aria-hidden />
          {content.backLabel}
        </HomeLink>
        <div className="project-meta">
          <Logo logo={brand.logo} alt={brand.name} />
          <p className="chip">{project.category}</p>
        </div>
        <h1 className="project-page-title">{project.title}</h1>
        <p className="project-page-lead">{project.context}</p>
        <ul className="project-stats" aria-label={content.resultsLabel}>
          {project.metrics.map((metric) => (
            <li key={metric.id}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </li>
          ))}
        </ul>
        <p className="project-page-text">{project.action}</p>
      </main>
    </>
  );
}
