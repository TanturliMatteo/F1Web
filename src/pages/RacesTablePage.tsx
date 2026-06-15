import { Navigate } from "react-router";
import RacesTable from "../components/ui/RacesTable";
import { useRaces } from "../hooks/useRaces";

const RaceTablePage = () => {
  const { data, isError, isLoading, error } = useRaces();

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
      <RacesTable data={data || []} />
    </div>
  );
};

export default RaceTablePage;
