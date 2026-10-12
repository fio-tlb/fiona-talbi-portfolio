import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectPage } from "@/components/project-page";
import { errorContent, profile, projects, seo } from "@/data/portfolio";
import { buildProjectHead } from "@/lib/seo";

function findProject(projectId: string) {
  return projects.find((project) => project.id === projectId);
}

// Une page par projet : /projets/<project.id> (ids stables, pré-rendus pour GitHub Pages par la
// liste `pages` de vite.config.ts). Un id inconnu affiche la page 404 de __root.tsx.
export const Route = createFileRoute("/projets/$projectId")({
  loader: ({ params }) => {
    if (!findProject(params.projectId)) throw notFound();
  },
  head: ({ params }) => {
    const project = findProject(params.projectId);
    return project ? buildProjectHead(seo, profile, project, errorContent.documentTitleSuffix) : {};
  },
  component: ProjectRoute,
});

function ProjectRoute() {
  const { projectId } = Route.useParams();
  const project = findProject(projectId);
  // Le loader a déjà écarté les ids inconnus (404). La clé remonte la page d'un projet à l'autre.
  return project ? <ProjectPage key={project.id} project={project} /> : null;
}
