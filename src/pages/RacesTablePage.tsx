import { useMemo } from "react";
import PageBanner from "../components/ui/PageBanner";
import RacesTable from "../components/ui/RacesTable";
import DetailHero from "../components/ui/DetailHero";
import Section from "../components/ui/Section";
import StatTiles from "../components/ui/StatTiles";
import { LoadingCard, ErrorCard } from "../components/ui/QueryState";
import { useRaces, useResults } from "../hooks/queries";
import { useRaceStatus } from "../hooks/useRaceStatus";
import type { Results } from "../services/ResultServices";
import { formatDate } from "../utils/formatDate";
import { useI18n } from "../i18n/i18n";
import NotFoundPage from "./NotFoundPage";

const RaceTablePage = () => {
  const { t, locale } = useI18n();
  const { data, isError, isLoading, error } = useRaces();
  const { data: results } = useResults();
  const { next, last } = useRaceStatus();

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
    r.sessions.some((s) => s.key === "sprint"),
  ).length;
  const finale = data[data.length - 1];

  return (
    <div id="races-page" className="detail-page">
      <DetailHero
        id="races-hero"
        eyebrow={t("races.heroEyebrow")}
        title={t("races.heroTitle")}
        backdrop={String(data.length)}
      >
        <p id="races-hero-text" className="prose">
          {t("races.heroText")}
        </p>
      </DetailHero>

      <div id="races-content" className="page-container">
        <StatTiles
          id="races-tiles"
          tiles={[
            {
              key: "rounds",
              label: t("races.tiles.rounds"),
              value: data.length,
              detail: t("races.tiles.sprintWeekends", { count: sprints }),
            },
            {
              key: "completed",
              label: t("races.tiles.completed"),
              value: roundsDone,
              detail: t("races.tiles.toGo", {
                count: data.length - roundsDone,
              }),
            },
            {
              key: "next",
              label: t("races.tiles.nextRace"),
              value: next?.locality ?? "-",
              detail: next
                ? formatDate(next.date, locale)
                : t("races.tiles.seasonComplete"),
            },
            {
              key: "finale",
              label: t("races.tiles.finale"),
              value: finale?.locality ?? "-",
              detail: finale ? formatDate(finale.date, locale) : undefined,
            },
          ]}
        />

        <Section
          id="races-calendar"
          eyebrow={t("races.sectionEyebrow")}
          title={t("races.sectionTitle")}
        >
          <RacesTable data={data} winners={winners} />
        </Section>
      </div>

      <PageBanner
        id="races-info-banner"
        mirrored
        side="right"
        eyebrow={t("races.banner.eyebrow")}
        title={t("races.banner.title")}
        text={t("races.banner.text")}
      />
    </div>
  );
};

export default RaceTablePage;
