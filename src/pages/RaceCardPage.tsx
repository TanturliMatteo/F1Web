import type { CSSProperties } from "react";
import { useParams } from "react-router";
import { useRace, useRaces, useResultsRace } from "../hooks/queries";
import DetailHero from "../components/ui/DetailHero";
import Section from "../components/ui/Section";
import StatTiles from "../components/ui/StatTiles";
import Podium, { type PodiumItem } from "../components/ui/Podium";
import RaceCardTable from "../components/ui/RaceCardTable";
import RaceCircuit from "../components/ui/RaceCircuit";
import RaceSchedule from "../components/ui/RaceSchedule";
import PageNav from "../components/ui/PageNav";
import Flag from "../components/ui/Flag";
import { LoadingCard, ErrorCard } from "../components/ui/QueryState";
import NotFoundPage from "./NotFoundPage";
import type { Results } from "../services/ResultServices";
import type { Race } from "../services/RacesServices";
import { getNationColor } from "../utils/nationColors";
import { formatDate } from "../utils/formatDate";
import isRaceCompleted from "../utils/isRaceCompleted";
import { formatGain } from "../utils/results";
import { summarizeRace, timeOrStatus, type Mover } from "../utils/raceSummary";
import { adjacent } from "../utils/adjacent";
import { useI18n } from "../i18n/i18n";

const toPodiumItem = (
  r: Results,
  position: string,
  detail: string,
  tone?: PodiumItem["tone"],
): PodiumItem => ({
  position,
  code: r.code,
  name: `${r.givenName} ${r.familyName}`,
  detail,
  teamId: r.constructorId,
  tone,
});

const moverItem = ({ result, gain }: Mover) =>
  toPodiumItem(
    result,
    formatGain(gain),
    `P${result.grid} → P${result.position}`,
    gain > 0 ? "up" : "down",
  );

const RaceCardPage = () => {
  const { t, locale } = useI18n();
  const { id } = useParams();
  const { data: races } = useRaces();
  const race = useRace(id);
  const results = useResultsRace(id);

  if (race.isLoading || results.isLoading)
    return <LoadingCard id="race-card-loading" />;

  if (race.isError || results.isError)
    return (
      <ErrorCard
        id="race-card-error"
        message={(race.error ?? results.error)?.message}
      />
    );

  if (!race.data) return <NotFoundPage />;

  const { round, name, country, locality, date, time } = race.data;
  const completed = isRaceCompleted(date, time);
  const classification = results.data ?? [];
  const summary = classification.length ? summarizeRace(classification) : null;

  const { prev, next } = adjacent(races, (r) => r.round === round);
  const navTarget = (r?: Race) =>
    r && {
      to: `/races/${r.round}`,
      label: t("race.roundLabel", { round: r.round }),
      title: r.name,
    };

  return (
    <div
      id="race-card-page"
      className="detail-page"
      style={{ "--accent": getNationColor(country) } as CSSProperties}
    >
      <DetailHero
        id="race-hero"
        eyebrow={t("race.heroEyebrow", { round })}
        title={name}
        backdrop={round.padStart(2, "0")}
      >
        <p id="race-hero-meta" className="detail-hero-meta">
          <Flag country={country} />
          <span>
            {locality}, {country}
          </span>
          <span>{formatDate(date, locale)}</span>
        </p>
        <span
          id="race-hero-status"
          className={`status-badge status-badge--${completed ? "completed" : "next"}`}
        >
          {t(completed ? "status.completed" : "status.upcoming")}
        </span>
      </DetailHero>

      <div id="race-card-content" className="page-container">
        {summary && (
          <>
            <StatTiles
              id="race-tiles"
              tiles={[
                {
                  key: "winner",
                  label: t("race.tiles.winner"),
                  value: summary.winner.familyName,
                  detail: summary.winner.constructorName,
                },
                {
                  key: "pole",
                  label: t("race.tiles.pole"),
                  value: summary.pole?.familyName ?? "-",
                  detail: summary.pole?.constructorName,
                },
                {
                  key: "fastest-lap",
                  label: t("race.tiles.fastestLap"),
                  value: summary.fastest?.fastestLapTime ?? "-",
                  detail: summary.fastest?.familyName,
                },
                {
                  key: "finishers",
                  label: t("race.tiles.classified"),
                  value: `${summary.finishers}/${classification.length}`,
                  detail: t("race.tiles.notClassified", {
                    count: summary.notClassified,
                  }),
                },
              ]}
            />

            <Section
              id="race-story"
              eyebrow={t("race.story.eyebrow")}
              title={t("race.story.title")}
            >
              <div className="ui-row ui-row--wrap ui-row--stretch">
                <Podium
                  id="race-podium"
                  title={t("race.story.podium")}
                  items={summary.podium.map((r) =>
                    toPodiumItem(r, String(r.position), timeOrStatus(r)),
                  )}
                />
                {summary.gainers.length > 0 && (
                  <Podium
                    id="race-gainers"
                    title={t("race.story.climbers")}
                    items={summary.gainers.map(moverItem)}
                  />
                )}
                {summary.losers.length > 0 && (
                  <Podium
                    id="race-losers"
                    title={t("race.story.tough")}
                    items={summary.losers.map(moverItem)}
                  />
                )}
              </div>
            </Section>

            <Section
              id="race-classification"
              eyebrow={t("race.classification.eyebrow")}
              title={t("race.classification.title")}
            >
              <RaceCardTable data={classification} />
            </Section>
          </>
        )}

        {!summary && !completed && (
          <Section
            id="race-weekend"
            eyebrow={t("race.weekend.eyebrow")}
            title={t("race.weekend.title")}
          >
            <RaceSchedule race={race.data} />
          </Section>
        )}

        {!summary && completed && (
          <Section
            id="race-pending"
            eyebrow={t("race.pending.eyebrow")}
            title={t("race.pending.title")}
          >
            <div className="ui-card">
              <p>{t("race.pending.text")}</p>
            </div>
          </Section>
        )}

        <Section
          id="race-circuit-section"
          eyebrow={t("race.circuit.eyebrow")}
          title={t("race.circuit.title")}
        >
          <RaceCircuit race={race.data} />
        </Section>

        <PageNav
          id="race-nav"
          ariaLabel={t("race.navLabel")}
          prev={navTarget(prev)}
          next={navTarget(next)}
        />
      </div>
    </div>
  );
};

export default RaceCardPage;
