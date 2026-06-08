import type { PilotStandings } from "../../services/PilotStandingsServices";
import type { UseResultsReturnType } from "../../hooks/useResultsPilot";
import type { PilotPhoto } from "../../hooks/usePilotPhoto";

interface PilotCardProps {
  pilot: PilotStandings | null;
  stats: UseResultsReturnType["data"] | null;
  photo: PilotPhoto | null;
}

const PilotCard = ({ pilot, stats, photo }: PilotCardProps) => {
  if (!pilot || !stats) {
    return (
      <div className="display-card-row stretch">
        <p>Caricamento dati pilota...</p>
      </div>
    );
  }

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
    <div className=" display-card-row stretch">
      {/* LEFT CARD */}
      <div className="display-card min">
        <div className="display-card-column">
          <div className="avatar-container">
            <img src={photo?.url} alt={pilot.name} className="pilot-photo" />
          </div>
          <div className="display-card-column start">
            <h5>Team: {pilot.team}</h5>
            <h5>Nationality: {pilot.nationality}</h5>
            <h5>Birth: {pilot.dateOfBirth}</h5>
          </div>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className=" display-card max">
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

export default PilotCard;
