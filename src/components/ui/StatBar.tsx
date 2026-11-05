interface StatBarProps {
  id: string;
  label: string;
  value: number;
  // Fill from 0 to the value once the bar is on screen
  animate: boolean;
}

// Labelled horizontal percentage bar, coloured with the page --accent
const StatBar = ({ id, label, value, animate }: StatBarProps) => (
  <div id={id} className="stat-bar">
    <div className="stat-bar-header">
      <span>{label}</span>
      <span id={`${id}-value`}>{value}%</span>
    </div>
    <div
      className="stat-bar-track"
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        id={`${id}-fill`}
        className="stat-bar-fill"
        style={{ width: animate ? `${value}%` : 0 }}
      />
    </div>
  </div>
);

export default StatBar;
