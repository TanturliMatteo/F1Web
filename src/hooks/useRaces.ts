import { useQuery } from "@tanstack/react-query";
import { fetchRaces } from "../services/RacesServices";

export function useRaces() {
  return useQuery({
    queryKey: ["races"],
    queryFn: fetchRaces,
    staleTime: 1000 * 60 * 60,
  });
}
