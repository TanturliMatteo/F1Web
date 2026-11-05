import useInView from "../../hooks/useInView";
import type { PilotRace } from "../../hooks/useResultsPilot";
import { formatGain, resultLabel } from "../../utils/results";

interface GainsChartProps {
  id: string;
  title: string;
  races: PilotRace[];
}

// Tallest bar fills this share of its half, leaving room for the value label
const BAR_MAX = 80;

// Diverging bars: places gained (up) or lost (down) from grid to flag
const GainsChart = ({ id, title, races }: GainsChartProps) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const max = Math.max(1, ...races.map((r) => Math.abs(r.gained ?? 0)));

  return (
    <figure id={id} className="ui-card chart-card">
      <figcaption className="chart-header">
        <div>
          <h3 className="chart-title">{title}</h3>
          <p className="chart-note">Start vs finish position, round by round</p>
        </div>
        <ul className="chart-legend">
          <li>
            <span className="legend-swatch gain-bar--up" />
            Gained
          </li>
          <li>
            <span className="legend-swatch gain-bar--down" />
            Lost
          </li>
          <li>
            <span className="gain-dnf" />
            Not classified
          </li>
        </ul>
      </figcaption>
      <div
        ref={ref}
        className={`gain-chart${inView ? " is-visible" : ""}`}
        style={{ gridTemplateColumns: `repeat(${races.length}, 1fr)` }}
      >
        {races.map((race) => {
          const gained = race.gained;
          const summary =
            gained === null
              ? `${race.raceName}: ${resultLabel(race.positionText)}`
              : `${race.raceName}: P${race.grid} → P${race.position} (${formatGain(gained)})`;

          return (
            <div key={race.round} className="gain-col" title={summary}>
              <span className="visually-hidden">{summary}</span>
              <div className="gain-half gain-half--up">
                {gained !== null && gained > 0 && (
                  <>
                    <span className="gain-value text-gain" aria-hidden="true">
                      {formatGain(gained)}
                    </span>
                    <span
                      className="gain-bar gain-bar--up"
                      style={{ height: `${(gained / max) * BAR_MAX}%` }}
                    />
                  </>
                )}
              </div>
              <div className="gain-half gain-half--down">
                {gained !== null && gained < 0 && (
                  <>
                    <span
                      className="gain-bar gain-bar--down"
                      style={{ height: `${(-gained / max) * BAR_MAX}%` }}
                    />
                    <span className="gain-value text-loss" aria-hidden="true">
                      {formatGain(gained)}
                    </span>
                  </>
                )}
                {gained === null && <span className="gain-dnf" />}
              </div>
              <span className="gain-round" aria-hidden="true">
                {race.round}
              </span>
            </div>
          );
        })}
      </div>
      <p className="chart-axis-label" aria-hidden="true">
        Race
      </p>
    </figure>
  );
};

export default GainsChart;
