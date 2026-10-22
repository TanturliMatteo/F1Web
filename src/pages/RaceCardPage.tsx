import { Navigate, useParams } from "react-router";
import { useResultsRace } from "../hooks/useResultsRace";
import { useRace } from "../hooks/useRace";
import RaceCardHeader from "../components/ui/RaceCardHeader";
import RaceCardCircuit from "../components/ui/RaceCardCircuit";
import RaceCard from "../components/ui/RaceCardTable";

const RaceCardPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useRace(id);
  const {
    data: results,
    isLoading: isResultsLoading,
    isError: isResultsError,
  } = useResultsRace(id);

  if (isLoading || isResultsLoading)
    return (
      <div id="race-card-loading" className="display-card display-card-column">
        Caricamento in corso...
      </div>
    );

  if (isError || isResultsError)
    return (
      <div id="race-card-error" className="display-card display-card-column">
        Errore: {error?.message}
      </div>
    );

  if (!data) {
    return <Navigate to="/NotFoundPage"></Navigate>;
  }

  return (
    <div id="race-card-page" className="page-container">
      <div id="race-card-content">
        <RaceCardHeader data={data} />
        <RaceCardCircuit data={data} round={id} />
        <RaceCard data={results} />
      </div>
    </div>
  );
};

export default RaceCardPage;
