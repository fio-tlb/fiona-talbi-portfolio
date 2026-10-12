import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectPage } from "@/components/project-page";
import { errorContent, projects } from "@/data/portfolio";

function findProject(projectId: string) {
  return projects.find((project) => project.id === projectId);
}

// Une page par projet : /projets/<project.id> (ids stables, pré-rendus pour GitHub Pages).
export const Route = createFileRoute("/projets/$projectId")({
  loader: ({ params }) => {
    if (!findProject(params.projectId)) throw notFound();
  },
  head: ({ params }) => {
    const project = findProject(params.projectId);
    return project
      ? {
          meta: [
            { title: project.title + errorContent.documentTitleSuffix },
            { name: "description", content: project.context },
          ],
        }
      : {};
  },
  component: ProjectRoute,
});

function ProjectRoute() {
  const { projectId } = Route.useParams();
  const project = findProject(projectId);
  // Le loader a déjà écarté les ids inconnus (404).
  return project ? <ProjectPage project={project} /> : null;
}
