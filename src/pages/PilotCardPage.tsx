import { usePilot } from "../hooks/usePilot";
import { useResultsPilot } from "../hooks/useResultsPilot";
import { Navigate, useParams } from "react-router";
import { usePilotPhoto } from "../hooks/usePilotPhoto";
import PilotCard from "../components/ui/PilotCard";
import PilotCardHeader from "../components/ui/PilotCardHeader";

const PilotCardPage = () => {
  const { id } = useParams();
  const { data, isError, isLoading, error } = usePilot(id);
  const { data: stats } = useResultsPilot(id);
  const { data: photo } = usePilotPhoto(id);

  if (isLoading)
    return (
      <div className="display-card display-card-column">
        Caricamento in corso...
      </div>
    );

  if (isError)
    return (
      <div className="display-card display-card-column">
        Errore: {error?.message}
      </div>
    );

  if (!data) {
    return <Navigate to="/NotFoundPage"></Navigate>;
  }

  return (
    <div className="page-container">
      <PilotCardHeader data={data} />
      <PilotCard pilot={data} stats={stats} photo={photo} />
    </div>
  );
};

export default PilotCardPage;
