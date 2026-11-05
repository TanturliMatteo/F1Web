import useInView from "../../hooks/useInView";

export interface ChartSeries {
  key: string;
  label: string;
  color: string;
  values: number[];
  dashed?: boolean;
}

interface PointsChartProps {
  id: string;
  title: string;
  xLabels: string[];
  series: ChartSeries[];
}

// Line chart of running totals. The SVG stretches to its box (lines keep
// their width thanks to non-scaling-stroke) and the axis labels are HTML,
// so text stays readable at any screen size.
const PointsChart = ({ id, title, xLabels, series }: PointsChartProps) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const max = Math.max(1, ...series.flatMap((s) => s.values));
  const count = xLabels.length;
  const x = (i: number) => (count > 1 ? (i / (count - 1)) * 100 : 50);
  const y = (v: number) => 100 - (v / max) * 100;
  const ticks = [max, Math.round(max / 2), 0];

  return (
    <figure id={id} className="ui-card chart-card">
      <figcaption className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <ul className="chart-legend">
          {series.map((s) => (
            <li key={s.key}>
              <span
                className={`legend-line${s.dashed ? " legend-line--dashed" : ""}`}
                style={{ borderColor: s.color }}
              />
              {s.label} · {s.values.at(-1) ?? 0} pts
            </li>
          ))}
        </ul>
      </figcaption>
      <div ref={ref} className="line-chart">
        <div className="line-chart-y" aria-hidden="true">
          {ticks.map((t, i) => (
            <span key={i} style={{ top: `${y(t)}%` }}>
              {t}
            </span>
          ))}
        </div>
        <div className={`line-chart-plot${inView ? " is-visible" : ""}`}>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            role="img"
            aria-label={series
              .map((s) => `${s.label}: ${s.values.at(-1) ?? 0} points`)
              .join(", ")}
          >
            {ticks.map((t, i) => (
              <line
                key={i}
                className="line-chart-grid"
                x1="0"
                x2="100"
                y1={y(t)}
                y2={y(t)}
              />
            ))}
            {series.map((s) => (
              <polyline
                key={s.key}
                className="line-chart-line"
                points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")}
                style={{ stroke: s.color }}
                strokeDasharray={s.dashed ? "6 5" : undefined}
              />
            ))}
          </svg>
          <div className="line-chart-x" aria-hidden="true">
            {xLabels.map((label, i) => (
              <span
                key={label}
                style={{ left: `${x(i)}%` }}
                className={i % 2 ? "line-chart-x-odd" : undefined}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
};

export default PointsChart;
