import { usePilot } from "../hooks/usePilot";
import { useResultsPilot } from "../hooks/useResultsPilot";
import { Navigate, useParams } from "react-router";
import PilotCardStats from "../components/ui/PilotCardStats";
import PilotCard from "../components/ui/PilotCardInfo";
import PilotCardHeader from "../components/ui/PilotCardHeader";

const PilotCardPage = () => {
  const { id } = useParams();
  const { data, isError, isLoading, error } = usePilot(id);
  const {
    data: stats,
    isError: isStatsError,
    isLoading: isStatsLoading,
  } = useResultsPilot(id);

  if (isLoading || isStatsLoading)
    return (
      <div className="display-card display-card-column">
        Caricamento in corso...
      </div>
    );

  if (isError || isStatsError)
    return (
      <div className="display-card display-card-column">
        Errore: {error?.message}
      </div>
    );

  if (!data || !stats) {
    return <Navigate to="/NotFoundPage"></Navigate>;
  }

  return (
    <div className="page-container ">
      <PilotCardHeader data={data} />
      <PilotCard pilot={data} />
      <PilotCardStats stats={stats} />
    </div>
  );
};

export default PilotCardPage;
