import type { UseResultsReturnType } from "../../hooks/useResultsPilot";
import getTeamColor from "../../utils/teamColors";

interface PilotCardProps {
  stats: UseResultsReturnType["data"] | null;
}

const PilotCardStats = ({ stats }: PilotCardProps) => {
  if (!stats) {
    return <div className="display-card-row stretch"> ciao</div>;
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
    <div className="display-card-row stretch bottom">
      <div className="display-card-column max">
        <div className="display-card display-card-column h-50">
          <div className="box-statistica middle">
            <div className="testi-barra">
              <span>Teammate Battle</span>
              <span>{stats.teammateBattle}%</span>
            </div>
            <div className="barra-sfondo">
              <div
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
          <div className="box-statistica middle">
            <div className="testi-barra">
              <span>Points Finish Consistency</span>
              <span>{stats.topTen}%</span>
            </div>
            <div className="barra-sfondo">
              <div
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
        <div className="display-card h-50">
          <h3 className="text-center">Statistics</h3>
        </div>
      </div>
      <div className=" display-card mid">
        <table className="w-100">
          <tbody>
            {statsList.map((stat, index) => (
              <tr key={index}>
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
