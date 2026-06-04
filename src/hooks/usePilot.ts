import { useState, useEffect } from "react";
import { fetchPilotStandings } from "../services/PilotStandingsServices";
import { normalize } from "../utils/normalizeString";

type DriverStanding = {
  position: string;
  points: string;
  wins: string;
  permanentNumber?: string;
  Driver: {
    givenName: string;
    familyName: string;
    nationality: string;
    driverId: string;
    dateOfBirth: string;
    permanentNumber?: string;
    code?: string;
  };
  Constructors: {
    name: string;
    constructorId: string;
  }[];
};

export type Pilot = {
  position: string;
  name: string;
  surname: string;
  nationality: string;
  team: string;
  driverId: string;
  points: string;
  wins: string;
  dateOfBirth: string;
  permanentNumber?: string;
  code?: string;
  constructorId: string;
};

export function usePilot(driverCode?: string | null) {
  const [data, setData] = useState<Pilot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!driverCode) {
          setData(null);
          return;
        }

        const result = await fetchPilotStandings();

        const drivers: DriverStanding[] =
          result?.MRData?.StandingsTable?.StandingsLists?.[0]
            ?.DriverStandings ?? [];

        const formatted: Pilot[] = drivers.map((d) => ({
          position: d.position ?? "0",
          name: d.Driver?.givenName ?? "Unknown",
          surname: d.Driver?.familyName ?? "",
          nationality: d.Driver?.nationality ?? "Unknown",
          team: d.Constructors?.[0]?.name ?? "Unknown",
          points: d.points ?? "0",
          driverId: d.Driver?.driverId ?? "Unknown",
          wins: d.wins ?? "0",
          dateOfBirth: d.Driver?.dateOfBirth ?? "Unknown",
          permanentNumber: d.Driver?.permanentNumber,
          code: d.Driver?.code,
          constructorId: d.Constructors?.[0]?.constructorId ?? "Unknown",
        }));

        const target = normalize(driverCode);

        const pilot =
          formatted.find((p) => normalize(p.code) === target) ??
          formatted.find((p) => normalize(p.driverId) === target) ??
          null;

        setData(pilot);
      } catch (err) {
        if (err instanceof Error) setError(err);
        else setError(new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [driverCode]);

  return { data, loading, error };
}
