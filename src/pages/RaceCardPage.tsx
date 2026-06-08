import { useParams } from "react-router";
import { useResultsRace } from "../hooks/useResultsRace";
import { useRace } from "../hooks/useRace";
import RaceCardHeader from "../components/ui/RaceCardHeader";
import RaceCardCircuit from "../components/ui/RaceCardCircuit";
import RaceCard from "../components/ui/RaceCardTable";

export const RaceCardPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useRace(id);
  const { data: results } = useResultsRace(id);

  if (isLoading) {
    return <div className="display-card">Loading...</div>;
  }
  if (error) {
    return <div className="display-card">Error: {error?.message}</div>;
  }
  if (!data) {
    return <div className="display-card">Race not found</div>;
  }

  return (
    <div className="page-container">
      <div>
        <RaceCardHeader data={data} />
        <RaceCardCircuit data={data} />
        <RaceCard data={results} />
      </div>
    </div>
  );
};

export default RaceCardPage;
