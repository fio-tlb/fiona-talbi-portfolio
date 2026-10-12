import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectPage } from "@/components/project-page";
import { getPortfolio } from "@/data/localized";
import { buildProjectHead } from "@/lib/seo";

const { errorContent, profile, projects, seo } = getPortfolio("en");
const findProject = (id: string) => projects.find((project) => project.id === id);

export const Route = createFileRoute("/en/projets/$projectId")({
  loader: ({ params }) => {
    if (!findProject(params.projectId)) throw notFound();
  },
  head: ({ params }) => {
    const project = findProject(params.projectId);
    return project
      ? buildProjectHead(seo, profile, project, errorContent.documentTitleSuffix, "en")
      : {};
  },
  component: EnglishProjectRoute,
});

function EnglishProjectRoute() {
  const { projectId } = Route.useParams();
  const project = findProject(projectId);
  return project ? <ProjectPage key={project.id} project={project} /> : null;
}
