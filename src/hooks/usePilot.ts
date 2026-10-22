import { useMemo } from "react";
import { usePilots } from "./usePilots";

export function usePilot(driverCode?: string | null) {
  const query = usePilots();

  const pilot = useMemo(() => {
    if (!driverCode || !query.data) return null;

    return (
      query.data.find(
        (p) => p.code.toLowerCase() === driverCode.toLowerCase(),
      ) ?? null
    );
  }, [query.data, driverCode]);

  return { ...query, data: pilot };
}
