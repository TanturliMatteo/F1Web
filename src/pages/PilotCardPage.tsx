import type { CSSProperties } from "react";
import { useParams } from "react-router";
import { usePilot, usePilots } from "../hooks/queries";
import { useResultsPilot } from "../hooks/useResultsPilot";
import type { PilotStandings } from "../services/PilotStandingsServices";
import DetailHero from "../components/ui/DetailHero";
import Section from "../components/ui/Section";
import StatTiles from "../components/ui/StatTiles";
import ResultsStrip from "../components/ui/ResultsStrip";
import PointsChart from "../components/ui/PointsChart";
import GainsChart from "../components/ui/GainsChart";
import HeadToHead from "../components/ui/HeadToHead";
import PilotCardStats from "../components/ui/PilotCardStats";
import PageNav from "../components/ui/PageNav";
import Flag from "../components/ui/Flag";
import { LoadingCard, ErrorCard } from "../components/ui/QueryState";
import NotFoundPage from "./NotFoundPage";
import getPilotPhoto from "../data/pilotPhoto";
import getTeamColor from "../utils/teamColors";
import { ageFrom, formatDate } from "../utils/formatDate";
import { adjacent } from "../utils/adjacent";
import { useI18n } from "../i18n/i18n";

const PilotCardPage = () => {
  const { t, locale, pilotDescription } = useI18n();
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
  const { prev, next } = adjacent(standings, (p) => p.code === pilot.code);
  const navTarget = (p?: PilotStandings) =>
    p && {
      to: `/pilots/${p.code.toLowerCase()}`,
      label: `P${p.position}`,
      title: `${p.name} ${p.surname}`,
    };

  return (
    <div
      id="pilot-card-page"
      className="detail-page"
      style={{ "--accent": teamColor } as CSSProperties}
    >
      <DetailHero
        id="pilot-hero"
        eyebrow={t("pilot.heroEyebrow", { team: pilot.team })}
        title={fullName}
        backdrop={pilot.permanentNumber}
        image={photo ? { src: photo, alt: fullName } : undefined}
      >
        <p id="pilot-hero-meta" className="detail-hero-meta">
          <Flag nationality={pilot.nationality} />
          <span>{pilot.nationality}</span>
          <span>#{pilot.permanentNumber}</span>
          {age !== null && <span>{t("pilot.yearsOld", { age })}</span>}
        </p>
        <a
          id="pilot-hero-wikipedia"
          href={`https://en.wikipedia.org/wiki/${pilot.name}_${pilot.surname}`}
          target="_blank"
          rel="noreferrer"
          className="link-button"
        >
          {t("pilot.wikipedia")}
        </a>
      </DetailHero>

      <div id="pilot-card-content" className="page-container">
        <StatTiles
          id="pilot-tiles"
          tiles={[
            {
              key: "position",
              label: t("pilot.tiles.championship"),
              value: `P${pilot.position}`,
            },
            {
              key: "points",
              label: t("pilot.tiles.points"),
              value: pilot.points,
            },
            { key: "wins", label: t("pilot.tiles.wins"), value: stats.wins },
            {
              key: "podiums",
              label: t("pilot.tiles.podiums"),
              value: stats.podiums,
            },
            { key: "poles", label: t("pilot.tiles.poles"), value: stats.poles },
            {
              key: "fastest-laps",
              label: t("pilot.tiles.fastestLaps"),
              value: stats.fastestLaps,
            },
          ]}
        />

        <Section
          id="pilot-profile"
          eyebrow={t("pilot.profile.eyebrow")}
          title={t("pilot.profile.title", { name: pilot.name })}
        >
          <div className="ui-row ui-row--stretch">
            <div id="pilot-profile-description" className="ui-card ui-grow-2">
              <p className="prose">{pilotDescription(pilot.code)}</p>
            </div>
            <dl
              id="pilot-profile-facts"
              className="ui-card info-list ui-grow-1"
            >
              <div>
                <dt>{t("pilot.profile.team")}</dt>
                <dd>{pilot.team}</dd>
              </div>
              <div>
                <dt>{t("pilot.profile.nationality")}</dt>
                <dd>{pilot.nationality}</dd>
              </div>
              <div>
                <dt>{t("pilot.profile.born")}</dt>
                <dd>{formatDate(pilot.dateOfBirth, locale)}</dd>
              </div>
              <div>
                <dt>{t("pilot.profile.carNumber")}</dt>
                <dd>{pilot.permanentNumber}</dd>
              </div>
              <div>
                <dt>{t("pilot.profile.races")}</dt>
                <dd>{stats.totalRaces}</dd>
              </div>
            </dl>
          </div>
        </Section>

        <Section
          id="pilot-season"
          eyebrow={t("pilot.season.eyebrow")}
          title={t("pilot.season.title")}
        >
          <div className="ui-stack">
            <ResultsStrip id="pilot-results-strip" races={stats.races} />
            <div className="ui-row ui-row--stretch w-100">
              <div className="ui-grow-1">
                <PointsChart
                  id="pilot-points-chart"
                  title={t("pilot.season.pointsChart")}
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
                  title={t("pilot.season.gainsChart")}
                  races={stats.races}
                />
              </div>
            </div>
          </div>
        </Section>

        {stats.teammate && (
          <Section
            id="pilot-teammate"
            eyebrow={t("pilot.teammate.eyebrow")}
            title={t("pilot.teammate.title")}
          >
            <HeadToHead
              id="pilot-h2h"
              driver={{ code: pilot.code, name: fullName }}
              teammate={stats.teammate}
              rows={stats.headToHead}
            />
          </Section>
        )}

        <Section
          id="pilot-performance"
          eyebrow={t("pilot.performance.eyebrow")}
          title={t("pilot.performance.title")}
        >
          <PilotCardStats stats={stats} />
        </Section>

        <PageNav
          id="pilot-nav"
          ariaLabel={t("pilot.navLabel")}
          prev={navTarget(prev)}
          next={navTarget(next)}
        />
      </div>
    </div>
  );
};

export default PilotCardPage;
