import PilotsTable from "../components/ui/PilotsTable";
import { usePilots } from "../hooks/usePilots";

const PilotsTablePage = () => {
  const { data, isLoading, isError, error } = usePilots();

  if (isLoading)
    return <div className="display-card">Caricamento in corso...</div>;

  if (isError)
    return <div className="display-card">Errore: {error?.message}</div>;

  return (
    <div className="page-container">
      <PilotsTable data={data || []} />
    </div>
  );
};

export default PilotsTablePage;
