import { fetchResults } from "../services/ResultServices";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useResultsRace(round?: string) {
  const query = useQuery({
    queryKey: ["results"],
    queryFn: fetchResults,
    staleTime: 1000 * 60 * 5,
  });

  const race = useMemo(() => {
    if (!round || !query.data) return null;

    const race =
      query.data.filter((r) => String(r.round) === String(round)) ?? null;
    return race;
  }, [query.data, round]);

  return { ...query, data: race };
}
