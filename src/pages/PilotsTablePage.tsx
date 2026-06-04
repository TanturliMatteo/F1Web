import PilotsTable from "../components/ui/PilotsTable";
import BestPilotCard from "../components/ui/BestPilotCard";
import { usePilots } from "../hooks/usePilots";
import { usePilotStats } from "../hooks/usePilotResults";
import { usePilotPhoto } from "../hooks/usePilotPhoto";
import { usePilot } from "../hooks/usePilot";
import { normalize } from "../utils/normalizeString";

const PilotsTablePage = () => {
  const { data, loading, error } = usePilots();

  const bestPilotId = data && data.length > 0 ? normalize(data[0].code) : null;

  const {
    data: pilot,
    loading: loadingPilot,
    error: errorPilot,
  } = usePilot(bestPilotId);

  const {
    data: stats,
    loading: loadingStats,
    error: errorStats,
  } = usePilotStats(bestPilotId);

  const {
    data: photo,
    loading: loadingPhoto,
    error: errorPhoto,
  } = usePilotPhoto(bestPilotId);

  if (loading || loadingStats || loadingPhoto || loadingPilot)
    return <div>Loading...</div>;
  if (error || errorStats || errorPhoto || errorPilot) {
    return (
      <div>
        Error:{" "}
        {error?.message ||
          errorStats?.message ||
          errorPhoto?.message ||
          errorPilot?.message}
      </div>
    );
  }

  return (
    <div className="page-container">
      <BestPilotCard pilot={pilot} stats={stats} photo={photo} />
      <PilotsTable data={data} />
    </div>
  );
};

export default PilotsTablePage;
