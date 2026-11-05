// Numbers about each circuit. Descriptions and trivia are translated text:
// they live in src/locales/<lang>/circuits.json under the same keys.
export interface CircuitInfo {
  name: string;
  length: string;
  laps: number;
}

// Keys are the Ergast/Jolpica circuitId values, so a reshuffled calendar
// (new or cancelled rounds) never shifts the data onto the wrong race
export const circuitInfo: Record<string, CircuitInfo> = {
  albert_park: { name: "Albert Park Circuit", length: "5.278 km", laps: 58 },
  shanghai: { name: "Shanghai International Circuit", length: "5.451 km", laps: 56 },
  suzuka: { name: "Suzuka International Racing Course", length: "5.807 km", laps: 53 },
  bahrain: { name: "Bahrain International Circuit", length: "5.412 km", laps: 57 },
  jeddah: { name: "Jeddah Corniche Circuit", length: "6.174 km", laps: 50 },
  miami: { name: "Miami International Autodrome", length: "5.412 km", laps: 57 },
  villeneuve: { name: "Circuit Gilles Villeneuve", length: "4.361 km", laps: 70 },
  monaco: { name: "Circuit de Monaco", length: "3.337 km", laps: 78 },
  catalunya: { name: "Circuit de Barcelona-Catalunya", length: "4.657 km", laps: 66 },
  red_bull_ring: { name: "Red Bull Ring", length: "4.318 km", laps: 71 },
  silverstone: { name: "Silverstone Circuit", length: "5.891 km", laps: 52 },
  spa: { name: "Circuit de Spa-Francorchamps", length: "7.004 km", laps: 44 },
  hungaroring: { name: "Hungaroring", length: "4.381 km", laps: 70 },
  zandvoort: { name: "Circuit Zandvoort", length: "4.259 km", laps: 72 },
  monza: { name: "Autodromo Nazionale Monza", length: "5.793 km", laps: 53 },
  madring: { name: "Circuito de Madrid (IFEMA)", length: "5.474 km", laps: 55 },
  sepang: { name: "Sepang International Circuit", length: "5.543 km", laps: 56 },
  baku: { name: "Baku City Circuit", length: "6.003 km", laps: 51 },
  marina_bay: { name: "Marina Bay Street Circuit", length: "4.940 km", laps: 62 },
  americas: { name: "Circuit of The Americas (COTA)", length: "5.513 km", laps: 56 },
  rodriguez: { name: "Autódromo Hermanos Rodríguez", length: "4.304 km", laps: 71 },
  interlagos: { name: "Autódromo José Carlos Pace (Interlagos)", length: "4.309 km", laps: 71 },
  vegas: { name: "Las Vegas Strip Circuit", length: "6.201 km", laps: 50 },
  losail: { name: "Lusail International Circuit", length: "5.419 km", laps: 57 },
  yas_marina: { name: "Yas Marina Circuit", length: "5.281 km", laps: 58 },
};
