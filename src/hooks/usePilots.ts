import { useQuery } from "@tanstack/react-query";
import { fetchPilotStandings } from "../services/PilotStandingsServices";

export function usePilots() {
  return useQuery({
    queryKey: ["pilots"],
    queryFn: fetchPilotStandings,
    staleTime: 1000 * 60 * 5,
  });
}
