import { useEffect, useState } from "react";

// [label, seconds per unit, modulo]
const UNITS = [
  ["Days", 86400, Infinity],
  ["Hours", 3600, 24],
  ["Min", 60, 60],
  ["Sec", 1, 60],
] as const;

const Countdown = ({ target }: { target: Date }) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const secondsLeft = Math.max(0, Math.floor((target.getTime() - now) / 1000));

  return (
    <div id="countdown" className="countdown">
      {UNITS.map(([label, seconds, modulo]) => (
        <div key={label} className="countdown-unit">
          <span className="countdown-value">
            {String(Math.floor(secondsLeft / seconds) % modulo).padStart(2, "0")}
          </span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
