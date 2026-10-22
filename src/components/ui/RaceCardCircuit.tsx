import type { Race } from "../../services/RacesServices";
import { circuitDescriptions } from "../../data/circuitDescriptions";
import { circuitImages } from "../../data/circuitTrack";

interface RaceCardCircuitProps {
  data: Race;
  round: string | undefined;
}

const RaceCardCircuit = ({ data: circuit, round }: RaceCardCircuitProps) => {
  if (!circuit) {
    return null;
  }
  const extraCircuitInfo = round ? circuitDescriptions[round] : null;
  const circuitImage = round ? circuitImages[round] : null;
  return (
    <div id="race-card-circuit" className="display-card-row stretch middle">
      <div id="race-card-circuit-image-card" className="display-card min p-1">
        {circuitImage ? (
          <img
            id="race-card-circuit-image"
            src={circuitImage}
            className="circuit-image"
          />
        ) : (
          <p id="race-card-circuit-no-image">No image available</p>
        )}
      </div>
      <div id="race-card-circuit-info-card" className="display-card max">
        <div id="race-card-circuit-info" className="display-card-column">
          <h2 id="race-card-circuit-title">
            {circuit.circuit}
            {"  "}[{circuit.locality}]
          </h2>
          <p id="race-card-circuit-description">
            {extraCircuitInfo
              ? extraCircuitInfo.description
              : "No additional information available for this circuit."}
          </p>
          <p id="race-card-circuit-trivia">{extraCircuitInfo ? extraCircuitInfo.trivia : "none"} </p>
        </div>
      </div>
    </div>
  );
};

export default RaceCardCircuit;
