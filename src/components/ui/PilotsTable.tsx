import { Link } from "react-router";
import { getNationalityToCode } from "../../utils/nationalityCode";
import { flagUrl } from "../../utils/flagUrl";
import getTeamColor from "../../utils/teamColors";
import type { PilotStandings } from "../../services/PilotStandingsServices";

interface PilotTableProps {
  data: PilotStandings[];
  // Leader's points, to show each driver's gap
  leaderPoints: number;
}

const PilotTable = ({ data: pilots = [], leaderPoints }: PilotTableProps) => {
  if (pilots.length === 0) {
    return (
      <div id="pilots-table-empty" className="ui-card">
        <p>No driver matches your search.</p>
      </div>
    );
  }
  return (
    <div id="pilots-table-card" className="ui-card">
      <table id="pilots-table" className="w-100">
        <thead id="pilots-table-head">
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th className="hide-mobile">Nationality</th>
            <th className="hide-mobile">Team</th>
            <th>Wins</th>
            <th className="hide-mobile">Gap</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody id="pilots-table-body">
          {pilots.map((pilot) => {
            const gap = leaderPoints - Number(pilot.points);
            return (
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
                    to={`/pilots/${pilot.code.toLowerCase()}`}
                  >
                    {pilot.name} {pilot.surname}
                  </Link>
                </td>
                <td className="hide-mobile">
                  <img
                    id={`pilots-table-flag-${pilot.driverId}`}
                    src={flagUrl(getNationalityToCode(pilot.nationality))}
                    alt=""
                    className="flag"
                  />
                  {pilot.nationality}
                </td>
                <td className="hide-mobile">{pilot.team}</td>
                <td>{pilot.wins}</td>
                <td className="hide-mobile text-muted-soft">
                  {gap > 0 ? `-${gap}` : "-"}
                </td>
                <td className="text-strong">{pilot.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PilotTable;
