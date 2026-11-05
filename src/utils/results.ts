// Helpers to read a single classification row (Ergast/Jolpica positionText)

const NOT_CLASSIFIED_LABELS: Record<string, string> = {
  R: "DNF",
  N: "NC",
  D: "DSQ",
  W: "DNS",
  E: "EXC",
  F: "DNQ",
};

// A numeric positionText means the driver was classified, lapped or not
export const isClassified = (positionText: string) =>
  /^\d+$/.test(positionText);

// "P3", "DNF", "DSQ"...
export const resultLabel = (positionText: string) =>
  isClassified(positionText)
    ? `P${positionText}`
    : (NOT_CLASSIFIED_LABELS[positionText] ?? positionText);

export type ResultTone =
  "gold" | "silver" | "bronze" | "points" | "out" | "dnf";

// Colour family of a result chip, from best to worst
export const resultTone = (
  positionText: string,
  points: number,
): ResultTone => {
  if (!isClassified(positionText)) return "dnf";
  const position = Number(positionText);
  if (position === 1) return "gold";
  if (position === 2) return "silver";
  if (position === 3) return "bronze";
  return points > 0 ? "points" : "out";
};

// "+3", "-2", "0"
export const formatGain = (gain: number) => (gain > 0 ? `+${gain}` : `${gain}`);

// Places gained from grid to flag (negative = lost). null for retirements
// and pit-lane starts (grid 0), where the number would only be noise.
export const placesGained = (r: {
  positionText: string;
  position: number;
  grid: number;
}) => (isClassified(r.positionText) && r.grid > 0 ? r.grid - r.position : null);

// Text colour class for a gain: green up, red down, muted otherwise
export const gainClass = (gain: number | null) =>
  !gain ? "text-muted-soft" : gain > 0 ? "text-gain" : "text-loss";
