import { Link } from "react-router";
import type { Race } from "../../services/RacesServices";
import { getNationToCode } from "../../utils/nationalityCode";
import isRaceCompleted from "../../utils/isRaceCompleted";

interface RaceTableProps {
  data: Race[];
}

const flagUrl = (nationality: string) =>
  `https://flagcdn.com/w40/${getNationToCode(nationality)}.png`;

const RaceTable = ({ data }: RaceTableProps) => {
  return (
    <div className="display-card display-card-row">
      <table className="w-100">
        <thead>
          <tr>
            <th>Round</th>
            <th>Race Name</th>
            <th>Circuit</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((race) => (
            <tr key={race.round}>
              <td>{race.round}</td>

              <td>
                {isRaceCompleted(race.date) ? (
                  <Link to={`/races/${race.round}`}>{race.name}</Link>
                ) : (
                  race.name
                )}
              </td>

              <td>{race.circuit}</td>
              <td>
                <img
                  src={flagUrl(race.country)}
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
