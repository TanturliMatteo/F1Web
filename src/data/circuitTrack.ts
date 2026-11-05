// Importiamo tutte le immagini usando i tuoi nomi reali di file
import track1 from "../assets/traks/Albert_Park_Circuit_2021.svg.png";
import track2 from "../assets/traks/Shanghai_International_Racing_Circuit_track_map.svg.png";
import track3 from "../assets/traks/Suzuka_circuit_map--2005.svg.png";
import track6 from "../assets/traks/Hard_Rock_Stadium_Circuit_2022.svg.png";
import track7 from "../assets/traks/Île_Notre-Dame_(Circuit_Gilles_Villeneuve).svg.png";
import track8 from "../assets/traks/Monte_Carlo_Formula_1_track_map.svg.png";
import track9 from "../assets/traks/Circuit_de_Catalunya_moto_2021.svg.png";
import track10 from "../assets/traks/Circuit_Red_Bull_Ring.svg.png";
import track11 from "../assets/traks/Circuit_Silverstone_2011.svg.png";
import track12 from "../assets/traks/Spa-Francorchamps_of_Belgium.svg.png";
import track13 from "../assets/traks/Hungaroring.svg.png";
import track14 from "../assets/traks/Zandvoort_Circuit.png";
import track15 from "../assets/traks/Monza_Map-2021.png";
import track16 from "../assets/traks/Madring_(2026).svg.png"; // Madrid!
import track17 from "../assets/traks/Baku_Formula_One_circuit_map.svg.png";
import track18 from "../assets/traks/Marina_Bay_circuit_2023.svg.png";
import track19 from "../assets/traks/Austin_circuit.svg.png";
import track20 from "../assets/traks/Autódromo_Hermanos_Rodríguez_2015.svg.png";
import track21 from "../assets/traks/Autódromo_José_Carlos_Pace_(AKA_Interlagos)_track_map.svg.png";
import track22 from "../assets/traks/2023_Las_Vegas_street_circuit.svg.png";
import track23 from "../assets/traks/Lusail_International_Circuit_2023.svg.png";
import track24 from "../assets/traks/Yas_Marina_Circuit.png";

// Keys are the Ergast/Jolpica circuitId values, so the map survives calendar changes
// (no image yet for sepang: the race page falls back gracefully)
export const circuitImages: Record<string, string> = {
  albert_park: track1, // Melbourne
  shanghai: track2, // Shanghai
  suzuka: track3, // Suzuka
  miami: track6, // Miami
  villeneuve: track7, // Montreal
  monaco: track8, // Monaco
  catalunya: track9, // Barcellona
  red_bull_ring: track10, // Red Bull Ring
  silverstone: track11, // Silverstone
  spa: track12, // Spa
  hungaroring: track13, // Hungaroring
  zandvoort: track14, // Zandvoort
  monza: track15, // Monza
  madring: track16, // Madrid
  baku: track17, // Baku
  marina_bay: track18, // Singapore
  americas: track19, // Austin
  rodriguez: track20, // Messico
  interlagos: track21, // Interlagos
  vegas: track22, // Las Vegas
  losail: track23, // Lusail
  yas_marina: track24, // Abu Dhabi
};
