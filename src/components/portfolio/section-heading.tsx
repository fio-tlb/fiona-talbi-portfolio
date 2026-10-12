type SectionHeadingProps = {
  number: string;
  label: string;
  title: string;
  accent?: string;
  description?: string;
};

export function SectionHeading({ number, label, title, accent, description }: SectionHeadingProps) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <p className="section-eyebrow">
          <span>{number}</span>
          {label}
        </p>
        <h2 className="section-title">
          {title}
          {accent && (
            <>
              <br />
              <span>{accent}</span>
            </>
          )}
        </h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
