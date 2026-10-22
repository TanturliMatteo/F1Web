import { useQuery } from "@tanstack/react-query";
import { fetchRaces } from "../services/RacesServices";

export function useRaces() {
  return useQuery({
    queryKey: ["races"],
    queryFn: ({ signal }) => fetchRaces(signal),
    staleTime: 1000 * 60 * 60,
  });
}
