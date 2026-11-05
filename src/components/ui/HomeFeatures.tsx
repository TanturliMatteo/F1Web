import { Link } from "react-router";
import { useI18n } from "../../i18n/i18n";

const FEATURES = [
  { key: "standings", to: "/pilots" },
  { key: "calendar", to: "/races" },
  { key: "analytics", to: "/pilots" },
] as const;

const HomeFeatures = () => {
  const { t } = useI18n();

  return (
    <section id="home-features" className="banner">
      <div id="home-features-content" className="banner-content">
        <p id="home-features-eyebrow" className="section-label">
          {t("home.featuresEyebrow")}
        </p>
        <h2 id="home-features-title" className="banner-title">
          {t("home.featuresTitle")}
        </h2>
        <div
          id="home-features-list"
          className="ui-row ui-row--wrap feature-list"
        >
          {FEATURES.map((f, index) => (
            <Link
              key={f.key}
              id={`home-feature-${f.key}`}
              to={f.to}
              className="feature-card"
            >
              <span className="feature-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{t(`home.features.${f.key}.title`)}</h3>
              <p>{t(`home.features.${f.key}.text`)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
