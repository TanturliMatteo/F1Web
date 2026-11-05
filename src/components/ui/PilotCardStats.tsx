import type { PilotStats } from "../../hooks/useResultsPilot";
import useInView from "../../hooks/useInView";
import StatBar from "./StatBar";

interface PilotCardStatsProps {
  stats: PilotStats;
}

const GAUGE_LENGTH = 282.7; // circumference of the r=45 gauge circle

const PilotCardStats = ({ stats }: PilotCardStatsProps) => {
  // Bars and gauge fill from 0 the first time they scroll into view
  const [barsRef, barsInView] = useInView<HTMLDivElement>();
  const [gaugeRef, gaugeInView] = useInView<HTMLDivElement>();

  const averages = [
    { label: "Average finish", value: stats.averageFinish },
    { label: "Average grid", value: stats.averageGrid },
    { label: "Places gained per race", value: stats.positionsGained },
    { label: "Best finish", value: stats.bestFinish },
    { label: "Not classified", value: stats.dnfs },
    { label: "Races started", value: stats.totalRaces },
  ];

  return (
    <div id="pilot-card-stats" className="ui-row ui-row--stretch">
      <div id="pilot-card-stats-left" className="ui-stack ui-grow-3">
        <div
          id="pilot-card-stats-bars"
          ref={barsRef}
          className="ui-card ui-stack ui-stack--center"
        >
          <StatBar
            id="pilot-card-stats-points-rate"
            label="Points finish rate"
            value={stats.pointsFinishRate}
            animate={barsInView}
          />
          <StatBar
            id="pilot-card-stats-finish-rate"
            label="Finish rate"
            value={stats.finishRate}
            animate={barsInView}
          />
        </div>
        <div
          id="pilot-card-stats-gauge-card"
          ref={gaugeRef}
          className="ui-card ui-row"
        >
          <div
            id="pilot-card-stats-gauge-wrapper"
            className="gauge-wrapper ui-grow-1"
          >
            <svg
              id="pilot-card-stats-gauge"
              className="gauge"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle className="gauge-bg" cx="50" cy="50" r="45" />
              <circle
                id="pilot-card-stats-gauge-progress"
                className="gauge-progress"
                cx="50"
                cy="50"
                r="45"
                style={{
                  strokeDasharray: GAUGE_LENGTH,
                  strokeDashoffset: gaugeInView
                    ? GAUGE_LENGTH - (stats.pointsToMax / 100) * GAUGE_LENGTH
                    : GAUGE_LENGTH,
                }}
              />
            </svg>
            <div id="pilot-card-stats-gauge-text" className="gauge-text">
              <span id="pilot-card-stats-gauge-value" className="gauge-value">
                {stats.pointsToMax}%
              </span>
              <span id="pilot-card-stats-gauge-label" className="gauge-label">
                Pts efficiency
              </span>
            </div>
          </div>
          <dl id="pilot-card-stats-points-summary" className="info-list ui-grow-1">
            <div>
              <dt>Max available</dt>
              <dd>{stats.maxPoints} pts</dd>
            </div>
            <div>
              <dt>Points lost</dt>
              <dd>{stats.pointsLost} pts</dd>
            </div>
            <div>
              <dt>Still to play for</dt>
              <dd>{stats.remainingPoints} pts</dd>
            </div>
          </dl>
        </div>
      </div>
      <div id="pilot-card-stats-table-card" className="ui-card ui-grow-2">
        <table id="pilot-card-stats-table" className="w-100">
          <tbody id="pilot-card-stats-table-body">
            {averages.map((stat, index) => (
              <tr key={stat.label} id={`pilot-card-stats-row-${index}`}>
                <td>{stat.label}</td>
                <td>{stat.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PilotCardStats;
