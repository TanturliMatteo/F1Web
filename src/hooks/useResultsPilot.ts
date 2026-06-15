import { useQuery } from "@tanstack/react-query";
import { fetchResults } from "../services/ResultServices";
import { useMemo } from "react";

export type UseResultsReturnType = ReturnType<typeof useResultsPilot>;

export function useResultsPilot(code?: string) {
  const query = useQuery({
    queryKey: ["results"],
    queryFn: fetchResults,
    staleTime: 1000 * 60 * 5,
  });

  const data = useMemo(() => {
    if (!query.data || !code) return null;

    const driverResults = query.data.filter(
      (r) => r.code.toLowerCase().trim() === code.toLowerCase().trim(),
    );

    if (driverResults.length === 0) return null;

    const clean = driverResults.map((r) => ({
      ...r,
      pos: Number(r.position) || 0,
      pts: Number(r.points) || 0,
      grd: Number(r.grid) || 0,
      rnk: Number(r.fastestLapRank) || 0,
    }));

    // 2. CALCOLO TEAMMATE BATTLE
    let totalRacesCompared = 0;
    let driverWins = 0;
    let points = 0;

    clean.forEach((myRace) => {
      const teammateRace = query.data.find(
        (r) =>
          r.round === myRace.round &&
          r.constructorId === driverResults[0].constructorId &&
          r.driverId.toLowerCase().trim() !== code.toLowerCase().trim(),
      );

      points += myRace.pts;

      if (teammateRace) {
        totalRacesCompared++;
        const myPos = myRace.pos;
        const teammatePos = Number(teammateRace.position) || 0;

        if (myPos <= teammatePos) {
          driverWins++;
        }
      }
    });

    const teammateBattle =
      totalRacesCompared > 0
        ? Math.round((driverWins / totalRacesCompared) * 100)
        : 0;

    return {
      wins: clean.filter((p) => p.pos === 1).length,
      podiums: clean.filter((p) => p.pos > 0 && p.pos <= 3).length,
      fastestLaps: clean.filter((p) => p.rnk === 1).length,
      poles: clean.filter((p) => p.grd === 1).length,
      totalPoints: clean.reduce((sum, p) => sum + p.pts, 0),
      bestFinish: Math.min(...clean.map((p) => p.pos)),
      averageFinish: (
        clean.reduce((sum, p) => sum + p.pos, 0) / clean.length
      ).toFixed(2),
      averageGrid: (
        clean.reduce((sum, p) => sum + p.grd, 0) / clean.length
      ).toFixed(2),
      positionsGained: (
        clean.reduce((sum, p) => sum + (p.grd - p.pos), 0) / clean.length
      ).toFixed(2),
      dnfs: clean.filter((p) => p.status !== "Finished").length,
      racesCompleted: clean.filter((p) => p.status === "Finished").length,
      totalRaces: clean.length,
      teammateBattle,
      rawResult: clean,
      topTen: (
        (clean.filter((p) => p.pos > 0 && p.pos <= 10).length / clean.length) *
        100
      ).toFixed(2),
      pointsToMax: Number(
        ((points / (totalRacesCompared * 26)) * 100).toFixed(2),
      ),
      maxPoints: totalRacesCompared * 26,
      pointsLost: totalRacesCompared * 26 - points,
      remainingPoints: (19 - totalRacesCompared) * 26,
    };
  }, [query.data, code]);

  return {
    ...query,

    isLoading: query.isLoading || !code,
    data,
  };
}
