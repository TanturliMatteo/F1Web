import { useParams } from "react-router";
import { useRace } from "../hooks/useRace";
import RaceCard from "../components/ui/RaceCard";
import RaceCardHeader from "../components/ui/RaceCardHeader";

export const RaceCardPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useRace(id);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error?.message}</div>;
  }
  if (!data) {
    return <div>Race not found</div>;
  }
  return (
    <div className="page-container">
      <div>
        <RaceCardHeader data={data} />
      </div>
      <div>
        <RaceCard data={data} />
      </div>
    </div>
  );
};

export default RaceCardPage;
