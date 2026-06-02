import { Link } from "react-router";
import type { FormattedRaces } from "../../hooks/useRaces";
import { nationToCode } from "../../utils/nationalityCode";
import isRaceCompleted from "../../utils/isRaceCompleted";

interface RaceTableProps {
  races: FormattedRaces[];
}

const flagUrl = (nationality: string) =>
  `https://flagcdn.com/w40/${nationToCode[nationality]}.png`;

const RaceTable = ({ races }: RaceTableProps) => {
  return (
    <div className="display-card">
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
          {races.map((race) => (
            <tr key={race.round}>
              <td>{race.round}</td>

              <td>
                {isRaceCompleted(race.date) ? (
                  <Link to={`/races/${race.round}`}>{race.raceName}</Link>
                ) : (
                  race.raceName
                )}
              </td>

              <td>{race.circuitName}</td>
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
