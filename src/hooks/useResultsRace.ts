import { useMemo } from "react";
import { useResults } from "./useResults";

export function useResultsRace(round?: string) {
  const query = useResults();

  const race = useMemo(() => {
    if (!round || !query.data) return null;

    return query.data.filter((r) => r.round === round);
  }, [query.data, round]);

  return { ...query, data: race };
}
