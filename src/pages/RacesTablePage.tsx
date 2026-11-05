import { useMemo } from "react";
import PageBanner from "../components/ui/PageBanner";
import RacesTable from "../components/ui/RacesTable";
import DetailHero from "../components/ui/DetailHero";
import Section from "../components/ui/Section";
import StatTiles from "../components/ui/StatTiles";
import { LoadingCard, ErrorCard } from "../components/ui/QueryState";
import { useRaces } from "../hooks/useRaces";
import { useResults } from "../hooks/useResults";
import { useRaceStatus } from "../hooks/useRaceStatus";
import type { Results } from "../services/ResultServices";
import { formatDate } from "../utils/formatDate";
import NotFoundPage from "./NotFoundPage";

const RaceTablePage = () => {
  const { data, isError, isLoading, error } = useRaces();
  const { data: results } = useResults();
  const {
    data: { next, last },
  } = useRaceStatus();

  // Winners appear as soon as the results load; the calendar doesn't wait
  const winners = useMemo(
    () =>
      new Map<string, Results>(
        (results ?? [])
          .filter((r) => r.positionText === "1")
          .map((r) => [r.round, r]),
      ),
    [results],
  );

  if (isLoading) return <LoadingCard id="races-loading" />;

  if (isError) return <ErrorCard id="races-error" message={error?.message} />;

  if (!data) return <NotFoundPage />;

  const roundsDone = Number(last?.round ?? 0);
  const sprints = data.filter((r) =>
    r.sessions.some((s) => s.name === "Sprint"),
  ).length;
  const finale = data[data.length - 1];

  return (
    <div id="races-page" className="detail-page">
      <DetailHero
        id="races-hero"
        eyebrow="Season calendar · 2026 season"
        title="Race calendar 2026"
        backdrop={String(data.length)}
      >
        <p id="races-hero-text" className="prose">
          From the first red light to the final chequered flag: street
          circuits, historic temples of speed and everything in between.
        </p>
      </DetailHero>

      <div id="races-content" className="page-container">
        <StatTiles
          id="races-tiles"
          tiles={[
            {
              key: "rounds",
              label: "Rounds",
              value: data.length,
              detail: `${sprints} sprint weekends`,
            },
            {
              key: "completed",
              label: "Completed",
              value: roundsDone,
              detail: `${data.length - roundsDone} to go`,
            },
            {
              key: "next",
              label: "Next race",
              value: next?.locality ?? "-",
              detail: next ? formatDate(next.date) : "Season complete",
            },
            {
              key: "finale",
              label: "Season finale",
              value: finale?.locality ?? "-",
              detail: finale ? formatDate(finale.date) : undefined,
            },
          ]}
        />

        <Section id="races-calendar" eyebrow="Calendar" title="Every round">
          <RacesTable data={data} winners={winners} />
        </Section>
      </div>

      <PageBanner
        id="races-info-banner"
        mirrored
        side="right"
        eyebrow="Every circuit has a personality"
        title="Tight corners, long straights, no second chances"
        text="Narrow street layouts punish the smallest mistake, fast sweeping bends reward bravery, and long straights are made for slipstreams. Open any race to meet the circuit: completed rounds tell how the afternoon unfolded, upcoming ones count down to lights out."
      />
    </div>
  );
};

export default RaceTablePage;
