import { Plus } from "lucide-react";
import { projects, sectionContent } from "@/data/portfolio";

type Project = (typeof projects)[number];

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className={"project-card project-" + project.theme}
      data-reveal
      data-delay={(index % 2) * 80}
    >
      <div className="project-cover">
        <div className="project-cover-top">
          <span className="project-brand">
            {project.brand}
            {project.brandId === "logitech" && "."}
          </span>
          <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="project-cover-bottom">
          <span className="project-category">{project.category}</span>
        </div>
        <div className="cover-rings" aria-hidden>
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p className="project-context">{project.context}</p>
        <div
          className="project-metrics"
          aria-label={sectionContent.projects.resultsLabel + " : " + project.category}
        >
          {project.metrics.map((metric) => (
            <div key={metric.id}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
        <details className="project-details">
          <summary aria-label={sectionContent.projects.detailsLabel + " : " + project.title}>
            <span>{sectionContent.projects.detailsLabel}</span>
            <Plus size={18} aria-hidden />
          </summary>
          <div className="project-detail-content">
            <p>{project.mission}</p>
            <ul>
              {project.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </article>
  );
}
