import React from "react";
import type { Race } from "../../hooks/useRace";

interface RaceCardCircuitProps {
  data: Race;
}

const RaceCardCircuit = ({ data: circuit }: RaceCardCircuitProps) => {
  return (
    <div className="display-card-row stretch">
      <div className="display-card min ">
        <img src="../Australia_Circuit.png" className="circuit-image" />
      </div>
      <div className="display-card max">
        <div className="display-card-column">
          <h2>
            {circuit.circuitName}
            {"  "}[{circuit.locality}]
          </h2>
          <p>
            Situato nel cuore di Melbourne, l'Albert Park è un circuito
            cittadino semi-permanente che si snoda attorno a un suggestivo lago
            artificiale. Famoso per i suoi tratti veloci intervallati da frenate
            brusche, richiede un carico aerodinamico medio-alto ed è
            storicamente uno dei tracciati più iconici e amati per l'apertura
            del mondiale.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RaceCardCircuit;
