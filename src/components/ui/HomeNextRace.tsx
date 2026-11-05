import type { Race } from "../../services/RacesServices";
import { getRaceStart } from "../../utils/isRaceCompleted";
import { formatDate } from "../../utils/formatDate";
import { useI18n } from "../../i18n/i18n";
import Countdown from "./Countdown";
import Flag from "./Flag";

const HomeNextRace = ({ race }: { race: Race }) => {
  const { t, locale } = useI18n();
  return (
    <div id="home-next-race" className="ui-card ui-row">
      <div id="home-next-race-info" className="ui-grow-2">
        <p id="home-next-race-label" className="section-label">
          {t("home.nextRace", { round: race.round })}
        </p>
        <h2 id="home-next-race-name">{race.name}</h2>
        <p id="home-next-race-location">
          <Flag country={race.country} alt={race.country} />
          {race.circuit}, {race.locality} · {formatDate(race.date, locale)}
        </p>
      </div>
      <Countdown target={getRaceStart(race.date, race.time)} />
    </div>
  );
};

export default HomeNextRace;
