import type { Race } from "../../services/RacesServices";
import { flagUrl } from "../../utils/flagUrl";
import { getRaceStart } from "../../utils/isRaceCompleted";
import { getNationToCode } from "../../utils/nationalityCode";
import Countdown from "./Countdown";

const HomeNextRace = ({ race }: { race: Race }) => (
  <div id="home-next-race" className="ui-card ui-row my-3">
    <div id="home-next-race-info" className="ui-grow-2">
      <p id="home-next-race-label" className="section-label">
        Next race · Round {race.round}
      </p>
      <h2 id="home-next-race-name">{race.name}</h2>
      <p id="home-next-race-location">
        <img
          id="home-next-race-flag"
          src={flagUrl(getNationToCode(race.country))}
          alt={race.country}
          className="flag"
        />
        {race.circuit}, {race.locality} · {race.date}
      </p>
    </div>
    <Countdown target={getRaceStart(race.date, race.time)} />
  </div>
);

export default HomeNextRace;
