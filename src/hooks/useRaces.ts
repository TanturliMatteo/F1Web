import { useEffect, useState } from "react";
import { fetchRaces } from "../services/RacesServices";

type RacesData = {
  round: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    circuitName: string;
    Location: {
      locality: string;
      country: string;
    };
  };
  date: string;
};

export type FormattedRaces = {
  round: string;
  raceName: string;
  circuitId: string;
  circuitName: string;
  locality: string;
  country: string;
  date: string;
};

export function useRaces() {
  const [data, setData] = useState<FormattedRaces[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchRaces();
        const races: RacesData[] = result.MRData.RaceTable.Races;

        const formatted = races.map((r) => ({
          round: r.round ?? "Unknown",
          raceName: r.raceName ?? "Unknown",
          circuitId: r.Circuit?.circuitId ?? "Unknown",
          circuitName: r.Circuit?.circuitName ?? "Unknown",
          locality: r.Circuit?.Location?.locality ?? "Unknown",
          country: r.Circuit?.Location?.country ?? "Unknown",
          date: r.date ?? "Unknown",
        }));
        setData(formatted);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else setError(new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
