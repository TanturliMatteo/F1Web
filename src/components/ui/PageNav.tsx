import { Link } from "react-router";

export interface PageNavTarget {
  to: string;
  label: string;
  title: string;
}

interface PageNavProps {
  id: string;
  ariaLabel: string;
  prev?: PageNavTarget | null;
  next?: PageNavTarget | null;
}

// "← previous / next →" cards at the bottom of a detail page
const PageNav = ({ id, ariaLabel, prev, next }: PageNavProps) => (
  <nav id={id} className="page-nav" aria-label={ariaLabel}>
    {prev ? (
      <Link id={`${id}-prev`} to={prev.to} className="nav-card">
        <span className="section-label">← {prev.label}</span>
        <span className="nav-card-title">{prev.title}</span>
      </Link>
    ) : (
      <span />
    )}
    {next && (
      <Link
        id={`${id}-next`}
        to={next.to}
        className="nav-card nav-card--next"
      >
        <span className="section-label">{next.label} →</span>
        <span className="nav-card-title">{next.title}</span>
      </Link>
    )}
  </nav>
);

export default PageNav;
