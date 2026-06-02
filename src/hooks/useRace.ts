import { useEffect, useState } from "react";
import { fetchResults } from "../services/ResultServices";
import { normalize } from "../utils/normalizeString";

type RaceResult = {
  number: string;
  position: string;
  points: string;
  driverId: string;
  code: string;
  givenName: string;
  familyName: string;
  nationality: string;
  constructorName: string;
  laps: string;
  status: string;
  fastestLapRank?: string;
  fastestLapLap?: string;
  fastestLapTime?: string;
  time?: string;
};

type RaceApiData = {
  round: string;
  raceName: string;
  Circuit: {
    circuitName: string;
    Location: {
      locality: string;
      country: string;
    };
  };
  date: string;
  Results: Array<{
    number: string;
    position: string;
    points: string;
    Driver: {
      driverId: string;
      code?: string;
      givenName: string;
      familyName: string;
      nationality: string;
    };
    Constructor: {
      name: string;
    };
    laps: string;
    status: string;
    FastestLap?: {
      rank: string;
      lap: string;
      Time: {
        time: string;
      };
    };
    Time?: {
      time: string;
    };
  }>;
};

export type Race = {
  round: string;
  raceName: string;
  circuitName: string;
  locality: string;
  country: string;
  date: string;
  results: RaceResult[];
};

export function useRace(raceId?: string) {
  const [data, setData] = useState<Race | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!raceId) {
          setData(null);
          return;
        }

        const results = await fetchResults();
        const races: RaceApiData[] = results.MRData.RaceTable.Races;

        const foundRace = races.find(
          (r) => normalize(r.round) === normalize(raceId),
        );

        if (!foundRace) {
          setData(null);
          return;
        }

        const formatted: Race = {
          round: foundRace.round ?? "0",
          raceName: foundRace.raceName ?? "Unknown",
          circuitName: foundRace.Circuit?.circuitName ?? "Unknown",
          locality: foundRace.Circuit?.Location?.locality ?? "Unknown",
          country: foundRace.Circuit?.Location?.country ?? "Unknown",
          date: foundRace.date ?? "Unknown",
          results: foundRace.Results.map((r) => ({
            number: r.number ?? "0",
            position: r.position ?? "0",
            points: r.points ?? "0",
            driverId: r.Driver.driverId ?? "Unknown",
            code: r.Driver.code ?? "Unknown",
            givenName: r.Driver.givenName ?? "Unknown",
            familyName: r.Driver.familyName ?? "Unknown",
            nationality: r.Driver.nationality ?? "Unknown",
            constructorName: r.Constructor.name ?? "Unknown",
            laps: r.laps ?? "0",
            status: r.status ?? "Unknown",
            fastestLapRank: r.FastestLap?.rank,
            fastestLapLap: r.FastestLap?.lap,
            fastestLapTime: r.FastestLap?.Time.time,
            time: r.Time?.time,
          })),
        };

        setData(formatted);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [raceId]);

  return { data, loading, error };
}
