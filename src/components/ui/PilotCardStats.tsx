import type { UseResultsReturnType } from "../../hooks/useResultsPilot";
import getTeamColor from "../../utils/teamColors";

interface PilotCardProps {
  stats: UseResultsReturnType["data"] | null;
}

const PilotCardStats = ({ stats }: PilotCardProps) => {
  if (!stats) {
    return (
      <div id="pilot-card-stats-empty" className="display-card-row stretch">
        Statistiche non disponibili.
      </div>
    );
  }

  const statsList = [
    { label: "Points", value: stats.totalPoints },
    { label: "Average Finish", value: stats.averageFinish },
    { label: "Average Grid", value: stats.averageGrid },
    { label: "Positions Gained", value: stats.positionsGained },
    { label: "DNFs", value: stats.dnfs },
    { label: "Best Finish", value: stats.bestFinish },
    { label: "Wins", value: stats.wins },
    { label: "Podiums", value: stats.podiums },
    { label: "Fastest Laps", value: stats.fastestLaps ?? 0 },
    { label: "Poles", value: stats.poles },
  ];

  return (
    <div id="pilot-card-stats" className="display-card-row stretch bottom">
      <div id="pilot-card-stats-left" className="display-card-column max">
        {/* Progress Bars */}
        <div
          id="pilot-card-stats-bars"
          className="display-card display-card-column h-50"
        >
          <div
            id="pilot-card-stats-teammate-battle"
            className="box-statistica middle"
          >
            <div className="testi-barra">
              <span>Teammate Battle</span>
              <span id="pilot-card-stats-teammate-battle-value">
                {stats.teammateBattle}%
              </span>
            </div>
            <div className="barra-sfondo">
              <div
                id="pilot-card-stats-teammate-battle-bar"
                className="barra-riempimento"
                style={{
                  width: `${stats.teammateBattle}%`,
                  backgroundColor: getTeamColor(
                    stats.rawResult[1]?.constructorId,
                  ),
                }}
              ></div>
            </div>
          </div>
          <div
            id="pilot-card-stats-consistency"
            className="box-statistica middle"
          >
            <div className="testi-barra">
              <span>Points Finish Consistency</span>
              <span id="pilot-card-stats-consistency-value">
                {stats.topTen}%
              </span>
            </div>
            <div className="barra-sfondo">
              <div
                id="pilot-card-stats-consistency-bar"
                className="barra-riempimento"
                style={{
                  width: `${stats.topTen}%`,
                  backgroundColor: getTeamColor(
                    stats.rawResult[1]?.constructorId,
                  ),
                }}
              ></div>
            </div>
          </div>
        </div>
        {/* Gauge */}
        <div id="pilot-card-stats-gauge-card" className="display-card h-50">
          <div id="pilot-card-stats-gauge-row" className="display-card-row">
            <div
              id="pilot-card-stats-gauge-wrapper"
              className="gauge-wrapper min"
            >
              <svg
                id="pilot-card-stats-gauge"
                className="gauge"
                viewBox="0 0 100 100"
              >
                <circle
                  id="pilot-card-stats-gauge-bg"
                  className="gauge-bg"
                  cx="50"
                  cy="50"
                  r="45"
                />
                <circle
                  id="pilot-card-stats-gauge-progress"
                  className="gauge-progress"
                  cx="50"
                  cy="50"
                  r="45"
                  style={{
                    stroke: getTeamColor(stats.rawResult[1]?.constructorId),
                    strokeDasharray: 282.7,
                    strokeDashoffset: 282.7 - (stats.pointsToMax / 100) * 282.7,
                  }}
                />
              </svg>
              <div id="pilot-card-stats-gauge-text" className="gauge-text">
                <span id="pilot-card-stats-gauge-value" className="gauge-value">
                  {stats.pointsToMax}%
                </span>
                <span id="pilot-card-stats-gauge-label" className="gauge-label">
                  Pts Efficiency
                </span>
              </div>
            </div>
            <div id="pilot-card-stats-points-summary" className="min">
              <p id="pilot-card-stats-max-points">
                MAX AVAILABLE: {stats.maxPoints} PTS
              </p>
              <p id="pilot-card-stats-points-lost">
                POINTS LOST: {stats.pointsLost} PTS
              </p>
              <p id="pilot-card-stats-remaining-points">
                REMAINING: {stats.remainingPoints} PTS
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Table */}
      <div id="pilot-card-stats-table-card" className=" display-card mid">
        <table id="pilot-card-stats-table" className="w-100">
          <tbody id="pilot-card-stats-table-body">
            {statsList.map((stat, index) => (
              <tr key={index} id={`pilot-card-stats-row-${index}`}>
                <td className="label">{stat.label}</td>
                <td className="value">{stat.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PilotCardStats;
