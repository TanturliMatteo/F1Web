import { Link } from "react-router";
import type { Results } from "../../services/ResultServices";

interface RaceCardProps {
  data: Results[] | null;
}

const RaceCard = ({ data: result }: RaceCardProps) => {
  if (!result) {
    return (
      <div className="display-card-row stretch">
        <p>Caricamento risultati...</p>
      </div>
    );
  }
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
          {result.map((res) => (
            <tr key={res.position}>
              <td>{res.position}</td>
              <td>{res.number}</td>
              <td>
                <Link to={`/pilots/${res.code}`}>
                  {res.givenName} {res.familyName}
                </Link>
              </td>
              <td>{res.constructorName}</td>
              <td>{res.time !== "0" ? res.time : res.status}</td>
              <td>{res.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RaceCard;
