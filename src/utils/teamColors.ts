// Keys are the Ergast/Jolpica constructorId values
export const teamColors: Record<string, string> = {
  mercedes: "#00D2BE",
  ferrari: "#DC0000",
  red_bull: "#1E41FF",
  mclaren: "#FF8700",
  aston_martin: "#006F62",
  alpine: "#0090FF",
  williams: "#005AFF",
  haas: "#B6BABD",
  rb: "#2B4562",
  racing_bulls: "#2B4562",
  sauber: "#52E252",
  audi: "#52E252",
  cadillac: "#C8A24A",
};

export default function getTeamColor(team: string): string {
  return teamColors[team] || "#888888";
}
