import { Link } from "react-router";
import type { PilotRace } from "../../hooks/useResultsPilot";
import { resultLabel, resultTone } from "../../utils/results";

const LEGEND = [
  ["gold", "Win"],
  ["silver", "P2"],
  ["bronze", "P3"],
  ["points", "Points"],
  ["out", "No points"],
  ["dnf", "Not classified"],
] as const;

// One coloured chip per round, each linking to that race
const ResultsStrip = ({ id, races }: { id: string; races: PilotRace[] }) => (
  <div id={id} className="ui-card ui-stack ui-stack--start">
    <ol id={`${id}-list`} className="result-strip">
      {races.map((race) => (
        <li key={race.round}>
          <Link
            id={`${id}-round-${race.round}`}
            to={`/races/${race.round}`}
            className={`result-chip result-chip--${resultTone(race.positionText, race.points)}`}
            title={`${race.raceName}: ${resultLabel(race.positionText)}, ${race.points} pts`}
          >
            <span className="result-chip-value">
              {resultLabel(race.positionText)}
            </span>
            <span className="result-chip-round">R{race.round}</span>
          </Link>
        </li>
      ))}
    </ol>
    <ul id={`${id}-legend`} className="chart-legend">
      {LEGEND.map(([tone, label]) => (
        <li key={tone}>
          <span className={`legend-swatch result-chip--${tone}`} />
          {label}
        </li>
      ))}
    </ul>
  </div>
);

export default ResultsStrip;
