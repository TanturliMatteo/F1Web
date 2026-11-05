import type { Race } from "../../services/RacesServices";
import { circuitDescriptions } from "../../data/circuitDescriptions";
import { circuitImages } from "../../data/circuitTrack";
import StatTiles from "./StatTiles";

// Map, story and key numbers of the circuit hosting a race
const RaceCircuit = ({ race }: { race: Race }) => {
  const info = circuitDescriptions[race.circuitId];
  const image = circuitImages[race.circuitId];
  const length = info ? parseFloat(info.length) : NaN;

  return (
    <div id="race-circuit" className="ui-stack">
      <div className="ui-row ui-row--stretch">
        <div id="race-circuit-map" className="ui-card circuit-map ui-grow-1">
          {image ? (
            <img
              id="race-circuit-image"
              src={image}
              alt={`Track map of ${race.circuit}`}
              className="circuit-image"
            />
          ) : (
            <p id="race-circuit-no-image">Track map not available yet.</p>
          )}
        </div>
        <div id="race-circuit-info" className="ui-card ui-stack ui-stack--start ui-grow-1">
          <h3 id="race-circuit-name">{race.circuit}</h3>
          <p id="race-circuit-description" className="prose">
            {info?.description ?? "No additional information available for this circuit yet."}
          </p>
          {info?.trivia && (
            <aside id="race-circuit-trivia" className="callout">
              <p className="section-label">Did you know?</p>
              <p className="prose">{info.trivia}</p>
            </aside>
          )}
        </div>
      </div>
      {info && (
        <StatTiles
          id="race-circuit-tiles"
          tiles={[
            { key: "length", label: "Lap length", value: info.length },
            { key: "laps", label: "Laps", value: info.laps },
            {
              key: "distance",
              label: "Race distance",
              value: Number.isNaN(length)
                ? "-"
                : `${(length * info.laps).toFixed(1)} km`,
            },
            { key: "location", label: "Location", value: race.locality, detail: race.country },
          ]}
        />
      )}
    </div>
  );
};

export default RaceCircuit;
