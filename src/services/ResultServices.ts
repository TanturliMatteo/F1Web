export async function fetchResults() {
  const res = await fetch(
    "https://api.jolpi.ca/ergast/f1/2026/results/?format=json&limit=500",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch results");
  }

  return res.json();
}
