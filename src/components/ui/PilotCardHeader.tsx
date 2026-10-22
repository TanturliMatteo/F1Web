import { Link } from "react-router";
import type { PilotStandings } from "../../services/PilotStandingsServices";
import { getNationalityToCode } from "../../utils/nationalityCode";
import { flagUrl } from "../../utils/flagUrl";
import getTeamColor from "../../utils/teamColors";

interface PilotCardHeaderProps {
  data: PilotStandings | null;
}

const PilotCardHeader = ({ data: pilot }: PilotCardHeaderProps) => {
  if (!pilot) {
    return null;
  }

  return (
    <div
      id="pilot-card-header"
      className="display-card display-card-row top"
      style={{
        borderLeft: `3px solid ${getTeamColor(pilot.constructorId)}`,
      }}
    >
      <h2 id="pilot-card-header-title">
        [{pilot.permanentNumber}]{" "}
        <Link
          id="pilot-card-header-link"
          to={`http://en.wikipedia.org/wiki/${pilot.name}_${pilot.surname}`}
          target="_blank"
          className="pilot-name"
        >
          {pilot.name} {pilot.surname}
        </Link>
      </h2>
      <img
        id="pilot-card-header-flag"
        src={flagUrl(getNationalityToCode(pilot.nationality))}
        alt={pilot.nationality}
        className="flag flag-lg"
      />
    </div>
  );
};

export default PilotCardHeader;
