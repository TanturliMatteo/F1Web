import { fetchRaces } from "../services/RacesServices";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useRace(round?: string | null) {
  const query = useQuery({
    queryKey: ["races"],
    queryFn: fetchRaces,
    staleTime: 1000 * 60 * 5,
  });

  const race = useMemo(() => {
    if (!round || !query.data) return null;

    return (
      query.data.find(
        (r) => r.round.toLocaleLowerCase() === round.toLocaleLowerCase(),
      ) ?? null
    );
  }, [query.data, round]);

  return { ...query, data: race };
}
