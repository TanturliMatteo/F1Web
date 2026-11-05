import { Link } from "react-router";
import getPilotPhoto from "../../data/pilotPhoto";
import getTeamColor from "../../utils/teamColors";

export interface PodiumItem {
  // Shown in the left column: a position ("1") or a change ("+5")
  position: string;
  code: string;
  name: string;
  detail: string;
  teamId: string;
  tone?: "up" | "down";
}

interface PodiumProps {
  id: string;
  title: string;
  linkTo?: string;
  items: PodiumItem[];
}

const positionClass = (item: PodiumItem) => {
  if (item.tone) return `podium-position--${item.tone}`;
  return ["1", "2", "3"].includes(item.position)
    ? `podium-position--${item.position}`
    : "";
};

// Short list of drivers with avatar, team stripe and a detail on the right
const Podium = ({ id, title, linkTo, items }: PodiumProps) => (
  <section id={id} className="ui-card podium">
    <div className="podium-header">
      <h3 id={`${id}-title`}>{title}</h3>
      {linkTo && (
        <Link id={`${id}-link`} to={linkTo}>
          View all
        </Link>
      )}
    </div>
    {items.map((item) => (
      <Link
        key={item.code}
        id={`${id}-item-${item.code.toLowerCase()}`}
        to={`/pilots/${item.code.toLowerCase()}`}
        className="podium-item"
        style={{ borderLeftColor: getTeamColor(item.teamId) }}
      >
        <span className={`podium-position ${positionClass(item)}`}>
          {item.position}
        </span>
        <img
          src={getPilotPhoto(item.code)}
          alt=""
          className="podium-avatar"
        />
        <span className="podium-name">{item.name}</span>
        <span className="podium-detail">{item.detail}</span>
      </Link>
    ))}
  </section>
);

export default Podium;
