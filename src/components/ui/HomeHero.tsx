import { useI18n } from "../../i18n/i18n";

const HomeHero = () => {
  const { t } = useI18n();
  return (
    <div id="home-hero" className="home-hero-container">
      <h1 id="home-hero-title" className="home-hero-title">
        {t("home.heroTitle")}
      </h1>
      <img
        id="home-hero-bg"
        src="/HeroBg.png"
        alt=""
        className="home-hero-bg"
      />
      <img
        id="home-hero-cars"
        src="/Hero-cars.png"
        alt={t("home.heroCarsAlt")}
        className="home-hero-cars"
      />
    </div>
  );
};

export default HomeHero;
