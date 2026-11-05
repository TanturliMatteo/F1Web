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

// Translation keys under race.sessions.*
export type SessionKey =
  | "fp1"
  | "fp2"
  | "fp3"
  | "sprintQualifying"
  | "sprint"
  | "qualifying"
  | "race";

export interface RaceSession {
  key: SessionKey;
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
  ["FirstPractice", "fp1"],
  ["SecondPractice", "fp2"],
  ["ThirdPractice", "fp3"],
  ["SprintQualifying", "sprintQualifying"],
  ["Sprint", "sprint"],
  ["Qualifying", "qualifying"],
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
      ...SESSIONS.flatMap(([field, key]) => {
        const session = r[field];
        return session ? [{ key, date: session.date, time: session.time }] : [];
      }),
      { key: "race" as const, date: r.date, time: r.time },
    ],
  }));
}
