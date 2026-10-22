import { useMemo } from "react";
import { useRaces } from "./useRaces";

export function useRace(round?: string | null) {
  const query = useRaces();

  const race = useMemo(() => {
    if (!round || !query.data) return null;

    return query.data.find((r) => r.round === round) ?? null;
  }, [query.data, round]);

  return { ...query, data: race };
}
