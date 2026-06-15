import { Navigate } from "react-router";
import PilotsTable from "../components/ui/PilotsTable";
import { usePilots } from "../hooks/usePilots";

const PilotsTablePage = () => {
  const { data, isLoading, isError, error } = usePilots();

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
      <PilotsTable data={data || []} />
    </div>
  );
};

export default PilotsTablePage;
