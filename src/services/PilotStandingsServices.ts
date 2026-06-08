interface ErgastResponse {
  MRData: {
    StandingsTable: {
      StandingsLists: {
        DriverStandings: Array<{
          position: string;
          points: string;
          Driver: {
            permanentNumber: string;
            givenName: string;
            familyName: string;
            dateOfBirth: string;
            nationality: string;
            driverId: string;
            code: string;
          };
          Constructors: Array<{
            constructorId: string;
            name: string;
          }>;
        }>;
      }[];
    };
  };
}

export interface PilotStandings {
  position: string;
  name: string;
  surname: string;
  nationality: string;
  team: string;
  driverId: string;
  points: string;
  code: string;
  constructorId: string;
  permanentNumber: string;
  dateOfBirth: string;
}

export async function fetchPilotStandings(): Promise<PilotStandings[]> {
  const res = await fetch(
    "https://api.jolpi.ca/ergast/f1/current/driverstandings",
  );

  if (!res.ok) throw new Error("Failed to fetch");

  const data: ErgastResponse = await res.json();

  const drivers =
    data.MRData.StandingsTable.StandingsLists[0].DriverStandings ?? [];

  return drivers.map((d) => ({
    position: d.position ?? "0",
    name: d.Driver?.givenName ?? "Unknown",
    surname: d.Driver?.familyName ?? "",
    nationality: d.Driver?.nationality ?? "Unknown",
    team: d.Constructors?.[0]?.name ?? "Unknown",
    points: d.points ?? "0",
    driverId: d.Driver?.driverId ?? "Unknown",
    code: d.Driver?.code ?? "Unknown",
    constructorId: d.Constructors?.[0]?.constructorId ?? "Unknown",
    permanentNumber: d.Driver?.permanentNumber ?? "Unknown",
    dateOfBirth: d.Driver?.dateOfBirth ?? "Unknown",
  }));
}
