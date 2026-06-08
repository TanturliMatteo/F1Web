import { useQuery } from "@tanstack/react-query";
import { fetchResults } from "../services/ResultServices";
import { useMemo } from "react";

export type UseResultsReturnType = ReturnType<typeof useResultsPilot>;

export function useResultsPilot(driverId?: string) {
  const query = useQuery({
    queryKey: ["results"],
    queryFn: fetchResults,
    staleTime: 1000 * 60 * 5,
  });

  const data = useMemo(() => {
    if (!query.data || !driverId) return null;

    const driverResults = query.data.filter(
      (r) => r.code.toLowerCase().trim() === driverId.toLowerCase().trim(),
    );
    console.log("Driver Results:", driverResults);

    const clean = driverResults.map((r) => ({
      ...r,
      pos: Number(r.position) || 0,
      pts: Number(r.points) || 0,
      grd: Number(r.grid) || 0,
      rnk: Number(r.fastestLapRank) || 0,
    }));

    return {
      wins: clean.filter((p) => p.pos === 1).length,
      podiums: clean.filter((p) => p.pos > 0 && p.pos <= 3).length,
      fastestLaps: clean.filter((p) => p.rnk === 1).length,
      poles: clean.filter((p) => p.grd === 1).length,
      totalPoints: clean.reduce((sum, p) => sum + p.pts, 0),
      bestFinish: Math.min(...clean.map((p) => p.pos)),
      averageFinish: clean.reduce((sum, p) => sum + p.pos, 0) / clean.length,
      averageGrid: clean.reduce((sum, p) => sum + p.grd, 0) / clean.length,
      positionsGained: clean.reduce((sum, p) => sum + (p.grd - p.pos), 0),
      dnfs: clean.filter((p) => p.status !== "Finished").length,
      racesCompleted: clean.filter((p) => p.status === "Finished").length,
      totalRaces: clean.length,
    };
  }, [query.data, driverId]);

  return {
    ...query,

    isLoading: query.isLoading || !driverId,
    data,
  };
}
