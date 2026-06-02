export async function fetchPilotPhoto() {
  const res = await fetch(
    "https://api.openf1.org/v1/drivers?session_key=latest",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pilot standings");
  }

  return res.json();
}
