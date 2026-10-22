import { apiGet, SEASON } from "./api";

// Jolpica caps `limit` at 100 rows per request
const PAGE_SIZE = 100;

interface ErgastResponse {
  MRData: {
    total: string;
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
          Time?: {
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

const fetchResultsPage = (offset: number, signal?: AbortSignal) =>
  apiGet<ErgastResponse>(
    `/${SEASON}/results?limit=${PAGE_SIZE}&offset=${offset}`,
    signal,
  );

export async function fetchResults(signal?: AbortSignal): Promise<Results[]> {
  // The API paginates by result rows, so read the first page to learn the
  // total and then fetch the remaining ones in parallel.
  const first = await fetchResultsPage(0, signal);
  const total = Number(first.MRData.total) || 0;

  const offsets: number[] = [];
  for (let offset = PAGE_SIZE; offset < total; offset += PAGE_SIZE) {
    offsets.push(offset);
  }
  const rest = await Promise.all(
    offsets.map((offset) => fetchResultsPage(offset, signal)),
  );

  // A race can straddle two pages: it then appears in both with partial
  // Results, which the flatMap below simply concatenates.
  const allRaces = [first, ...rest].flatMap((page) => page.MRData.RaceTable.Races);

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
