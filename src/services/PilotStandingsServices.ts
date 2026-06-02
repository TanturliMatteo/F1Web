export async function fetchPilotStandings() {
  const res = await fetch(
    "https://api.jolpi.ca/ergast/f1/current/driverstandings",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pilot standings");
  }

  return res.json();
}
