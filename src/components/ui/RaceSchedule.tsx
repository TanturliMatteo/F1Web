import type { Race } from "../../services/RacesServices";
import { getRaceStart } from "../../utils/isRaceCompleted";
import { formatSessionTime } from "../../utils/formatDate";
import { useI18n } from "../../i18n/i18n";
import Countdown from "./Countdown";

// Countdown to lights out plus the weekend timetable, for races still to run
const RaceSchedule = ({ race }: { race: Race }) => {
  const { t, locale } = useI18n();

  return (
    <div id="race-schedule" className="ui-row ui-row--stretch">
      <div
        id="race-schedule-countdown"
        className="ui-card ui-stack ui-stack--center ui-grow-1"
      >
        <p className="section-label">{t("race.weekend.lightsOut")}</p>
        <Countdown target={getRaceStart(race.date, race.time)} />
      </div>
      <dl id="race-schedule-sessions" className="ui-card info-list ui-grow-1">
        {race.sessions.map((session) => (
          <div key={session.key}>
            <dt>{t(`race.sessions.${session.key}`)}</dt>
            <dd>{formatSessionTime(session.date, session.time, locale)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default RaceSchedule;
