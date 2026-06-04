import type { Pilot } from "../../hooks/usePilot";
import type { PilotResult } from "../../hooks/usePilotResults";
import type { PilotPhoto } from "../../hooks/usePilotPhoto";

interface BestPilotCardProps {
  pilot: Pilot | null;
  stats: PilotResult | null;
  photo: PilotPhoto | null;
}

const BestPilotCard = ({ pilot, stats, photo }: BestPilotCardProps) => {
  return (
    <div className="display-card-row">
      <div className="display-card min">aaaa</div>
      <div className="display-card max">bbbb</div>
    </div>
  );
};

export default BestPilotCard;
