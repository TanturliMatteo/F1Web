import { Link } from "react-router";
import PageBanner from "../components/ui/PageBanner";
import HomeHero from "../components/ui/HomeHero";
import HomeFeatures from "../components/ui/HomeFeatures";
import HomeNextRace from "../components/ui/HomeNextRace";
import Podium from "../components/ui/Podium";
import { usePilots } from "../hooks/usePilots";
import { useRaceStatus } from "../hooks/useRaceStatus";
import { useResultsRace } from "../hooks/useResultsRace";
import { useI18n } from "../i18n/i18n";

const Home = () => {
  const { t } = useI18n();
  const { data: pilots } = usePilots();
  const {
    data: { next, last },
  } = useRaceStatus();
  const { data: lastResults } = useResultsRace(last?.round);

  return (
    <div id="home-page">
      <HomeHero />
      <HomeFeatures />
      <div id="home-sections" className="page-container">
        {next && <HomeNextRace race={next} />}
        <div id="home-podiums" className="ui-row ui-row--wrap my-3">
          {pilots && (
            <Podium
              id="home-championship"
              title={t("home.championshipTop3")}
              linkTo="/pilots"
              items={pilots.slice(0, 3).map((p) => ({
                position: p.position,
                code: p.code,
                name: `${p.name} ${p.surname}`,
                detail: `${p.points} ${t("common.pts")}`,
                teamId: p.constructorId,
              }))}
            />
          )}
          {last && lastResults && lastResults.length > 0 && (
            <Podium
              id="home-last-race"
              title={t("home.lastRace", { name: last.name })}
              linkTo={`/races/${last.round}`}
              items={lastResults.slice(0, 3).map((r) => ({
                position: r.position,
                code: r.code,
                name: `${r.givenName} ${r.familyName}`,
                detail: r.time !== "0" ? r.time : r.status,
                teamId: r.constructorId,
              }))}
            />
          )}
        </div>
      </div>
      <PageBanner
        id="home-story-banner"
        mirrored
        side="left"
        eyebrow={t("home.story.eyebrow")}
        title={t("home.story.title")}
        text={t("home.story.text")}
      >
        <p id="home-story-banner-more" className="banner-text">
          {t("home.story.more")}
        </p>
      </PageBanner>
      <PageBanner
        id="home-data-banner"
        dark
        side="center"
        eyebrow={t("home.data.eyebrow")}
        title={t("home.data.title")}
        text={t("home.data.text")}
      >
        <p id="home-data-banner-more" className="banner-text">
          {t("home.data.more")}
        </p>
      </PageBanner>
      <PageBanner
        id="home-cta-banner"
        side="right"
        eyebrow={t("home.cta.eyebrow")}
        title={t("home.cta.title")}
        text={t("home.cta.text")}
      >
        <div id="home-cta-links" className="mt-3">
          <Link id="home-cta-pilots" to="/pilots" className="link-button">
            {t("home.cta.drivers")}
          </Link>
          <Link id="home-cta-races" to="/races" className="link-button">
            {t("home.cta.races")}
          </Link>
        </div>
      </PageBanner>
    </div>
  );
};

export default Home;
