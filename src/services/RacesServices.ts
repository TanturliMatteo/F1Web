export async function fetchRaces() {
  const res = await fetch("https://api.jolpi.ca/ergast/f1/2026/races/");
  if (!res.ok) {
    throw new Error("Failed to fetch races data");
  }

  return res.json();
}
