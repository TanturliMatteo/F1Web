import { Link } from "react-router";
import type { Race } from "../../services/RacesServices";
import type { Results } from "../../services/ResultServices";
import { getNationToCode } from "../../utils/nationalityCode";
import { flagUrl } from "../../utils/flagUrl";
import isRaceCompleted from "../../utils/isRaceCompleted";
import { formatDate } from "../../utils/formatDate";
import getTeamColor from "../../utils/teamColors";

interface RaceTableProps {
  data: Race[];
  // Race winner by round, for the completed ones
  winners: Map<string, Results>;
}

const RaceTable = ({ data, winners }: RaceTableProps) => {
  const isDone = (race: Race) => isRaceCompleted(race.date, race.time);
  const nextRound = data.find((race) => !isDone(race))?.round;

  return (
    <div id="races-table-card" className="ui-card">
      <table id="races-table" className="w-100">
        <thead id="races-table-head">
          <tr>
            <th>Rd</th>
            <th>Grand Prix</th>
            <th className="hide-mobile">Location</th>
            <th className="hide-mobile">Date</th>
            <th>Winner</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody id="races-table-body">
          {data.map((race) => {
            const status = isDone(race)
              ? "completed"
              : race.round === nextRound
                ? "next"
                : "upcoming";
            const winner = winners.get(race.round);

            return (
              <tr key={race.round} id={`races-table-row-${race.round}`}>
                <td>{race.round}</td>
                <td>
                  <Link
                    id={`races-table-link-${race.round}`}
                    to={`/races/${race.round}`}
                  >
                    {race.name}
                  </Link>
                </td>
                <td className="hide-mobile">
                  <img
                    id={`races-table-flag-${race.round}`}
                    src={flagUrl(getNationToCode(race.country))}
                    alt=""
                    className="flag"
                  />
                  {race.locality}, {race.country}
                </td>
                <td className="hide-mobile">{formatDate(race.date)}</td>
                <td>
                  {winner ? (
                    <Link
                      id={`races-table-winner-${race.round}`}
                      to={`/pilots/${winner.code.toLowerCase()}`}
                      className="team-stripe"
                      style={{ borderLeftColor: getTeamColor(winner.constructorId) }}
                    >
                      {winner.familyName}
                    </Link>
                  ) : (
                    <span className="text-muted-soft">-</span>
                  )}
                </td>
                <td>
                  <span
                    id={`races-table-status-${race.round}`}
                    className={`status-badge status-badge--${status}`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RaceTable;
