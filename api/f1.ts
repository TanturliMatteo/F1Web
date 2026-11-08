// Vercel Function: cached, same-origin proxy for the Jolpica F1 API.
//
//   GET /api/f1?path=/2026/results&limit=100&offset=0
//
// Why it exists:
// - Jolpica is a free community API with rate limits. Responses are cached on
//   Vercel's CDN, so it receives one request every few minutes instead of
//   several per visitor, and visitors keep getting the last good data while
//   a fresh copy is fetched in the background.
// - Visitors' browsers only talk to our own domain: their IP addresses never
//   reach a third-party service.
//
// Only the resources the site uses are forwarded, so the endpoint cannot be
// used as an open proxy.

const UPSTREAM = "https://api.jolpi.ca/ergast/f1";
const ALLOWED_PATH = /^\/\d{4}\/(races|driverstandings|results)$/;
const ALLOWED_PARAMS = ["limit", "offset"];
const UPSTREAM_TIMEOUT_MS = 10_000;

// Fresh for 5 minutes on the CDN; for a day after that a stale copy is
// served instantly while the CDN revalidates it in the background.
// Browsers do not cache (max-age=0): they always ask the CDN.
const CACHE_OK =
  "public, max-age=0, s-maxage=300, stale-while-revalidate=86400";
const CACHE_ERROR = "no-store";

const error = (status: number, message: string) =>
  Response.json(
    { error: message },
    { status, headers: { "cache-control": CACHE_ERROR } },
  );

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const path = params.get("path") ?? "";

  if (!ALLOWED_PATH.test(path)) return error(404, "Unknown resource");

  // Trailing slash: Jolpica redirects /2026/races to /2026/races/
  const upstream = new URL(`${UPSTREAM}${path}/`);
  for (const name of ALLOWED_PARAMS) {
    const value = params.get(name);
    if (value && /^\d{1,4}$/.test(value))
      upstream.searchParams.set(name, value);
  }

  try {
    const res = await fetch(upstream, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!res.ok) return error(502, `Upstream responded ${res.status}`);

    // A 200 that is not JSON (maintenance page, captive portal) must not be
    // cached on the CDN and served to every visitor for hours
    const type = res.headers.get("content-type") ?? "";
    if (!type.includes("application/json"))
      return error(502, "Upstream sent an unexpected content type");

    return new Response(res.body, {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": CACHE_OK,
      },
    });
  } catch {
    return error(504, "Upstream unavailable");
  }
}
