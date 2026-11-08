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
  "fp1" | "fp2" | "fp3" | "sprintQualifying" | "sprint" | "qualifying" | "race";

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

const MAX_ROUNDS = 100;

export async function fetchRaces(signal?: AbortSignal): Promise<Race[]> {
  // The default page is 30 rows: ask for more so a long calendar is never cut
  const data = await apiGet<ErgastRaceResponse>(
    `/${SEASON}/races`,
    { limit: MAX_ROUNDS },
    signal,
  );

  // Missing pieces in the response become empty values, never a crash;
  // a race without round or date cannot be placed, so it is skipped
  const races = (data.MRData?.RaceTable?.Races ?? []).filter(
    (r) => r?.round && r.date,
  );

  return races.map((r) => ({
    name: r.raceName ?? "",
    round: r.round,
    date: r.date,
    time: r.time,
    circuitId: r.Circuit?.circuitId ?? "",
    circuit: r.Circuit?.circuitName ?? "",
    locality: r.Circuit?.Location?.locality ?? "",
    country: r.Circuit?.Location?.country ?? "",
    sessions: [
      ...SESSIONS.flatMap(([field, key]) => {
        const session = r[field];
        return session?.date
          ? [{ key, date: session.date, time: session.time }]
          : [];
      }),
      { key: "race" as const, date: r.date, time: r.time },
    ],
  }));
}
