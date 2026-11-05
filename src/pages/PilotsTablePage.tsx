import { useState } from "react";
import PageBanner from "../components/ui/PageBanner";
import PilotsTable from "../components/ui/PilotsTable";
import DetailHero from "../components/ui/DetailHero";
import Section from "../components/ui/Section";
import StatTiles from "../components/ui/StatTiles";
import { LoadingCard, ErrorCard } from "../components/ui/QueryState";
import { usePilots } from "../hooks/usePilots";
import { useRaceStatus } from "../hooks/useRaceStatus";
import { useRaces } from "../hooks/useRaces";
import NotFoundPage from "./NotFoundPage";

const PilotsTablePage = () => {
  const { data, isLoading, isError, error } = usePilots();
  const { data: races } = useRaces();
  const {
    data: { last },
  } = useRaceStatus();
  const [search, setSearch] = useState("");

  if (isLoading) return <LoadingCard id="pilots-loading" />;

  if (isError) return <ErrorCard id="pilots-error" message={error?.message} />;

  if (!data) return <NotFoundPage />;

  const term = search.trim().toLowerCase();
  const filtered = data.filter((p) =>
    `${p.name} ${p.surname} ${p.team}`.toLowerCase().includes(term),
  );

  const [leader, second] = data;
  const leaderPoints = Number(leader?.points ?? 0);
  const roundsDone = Number(last?.round ?? 0);
  const totalRounds = races?.length ?? 0;
  const winners = data.filter((p) => Number(p.wins) > 0).length;

  return (
    <div id="pilots-page" className="detail-page">
      <DetailHero
        id="pilots-hero"
        eyebrow="Drivers' championship · 2026 season"
        title="The 2026 grid"
        backdrop="P1"
      >
        <p id="pilots-hero-text" className="prose">
          Eleven teams and one title to settle. Search the grid, follow the
          standings and see who is carrying the momentum.
        </p>
      </DetailHero>

      <div id="pilots-content" className="page-container">
        {leader && (
          <StatTiles
            id="pilots-tiles"
            tiles={[
              {
                key: "leader",
                label: "Leader",
                value: leader.surname,
                detail: `${leader.points} pts · ${leader.team}`,
              },
              {
                key: "gap",
                label: "Lead",
                value: second ? `+${leaderPoints - Number(second.points)}` : "-",
                detail: second ? `over ${second.surname}` : undefined,
              },
              {
                key: "rounds",
                label: "Rounds run",
                value: totalRounds ? `${roundsDone}/${totalRounds}` : roundsDone,
                detail: totalRounds ? `${totalRounds - roundsDone} to go` : undefined,
              },
              {
                key: "winners",
                label: "Race winners",
                value: winners,
                detail: "different drivers",
              },
            ]}
          />
        )}

        <Section id="pilots-standings" eyebrow="Standings" title="Drivers' championship">
          <div className="ui-stack">
            <input
              id="pilots-search"
              type="search"
              className="search-input"
              placeholder="Search driver or team"
              aria-label="Search driver or team"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <PilotsTable data={filtered} leaderPoints={leaderPoints} />
          </div>
        </Section>
      </div>

      <PageBanner
        id="pilots-points-banner"
        mirrored
        side="right"
        eyebrow="Behind the points"
        title="A championship is won in the details"
        text="Every point on this table was earned somewhere: a clean launch, a late overtake, a patient one-stop. Open a driver to see how the season is really going, beyond the standings."
      >
        <p id="pilots-points-banner-rules" className="banner-text">
          The winner takes 25 points, followed by 18, 15, 12, 10, 8, 6, 4, 2
          and 1 down to tenth place. Sprint races reward the top eight.
        </p>
      </PageBanner>
    </div>
  );
};

export default PilotsTablePage;
