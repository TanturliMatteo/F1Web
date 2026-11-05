import type { ReactNode } from "react";
import useInView from "../../hooks/useInView";
import { cx } from "../../utils/cx";

interface PageBannerProps {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  mirrored?: boolean;
  dark?: boolean;
  side?: "left" | "center" | "right";
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
  children,
}: PageBannerProps) => {
  // Banners with a side slide in the first time they scroll into view
  const [ref, inView] = useInView<HTMLElement>(0.2);
  const visible = !side || inView;

  return (
    <section
      id={id}
      ref={ref}
      className={cx(
        "banner",
        mirrored && "banner--mirrored",
        dark && "banner--dark",
        side && `banner--${side}`,
        visible && "banner--visible",
      )}
    >
      <div id={`${id}-content`} className="banner-content">
        <p id={`${id}-eyebrow`} className="section-label">
          {eyebrow}
        </p>
        <h2 id={`${id}-title`} className="banner-title">
          {title}
        </h2>
        <p id={`${id}-text`} className="banner-text">
          {text}
        </p>
        {children}
      </div>
    </section>
  );
};

export default PageBanner;
