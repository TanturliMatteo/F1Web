import { useMemo } from "react";
import isRaceCompleted from "../utils/isRaceCompleted";
import { useRaces } from "./useRaces";

// Splits the calendar around "now": the upcoming race and the latest finished one
export function useRaceStatus() {
  const query = useRaces();

  const data = useMemo(() => {
    const races = query.data ?? [];
    const done = (r: (typeof races)[number]) => isRaceCompleted(r.date, r.time);

    return {
      next: races.find((r) => !done(r)) ?? null,
      last: races.findLast(done) ?? null,
    };
  }, [query.data]);

  return { ...query, data };
}
