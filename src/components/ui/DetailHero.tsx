import type { ReactNode } from "react";

interface DetailHeroProps {
  id: string;
  eyebrow: ReactNode;
  title: string;
  // Huge outlined text behind the title (car number, round...)
  backdrop: string;
  image?: { src: string; alt: string };
  children?: ReactNode;
}

// Full-width opening block of the pilot and race pages. Colours come from
// the --accent custom property set on the page wrapper.
const DetailHero = ({
  id,
  eyebrow,
  title,
  backdrop,
  image,
  children,
}: DetailHeroProps) => (
  <section
    id={id}
    className={["detail-hero", image && "detail-hero--with-image"]
      .filter(Boolean)
      .join(" ")}
  >
    <span className="detail-hero-backdrop" aria-hidden="true">
      {backdrop}
    </span>
    <div id={`${id}-body`} className="detail-hero-body">
      <p id={`${id}-eyebrow`} className="section-label">
        {eyebrow}
      </p>
      <h1 id={`${id}-title`} className="detail-hero-title">
        {title}
      </h1>
      {children}
    </div>
    {image && (
      <div id={`${id}-media`} className="detail-hero-media">
        <img
          id={`${id}-image`}
          src={image.src}
          alt={image.alt}
          className="detail-hero-image"
        />
      </div>
    )}
  </section>
);

export default DetailHero;
