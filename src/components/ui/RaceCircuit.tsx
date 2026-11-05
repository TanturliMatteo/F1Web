import type { Race } from "../../services/RacesServices";
import { circuitInfo } from "../../data/circuitInfo";
import { circuitImages } from "../../data/circuitTrack";
import { useI18n } from "../../i18n/i18n";
import StatTiles from "./StatTiles";

// Map, story and key numbers of the circuit hosting a race
const RaceCircuit = ({ race }: { race: Race }) => {
  const { t, circuitText } = useI18n();
  const info = circuitInfo[race.circuitId];
  const text = circuitText(race.circuitId);
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
              alt={t("race.circuit.mapAlt", { name: race.circuit })}
              className="circuit-image"
            />
          ) : (
            <p id="race-circuit-no-image">{t("race.circuit.noMap")}</p>
          )}
        </div>
        <div
          id="race-circuit-info"
          className="ui-card ui-stack ui-stack--start ui-grow-1"
        >
          <h3 id="race-circuit-name">{race.circuit}</h3>
          <p id="race-circuit-description" className="prose">
            {text?.description ?? t("race.circuit.noInfo")}
          </p>
          {text?.trivia && (
            <aside id="race-circuit-trivia" className="callout">
              <p className="section-label">{t("race.circuit.didYouKnow")}</p>
              <p className="prose">{text.trivia}</p>
            </aside>
          )}
        </div>
      </div>
      {info && (
        <StatTiles
          id="race-circuit-tiles"
          tiles={[
            { key: "length", label: t("race.circuit.lapLength"), value: info.length },
            { key: "laps", label: t("race.circuit.laps"), value: info.laps },
            {
              key: "distance",
              label: t("race.circuit.distance"),
              value: Number.isNaN(length)
                ? "-"
                : `${(length * info.laps).toFixed(1)} km`,
            },
            {
              key: "location",
              label: t("race.circuit.location"),
              value: race.locality,
              detail: race.country,
            },
          ]}
        />
      )}
    </div>
  );
};

export default RaceCircuit;
