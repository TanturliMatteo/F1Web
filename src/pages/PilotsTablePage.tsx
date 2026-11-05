import { useState } from "react";
import PageBanner from "../components/ui/PageBanner";
import PilotsTable from "../components/ui/PilotsTable";
import DetailHero from "../components/ui/DetailHero";
import Section from "../components/ui/Section";
import StatTiles from "../components/ui/StatTiles";
import { LoadingCard, ErrorCard } from "../components/ui/QueryState";
import { usePilots, useRaces } from "../hooks/queries";
import { useRaceStatus } from "../hooks/useRaceStatus";
import { useI18n } from "../i18n/i18n";
import NotFoundPage from "./NotFoundPage";

const PilotsTablePage = () => {
  const { t } = useI18n();
  const { data, isLoading, isError, error } = usePilots();
  const { data: races } = useRaces();
  const { last } = useRaceStatus();
  const [search, setSearch] = useState("");

  if (isLoading) return <LoadingCard id="pilots-loading" />;

  if (isError) return <ErrorCard id="pilots-error" message={error?.message} />;

  if (!data) return <NotFoundPage />;

  const term = search.trim().toLowerCase();
  const filtered = data.filter((p) =>
    `${p.name} ${p.surname} ${p.team}`.toLowerCase().includes(term),
  );

  const [leader, second] = data;
  const leaderPoints = leader?.points ?? 0;
  const roundsDone = Number(last?.round ?? 0);
  const totalRounds = races?.length ?? 0;
  const winners = data.filter((p) => p.wins > 0).length;

  return (
    <div id="pilots-page" className="detail-page">
      <DetailHero
        id="pilots-hero"
        eyebrow={t("pilots.heroEyebrow")}
        title={t("pilots.heroTitle")}
        backdrop="P1"
      >
        <p id="pilots-hero-text" className="prose">
          {t("pilots.heroText")}
        </p>
      </DetailHero>

      <div id="pilots-content" className="page-container">
        {leader && (
          <StatTiles
            id="pilots-tiles"
            tiles={[
              {
                key: "leader",
                label: t("pilots.tiles.leader"),
                value: leader.surname,
                detail: `${leader.points} ${t("common.pts")} · ${leader.team}`,
              },
              {
                key: "gap",
                label: t("pilots.tiles.lead"),
                value: second ? `+${leaderPoints - second.points}` : "-",
                detail: second
                  ? t("pilots.tiles.leadOver", { name: second.surname })
                  : undefined,
              },
              {
                key: "rounds",
                label: t("pilots.tiles.roundsRun"),
                value: totalRounds
                  ? `${roundsDone}/${totalRounds}`
                  : roundsDone,
                detail: totalRounds
                  ? t("pilots.tiles.toGo", { count: totalRounds - roundsDone })
                  : undefined,
              },
              {
                key: "winners",
                label: t("pilots.tiles.raceWinners"),
                value: winners,
                detail: t("pilots.tiles.differentDrivers"),
              },
            ]}
          />
        )}

        <Section
          id="pilots-standings"
          eyebrow={t("pilots.sectionEyebrow")}
          title={t("pilots.sectionTitle")}
        >
          <div className="ui-stack">
            <input
              id="pilots-search"
              type="search"
              className="search-input"
              placeholder={t("pilots.search")}
              aria-label={t("pilots.search")}
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
        eyebrow={t("pilots.banner.eyebrow")}
        title={t("pilots.banner.title")}
        text={t("pilots.banner.text")}
      >
        <p id="pilots-points-banner-rules" className="banner-text">
          {t("pilots.banner.rules")}
        </p>
      </PageBanner>
    </div>
  );
};

export default PilotsTablePage;
