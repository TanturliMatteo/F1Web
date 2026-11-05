import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}

// A titled block of a detail page: small red eyebrow, heading, content
const Section = ({ id, eyebrow, title, children }: SectionProps) => (
  <section id={id} className="page-section" aria-labelledby={`${id}-title`}>
    <header className="section-header">
      <p className="section-label">{eyebrow}</p>
      <h2 id={`${id}-title`} className="section-title">
        {title}
      </h2>
    </header>
    {children}
  </section>
);

export default Section;
