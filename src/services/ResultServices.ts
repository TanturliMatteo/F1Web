import { apiGet, driverCode, SEASON, toNumber } from "./api";

// Jolpica caps `limit` at 100 rows per request
const PAGE_SIZE = 100;

interface ErgastResponse {
  MRData: {
    total: string;
    RaceTable: {
      Races: Array<{
        round: string;
        raceName: string;
        Results: Array<{
          position: string;
          positionText: string;
          points: string;
          grid: string;
          status: string;
          Driver: {
            driverId: string;
            code?: string;
            givenName: string;
            familyName: string;
          };
          Constructor: {
            constructorId: string;
            name: string;
          };
          FastestLap?: {
            rank?: string;
            Time?: { time: string };
          };
          Time?: { time: string };
        }>;
      }>;
    };
  };
}

// One row of a race classification
export interface Results {
  round: string;
  raceName: string;
  driverId: string;
  code: string;
  givenName: string;
  familyName: string;
  constructorId: string;
  constructorName: string;
  // Classification order: also set for retirements
  position: number;
  // Numeric when classified, otherwise R (retired), W (did not start),
  // D (disqualified) or N (not classified)
  positionText: string;
  points: number;
  // 0 = started from the pit lane
  grid: number;
  status: string;
  // Winner's race time or gap ("+2.307"); missing for lapped/retired cars
  time?: string;
  fastestLapRank?: number;
  fastestLapTime?: string;
}

const fetchResultsPage = (offset: number, signal?: AbortSignal) =>
  apiGet<ErgastResponse>(
    `/${SEASON}/results`,
    { limit: PAGE_SIZE, offset },
    signal,
  );

export async function fetchResults(signal?: AbortSignal): Promise<Results[]> {
  // The API paginates by result rows: read the first page to learn the total,
  // then fetch the remaining ones in parallel
  const first = await fetchResultsPage(0, signal);
  const total = toNumber(first.MRData.total);

  const offsets: number[] = [];
  for (let offset = PAGE_SIZE; offset < total; offset += PAGE_SIZE) {
    offsets.push(offset);
  }
  const rest = await Promise.all(
    offsets.map((offset) => fetchResultsPage(offset, signal)),
  );

  // A race can straddle two pages: it then appears in both with part of its
  // Results each, and flattening simply joins the two halves
  return [first, ...rest]
    .flatMap((page) => page.MRData.RaceTable.Races)
    .flatMap((race) =>
      race.Results.map((r) => ({
        round: race.round,
        raceName: race.raceName,
        driverId: r.Driver.driverId,
        code: driverCode(r.Driver),
        givenName: r.Driver.givenName,
        familyName: r.Driver.familyName,
        constructorId: r.Constructor.constructorId,
        constructorName: r.Constructor.name,
        position: toNumber(r.position),
        positionText: r.positionText,
        points: toNumber(r.points),
        grid: toNumber(r.grid),
        status: r.status,
        time: r.Time?.time,
        fastestLapRank: r.FastestLap?.rank
          ? toNumber(r.FastestLap.rank)
          : undefined,
        fastestLapTime: r.FastestLap?.Time?.time,
      })),
    );
}
