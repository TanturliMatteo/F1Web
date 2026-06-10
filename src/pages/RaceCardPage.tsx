import { Navigate, useParams } from "react-router";
import { useResultsRace } from "../hooks/useResultsRace";
import { useRace } from "../hooks/useRace";
import RaceCardHeader from "../components/ui/RaceCardHeader";
import RaceCardCircuit from "../components/ui/RaceCardCircuit";
import RaceCard from "../components/ui/RaceCardTable";

export const RaceCardPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useRace(id);
  const { data: results } = useResultsRace(id);

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
      <div>
        <RaceCardHeader data={data} />
        <RaceCardCircuit data={data} round={id} />
        <RaceCard data={results} />
      </div>
    </div>
  );
};

export default RaceCardPage;
