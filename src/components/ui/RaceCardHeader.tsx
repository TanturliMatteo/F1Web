import { getNationToCode } from "../../utils/nationalityCode";
import { getNationColor } from "../../utils/nationColors";
import { flagUrl } from "../../utils/flagUrl";
import type { Race } from "../../services/RacesServices";

interface RaceCardHeaderProps {
  data: Race | null;
}

const RaceCardHeader = ({ data: race }: RaceCardHeaderProps) => {
  if (!race) {
    return null;
  }
  return (
    <div
      id="race-card-header"
      className="ui-card ui-row mt-3"
      style={{ borderLeft: `3px solid ${getNationColor(race.country)}` }}
    >
      <h3 id="race-card-header-round">{race.round}</h3>
      <h3 id="race-card-header-name">{race.name}</h3>

      <img
        id="race-card-header-flag"
        src={flagUrl(getNationToCode(race.country))}
        alt={race.country}
        className="flag flag--lg"
      />
    </div>
  );
};

export default RaceCardHeader;
