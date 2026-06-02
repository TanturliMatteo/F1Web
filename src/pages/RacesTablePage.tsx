import { useRaces } from "../hooks/useRaces";
import RacesTable from "../components/ui/RacesTable";

const RaceTablePage = () => {
  const { data, error, loading } = useRaces();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <RacesTable races={data} />
    </div>
  );
};

export default RaceTablePage;
