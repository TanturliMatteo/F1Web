import { Link } from "react-router";
import type { Pilot } from "../../hooks/usePilots";
import { nationalityToCode } from "../../utils/nationalityCode";

interface PilotTableProps {
  data: Pilot[];
}

const flagUrl = (nationality: string) =>
  `https://flagcdn.com/w40/${nationalityToCode[nationality]}.png`;

const PilotTable = ({ data: pilots }: PilotTableProps) => {
  return (
    <div className="display-card">
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
                {pilot.nationality}
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
