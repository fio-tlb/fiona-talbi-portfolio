import type { SectionHeadingContent } from "@/data/portfolio";

type SectionHeadingProps = SectionHeadingContent & {
  /** Id du H2, pour nommer la section (aria-labelledby). */
  id?: string;
};

/** En-tête de section : sur-titre en pilule, titre (seconde ligne éventuelle en bordeaux), description. */
export function SectionHeading({
  id,
  label,
  title,
  titleAccent,
  description,
}: SectionHeadingProps) {
  return (
    <div className="section-heading" data-reveal>
      {label && <p className="section-eyebrow">{label}</p>}
      <h2 className="section-title" id={id}>
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="section-title-accent">{titleAccent}</span>
          </>
        )}
      </h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
