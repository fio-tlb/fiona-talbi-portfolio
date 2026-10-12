import { ArrowUpRight, FileText, Mail } from "lucide-react";
import {
  certifications,
  education,
  experiences,
  interests,
  languages,
  profile,
  recommendations,
  sectionContent,
  skills,
  tools,
  type Recommendation,
} from "@/data/portfolio";
import { listInFrench, publicPath } from "@/lib/public-path";
import { SectionHeading } from "./section-heading";

// Noms composés à ne jamais couper en fin de ligne (« Massilia E- / consulting »).
const unbreakable = /(E-consulting)/;

function KeepTogether({ text }: { text: string }) {
  return text.split(unbreakable).map((part, index) =>
    index % 2 ? (
      <span className="nowrap" key={index}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/** Parcours : présentation à la 1re personne, expériences, puis formation (#formation). */
export function JourneySection() {
  const content = sectionContent.about;
  return (
    <section id="parcours" className="section band-deep" aria-labelledby="parcours-titre">
      <div className="site-wrap">
        <SectionHeading id="parcours-titre" label={content.label} title={content.title} />
        <div className="about-intro" data-reveal>
          <p className="about-lead">
            <KeepTogether text={content.intro} />
          </p>
          <p className="about-interests">
            {content.interestsLabel + " : " + listInFrench(interests.map((i) => i.label)) + "."}
          </p>
        </div>

        <div className="info-row" data-reveal>
          <h3 className="info-row-title">{content.experiencesTitle}</h3>
          <ul className="entry-list" role="list">
            {experiences.map((experience) => (
              <li className="experience" key={experience.id}>
                {experience.period && <p className="entry-period">{experience.period}</p>}
                <h4 className="experience-role">{experience.role}</h4>
                <p className="experience-company">
                  {experience.company}
                  {experience.location && " · " + experience.location}
                </p>
                <p className="experience-text">
                  <KeepTogether text={experience.description} />
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="info-row" id="formation" data-reveal>
          <h3 className="info-row-title">{content.educationTitle}</h3>
          <ul className="entry-list" role="list">
            {education.map((item) => (
              <li className="education-item" key={item.id}>
                {item.period && <p className="entry-period">{item.period}</p>}
                <p className="education-title">{item.title}</p>
                <p className="education-school">{item.school}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Compétences : trois domaines en texte, outils, certifications (#certifications) et langues (#langues). */
export function SkillsSection() {
  const content = sectionContent.skills;
  return (
    <section id="competences" className="section" aria-labelledby="competences-titre">
      <div className="site-wrap">
        <SectionHeading id="competences-titre" label={content.label} title={content.title} />
        <div className="info-row" data-reveal>
          <h3 className="info-row-title">{content.skillsTitle}</h3>
          <div className="skill-columns">
            {skills.map((group) => (
              <div className="skill-group" key={group.id}>
                <h4 className="skill-title">{group.title}</h4>
                <ul className="skill-items" role="list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="info-row" data-reveal>
          <h3 className="info-row-title">{content.toolsTitle}</h3>
          <ul className="tool-line" role="list">
            {tools.map((tool) => (
              <li key={tool.id}>{tool.name}</li>
            ))}
          </ul>
        </div>

        <div className="info-row" id="certifications" data-reveal>
          <h3 className="info-row-title">{content.certificationsTitle}</h3>
          <ul className="cert-badges" role="list">
            {certifications.map((cert) => (
              <li className="cert-badge" key={cert.id}>
                <span className="cert-name">{cert.name}</span>
                <span className="cert-meta">
                  {[cert.organization, cert.year].filter(Boolean).join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="info-row" id="langues" data-reveal>
          <h3 className="info-row-title">{content.languagesTitle}</h3>
          <ul className="language-list" role="list">
            {languages.map((language) => (
              <li key={language.id}>
                <span className="language-name">{language.name}</span>
                <span className="language-level">{language.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function recommendationsDescription(items: readonly Recommendation[]) {
  const content = sectionContent.recommendations;
  const withDocument = items.filter((item) => item.documentPath?.trim()).length;
  if (withDocument === items.length) return content.documentsDescription;
  if (withDocument === 0) return content.requestDescription;
  return content.mixedDescription;
}

export function RecommendationsSection({
  items = recommendations,
}: {
  items?: readonly Recommendation[];
} = {}) {
  const content = sectionContent.recommendations;
  if (!items.length) return null;
  return (
    <section
      id="recommandations"
      className="section band-deep"
      aria-labelledby="recommandations-titre"
    >
      <div className="site-wrap">
        <SectionHeading
          id="recommandations-titre"
          label={content.label}
          title={content.title}
          description={recommendationsDescription(items)}
        />
        <ul className="recommendation-list" role="list">
          {items.map((recommendation, index) => {
            const documentPath = recommendation.documentPath?.trim();
            const titleId = recommendation.id + "-titre";
            return (
              <li
                className="recommendation-card"
                key={recommendation.id}
                data-reveal
                data-delay={index * 70}
              >
                {documentPath && (
                  <p className="recommendation-kind">
                    <FileText size={16} strokeWidth={1.75} aria-hidden />
                    {content.documentLabel}
                  </p>
                )}
                <h3 className="recommendation-title" id={titleId}>
                  {recommendation.title}
                </h3>
                {recommendation.description && (
                  <p className="recommendation-text">{recommendation.description}</p>
                )}
                {documentPath ? (
                  <a
                    className="text-link recommendation-link"
                    href={publicPath(documentPath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-describedby={titleId}
                  >
                    {content.openLabel}
                    <ArrowUpRight size={15} aria-hidden />
                    <span className="sr-only">{sectionContent.newTabLabel}</span>
                  </a>
                ) : (
                  <a
                    className="text-link recommendation-link"
                    href={
                      "mailto:" +
                      profile.email +
                      "?subject=" +
                      encodeURIComponent(content.requestSubject + recommendation.title) +
                      "&body=" +
                      encodeURIComponent(content.requestBody)
                    }
                    aria-describedby={titleId}
                  >
                    {content.requestLabel}
                    <Mail size={15} aria-hidden />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
