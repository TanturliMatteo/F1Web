import isRaceCompleted from "../utils/isRaceCompleted";
import { useRaces } from "./queries";

// Splits the calendar around "now": the upcoming race and the latest finished one
export function useRaceStatus() {
  const races = useRaces().data ?? [];
  const done = (r: (typeof races)[number]) => isRaceCompleted(r.date, r.time);

  return {
    next: races.find((r) => !done(r)) ?? null,
    last: races.findLast(done) ?? null,
  };
}
