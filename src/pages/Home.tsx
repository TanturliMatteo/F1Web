import { Link } from "react-router";
import PageBanner from "../components/ui/PageBanner";
import HomeHero from "../components/ui/HomeHero";
import HomeFeatures from "../components/ui/HomeFeatures";
import HomeNextRace from "../components/ui/HomeNextRace";
import Podium from "../components/ui/Podium";
import { usePilots } from "../hooks/usePilots";
import { useRaceStatus } from "../hooks/useRaceStatus";
import { useResultsRace } from "../hooks/useResultsRace";

const Home = () => {
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
              title="Championship top 3"
              linkTo="/pilots"
              items={pilots.slice(0, 3).map((p) => ({
                position: p.position,
                code: p.code,
                name: `${p.name} ${p.surname}`,
                detail: `${p.points} pts`,
                teamId: p.constructorId,
              }))}
            />
          )}
          {last && lastResults && lastResults.length > 0 && (
            <Podium
              id="home-last-race"
              title={`Last race: ${last.name}`}
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
        eyebrow="The story so far"
        title="Twenty-two drivers, one season, a thousand tiny decisions"
        text="Formula 1 is a sport of margins: a tenth in qualifying, a place gained at the start, a strategy call made in a heartbeat. Behind every Sunday there are numbers that tell the story lap times can't."
      >
        <p id="home-story-banner-more" className="banner-text">
          F1Web turns the official results into something you can read at a
          glance: who is quietly consistent, who thrives against their
          teammate, who leaves points on the table. No hype, just the season as
          it unfolds, race after race.
        </p>
      </PageBanner>
      <PageBanner
        id="home-data-banner"
        dark
        side="center"
        eyebrow="Under the hood"
        title="Open data, honest numbers"
        text="Every result on this site comes from the Jolpica API, the community-run successor of the Ergast project. No predictions, no spin: we read the official classification and look for the patterns hiding in it."
      >
        <p id="home-data-banner-more" className="banner-text">
          F1Web is an independent, non-commercial project, not affiliated with
          Formula One Management or the FIA.
        </p>
      </PageBanner>
      <PageBanner
        id="home-cta-banner"
        side="right"
        eyebrow="Your seat on the pit wall"
        title="Follow a rivalry, replay a Sunday"
        text="The season is long and there is plenty to explore. Open a driver for averages and teammate battles, or step into the calendar and relive a Grand Prix from the first corner to the flag."
      >
        <div id="home-cta-links" className="mt-3">
          <Link id="home-cta-pilots" to="/pilots" className="link-button">
            Drivers
          </Link>
          <Link id="home-cta-races" to="/races" className="link-button">
            Races
          </Link>
        </div>
      </PageBanner>
    </div>
  );
};

export default Home;
