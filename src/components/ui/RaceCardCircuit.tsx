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
    <div className="display-card-row stretch">
      <div className="display-card min ">
        {circuitImage ? (
          <img src={circuitImage} className="circuit-image" />
        ) : (
          <img src="../Australia_Circuit.png" className="circuit-image" />
        )}
      </div>
      <div className="display-card max">
        <div className="display-card-column">
          <h2>
            {circuit.circuit}
            {"  "}[{circuit.locality}]
          </h2>
          <p>
            {extraCircuitInfo
              ? extraCircuitInfo.description
              : "No additional information available for this circuit."}
          </p>
          <p>{extraCircuitInfo ? extraCircuitInfo.trivia : "none"} </p>
        </div>
      </div>
    </div>
  );
};

export default RaceCardCircuit;
