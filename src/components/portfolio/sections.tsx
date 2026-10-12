import {
  ArrowUpRight,
  Award,
  BookOpen,
  Clapperboard,
  FileText,
  Film,
  GraduationCap,
  Mail,
  Megaphone,
  PencilLine,
  Plane,
  Store,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  brands,
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
import { publicPath } from "@/lib/public-path";
import { Logo } from "./logo";
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

// Icônes de présentation (Lucide), choisies d'après les identifiants stables des données.
const interestIcons: Record<string, LucideIcon> = {
  travel: Plane,
  reading: BookOpen,
  drawing: PencilLine,
};
const skillIcons: Record<string, LucideIcon> = {
  "marketing-trade": Store,
  "communication-content": Megaphone,
  "coordination-field": Users,
};
/** Outils sans logo disponible : icône générique. */
const toolIcons: Record<string, LucideIcon> = {
  capcut: Clapperboard,
  imovie: Film,
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** Parcours : présentation à la 1re personne, expériences et formation (#formation) en cartes. */
export function JourneySection() {
  const content = sectionContent.about;
  return (
    <section id="parcours" className="section band-deep" aria-labelledby="parcours-titre">
      <div className="site-wrap">
        <SectionHeading id="parcours-titre" label={content.label} title={content.title} />
        <p className="about-lead" data-reveal>
          <KeepTogether text={content.intro} />
        </p>

        <div className="career-grid">
          <div className="career-column">
            <div>
              <h3 className="block-title" data-reveal>
                {content.experiencesTitle}
              </h3>
              <ul className="career-list" role="list">
                {experiences.map((experience, index) => {
                  const brand = brands[experience.brandId];
                  return (
                    <li
                      className="experience-card"
                      key={experience.id}
                      data-reveal
                      data-delay={index * 70}
                    >
                      <div className="experience-head">
                        <span className="logo-tile">
                          <Logo logo={brand.logo} alt="" />
                        </span>
                        {experience.period && <p className="chip">{experience.period}</p>}
                      </div>
                      <h4 className="experience-role">{experience.role}</h4>
                      <p className="experience-company">
                        <KeepTogether text={experience.company} />
                        {experience.location && " · " + experience.location}
                      </p>
                      <p className="experience-text">
                        <KeepTogether text={experience.description} />
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="career-column">
            <div id="formation">
              <h3 className="block-title" data-reveal>
                {content.educationTitle}
              </h3>
              <ul className="career-list" role="list">
                {education.map((item, index) => (
                  <li className="education-card" key={item.id} data-reveal data-delay={index * 60}>
                    <span className="icon-tile" aria-hidden>
                      <GraduationCap size={20} strokeWidth={1.75} />
                    </span>
                    <div className="education-body">
                      {item.period && <p className="education-period">{item.period}</p>}
                      <p className="education-title">{item.title}</p>
                      <p className="education-school">{item.school}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="interests-card" data-reveal>
              <h3 className="interests-title">{content.interestsLabel}</h3>
              <ul className="chip-list" role="list">
                {interests.map((interest) => {
                  const Icon = interestIcons[interest.id];
                  return (
                    <li className="chip chip-outline chip-lg" key={interest.id}>
                      {Icon && <Icon size={16} strokeWidth={1.75} aria-hidden />}
                      {capitalize(interest.label)}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Compétences : trois cartes de savoir-faire, boîte à outils, langues (#langues) et certifications (#certifications). */
export function SkillsSection() {
  const content = sectionContent.skills;
  return (
    <section id="competences" className="section" aria-labelledby="competences-titre">
      <div className="site-wrap">
        <SectionHeading id="competences-titre" label={content.label} title={content.title} />

        <div className="skills-block">
          <h3 className="block-title" data-reveal>
            {content.skillsTitle}
          </h3>
          <ul className="skill-cards" role="list">
            {skills.map((group, index) => {
              const Icon = skillIcons[group.id] ?? Award;
              return (
                <li className="skill-card" key={group.id} data-reveal data-delay={index * 70}>
                  <span className="icon-tile" aria-hidden>
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <h4 className="skill-title">{group.title}</h4>
                  <ul className="skill-items" role="list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="skills-bento">
          <div className="skills-block" data-reveal>
            <h3 className="block-title">{content.toolboxTitle}</h3>
            <div className="skills-card">
              <ul className="tool-chips" role="list">
                {tools.map((tool) => {
                  const Icon = toolIcons[tool.id] ?? Wrench;
                  return (
                    <li className="tool-chip" key={tool.id}>
                      {tool.logo ? (
                        <Logo logo={tool.logo} alt="" />
                      ) : (
                        <Icon size={17} strokeWidth={1.75} aria-hidden />
                      )}
                      {tool.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="skills-block" id="langues" data-reveal data-delay="70">
            <h3 className="block-title">{content.languagesTitle}</h3>
            <ul className="skills-card language-list" role="list">
              {languages.map((language) => (
                <li key={language.id}>
                  <span className="language-name">{language.name}</span>
                  <span className="chip">{language.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="skills-block" id="certifications">
          <h3 className="block-title" data-reveal>
            {content.certificationsTitle}
          </h3>
          <ul className="cert-grid" role="list">
            {certifications.map((cert, index) => (
              <li className="cert-card" key={cert.id} data-reveal data-delay={index * 50}>
                {cert.logo ? (
                  <span className="logo-tile is-square">
                    <Logo logo={cert.logo} alt="" />
                  </span>
                ) : (
                  <span className="icon-tile" aria-hidden>
                    <Award size={20} strokeWidth={1.75} />
                  </span>
                )}
                <span className="cert-text">
                  <span className="cert-name">{cert.name}</span>
                  <span className="cert-meta">
                    {[cert.organization, cert.year].filter(Boolean).join(" · ")}
                  </span>
                </span>
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
                <span className="recommendation-sheet" aria-hidden />
                <div className="recommendation-head">
                  <span className="icon-tile icon-tile-lg" aria-hidden>
                    {documentPath ? (
                      <FileText size={22} strokeWidth={1.75} />
                    ) : (
                      <Mail size={22} strokeWidth={1.75} />
                    )}
                  </span>
                  {documentPath && <p className="chip chip-outline">{content.documentLabel}</p>}
                </div>
                <h3 className="recommendation-title" id={titleId}>
                  {recommendation.title}
                </h3>
                {recommendation.description && (
                  <p className="recommendation-text">{recommendation.description}</p>
                )}
                {documentPath ? (
                  <a
                    className="action action-secondary recommendation-link"
                    href={publicPath(documentPath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-describedby={titleId}
                  >
                    {content.openLabel}
                    <ArrowUpRight size={16} aria-hidden />
                    <span className="sr-only">{sectionContent.newTabLabel}</span>
                  </a>
                ) : (
                  <a
                    className="action action-secondary recommendation-link"
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
                    <Mail size={16} aria-hidden />
                    {content.requestLabel}
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
