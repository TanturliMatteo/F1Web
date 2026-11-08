import { apiGet, driverCode, SEASON, toNumber } from "./api";

interface ErgastResponse {
  MRData: {
    StandingsTable: {
      StandingsLists: Array<{
        DriverStandings: Array<{
          position?: string;
          points: string;
          wins: string;
          Driver: {
            driverId: string;
            code?: string;
            permanentNumber?: string;
            givenName: string;
            familyName: string;
            dateOfBirth: string;
            nationality: string;
          };
          Constructors: Array<{
            constructorId: string;
            name: string;
          }>;
        }>;
      }>;
    };
  };
}

export interface PilotStandings {
  position: number;
  points: number;
  wins: number;
  driverId: string;
  code: string;
  permanentNumber: string;
  name: string;
  surname: string;
  dateOfBirth: string;
  nationality: string;
  team: string;
  constructorId: string;
}

export async function fetchPilotStandings(
  signal?: AbortSignal,
): Promise<PilotStandings[]> {
  // The default page is 30 rows: reserve drivers could push the grid past it
  const data = await apiGet<ErgastResponse>(
    `/${SEASON}/driverstandings`,
    { limit: 100 },
    signal,
  );

  // Missing pieces in the response become empty values, never a crash;
  // a row without a driver cannot be shown or linked, so it is skipped
  const drivers = (
    data.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? []
  ).filter((d) => d?.Driver?.driverId);

  return drivers.map((d, index) => {
    const team = d.Constructors?.[0];
    return {
      // Drivers without a classified result have no position: keep the order
      position: toNumber(d.position) || index + 1,
      points: toNumber(d.points),
      wins: toNumber(d.wins),
      driverId: d.Driver.driverId,
      code: driverCode(d.Driver),
      permanentNumber: d.Driver.permanentNumber ?? "",
      name: d.Driver.givenName ?? "",
      surname: d.Driver.familyName ?? "",
      dateOfBirth: d.Driver.dateOfBirth ?? "",
      nationality: d.Driver.nationality ?? "",
      team: team?.name ?? "",
      constructorId: team?.constructorId ?? "",
    };
  });
}
