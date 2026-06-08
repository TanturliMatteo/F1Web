import RacesTable from "../components/ui/RacesTable";
import { useRaces } from "../hooks/useRaces";

const RaceTablePage = () => {
  const { data, isError, isLoading, error } = useRaces();

  if (isLoading)
    return <div className="display-card">Caricamento in corso...</div>;

  if (isError)
    return <div className="display-card">Errore: {error?.message}</div>;

  return (
    <div className="page-container">
      <RacesTable data={data || []} />
    </div>
  );
};

export default RaceTablePage;
