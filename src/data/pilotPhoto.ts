import col from "../assets/pilots/2026alpinefracol01right.avif";
import gas from "../assets/pilots/2026alpinepiegas01right.avif";
import alo from "../assets/pilots/2026astonmartinferalo01right.avif";
import str from "../assets/pilots/2026astonmartinlanstr01right.avif";
import bor from "../assets/pilots/2026audigabbor01right.avif";
import hul from "../assets/pilots/2026audinichul01right.avif";
import per from "../assets/pilots/2026cadillacserper01right.avif";
import bot from "../assets/pilots/2026cadillacvalbot01right.avif";
import lec from "../assets/pilots/2026ferrarichalec01right.avif";
import ham from "../assets/pilots/2026ferrarilewham01right.avif";
import oco from "../assets/pilots/2026haasestoco01right.avif";
import bea from "../assets/pilots/2026haasolibea01right.avif";
import nor from "../assets/pilots/2026mclarenlannor01right.avif";
import pia from "../assets/pilots/2026mclarenoscpia01right.avif";
import ant from "../assets/pilots/2026mercedesandant01right.avif";
import rus from "../assets/pilots/2026mercedesgeorus01right.avif";
import lin from "../assets/pilots/2026racingbullsarvlin01right.avif";
import law from "../assets/pilots/2026racingbullslialaw01right.avif";
import had from "../assets/pilots/2026redbullracingisahad01right.avif";
import ver from "../assets/pilots/2026redbullracingmaxver01right.avif";
import alb from "../assets/pilots/2026williamsalealb01right.avif";
import sai from "../assets/pilots/2026williamscarsai01right.avif";

const pilotPhoto: Record<string, string> = {
  col: col,
  gas: gas,
  alo: alo,
  str: str,
  bor: bor,
  hul: hul,
  per: per,
  bot: bot,
  lec: lec,
  ham: ham,
  oco: oco,
  bea: bea,
  nor: nor,
  pia: pia,
  ant: ant,
  rus: rus,
  lin: lin,
  law: law,
  had: had,
  ver: ver,
  alb: alb,
  sai: sai,
};

export default function getPilotPhoto(pilotCode: string): string | undefined {
  return pilotPhoto[pilotCode.toLowerCase()];
}
