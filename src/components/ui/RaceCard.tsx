import { Link } from "react-router";
import type { Race } from "../../hooks/useRace";

interface RaceCardProps {
  data: Race;
}

const RaceCard = ({ data: race }: RaceCardProps) => {
  return (
    <div className="display-card">
      <table className="w-100">
        <thead>
          <tr>
            <th>Position</th>
            <th>Number</th>
            <th>Driver</th>
            <th>Team</th>
            <th>Time / Status</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {race.results.map((result) => (
            <tr key={result.position}>
              <td>{result.position}</td>
              <td>{result.number}</td>

              <td>
                <Link to={`/pilots/${result.code.toLocaleLowerCase()}`}>
                  {result.givenName} {result.familyName}
                </Link>
              </td>
              <td>{result.constructorName}</td>
              <td>{result.time ?? result.status}</td>
              <td>{result.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RaceCard;
