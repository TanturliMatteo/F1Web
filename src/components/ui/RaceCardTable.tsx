import { Link } from "react-router";
import type { Results } from "../../services/ResultServices";
import getTeamColor from "../../utils/teamColors";
import { formatGain, isClassified, resultLabel } from "../../utils/results";

interface RaceCardTableProps {
  data: Results[];
}

// Full classification of a race
const RaceCardTable = ({ data: results }: RaceCardTableProps) => (
  <div id="race-card-table-card" className="ui-card">
    <table id="race-card-table" className="w-100">
      <thead id="race-card-table-head">
        <tr>
          <th>Pos</th>
          <th>Driver</th>
          <th className="hide-mobile">Team</th>
          <th>Grid</th>
          <th>+/-</th>
          <th className="hide-mobile">Time / Status</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody id="race-card-table-body">
        {results.map((res) => {
          const grid = Number(res.grid) || 0;
          const gain =
            isClassified(res.positionText) && grid > 0
              ? grid - Number(res.position)
              : null;

          return (
            <tr key={res.driverId} id={`race-card-table-row-${res.position}`}>
              <td
                className="team-stripe"
                style={{ borderLeftColor: getTeamColor(res.constructorId) }}
              >
                {isClassified(res.positionText)
                  ? res.position
                  : resultLabel(res.positionText)}
              </td>
              <td>
                <Link
                  id={`race-card-table-link-${res.position}`}
                  to={`/pilots/${res.code.toLowerCase()}`}
                >
                  {res.givenName} {res.familyName}
                </Link>
              </td>
              <td className="hide-mobile">{res.constructorName}</td>
              <td>{grid > 0 ? grid : "Pit"}</td>
              <td
                className={
                  gain === null || gain === 0
                    ? "text-muted-soft"
                    : gain > 0
                      ? "text-gain"
                      : "text-loss"
                }
              >
                {gain === null ? "-" : formatGain(gain)}
              </td>
              <td className="hide-mobile">
                {res.time !== "0" ? res.time : res.status}
              </td>
              <td>{res.points}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default RaceCardTable;
