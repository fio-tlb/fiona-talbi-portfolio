import { useRef } from "react";
import { navigation, profile, projects, sectionContent } from "@/data/portfolio";
import { usePortfolioNavigation } from "@/hooks/use-portfolio-navigation";
import { useReveal } from "@/hooks/use-reveal";
import { ContactSection } from "./portfolio/contact-section";
import { Hero } from "./portfolio/hero";
import { ProjectCard } from "./portfolio/project-card";
import { SectionHeading } from "./portfolio/section-heading";
import { JourneySection, RecommendationsSection, SkillsSection } from "./portfolio/sections";
import { SiteShell } from "./site-shell";

const sectionIds = ["accueil", ...navigation.map((item) => item.id), "contact"];

export function Portfolio() {
  const mainRef = useRef<HTMLElement>(null);
  const { activeSection, progressRef } = usePortfolioNavigation(sectionIds);
  useReveal(mainRef);

  return (
    <SiteShell
      activeSection={activeSection}
      progressRef={progressRef}
      canInvite={profile.portrait !== null}
      mainRef={mainRef}
      topId="accueil"
    >
      <Hero />
      <section id="projets" className="section site-wrap" aria-labelledby="projets-titre">
        <SectionHeading id="projets-titre" {...sectionContent.projects} />
        <ul className="projects-grid" role="list">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>
      <JourneySection />
      <SkillsSection />
      <RecommendationsSection />
      <ContactSection />
    </SiteShell>
  );
}
