import { Link } from "react-router";
import { getNationalityToCode } from "../../utils/nationalityCode";
import type { PilotStandings } from "../../services/PilotStandingsServices";

interface PilotTableProps {
  data: PilotStandings[];
}

const flagUrl = (nationality: string) =>
  `https://flagcdn.com/w40/${getNationalityToCode(nationality)}.png`;

const PilotTable = ({ data: pilots = [] }: PilotTableProps) => {
  if (pilots.length === 0) {
    return (
      <div className="display-card">Nessun dato disponibile al momento.</div>
    );
  }
  return (
    <div className="display-card display-card-column">
      <table className="w-100">
        <thead>
          <tr>
            <th>Position</th>
            <th>Pilot</th>
            <th>Nationality</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {pilots.map((pilot) => (
            <tr key={pilot.driverId}>
              <td>{pilot.position}</td>
              <td>
                <Link to={`/pilots/${pilot.code.toLowerCase()}`}>
                  {pilot.name} {pilot.surname}
                </Link>
              </td>
              <td>
                <img
                  src={flagUrl(pilot.nationality)}
                  alt={pilot.nationality}
                  className="flag"
                />{" "}
                <span className="hide-text-mobile">{pilot.nationality}</span>
              </td>
              <td>{pilot.team}</td>
              <td>{pilot.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PilotTable;
