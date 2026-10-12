import type { SectionHeadingContent } from "@/data/portfolio";

type SectionHeadingProps = SectionHeadingContent & {
  /** Id du H2, pour nommer la section (aria-labelledby). */
  id?: string;
};

export function SectionHeading({ id, label, title, description }: SectionHeadingProps) {
  return (
    <div className="section-heading" data-reveal>
      {label && <p className="section-eyebrow">{label}</p>}
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
