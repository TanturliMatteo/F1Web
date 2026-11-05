import type { ReactNode } from "react";

export interface StatTile {
  key: string;
  label: string;
  value: ReactNode;
  detail?: ReactNode;
}

interface StatTilesProps {
  id: string;
  tiles: StatTile[];
}

// Row of headline numbers; wraps into a grid on narrow screens
const StatTiles = ({ id, tiles }: StatTilesProps) => (
  <dl id={id} className="stat-tiles">
    {tiles.map((tile) => (
      <div key={tile.key} id={`${id}-${tile.key}`} className="stat-tile">
        <dt className="stat-tile-label">{tile.label}</dt>
        <dd className="stat-tile-value">{tile.value}</dd>
        {tile.detail && <dd className="stat-tile-detail">{tile.detail}</dd>}
      </div>
    ))}
  </dl>
);

export default StatTiles;
