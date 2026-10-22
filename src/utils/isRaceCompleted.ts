// A race counts as completed a few hours after the lights go out
const RACE_DURATION_MS = 3 * 60 * 60 * 1000;

export const getRaceStart = (date: string, time?: string) =>
  new Date(time ? `${date}T${time}` : date);

const isRaceCompleted = (date: string, time?: string) =>
  getRaceStart(date, time).getTime() + RACE_DURATION_MS < Date.now();

export default isRaceCompleted;
