import { Link } from "react-router";
import type { Race } from "../../services/RacesServices";
import { getNationToCode } from "../../utils/nationalityCode";
import { flagUrl } from "../../utils/flagUrl";
import isRaceCompleted from "../../utils/isRaceCompleted";

interface RaceTableProps {
  data: Race[];
}

const RaceTable = ({ data }: RaceTableProps) => {
  return (
    <div
      id="races-table-card"
      className="ui-card ui-row my-3"
    >
      <table id="races-table" className="w-100">
        <thead id="races-table-head">
          <tr>
            <th>Round</th>
            <th>Race Name</th>
            <th>Circuit</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody id="races-table-body">
          {data.map((race) => (
            <tr key={race.round} id={`races-table-row-${race.round}`}>
              <td>{race.round}</td>

              <td>
                {isRaceCompleted(race.date) ? (
                  <Link
                    id={`races-table-link-${race.round}`}
                    to={`/races/${race.round}`}
                  >
                    {race.name}
                  </Link>
                ) : (
                  race.name
                )}
              </td>

              <td>{race.circuit}</td>
              <td>
                <img
                  id={`races-table-flag-${race.round}`}
                  src={flagUrl(getNationToCode(race.country))}
                  alt={race.country}
                  className="flag"
                />
                {race.locality}, {race.country}
              </td>
              <td>{race.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RaceTable;
