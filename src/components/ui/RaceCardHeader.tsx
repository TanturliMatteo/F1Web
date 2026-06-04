import { nationToCode } from "../../utils/nationalityCode";
import { getNationColor } from "../../utils/nationColors";
import type { Race } from "../../hooks/useRace";

interface RaceCardHeaderProps {
  data: Race;
}

const flagUrl = (nationality: string) =>
  `https://flagcdn.com/w40/${nationToCode[nationality]}.png`;

const RaceCardHeader = ({ data: race }: RaceCardHeaderProps) => {
  return (
    <div
      className="display-card display-card-row"
      style={{ borderLeft: `3px solid ${getNationColor(race.country)}` }}
    >
      <h3>{race.round}</h3>
      <h3>{race.raceName}</h3>
      <img
        src={flagUrl(race.country)}
        alt={race.country}
        className="flag flag-lg"
      />
    </div>
  );
};

export default RaceCardHeader;
