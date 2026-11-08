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

  const res = await fetch(`${ENDPOINT}?${query}`, { signal });

  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${resource}`);
  }

  return res.json() as Promise<T>;
}

// The API sends every number as a string; missing ones become 0
export const toNumber = (value: string | undefined) => Number(value) || 0;

// Three-letter driver code ("VER"). The API omits it for some drivers (often
// new or reserve ones): derive it from the surname so links, photos and
// lookups that key on the code keep working
export const driverCode = (driver: { code?: string; familyName: string }) =>
  driver.code ||
  driver.familyName
    .normalize("NFD")
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, 3)
    .toUpperCase();
