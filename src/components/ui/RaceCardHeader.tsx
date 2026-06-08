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
      className="display-card display-card-row"
      style={{ borderLeft: `3px solid ${getNationColor(race.country)}` }}
    >
      <h3>{race.round}</h3>
      <h3>{race.name}</h3>

      <img
        src={flagUrl(race.country)}
        alt={race.country}
        className="flag flag-lg"
      />
    </div>
  );
};

export default RaceCardHeader;
