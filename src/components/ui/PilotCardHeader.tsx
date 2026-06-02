import { Link } from "react-router";
import type { Pilot } from "../../hooks/usePilot";
import { nationalityToCode } from "../../utils/nationalityCode";
import { getTeamColor } from "../../utils/teamColors";

interface PilotCardHeaderProps {
  data: Pilot;
}

const flagUrl = (nationality: string) =>
  `https://flagcdn.com/w40/${nationalityToCode[nationality]}.png`;

const PilotCardHeader = ({ data: pilot }: PilotCardHeaderProps) => {
  return (
    <div
      className=" display-card "
      style={{ borderLeft: `3px solid ${getTeamColor(pilot.constructorId)}` }}
    >
      <div className="pilot-header-segment">
        <div>[{pilot.permanentNumber}]</div>
        <div>
          <Link
            to={`http://en.wikipedia.org/wiki/${pilot.name}_${pilot.surname}`}
            className="pilot-name"
          >
            {pilot.name} {pilot.surname}
          </Link>
        </div>
        <div>
          <img
            src={flagUrl(pilot.nationality)}
            alt={pilot.nationality}
            className="flag"
          />
        </div>
      </div>
    </div>
  );
};

export default PilotCardHeader;
