import { useEffect, useState } from "react";
import { fetchResults } from "../services/ResultServices";
import { normalize } from "../utils/normalizeString";

type PilotResultDataPartial = {
  position: string;
  points: string;
  grid: string;
  status: string;

  Driver: {
    driverId: string;
    code?: string;
    givenName: string;
    familyName: string;
    nationality: string;
  };

  Constructor: {
    name: string;
  };

  laps: string;

  FastestLap?: {
    rank: string;
    lap: string;
    Time: {
      time: string;
    };
    AverageSpeed?: {
      speed: string;
      units: string;
    };
  };
};

type PilotResultData = {
  round: string;
  raceName: string;
  Results: PilotResultDataPartial[];
};

export type PilotResult = {
  wins: number;
  podiums: number;
  fastestLaps: number;
  poles: number;
  totalPoints: number;
  bestFinish: number;
  averageFinish: number;
  averageGrid: number;
  positionsGained: number;
  dnfs: number;
  racesCompleted: number;
  totalRaces: number;
};

type SimpleResult = {
  position: number;
  points: number;
  grid: number;
  status: string;
  rank: number;
};

export function usePilotStats(driverCode?: string) {
  const [data, setData] = useState<PilotResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!driverCode) {
          setData(null);

          setLoading(false);
          return;
        }

        const result = await fetchResults();
        const races: PilotResultData[] = result.MRData.RaceTable.Races;

        const formatted = races.flatMap((race) =>
          race.Results.filter(
            (r) =>
              normalize(r.Driver.code ?? r.Driver.driverId) ===
              normalize(driverCode),
          ).map((r) => ({
            position: Number(r.position ?? "0"),
            points: Number(r.points ?? "0"),
            grid: Number(r.grid ?? "0"),
            status: r.status ?? "Unknown",
            rank: Number(r.FastestLap?.rank ?? "0"),
          })),
        );

        if (formatted.length === 0) {
          setData(null);
          return;
        }

        setData(calculateStats(formatted));
      } catch (err) {
        if (err instanceof Error) setError(err);
        else setError(new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [driverCode]);

  return { data, loading, error };
}

function calculateStats(results: SimpleResult[]): PilotResult {
  const wins = results.filter((p) => p.position === 1).length;
  const podiums = results.filter((p) => p.position <= 3).length;
  const fastestLaps = results.filter((p) => p.rank === 1).length;
  const poles = results.filter((p) => p.grid === 1).length;
  const totalPoints = results.reduce((sum, p) => sum + p.points, 0);
  const bestFinish = Math.min(...results.map((p) => p.position));
  const averageFinish =
    results.reduce((sum, p) => sum + p.position, 0) / results.length;
  const averageGrid =
    results.reduce((sum, p) => sum + p.grid, 0) / results.length;
  const positionsGained = results.reduce(
    (sum, p) => sum + (p.grid - p.position),
    0,
  );
  const dnfs = results.filter((p) => p.status !== "Finished").length;
  const racesCompleted = results.filter((p) => p.status === "Finished").length;
  const totalRaces = results.length;

  return {
    wins,
    podiums,
    fastestLaps,
    poles,
    totalPoints,
    bestFinish,
    averageFinish,
    averageGrid,
    positionsGained,
    dnfs,
    racesCompleted,
    totalRaces,
  };
}
