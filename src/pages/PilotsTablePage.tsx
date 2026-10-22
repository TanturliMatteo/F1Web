import { Navigate } from "react-router";
import PilotsTable from "../components/ui/PilotsTable";
import { usePilots } from "../hooks/usePilots";

const PilotsTablePage = () => {
  const { data, isLoading, isError, error } = usePilots();

  if (isLoading)
    return (
      <div id="pilots-loading" className="display-card display-card-column">
        Caricamento in corso...
      </div>
    );

  if (isError)
    return (
      <div id="pilots-error" className="display-card display-card-column">
        Errore: {error?.message}
      </div>
    );

  if (!data) {
    return <Navigate to="/NotFoundPage"></Navigate>;
  }
  return (
    <div id="pilots-page" className="page-container">
      <PilotsTable data={data || []} />
    </div>
  );
};

export default PilotsTablePage;
