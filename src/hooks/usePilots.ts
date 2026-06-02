import { useState, useEffect } from "react";
import { fetchPilotStandings } from "../services/PilotStandingsServices";

//tipizzo i dati della API per far conoscere a TypeScript la struttura dei dati che andrò ad utilizzare (evitare "any")
type PilotData = {
  position: string;
  points: string;
  Driver: {
    givenName: string;
    familyName: string;
    nationality: string;
    driverId: string;
    code: string;
  };
  Constructors: {
    name: string;
  }[];
};

//tipizzo i dati che andrò ad utilizzare all'interno del mio componente, in questo caso i dati dei piloti
export type Pilot = {
  position: string;
  name: string;
  surname: string;
  nationality: string;
  team: string;
  driverId: string;
  points: string;
  code: string;
};

export function usePilots() {
  const [data, setData] = useState<Pilot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPilotStandings();

        const drivers: PilotData[] =
          result.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        const formatted = drivers.map((d) => ({
          position: d.position ?? "0",
          name: d.Driver?.givenName ?? "Unknown",
          surname: d.Driver?.familyName ?? "",
          nationality: d.Driver?.nationality ?? "Unknown",
          team: d.Constructors?.[0]?.name ?? "Unknown",
          points: d.points ?? "0",
          driverId: d.Driver?.driverId ?? "Unknown",
          code: d.Driver?.code ?? "Unknown",
        }));

        setData(formatted);
      } catch (err) {
        if (err instanceof Error) setError(err);
        else setError(new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
