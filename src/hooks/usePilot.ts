import { fetchPilotStandings } from "../services/PilotStandingsServices";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function usePilot(driverCode?: string | null) {
  const query = useQuery({
    queryKey: ["pilotStandings"],
    queryFn: fetchPilotStandings,
    staleTime: 1000 * 60 * 5,
  });

  const pilot = useMemo(() => {
    if (!driverCode || !query.data) return null;

    return (
      query.data.find(
        (p) => p.code.toLocaleLowerCase() === driverCode.toLocaleLowerCase(),
      ) ?? null
    );
  }, [query.data, driverCode]);

  return { ...query, data: pilot };
}
