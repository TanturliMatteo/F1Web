import type { ReactNode } from "react";
import { useLocation } from "react-router";
import ErrorBoundary from "../ErrorBoundary";
import { useI18n } from "../../i18n/i18n";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}

// A titled block of a detail page: small red eyebrow, heading, content.
// If its content fails to render only this block shows a notice; it tries
// again when the visitor moves to another page.
const Section = ({ id, eyebrow, title, children }: SectionProps) => {
  const { t } = useI18n();
  const { pathname } = useLocation();

  return (
    <section id={id} className="page-section" aria-labelledby={`${id}-title`}>
      <header className="section-header">
        <p className="section-label">{eyebrow}</p>
        <h2 id={`${id}-title`} className="section-title">
          {title}
        </h2>
      </header>
      <ErrorBoundary
        resetKey={pathname}
        fallback={
          <div id={`${id}-error`} className="ui-card" role="alert">
            <p>{t("common.sectionError")}</p>
          </div>
        }
      >
        {children}
      </ErrorBoundary>
    </section>
  );
};

export default Section;
