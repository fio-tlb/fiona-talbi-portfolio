import { useEffect, useRef } from "react";
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

  useEffect(() => {
    // Smooth anchor scrolling only after a first gesture: a shared link to #projets jumps
    // straight to its target on load instead of animating down the whole page.
    const root = document.documentElement;
    const enable = () => root.classList.add("smooth-scroll");
    const options = { once: true, capture: true } as const;
    window.addEventListener("pointerdown", enable, options);
    window.addEventListener("keydown", enable, options);
    return () => {
      window.removeEventListener("pointerdown", enable, options);
      window.removeEventListener("keydown", enable, options);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <SiteHeader activeSection={activeSection} progressRef={progressRef} />
      <main id="contenu" ref={mainRef} tabIndex={-1}>
        <Hero />
        <section id="projets" className="section site-wrap" aria-labelledby="projets-titre">
          <SectionHeading id="projets-titre" {...sectionContent.projects} />
          <div className="projects-list">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
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
