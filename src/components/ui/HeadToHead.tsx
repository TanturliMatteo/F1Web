import { Link } from "react-router";
import useInView from "../../hooks/useInView";
import type { HeadToHeadRow } from "../../hooks/useResultsPilot";
import getPilotPhoto from "../../data/pilotPhoto";

interface Driver {
  code: string;
  name: string;
}

interface HeadToHeadProps {
  id: string;
  driver: Driver;
  teammate: Driver;
  rows: HeadToHeadRow[];
}

const Avatar = ({ driver }: { driver: Driver }) => (
  <img
    src={getPilotPhoto(driver.code)}
    alt=""
    className="podium-avatar"
  />
);

// Mirrored bars: the driver on the left (team colour), teammate on the right
const HeadToHead = ({ id, driver, teammate, rows }: HeadToHeadProps) => {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div id={id} ref={ref} className="ui-card h2h">
      <div className="h2h-drivers">
        <span className="h2h-driver">
          <Avatar driver={driver} />
          {driver.name}
        </span>
        <span className="section-label">vs</span>
        <Link
          id={`${id}-teammate-link`}
          to={`/pilots/${teammate.code.toLowerCase()}`}
          className="h2h-driver h2h-driver--right"
        >
          {teammate.name}
          <Avatar driver={teammate} />
        </Link>
      </div>
      {rows.map((row) => {
        const total = row.mine + row.theirs;
        // Even split when neither side scored yet
        const share = total ? (row.mine / total) * 100 : 50;
        return (
          <div key={row.label} className="h2h-row">
            <span className="h2h-value">{row.mine}</span>
            <div className="h2h-center">
              <span className="h2h-label">{row.label}</span>
              <div className="h2h-bar" aria-hidden="true">
                <span
                  className="h2h-bar-mine"
                  style={{ width: inView ? `${share}%` : "50%" }}
                />
              </div>
            </div>
            <span className="h2h-value h2h-value--right">{row.theirs}</span>
          </div>
        );
      })}
    </div>
  );
};

export default HeadToHead;
