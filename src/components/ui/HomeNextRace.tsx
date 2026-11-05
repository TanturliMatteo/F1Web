import type { Race } from "../../services/RacesServices";
import { flagUrl } from "../../utils/flagUrl";
import { getRaceStart } from "../../utils/isRaceCompleted";
import { getNationToCode } from "../../utils/nationalityCode";
import Countdown from "./Countdown";
import { useI18n } from "../../i18n/i18n";
import { formatDate } from "../../utils/formatDate";

const HomeNextRace = ({ race }: { race: Race }) => {
  const { t, locale } = useI18n();
  return (
    <div id="home-next-race" className="ui-card ui-row my-3">
      <div id="home-next-race-info" className="ui-grow-2">
        <p id="home-next-race-label" className="section-label">
          {t("home.nextRace", { round: race.round })}
        </p>
        <h2 id="home-next-race-name">{race.name}</h2>
        <p id="home-next-race-location">
          <img
            id="home-next-race-flag"
            src={flagUrl(getNationToCode(race.country))}
            alt={race.country}
            className="flag"
          />
          {race.circuit}, {race.locality} · {formatDate(race.date, locale)}
        </p>
      </div>
      <Countdown target={getRaceStart(race.date, race.time)} />
    </div>
  );
};

export default HomeNextRace;
