import { usePilot } from "../hooks/usePilot";
import { usePilotStats } from "../hooks/usePilotResults";
import { useParams } from "react-router";
import { usePilotPhoto } from "../hooks/usePilotPhoto";
import PilotCard from "../components/ui/PilotCard";
import PilotCardHeader from "../components/ui/PilotCardHeader";

const PilotCardPage = () => {
  const { id } = useParams();
  const { data, loading, error } = usePilot(id);
  const {
    data: photo,
    loading: loadingPhoto,
    error: errorPhoto,
  } = usePilotPhoto(id);
  const {
    data: stats,
    loading: loadingStats,
    error: errorStats,
  } = usePilotStats(id);

  if (loading || loadingStats || loadingPhoto) return <div>Loading...</div>;

  if (error || errorStats || errorPhoto)
    return (
      <div>
        Error: {error?.message || errorStats?.message || errorPhoto?.message}
      </div>
    );

  if (!data || !stats) {
    return <div>Pilot not found</div>;
  }

  return (
    <div>
      <PilotCardHeader data={data} />
      <PilotCard pilot={data} stats={stats} photo={photo} />
    </div>
  );
};

export default PilotCardPage;
