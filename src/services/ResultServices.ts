interface ErgastResponse {
  MRData: {
    RaceTable: {
      Races: Array<{
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

        Results: Array<{
          number: string;
          position: string;
          points: string;
          Driver: {
            driverId: string;
            permanentNumber: string;
            code: string;
            givenName: string;
            familyName: string;
            dateOfBirth: string;
            nationality: string;
          };
          Constructor: {
            constructorId: string;
            name: string;
          };
          grid: string;
          laps: string;
          status: string;
          FastestLap?: {
            rank: string;
            lap: string;
            Time: {
              time: string;
            };
          };
          Time: {
            time: string;
          };
        }>;
      }>;
    };
  };
}

export interface Results {
  round: string;
  raceName: string;
  circuitId: string;
  circuitName: string;
  locality: string;
  country: string;
  number: string;
  position: string;
  points: string;
  driverId: string;
  permanentNumber: string;
  code: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
  constructorId: string;
  constructorName: string;
  grid: string;
  laps: string;
  status: string;
  fastestLapRank: string;
  fastestLapLap: string;
  fastestLapTime: string;
  time: string;
}

export async function fetchResults(): Promise<Results[]> {
  const res1 = await fetch(
    "https://api.jolpi.ca/ergast/f1/2026/results/?format=json&limit=100&offset=0",
  );

  const res2 = await fetch(
    "https://api.jolpi.ca/ergast/f1/2026/results/?format=json&limit=100&offset=100",
  );

  if (!res1.ok || !res2.ok) {
    throw new Error("Failed to fetch results");
  }

  const data1: ErgastResponse = await res1.json();
  const data2: ErgastResponse = await res2.json();

  const allRaces = [
    ...data1.MRData.RaceTable.Races,
    ...data2.MRData.RaceTable.Races,
  ];

  const results = allRaces.flatMap((race) => {
    return race.Results.map((result) => ({
      round: race.round ?? "0",
      raceName: race.raceName ?? "Unknown",
      circuitId: race.Circuit.circuitId ?? "Unknown",
      circuitName: race.Circuit.circuitName ?? "Unknown",
      locality: race.Circuit.Location.locality ?? "Unknown",
      country: race.Circuit.Location.country ?? "Unknown",
      number: result.number ?? "0",
      position: result.position ?? "0",
      points: result.points ?? "0",
      driverId: result.Driver.driverId ?? "Unknown",
      permanentNumber: result.Driver.permanentNumber ?? "Unknown",
      code: result.Driver.code ?? "Unknown",
      givenName: result.Driver.givenName ?? "Unknown",
      familyName: result.Driver.familyName ?? "Unknown",
      dateOfBirth: result.Driver.dateOfBirth ?? "Unknown",
      nationality: result.Driver.nationality ?? "Unknown",
      constructorId: result.Constructor.constructorId ?? "Unknown",
      constructorName: result.Constructor.name ?? "Unknown",
      grid: result.grid ?? "0",
      laps: result.laps ?? "0",
      status: result.status ?? "Unknown",
      fastestLapRank: result.FastestLap?.rank ?? "0",
      fastestLapLap: result.FastestLap?.lap ?? "0",
      fastestLapTime: result.FastestLap?.Time.time ?? "0",
      time: result.Time?.time ?? "0",
    }));
  });

  return results;
}
