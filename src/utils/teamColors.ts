export const teamColors: Record<string, string> = {
  mercedes: "#00D2BE",
  ferrari: "#DC0000",
  red_bull: "#1E41FF",
  mclaren: "#FF8700",
  aston_martin: "#006F62",
  alpine: "#0090FF",
  Williams: "#005AFF",
  haas: "#B6BABD",
  RB: "#2B4562",
  Sauber: "#52E252",
};

export function getTeamColor(team: string): string {
  return teamColors[team] || "#888888";
}
