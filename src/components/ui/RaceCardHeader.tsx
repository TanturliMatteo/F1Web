import { getNationToCode } from "../../utils/nationalityCode";
import { getNationColor } from "../../utils/nationColors";
import type { Race } from "../../services/RacesServices";

interface RaceCardHeaderProps {
  data: Race | null;
}

const flagUrl = (nationality: string) =>
  `https://flagcdn.com/w40/${getNationToCode(nationality)}.png`;

const RaceCardHeader = ({ data: race }: RaceCardHeaderProps) => {
  if (!race) {
    return null;
  }
  return (
    <div
      id="race-card-header"
      className="display-card display-card-row top"
      style={{ borderLeft: `3px solid ${getNationColor(race.country)}` }}
    >
      <h3 id="race-card-header-round">{race.round}</h3>
      <h3 id="race-card-header-name">{race.name}</h3>

      <img
        id="race-card-header-flag"
        src={flagUrl(race.country)}
        alt={race.country}
        className="flag flag-lg"
      />
    </div>
  );
};

export default RaceCardHeader;
