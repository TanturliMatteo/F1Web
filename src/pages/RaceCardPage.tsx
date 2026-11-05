import type { CSSProperties } from "react";
import { useParams } from "react-router";
import { useRaces } from "../hooks/useRaces";
import { useRace } from "../hooks/useRace";
import { useResultsRace } from "../hooks/useResultsRace";
import DetailHero from "../components/ui/DetailHero";
import Section from "../components/ui/Section";
import StatTiles from "../components/ui/StatTiles";
import Podium, { type PodiumItem } from "../components/ui/Podium";
import RaceCardTable from "../components/ui/RaceCardTable";
import RaceCircuit from "../components/ui/RaceCircuit";
import RaceSchedule from "../components/ui/RaceSchedule";
import PageNav from "../components/ui/PageNav";
import { LoadingCard, ErrorCard } from "../components/ui/QueryState";
import NotFoundPage from "./NotFoundPage";
import type { Results } from "../services/ResultServices";
import { getNationToCode } from "../utils/nationalityCode";
import { getNationColor } from "../utils/nationColors";
import { flagUrl } from "../utils/flagUrl";
import { formatDate } from "../utils/formatDate";
import isRaceCompleted from "../utils/isRaceCompleted";
import { formatGain, isClassified } from "../utils/results";

const fullName = (r: Results) => `${r.givenName} ${r.familyName}`;

const toPodiumItem = (r: Results, position: string, detail: string, tone?: PodiumItem["tone"]) => ({
  position,
  code: r.code,
  name: fullName(r),
  detail,
  teamId: r.constructorId,
  tone,
});

const RaceCardPage = () => {
  const { id } = useParams();
  const { data: races } = useRaces();
  const { data: race, isLoading, isError, error } = useRace(id);
  const {
    data: results,
    isLoading: isResultsLoading,
    isError: isResultsError,
    error: resultsError,
  } = useResultsRace(id);

  if (isLoading || isResultsLoading)
    return <LoadingCard id="race-card-loading" />;

  if (isError || isResultsError)
    return (
      <ErrorCard
        id="race-card-error"
        message={(error ?? resultsError)?.message}
      />
    );

  if (!race) return <NotFoundPage />;

  const completed = isRaceCompleted(race.date, race.time);
  const classification = results ?? [];
  const hasResults = classification.length > 0;

  const winner = classification[0];
  const pole = classification.find((r) => r.grid === "1");
  const fastest = classification.find((r) => r.fastestLapRank === "1");
  const finishers = classification.filter((r) => isClassified(r.positionText));

  // Places gained from the grid: only classified cars that started from a slot
  const movers = finishers
    .filter((r) => Number(r.grid) > 0)
    .map((r) => ({ r, gain: Number(r.grid) - Number(r.position) }));
  const gainers = movers
    .filter((m) => m.gain > 0)
    .sort((a, b) => b.gain - a.gain)
    .slice(0, 3);
  const losers = movers
    .filter((m) => m.gain < 0)
    .sort((a, b) => a.gain - b.gain)
    .slice(0, 3);
  const moveDetail = (m: (typeof movers)[number]) =>
    `P${m.r.grid} → P${m.r.position}`;

  const index = races?.findIndex((r) => r.round === race.round) ?? -1;
  const neighbour = (offset: number) => {
    const r = index >= 0 ? races?.[index + offset] : undefined;
    return r
      ? { to: `/races/${r.round}`, label: `Round ${r.round}`, title: r.name }
      : null;
  };

  return (
    <div
      id="race-card-page"
      className="detail-page"
      style={{ "--accent": getNationColor(race.country) } as CSSProperties}
    >
      <DetailHero
        id="race-hero"
        eyebrow={`Round ${race.round} · 2026 season`}
        title={race.name}
        backdrop={race.round.padStart(2, "0")}
      >
        <p id="race-hero-meta" className="detail-hero-meta">
          <img
            src={flagUrl(getNationToCode(race.country))}
            alt=""
            className="flag"
          />
          <span>
            {race.locality}, {race.country}
          </span>
          <span>{formatDate(race.date)}</span>
        </p>
        <span
          id="race-hero-status"
          className={`status-badge status-badge--${completed ? "completed" : "next"}`}
        >
          {completed ? "Completed" : "Upcoming"}
        </span>
      </DetailHero>

      <div id="race-card-content" className="page-container">
        {hasResults && winner && (
          <>
            <StatTiles
              id="race-tiles"
              tiles={[
                {
                  key: "winner",
                  label: "Winner",
                  value: winner.familyName,
                  detail: winner.constructorName,
                },
                {
                  key: "pole",
                  label: "Pole position",
                  value: pole?.familyName ?? "-",
                  detail: pole?.constructorName,
                },
                {
                  key: "fastest-lap",
                  label: "Fastest lap",
                  value: fastest?.fastestLapTime ?? "-",
                  detail: fastest && fastest.familyName,
                },
                {
                  key: "finishers",
                  label: "Classified",
                  value: `${finishers.length}/${classification.length}`,
                  detail: `${classification.length - finishers.length} not classified`,
                },
              ]}
            />

            <Section id="race-story" eyebrow="How it went" title="The story of the race">
              <div className="ui-row ui-row--wrap ui-row--stretch">
                <Podium
                  id="race-podium"
                  title="Podium"
                  items={classification.slice(0, 3).map((r) =>
                    toPodiumItem(r, r.position, r.time !== "0" ? r.time : r.status),
                  )}
                />
                {gainers.length > 0 && (
                  <Podium
                    id="race-gainers"
                    title="Biggest climbers"
                    items={gainers.map((m) =>
                      toPodiumItem(m.r, formatGain(m.gain), moveDetail(m), "up"),
                    )}
                  />
                )}
                {losers.length > 0 && (
                  <Podium
                    id="race-losers"
                    title="Tough afternoon"
                    items={losers.map((m) =>
                      toPodiumItem(m.r, formatGain(m.gain), moveDetail(m), "down"),
                    )}
                  />
                )}
              </div>
            </Section>

            <Section id="race-classification" eyebrow="Official result" title="Full classification">
              <RaceCardTable data={classification} />
            </Section>
          </>
        )}

        {!hasResults && !completed && (
          <Section id="race-weekend" eyebrow="Race weekend" title="Get ready">
            <RaceSchedule race={race} />
          </Section>
        )}

        {!hasResults && completed && (
          <Section id="race-pending" eyebrow="Official result" title="Results on the way">
            <div className="ui-card">
              <p>
                The chequered flag has fallen: the classification will appear
                here as soon as it is published.
              </p>
            </div>
          </Section>
        )}

        <Section id="race-circuit-section" eyebrow="The venue" title="Meet the circuit">
          <RaceCircuit race={race} />
        </Section>

        <PageNav
          id="race-nav"
          ariaLabel="Other races in the calendar"
          prev={neighbour(-1)}
          next={neighbour(1)}
        />
      </div>
    </div>
  );
};

export default RaceCardPage;
