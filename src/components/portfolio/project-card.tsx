import { sectionContent, type Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  const content = sectionContent.projects;
  const titleId = project.id + "-titre";

  return (
    <article id={project.id} className="project-card" aria-labelledby={titleId} data-reveal>
      <div className="project-head">
        <p className="project-brand">{project.brand}</p>
        <p className="project-category">{project.category}</p>
      </div>
      <h3 className="project-title" id={titleId}>
        {project.title}
      </h3>
      <ul className="project-results" aria-label={content.resultsLabel}>
        {project.metrics.map((metric) => (
          <li className="shelf-tag" key={metric.id}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </li>
        ))}
      </ul>
      <dl className="project-story">
        <div>
          <dt>{content.contextLabel}</dt>
          <dd>{project.context}</dd>
        </div>
        <div>
          <dt>{content.actionLabel}</dt>
          <dd>{project.action}</dd>
        </div>
      </dl>
    </article>
  );
}
