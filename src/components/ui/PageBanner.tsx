import { useEffect, useRef, useState, type ReactNode } from "react";

interface PageBannerProps {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  mirrored?: boolean;
  dark?: boolean;
  side?: "left" | "center" | "right";
  as?: "h1" | "h2";
  children?: ReactNode;
}

const PageBanner = ({
  id,
  eyebrow,
  title,
  text,
  mirrored,
  dark,
  side,
  as: Heading = "h2",
  children,
}: PageBannerProps) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(!side);

  // Banners with a side slide in the first time they scroll into view
  useEffect(() => {
    const el = ref.current;
    if (!side || !el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [side]);

  return (
    <section
      id={id}
      ref={ref}
      className={[
        "banner",
        mirrored && "banner--mirrored",
        dark && "banner--dark",
        side && `banner--${side}`,
        visible && "banner--visible",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div id={`${id}-content`} className="banner-content">
        <p id={`${id}-eyebrow`} className="section-label">
          {eyebrow}
        </p>
        <Heading id={`${id}-title`} className="banner-title">
          {title}
        </Heading>
        <p id={`${id}-text`} className="banner-text">
          {text}
        </p>
        {children}
      </div>
    </section>
  );
};

export default PageBanner;
