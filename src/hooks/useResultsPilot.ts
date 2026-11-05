import { useMemo } from "react";
import { useResults } from "./useResults";
import { useRaces } from "./useRaces";
import type { Results } from "../services/ResultServices";
import { isClassified } from "../utils/results";

// Max points from a Grand Prix since 2025 (no more fastest-lap point).
// Sprint points are not part of the race results, so they are left out.
const MAX_POINTS_PER_RACE = 25;

export interface TeammateRace {
  code: string;
  position: number;
  positionText: string;
  grid: number;
  points: number;
}

export interface PilotRace {
  round: string;
  raceName: string;
  position: number;
  positionText: string;
  grid: number;
  points: number;
  classified: boolean;
  // grid - finish: positive when places were gained. null for retirements
  // and pit-lane starts, where the number would only be noise
  gained: number | null;
  cumulativePoints: number;
  // Main teammate's running total, aligned with this round (chart series)
  teammateCumulativePoints: number;
  // Whoever drove the sister car in this round
  teammate: TeammateRace | null;
}

export interface HeadToHeadRow {
  label: string;
  mine: number;
  theirs: number;
}

const toNumber = (value: string) => Number(value) || 0;
const sameCode = (a: string, b: string) =>
  a.toLowerCase().trim() === b.toLowerCase().trim();
const average = (values: number[]) =>
  values.length
    ? (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(2)
    : "-";
const percent = (part: number, total: number) =>
  total ? Math.round((part / total) * 100) : 0;

function buildPilotStats(all: Results[], code: string, seasonRaces: number) {
  const mine = all
    .filter((r) => sameCode(r.code, code))
    .sort((a, b) => toNumber(a.round) - toNumber(b.round));

  if (mine.length === 0) return null;

  const current = mine[mine.length - 1];

  // Main teammate: who shared the current car for the most rounds
  const mateCounts = new Map<string, Results>();
  const counts = new Map<string, number>();
  all.forEach((r) => {
    if (r.constructorId !== current.constructorId || sameCode(r.code, code))
      return;
    counts.set(r.code, (counts.get(r.code) ?? 0) + 1);
    mateCounts.set(r.code, r);
  });
  const mateCode = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  const mateRow = mateCode ? mateCounts.get(mateCode) : undefined;
  const mateByRound = new Map(
    all.filter((r) => r.code === mateCode).map((r) => [r.round, r]),
  );

  let total = 0;
  let mateTotal = 0;
  const races: PilotRace[] = mine.map((r) => {
    const position = toNumber(r.position);
    const grid = toNumber(r.grid);
    const points = toNumber(r.points);
    const classified = isClassified(r.positionText);
    total += points;
    mateTotal += toNumber(mateByRound.get(r.round)?.points ?? "0");

    const sister = all.find(
      (t) =>
        t.round === r.round &&
        t.constructorId === r.constructorId &&
        !sameCode(t.code, code),
    );

    return {
      round: r.round,
      raceName: r.raceName,
      position,
      positionText: r.positionText,
      grid,
      points,
      classified,
      gained: classified && grid > 0 ? grid - position : null,
      cumulativePoints: total,
      teammateCumulativePoints: mateTotal,
      teammate: sister
        ? {
            code: sister.code,
            position: toNumber(sister.position),
            positionText: sister.positionText,
            grid: toNumber(sister.grid),
            points: toNumber(sister.points),
          }
        : null,
    };
  });

  // Head-to-head only counts rounds where both cars took part
  const shared = races.filter((r) => r.teammate);
  const h2h = (mineOf: (r: PilotRace) => number, theirsOf: (r: PilotRace) => number) => ({
    mine: shared.reduce((sum, r) => sum + mineOf(r), 0),
    theirs: shared.reduce((sum, r) => sum + theirsOf(r), 0),
  });
  const mate = (r: PilotRace) => r.teammate!;
  const bothStarted = (r: PilotRace) => r.grid > 0 && mate(r).grid > 0;
  const isPodium = (p: number, text: string) => isClassified(text) && p <= 3;

  const headToHead: HeadToHeadRow[] = [
    {
      label: "Race finishes ahead",
      ...h2h(
        (r) => Number(r.position < mate(r).position),
        (r) => Number(mate(r).position < r.position),
      ),
    },
    {
      label: "Starts ahead on the grid",
      ...h2h(
        (r) => Number(bothStarted(r) && r.grid < mate(r).grid),
        (r) => Number(bothStarted(r) && mate(r).grid < r.grid),
      ),
    },
    { label: "Points", ...h2h((r) => r.points, (r) => mate(r).points) },
    {
      label: "Podiums",
      ...h2h(
        (r) => Number(isPodium(r.position, r.positionText)),
        (r) => Number(isPodium(mate(r).position, mate(r).positionText)),
      ),
    },
    {
      label: "Points finishes",
      ...h2h(
        (r) => Number(r.points > 0),
        (r) => Number(mate(r).points > 0),
      ),
    },
  ];

  const classifiedRaces = races.filter((r) => r.classified);
  const gains = races.flatMap((r) => (r.gained === null ? [] : [r.gained]));
  const roundsRun = new Set(all.map((r) => r.round)).size;
  const maxPoints = races.length * MAX_POINTS_PER_RACE;

  return {
    races,
    teammate:
      mateRow && mateCode
        ? {
            code: mateCode,
            name: `${mateRow.givenName} ${mateRow.familyName}`,
            constructorId: mateRow.constructorId,
          }
        : null,
    headToHead,
    wins: races.filter((r) => r.classified && r.position === 1).length,
    podiums: races.filter((r) => isPodium(r.position, r.positionText)).length,
    poles: races.filter((r) => r.grid === 1).length,
    fastestLaps: mine.filter((r) => r.fastestLapRank === "1").length,
    racePoints: total,
    bestFinish: classifiedRaces.length
      ? `P${Math.min(...classifiedRaces.map((r) => r.position))}`
      : "-",
    averageFinish: average(classifiedRaces.map((r) => r.position)),
    averageGrid: average(races.filter((r) => r.grid > 0).map((r) => r.grid)),
    positionsGained: average(gains),
    dnfs: races.length - classifiedRaces.length,
    totalRaces: races.length,
    // Share of races finished in the points / classified at the flag
    pointsFinishRate: percent(races.filter((r) => r.points > 0).length, races.length),
    finishRate: percent(classifiedRaces.length, races.length),
    // Share of the points that were on offer in the races driven
    pointsToMax: percent(total, maxPoints),
    maxPoints,
    pointsLost: maxPoints - total,
    remainingPoints: Math.max(0, seasonRaces - roundsRun) * MAX_POINTS_PER_RACE,
  };
}

export type PilotStats = NonNullable<ReturnType<typeof buildPilotStats>>;

export function useResultsPilot(code?: string) {
  const query = useResults();
  const { data: races } = useRaces();
  const seasonRaces = races?.length ?? 0;

  const data = useMemo(
    () => (query.data && code ? buildPilotStats(query.data, code, seasonRaces) : null),
    [query.data, code, seasonRaces],
  );

  return {
    ...query,
    isLoading: query.isLoading || !code,
    data,
  };
}
