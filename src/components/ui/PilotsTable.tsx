import { Link } from "react-router";
import { getNationalityToCode } from "../../utils/nationalityCode";
import { flagUrl } from "../../utils/flagUrl";
import getTeamColor from "../../utils/teamColors";
import type { PilotStandings } from "../../services/PilotStandingsServices";

interface PilotTableProps {
  data: PilotStandings[];
}

const PilotTable = ({ data: pilots = [] }: PilotTableProps) => {
  if (pilots.length === 0) {
    return (
      <div id="pilots-table-empty" className="ui-card">
        Nessun dato disponibile al momento.
      </div>
    );
  }
  return (
    <div
      id="pilots-table-card"
      className="ui-card ui-stack my-3"
    >
      <table id="pilots-table" className="w-100">
        <thead id="pilots-table-head">
          <tr>
            <th>Position</th>
            <th>Pilot</th>
            <th>Nationality</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody id="pilots-table-body">
          {pilots.map((pilot) => (
            <tr key={pilot.driverId} id={`pilots-table-row-${pilot.driverId}`}>
              <td
                className="team-stripe"
                style={{ borderLeftColor: getTeamColor(pilot.constructorId) }}
              >
                {pilot.position}
              </td>
              <td>
                <Link
                  id={`pilots-table-link-${pilot.driverId}`}
                  to={`/pilots/${pilot.code.toLowerCase()}`}>
                  {pilot.name} {pilot.surname}
                </Link>
              </td>
              <td>
                <img
                  id={`pilots-table-flag-${pilot.driverId}`}
                  src={flagUrl(getNationalityToCode(pilot.nationality))}
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
