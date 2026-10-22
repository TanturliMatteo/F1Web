import { Link } from "react-router";
import type { Results } from "../../services/ResultServices";

interface RaceCardProps {
  data: Results[] | null;
}

const RaceCard = ({ data: result }: RaceCardProps) => {
  if (!result) {
    return (
      <div id="race-card-table-loading" className="display-card-row stretch">
        <p>Caricamento risultati...</p>
      </div>
    );
  }
  return (
    <div id="race-card-table-card" className="display-card bottom">
      <table id="race-card-table" className="w-100">
        <thead id="race-card-table-head">
          <tr>
            <th>Position</th>
            <th>Number</th>
            <th>Driver</th>
            <th>Team</th>
            <th>Time / Status</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody id="race-card-table-body">
          {result.map((res) => (
            <tr key={res.position} id={`race-card-table-row-${res.position}`}>
              <td>{res.position}</td>
              <td>{res.number}</td>
              <td>
                <Link
                  id={`race-card-table-link-${res.position}`}
                  to={`/pilots/${res.code}`}
                >
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
