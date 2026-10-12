import { useRef } from "react";
import { ArrowUp } from "lucide-react";
import { navigation, profile, projects, sectionContent } from "@/data/portfolio";
import { usePortfolioNavigation } from "@/hooks/use-portfolio-navigation";
import { useReveal } from "@/hooks/use-reveal";
import { ContactSection } from "./portfolio/contact-section";
import { Hero } from "./portfolio/hero";
import { ProjectCard } from "./portfolio/project-card";
import { SectionHeading } from "./portfolio/section-heading";
import {
  CredentialsSection,
  EducationSection,
  JourneySection,
  RecommendationsSection,
  SkillsSection,
} from "./portfolio/sections";
import { SiteHeader } from "./portfolio/site-header";

const sectionIds = ["accueil", ...navigation.map((item) => item.id), "contact"];

export function Portfolio() {
  const mainRef = useRef<HTMLElement>(null);
  const { activeSection, progressRef } = usePortfolioNavigation(sectionIds);
  useReveal(mainRef);

  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <SiteHeader activeSection={activeSection} progressRef={progressRef} />
      <main id="contenu" ref={mainRef} tabIndex={-1}>
        <Hero />
        <section id="projets" className="section site-wrap">
          <SectionHeading {...sectionContent.projects} />
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>
        <JourneySection />
        <SkillsSection />
        <EducationSection />
        <CredentialsSection />
        <RecommendationsSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <div className="site-wrap footer-inner">
          <p>
            © {profile.name} · {profile.role}
          </p>
          <p>{sectionContent.footer.signature}</p>
          <a href="#accueil">
            {sectionContent.footer.topLabel}
            <ArrowUp size={12} aria-hidden />
          </a>
        </div>
      </footer>
    </>
  );
}
