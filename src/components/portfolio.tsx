import { useRef } from "react";
import { navigation } from "@/data/portfolio";
import { usePortfolio } from "@/hooks/use-portfolio";
import { usePortfolioNavigation } from "@/hooks/use-portfolio-navigation";
import { useReveal } from "@/hooks/use-reveal";
import { ContactSection } from "./portfolio/contact-section";
import { Hero } from "./portfolio/hero";
import { ProjectCard } from "./portfolio/project-card";
import { SectionHeading } from "./portfolio/section-heading";
import {
  CertificationsSection,
  EducationSection,
  ExperienceSection,
  RecommendationsSection,
  SkillsSection,
} from "./portfolio/sections";
import { SiteShell } from "./site-shell";

const sectionIds = ["accueil", ...navigation.map((item) => item.id), "contact"];

export function Portfolio() {
  const { projects, sectionContent } = usePortfolio();
  const mainRef = useRef<HTMLElement>(null);
  const { activeSection, progressRef } = usePortfolioNavigation(sectionIds);
  useReveal(mainRef);

  return (
    <SiteShell
      activeSection={activeSection}
      progressRef={progressRef}
      offerVideoWelcome
      mainRef={mainRef}
      topId="accueil"
    >
      <Hero />
      <ExperienceSection />
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
      <SkillsSection />
      <EducationSection />
      <CertificationsSection />
      <RecommendationsSection />
      <ContactSection />
    </SiteShell>
  );
}
