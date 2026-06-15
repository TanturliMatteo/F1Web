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
      <div className="display-card-row stretch">
        <p>Caricamento dati pilota...</p>
      </div>
    );
  }

  return (
    <div className=" display-card-row stretch middle">
      <div
        className="display-card display-card-row stretch pb-0 pilot"
        style={
          {
            "--team-color": getTeamColor(pilot.constructorId),
          } as React.CSSProperties
        }
      >
        <div className="display-card-column min pilot-photo-container">
          <p
            className="pilotNumber"
            style={{ color: getTeamColor(pilot.constructorId) }}
          >
            {pilot.permanentNumber}
          </p>
          <img
            src={getPilotPhoto(pilot.code.toLowerCase())}
            alt={pilot.name}
            className="pilot-photo"
          />
        </div>
        <div className="display-card-column mid">
          <p className="pilot-description ">
            {getPilotDescription(pilot.code.toLowerCase())}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PilotCard;
