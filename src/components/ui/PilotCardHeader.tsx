import { Link } from "react-router";
import type { PilotStandings } from "../../services/PilotStandingsServices";
import { getNationalityToCode } from "../../utils/nationalityCode";
import { getTeamColor } from "../../utils/teamColors";

interface PilotCardHeaderProps {
  data: PilotStandings | null;
}

const flagUrl = (nationality: string) =>
  `https://flagcdn.com/w40/${getNationalityToCode(nationality)}.png`;

const PilotCardHeader = ({ data: pilot }: PilotCardHeaderProps) => {
  if (!pilot) {
    return null;
  }

  return (
    <div
      className="display-card display-card-row"
      style={{ borderLeft: `3px solid ${getTeamColor(pilot.constructorId)}` }}
    >
      <h2>
        [{pilot.permanentNumber}]{" "}
        <Link
          to={`http://en.wikipedia.org/wiki/${pilot.name}_${pilot.surname}`}
          target="_blank"
          className="pilot-name"
        >
          {pilot.name} {pilot.surname}
        </Link>
      </h2>
      <img
        src={flagUrl(pilot.nationality)}
        alt={pilot.nationality}
        className="flag flag-lg"
      />
    </div>
  );
};

export default PilotCardHeader;
