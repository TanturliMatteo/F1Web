import { useMemo } from "react";
import { useRaces, useResults } from "./queries";
import type { Results } from "../services/ResultServices";
import { isClassified, placesGained } from "../utils/results";

// Max points from a Grand Prix since 2025 (no more fastest-lap point).
// Sprint points are not part of the race results, so they are left out.
const MAX_POINTS_PER_RACE = 25;

type RaceRow = Pick<Results, "position" | "positionText" | "grid" | "points">;

export interface PilotRace extends RaceRow {
  round: string;
  raceName: string;
  classified: boolean;
  // grid - finish: positive when places were gained. null for retirements
  // and pit-lane starts, where the number would only be noise
  gained: number | null;
  cumulativePoints: number;
  // Main teammate's running total, aligned with this round (chart series)
  teammateCumulativePoints: number;
  // Whoever drove the sister car in this round
  teammate: Results | null;
}

type HeadToHeadKey =
  | "raceAhead"
  | "gridAhead"
  | "points"
  | "podiums"
  | "pointsFinishes";

// key: translation key under pilot.teammate.rows
export interface HeadToHeadRow {
  key: HeadToHeadKey;
  mine: number;
  theirs: number;
}

const isPodium = (r: RaceRow) =>
  isClassified(r.positionText) && r.position <= 3;

// What one driver scores against the other in a single race. Applied both
// ways round, so the two columns of the head-to-head are always symmetric.
const HEAD_TO_HEAD: Array<
  [HeadToHeadKey, (me: RaceRow, other: RaceRow) => number]
> = [
  ["raceAhead", (me, other) => Number(me.position < other.position)],
  [
    "gridAhead",
    (me, other) =>
      Number(me.grid > 0 && other.grid > 0 && me.grid < other.grid),
  ],
  ["points", (me) => me.points],
  ["podiums", (me) => Number(isPodium(me))],
  ["pointsFinishes", (me) => Number(me.points > 0)],
];

const sum = <T>(items: T[], value: (item: T) => number) =>
  items.reduce((total, item) => total + value(item), 0);
const average = (values: number[]) =>
  values.length ? (sum(values, (v) => v) / values.length).toFixed(2) : "-";
const percent = (part: number, total: number) =>
  total ? Math.round((part / total) * 100) : 0;

function buildPilotStats(all: Results[], code: string, seasonRaces: number) {
  const isMe = (r: Results) => r.code.toLowerCase() === code.toLowerCase();
  const mine = all
    .filter(isMe)
    .sort((a, b) => Number(a.round) - Number(b.round));

  if (mine.length === 0) return null;

  // Main teammate: who shared the current car for the most rounds
  const currentTeam = mine[mine.length - 1].constructorId;
  const mateRows = new Map<string, Results[]>();
  all
    .filter((r) => r.constructorId === currentTeam && !isMe(r))
    .forEach((r) => mateRows.set(r.code, [...(mateRows.get(r.code) ?? []), r]));
  const mate = [...mateRows.values()].sort((a, b) => b.length - a.length)[0];
  const matePoints = new Map(mate?.map((r) => [r.round, r.points]));

  let total = 0;
  let mateTotal = 0;
  const races: PilotRace[] = mine.map((r) => {
    const classified = isClassified(r.positionText);
    total += r.points;
    mateTotal += matePoints.get(r.round) ?? 0;

    return {
      round: r.round,
      raceName: r.raceName,
      position: r.position,
      positionText: r.positionText,
      grid: r.grid,
      points: r.points,
      classified,
      gained: placesGained(r),
      cumulativePoints: total,
      teammateCumulativePoints: mateTotal,
      teammate:
        all.find(
          (t) =>
            t.round === r.round &&
            t.constructorId === r.constructorId &&
            !isMe(t),
        ) ?? null,
    };
  });

  // Head-to-head only counts rounds against the main teammate, the one named
  // in its header: races against a stand-in are left out
  const mateCode = mate?.[0].code;
  const shared = races.flatMap((r) =>
    r.teammate && r.teammate.code === mateCode
      ? [{ me: r, other: r.teammate }]
      : [],
  );
  const headToHead: HeadToHeadRow[] = HEAD_TO_HEAD.map(([key, score]) => ({
    key,
    mine: sum(shared, ({ me, other }) => score(me, other)),
    theirs: sum(shared, ({ me, other }) => score(other, me)),
  }));

  const classifiedRaces = races.filter((r) => r.classified);
  const gains = races.flatMap((r) => (r.gained === null ? [] : [r.gained]));
  const roundsRun = new Set(all.map((r) => r.round)).size;
  const maxPoints = races.length * MAX_POINTS_PER_RACE;

  return {
    races,
    teammate: mate
      ? {
          code: mate[0].code,
          name: `${mate[0].givenName} ${mate[0].familyName}`,
        }
      : null,
    headToHead,
    wins: races.filter((r) => r.classified && r.position === 1).length,
    podiums: races.filter(isPodium).length,
    poles: races.filter((r) => r.grid === 1).length,
    fastestLaps: mine.filter((r) => r.fastestLapRank === 1).length,
    bestFinish: classifiedRaces.length
      ? `P${Math.min(...classifiedRaces.map((r) => r.position))}`
      : "-",
    averageFinish: average(classifiedRaces.map((r) => r.position)),
    averageGrid: average(races.filter((r) => r.grid > 0).map((r) => r.grid)),
    positionsGained: average(gains),
    dnfs: races.length - classifiedRaces.length,
    totalRaces: races.length,
    // Share of races finished in the points / classified at the flag
    pointsFinishRate: percent(
      races.filter((r) => r.points > 0).length,
      races.length,
    ),
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
  const seasonRaces = useRaces().data?.length ?? 0;

  const data = useMemo(
    () =>
      query.data && code
        ? buildPilotStats(query.data, code, seasonRaces)
        : null,
    [query.data, code, seasonRaces],
  );

  return { ...query, data };
}
