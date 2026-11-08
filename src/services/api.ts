import {
  HttpError,
  InvalidResponseError,
  isAbortError,
  NetworkError,
} from "../errors";

// All F1 data goes through our own endpoint (api/f1.ts on Vercel, proxied to
// Jolpica by Vite in development), never straight to the external API
const ENDPOINT = "/api/f1";

export const SEASON = 2026;

// apiGet("/2026/results", { limit: 100, offset: 0 })
export async function apiGet<T>(
  resource: string,
  params: Record<string, number> = {},
  signal?: AbortSignal,
): Promise<T> {
  const query = new URLSearchParams({ path: resource });
  for (const [name, value] of Object.entries(params)) {
    query.set(name, String(value));
  }

  // Every failure leaves here as one of the classes in src/errors.ts;
  // a cancellation (AbortError) is passed through untouched
  let res: Response;
  try {
    res = await fetch(`${ENDPOINT}?${query}`, { signal });
  } catch (error) {
    if (isAbortError(error)) throw error;
    throw new NetworkError(resource, { cause: error });
  }

  if (!res.ok) throw new HttpError(res.status, resource);

  // An HTML error page or a truncated body is rejected here, instead of
  // crashing somewhere down the line
  let body: unknown;
  try {
    body = await res.json();
  } catch (error) {
    if (isAbortError(error)) throw error;
    throw new InvalidResponseError(resource, { cause: error });
  }
  if (!body || typeof body !== "object" || !("MRData" in body)) {
    throw new InvalidResponseError(resource);
  }

  return body as T;
}

// The API sends every number as a string; missing ones become 0
export const toNumber = (value: string | undefined) => Number(value) || 0;

// Three-letter driver code ("VER"). The API omits it for some drivers (often
// new or reserve ones): derive it from the surname so links, photos and
// lookups that key on the code keep working (last resort: the driverId,
// which is always there)
export const driverCode = (driver: {
  code?: string;
  familyName?: string;
  driverId: string;
}) =>
  driver.code ||
  (driver.familyName ?? "")
    .normalize("NFD")
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, 3)
    .toUpperCase() ||
  driver.driverId.toUpperCase();
