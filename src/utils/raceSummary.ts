import type { Results } from "../services/ResultServices";
import { isClassified, placesGained } from "./results";

export interface Mover {
  result: Results;
  // Places gained from the grid (negative = lost)
  gain: number;
}

const MOVERS_SHOWN = 3;

// Headline facts of a finished race, from its classification
export function summarizeRace(classification: Results[]) {
  const finishers = classification.filter((r) => isClassified(r.positionText));

  const movers: Mover[] = classification.flatMap((r) => {
    const gain = placesGained(r);
    return gain === null ? [] : [{ result: r, gain }];
  });

  return {
    winner: classification[0],
    podium: classification.slice(0, 3),
    pole: classification.find((r) => r.grid === 1),
    fastest: classification.find((r) => r.fastestLapRank === 1),
    finishers: finishers.length,
    notClassified: classification.length - finishers.length,
    gainers: movers
      .filter((m) => m.gain > 0)
      .sort((a, b) => b.gain - a.gain)
      .slice(0, MOVERS_SHOWN),
    losers: movers
      .filter((m) => m.gain < 0)
      .sort((a, b) => a.gain - b.gain)
      .slice(0, MOVERS_SHOWN),
  };
}

// Race time for the winner, gap for the others, status when lapped/retired
export const timeOrStatus = (r: Results) => r.time ?? r.status;
