import type { Pilot } from "../../hooks/usePilot";
import type { PilotResult } from "../../hooks/usePilotResults";
import type { PilotPhoto } from "../../hooks/usePilotPhoto";

interface PilotCardProps {
  pilot: Pilot;
  stats: PilotResult | null;
  photo: PilotPhoto | null;
}

const PilotCard = ({ pilot, stats, photo }: PilotCardProps) => {
  if (!stats) return <div>Loading...</div>;

  const statsList = [
    { label: "Points", value: pilot.points },
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
    <div className="pilot-card-content">
      {/* LEFT CARD */}
      <div className="display-card w-25 pilot-card-segment">
        <div className="pilot-photo-div">
          <img src={photo?.url} alt={pilot.name} className="pilot-photo" />
        </div>

        <div className="pilot-stats">
          <div>Team: {pilot.team}</div>
          <div>Nationality: {pilot.nationality}</div>
          <div>Date of Birth: {pilot.dateOfBirth}</div>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="display-card w-75">
        <table className="stats-table">
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

export default PilotCard;
