import type { PilotStandings } from "../../services/PilotStandingsServices";
import getPilotDescription from "../../data/pilotDescriptions";
import getPilotPhoto from "../../data/pilotPhoto";
import getTeamColor from "../../utils/teamColors";

interface PilotCardProps {
  pilot: PilotStandings | null;
}

const PilotCard = ({ pilot }: PilotCardProps) => {
  if (!pilot) {
    return (
      <div id="pilot-card-info-loading" className="display-card-row stretch">
        <p>Caricamento dati pilota...</p>
      </div>
    );
  }

  return (
    <div id="pilot-card-info" className=" display-card-row stretch middle">
      <div
        id="pilot-card-info-card"
        className="display-card display-card-row stretch pb-0 pilot"
        style={
          {
            "--team-color": getTeamColor(pilot.constructorId),
          } as React.CSSProperties
        }
      >
        <div
          id="pilot-card-info-photo-container"
          className="display-card-column min pilot-photo-container"
        >
          <p
            id="pilot-card-info-number"
            className="pilotNumber"
            style={{ color: getTeamColor(pilot.constructorId) }}
          >
            {pilot.permanentNumber}
          </p>
          <img
            id="pilot-card-info-photo"
            src={getPilotPhoto(pilot.code.toLowerCase())}
            alt={pilot.name}
            className="pilot-photo"
          />
        </div>
        <div
          id="pilot-card-info-description-container"
          className="display-card-column mid"
        >
          <p id="pilot-card-info-description" className="pilot-description ">
            {getPilotDescription(pilot.code.toLowerCase())}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PilotCard;
