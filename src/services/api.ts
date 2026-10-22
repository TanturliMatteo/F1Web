const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export const SEASON = 2026;

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { signal });

  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${path}`);
  }

  return res.json() as Promise<T>;
}
