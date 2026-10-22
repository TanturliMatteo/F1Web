import HomeHero from "../components/ui/HomeHero";
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
    </div>
  );
};

export default Home;
