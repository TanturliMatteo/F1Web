import type { Race } from "../../services/RacesServices";
import { getRaceStart } from "../../utils/isRaceCompleted";
import { formatSessionTime } from "../../utils/formatDate";
import Countdown from "./Countdown";

// Countdown to lights out plus the weekend timetable, for races still to run
const RaceSchedule = ({ race }: { race: Race }) => (
  <div id="race-schedule" className="ui-row ui-row--stretch">
    <div id="race-schedule-countdown" className="ui-card ui-stack ui-stack--center ui-grow-1">
      <p className="section-label">Lights out in</p>
      <Countdown target={getRaceStart(race.date, race.time)} />
    </div>
    <dl id="race-schedule-sessions" className="ui-card info-list ui-grow-1">
      {race.sessions.map((session) => (
        <div key={session.name}>
          <dt>{session.name}</dt>
          <dd>{formatSessionTime(session.date, session.time)}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export default RaceSchedule;
