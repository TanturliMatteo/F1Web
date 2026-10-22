import { Link } from "react-router";
import getPilotPhoto from "../../data/pilotPhoto";
import getTeamColor from "../../utils/teamColors";

export interface PodiumItem {
  position: string;
  code: string;
  name: string;
  detail: string;
  teamId: string;
}

interface PodiumProps {
  id: string;
  title: string;
  linkTo: string;
  items: PodiumItem[];
}

const Podium = ({ id, title, linkTo, items }: PodiumProps) => (
  <section id={id} className="ui-card podium">
    <div className="podium-header">
      <h3 id={`${id}-title`}>{title}</h3>
      <Link id={`${id}-link`} to={linkTo}>
        View all
      </Link>
    </div>
    {items.map((item) => (
      <Link
        key={item.position}
        id={`${id}-item-${item.position}`}
        to={`/pilots/${item.code.toLowerCase()}`}
        className="podium-item"
        style={{ borderLeftColor: getTeamColor(item.teamId) }}
      >
        <span className={`podium-position podium-position--${item.position}`}>
          {item.position}
        </span>
        <img
          src={getPilotPhoto(item.code)}
          alt={item.name}
          className="podium-avatar"
        />
        <span className="podium-name">{item.name}</span>
        <span className="podium-detail">{item.detail}</span>
      </Link>
    ))}
  </section>
);

export default Podium;
