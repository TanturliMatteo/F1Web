import { nationToCode } from "../../utils/nationalityCode";
import type { Race } from "../../hooks/useRace";
import { getNationColor } from "../../utils/nationColors";

interface RaceCardHeaderProps {
  data: Race;
}

const flagUrl = (nationality: string) =>
  `https://flagcdn.com/w40/${nationToCode[nationality]}.png`;

const RaceCardHeader = ({ data: race }: RaceCardHeaderProps) => {
  return (
    <div
      className="display-card race-card-header"
      style={{ borderLeft: `3px solid ${getNationColor(race.country)}` }}
    >
      <div>{race.round}</div>
      <div>{race.raceName}</div>
      <div>{race.circuitName}</div>
      <div className="race-card-country">
        <div>{race.locality}</div>
        <img src={flagUrl(race.country)} alt={race.country} className="flag" />
      </div>
      <div>[{race.date}]</div>
    </div>
  );
};

export default RaceCardHeader;
