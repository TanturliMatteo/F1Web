import { apiGet, SEASON } from "./api";

interface ErgastRaceResponse {
  MRData: {
    RaceTable: {
      Races: Array<{
        raceName: string;
        round: string;
        date: string;
        Circuit: {
          circuitName: string;
          Location: {
            locality: string;
            country: string;
          };
        };
      }>;
    };
  };
}

export interface Race {
  name: string;
  round: string;
  date: string;
  circuit: string;
  locality: string;
  country: string;
}

export async function fetchRaces(signal?: AbortSignal): Promise<Race[]> {
  const data = await apiGet<ErgastRaceResponse>(`/${SEASON}/races`, signal);

  const races = data.MRData.RaceTable.Races ?? [];

  return races.map((r) => ({
    name: r.raceName ?? "Unknown Race",
    round: r.round ?? "0",
    date: r.date ?? "N/A",
    circuit: r.Circuit?.circuitName ?? "Unknown Circuit",
    locality: r.Circuit?.Location?.locality ?? "Unknown Locality",
    country: r.Circuit?.Location?.country ?? "Unknown Country",
  }));
}
