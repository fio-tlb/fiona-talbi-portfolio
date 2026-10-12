import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Clock3,
  FileText,
  Globe2,
  GraduationCap,
  Layers3,
  Pencil,
  Plane,
  Sparkles,
  Target,
} from "lucide-react";
import {
  certifications,
  education,
  experiences,
  interests,
  languages,
  recommendations,
  sectionContent,
  skills,
  tools,
} from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

const interestIcons = { travel: Plane, reading: BookOpen, drawing: Pencil };
const skillIcons = [Target, Sparkles, Layers3];

export function JourneySection() {
  const content = sectionContent.about;
  return (
    <section id="parcours" className="section about-section">
      <div className="site-wrap about-grid">
        <div>
          <SectionHeading {...content} />
          <div className="about-copy" data-reveal>
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="interest-list" data-reveal>
            {interests.map((interest) => {
              const Icon = interestIcons[interest.id as keyof typeof interestIcons] ?? Sparkles;
              return (
                <span className="interest-pill" key={interest.id}>
                  <Icon size={13} aria-hidden />
                  {interest.label}
                </span>
              );
            })}
          </div>
        </div>
        <div data-reveal data-delay="80">
          <h3 className="timeline-title">
            <BriefcaseBusiness size={16} aria-hidden />
            {content.experiencesTitle}
          </h3>
          <div className="timeline">
            {experiences.map((experience) => (
              <article className="timeline-item" key={experience.id}>
                <div className="timeline-meta">
                  {experience.company}
                  {experience.location && " · " + experience.location}
                </div>
                <h3>{experience.role}</h3>
                <p>{experience.description}</p>
              </article>
            ))}
          </div>
          <div className="vision-card" aria-label={content.visionTitle}>
            {content.vision.map((item) => (
              <div key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="competences" className="section site-wrap">
      <SectionHeading {...sectionContent.skills} />
      <div className="skills-grid">
        {skills.map((skill, index) => {
          const Icon = skillIcons[index] ?? Target;
          return (
            <article className="skill-card" key={skill.id} data-reveal data-delay={index * 60}>
              <span className="skill-icon">
                <Icon size={21} strokeWidth={1.6} aria-hidden />
              </span>
              <h3>{skill.title}</h3>
              <ul>
                {skill.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className="tools-bar" data-reveal>
        <p className="tools-label">{sectionContent.skills.toolsLabel}</p>
        <div className="tool-list">
          {tools.map((tool) => (
            <span className="tool-pill" key={tool.id}>
              {tool.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EducationSection() {
  return (
    <section id="formation" className="section education-section site-wrap">
      <SectionHeading {...sectionContent.education} />
      <div className="education-grid">
        {education.map((item, index) => (
          <article
            className="education-card"
            key={item.id}
            data-reveal
            data-delay={(index % 2) * 70}
          >
            <GraduationCap className="education-icon" size={22} strokeWidth={1.6} aria-hidden />
            <div>
              <p className="education-date">{item.date}</p>
              <h3>{item.title}</h3>
              <p className="education-school">{item.school}</p>
              <p className="education-copy">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CredentialsSection() {
  return (
    <section id="certifications" className="section credentials-section">
      <div className="site-wrap">
        <SectionHeading {...sectionContent.certifications} />
        <div className="cert-grid">
          {certifications.map((cert, index) => (
            <article className="cert-card" key={cert.id} data-reveal data-delay={(index % 3) * 45}>
              <span className="cert-mark" aria-hidden>
                {cert.mark === "ETS" ? <GraduationCap size={21} /> : cert.mark}
              </span>
              <div>
                <h3>{cert.name}</h3>
                <p>
                  {cert.organization}
                  {cert.year && " · " + cert.year}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="language-grid" id="langues" data-reveal>
          <h3 className="language-intro">
            <Globe2 size={18} aria-hidden />
            {sectionContent.languages.title}
          </h3>
          {languages.map((language) => (
            <div key={language.id}>
              <p className="language-name">{language.name}</p>
              <p className="language-level">{language.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RecommendationsSection() {
  const content = sectionContent.recommendations;
  return (
    <section id="recommandations" className="section site-wrap">
      <SectionHeading {...content} />
      <div className="recommendation-grid">
        {recommendations.map((recommendation, index) => (
          <article
            className="recommendation-card"
            key={recommendation.id}
            data-reveal
            data-delay={index * 70}
          >
            <span className="document-icon">
              <FileText size={24} strokeWidth={1.4} aria-hidden />
            </span>
            <div>
              <h3>{recommendation.title}</h3>
              <p>{recommendation.description}</p>
              {recommendation.status === "available" && recommendation.documentPath ? (
                <a
                  className="recommendation-link"
                  href={import.meta.env.BASE_URL + recommendation.documentPath.replace(/^\/+/, "")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.openLabel}
                  <ArrowUpRight size={14} aria-hidden />
                </a>
              ) : (
                <span className="pending-label">
                  <Clock3 size={11} aria-hidden />
                  {content.pendingLabel}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
