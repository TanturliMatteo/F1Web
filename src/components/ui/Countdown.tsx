import { useEffect, useState } from "react";
import { useI18n } from "../../i18n/i18n";

// [label key, seconds per unit, modulo]
const UNITS = [
  ["days", 86400, Infinity],
  ["hours", 3600, 24],
  ["min", 60, 60],
  ["sec", 1, 60],
] as const;

const Countdown = ({ target }: { target: Date }) => {
  const { t } = useI18n();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // An unreadable start time shows zeros instead of "NaN"
  const secondsLeft =
    Math.max(0, Math.floor((target.getTime() - now) / 1000)) || 0;

  return (
    <div id="countdown" className="countdown">
      {UNITS.map(([unit, seconds, modulo]) => (
        <div key={unit} className="countdown-unit">
          <span className="countdown-value">
            {String(Math.floor(secondsLeft / seconds) % modulo).padStart(2, "0")}
          </span>
          <span className="countdown-label">{t(`countdown.${unit}`)}</span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
