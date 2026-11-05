import { apiGet, SEASON } from "./api";

interface ErgastSession {
  date: string;
  time?: string;
}

interface ErgastRaceResponse {
  MRData: {
    RaceTable: {
      Races: Array<{
        raceName: string;
        round: string;
        date: string;
        time?: string;
        Circuit: {
          circuitId: string;
          circuitName: string;
          Location: {
            locality: string;
            country: string;
          };
        };
        FirstPractice?: ErgastSession;
        SecondPractice?: ErgastSession;
        ThirdPractice?: ErgastSession;
        SprintQualifying?: ErgastSession;
        Sprint?: ErgastSession;
        Qualifying?: ErgastSession;
      }>;
    };
  };
}

export interface RaceSession {
  name: string;
  date: string;
  time?: string;
}

export interface Race {
  name: string;
  round: string;
  date: string;
  time?: string;
  circuitId: string;
  circuit: string;
  locality: string;
  country: string;
  sessions: RaceSession[];
}

// Weekend sessions in running order; sprint weekends skip FP2/FP3
const SESSIONS = [
  ["FirstPractice", "Practice 1"],
  ["SecondPractice", "Practice 2"],
  ["ThirdPractice", "Practice 3"],
  ["SprintQualifying", "Sprint Qualifying"],
  ["Sprint", "Sprint"],
  ["Qualifying", "Qualifying"],
] as const;

export async function fetchRaces(signal?: AbortSignal): Promise<Race[]> {
  const data = await apiGet<ErgastRaceResponse>(`/${SEASON}/races`, signal);

  const races = data.MRData.RaceTable.Races ?? [];

  return races.map((r) => ({
    name: r.raceName ?? "Unknown Race",
    round: r.round ?? "0",
    date: r.date ?? "N/A",
    time: r.time,
    circuitId: r.Circuit?.circuitId ?? "unknown",
    circuit: r.Circuit?.circuitName ?? "Unknown Circuit",
    locality: r.Circuit?.Location?.locality ?? "Unknown Locality",
    country: r.Circuit?.Location?.country ?? "Unknown Country",
    sessions: [
      ...SESSIONS.flatMap(([key, name]) => {
        const session = r[key];
        return session ? [{ name, date: session.date, time: session.time }] : [];
      }),
      { name: "Race", date: r.date, time: r.time },
    ],
  }));
}
