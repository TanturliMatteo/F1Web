import type { CSSProperties } from "react";
import { useParams } from "react-router";
import { usePilots } from "../hooks/usePilots";
import { usePilot } from "../hooks/usePilot";
import { useResultsPilot } from "../hooks/useResultsPilot";
import DetailHero from "../components/ui/DetailHero";
import Section from "../components/ui/Section";
import StatTiles from "../components/ui/StatTiles";
import ResultsStrip from "../components/ui/ResultsStrip";
import PointsChart from "../components/ui/PointsChart";
import GainsChart from "../components/ui/GainsChart";
import HeadToHead from "../components/ui/HeadToHead";
import PilotCardStats from "../components/ui/PilotCardStats";
import PageNav from "../components/ui/PageNav";
import { LoadingCard, ErrorCard } from "../components/ui/QueryState";
import NotFoundPage from "./NotFoundPage";
import getPilotPhoto from "../data/pilotPhoto";
import getPilotDescription from "../data/pilotDescriptions";
import getTeamColor from "../utils/teamColors";
import { flagUrl } from "../utils/flagUrl";
import { getNationalityToCode } from "../utils/nationalityCode";
import { ageFrom, formatDate } from "../utils/formatDate";

const PilotCardPage = () => {
  const { id } = useParams();
  const { data: standings } = usePilots();
  const { data: pilot, isError, isLoading, error } = usePilot(id);
  const {
    data: stats,
    isError: isStatsError,
    isLoading: isStatsLoading,
    error: statsError,
  } = useResultsPilot(id);

  if (isLoading || isStatsLoading)
    return <LoadingCard id="pilot-card-loading" />;

  if (isError || isStatsError)
    return (
      <ErrorCard
        id="pilot-card-error"
        message={(error ?? statsError)?.message}
      />
    );

  if (!pilot || !stats) return <NotFoundPage />;

  const fullName = `${pilot.name} ${pilot.surname}`;
  const teamColor = getTeamColor(pilot.constructorId);
  const photo = getPilotPhoto(pilot.code);
  const age = ageFrom(pilot.dateOfBirth);

  // Neighbours in the championship, for the bottom navigation
  const index = standings?.findIndex((p) => p.code === pilot.code) ?? -1;
  const neighbour = (offset: number) => {
    const p = index >= 0 ? standings?.[index + offset] : undefined;
    return p
      ? {
          to: `/pilots/${p.code.toLowerCase()}`,
          label: `P${p.position}`,
          title: `${p.name} ${p.surname}`,
        }
      : null;
  };

  return (
    <div
      id="pilot-card-page"
      className="detail-page"
      style={{ "--accent": teamColor } as CSSProperties}
    >
      <DetailHero
        id="pilot-hero"
        eyebrow={`${pilot.team} · 2026 season`}
        title={fullName}
        backdrop={pilot.permanentNumber}
        image={photo ? { src: photo, alt: fullName } : undefined}
      >
        <p id="pilot-hero-meta" className="detail-hero-meta">
          <img
            src={flagUrl(getNationalityToCode(pilot.nationality))}
            alt=""
            className="flag"
          />
          <span>{pilot.nationality}</span>
          <span>#{pilot.permanentNumber}</span>
          {age !== null && <span>{age} years old</span>}
        </p>
        <a
          id="pilot-hero-wikipedia"
          href={`https://en.wikipedia.org/wiki/${pilot.name}_${pilot.surname}`}
          target="_blank"
          rel="noreferrer"
          className="link-button"
        >
          Wikipedia ↗
        </a>
      </DetailHero>

      <div id="pilot-card-content" className="page-container">
        <StatTiles
          id="pilot-tiles"
          tiles={[
            { key: "position", label: "Championship", value: `P${pilot.position}` },
            { key: "points", label: "Points", value: pilot.points },
            { key: "wins", label: "Wins", value: stats.wins },
            { key: "podiums", label: "Podiums", value: stats.podiums },
            { key: "poles", label: "Poles", value: stats.poles },
            { key: "fastest-laps", label: "Fastest laps", value: stats.fastestLaps },
          ]}
        />

        <Section id="pilot-profile" eyebrow="Profile" title={`Meet ${pilot.name}`}>
          <div className="ui-row ui-row--stretch">
            <div id="pilot-profile-description" className="ui-card ui-grow-2">
              <p className="prose">{getPilotDescription(pilot.code)}</p>
            </div>
            <dl id="pilot-profile-facts" className="ui-card info-list ui-grow-1">
              <div>
                <dt>Team</dt>
                <dd>{pilot.team}</dd>
              </div>
              <div>
                <dt>Nationality</dt>
                <dd>{pilot.nationality}</dd>
              </div>
              <div>
                <dt>Born</dt>
                <dd>{formatDate(pilot.dateOfBirth)}</dd>
              </div>
              <div>
                <dt>Car number</dt>
                <dd>{pilot.permanentNumber}</dd>
              </div>
              <div>
                <dt>Races this season</dt>
                <dd>{stats.totalRaces}</dd>
              </div>
            </dl>
          </div>
        </Section>

        <Section id="pilot-season" eyebrow="Race by race" title="The season so far">
          <div className="ui-stack">
            <ResultsStrip id="pilot-results-strip" races={stats.races} />
            <div className="ui-row ui-row--stretch w-100">
              <div className="ui-grow-1">
                <PointsChart
                  id="pilot-points-chart"
                  title="Grand Prix points"
                  xLabels={stats.races.map((r) => r.round)}
                  series={[
                    {
                      key: "driver",
                      label: pilot.code,
                      color: teamColor,
                      values: stats.races.map((r) => r.cumulativePoints),
                    },
                    ...(stats.teammate
                      ? [
                          {
                            key: "teammate",
                            label: stats.teammate.code,
                            color: "var(--color-text-muted)",
                            values: stats.races.map(
                              (r) => r.teammateCumulativePoints,
                            ),
                            dashed: true,
                          },
                        ]
                      : []),
                  ]}
                />
              </div>
              <div className="ui-grow-1">
                <GainsChart
                  id="pilot-gains-chart"
                  title="Grid to flag"
                  races={stats.races}
                />
              </div>
            </div>
          </div>
        </Section>

        {stats.teammate && (
          <Section
            id="pilot-teammate"
            eyebrow="Same car, different driver"
            title="Teammate battle"
          >
            <HeadToHead
              id="pilot-h2h"
              driver={{ code: pilot.code, name: fullName }}
              teammate={stats.teammate}
              rows={stats.headToHead}
            />
          </Section>
        )}

        <Section id="pilot-performance" eyebrow="Under the numbers" title="Performance">
          <PilotCardStats stats={stats} />
        </Section>

        <PageNav
          id="pilot-nav"
          ariaLabel="Other drivers in the standings"
          prev={neighbour(-1)}
          next={neighbour(1)}
        />
      </div>
    </div>
  );
};

export default PilotCardPage;
