import PilotsTable from "../components/ui/PilotsTable";
import { usePilots } from "../hooks/usePilots";

const PilotsTablePage = () => {
  const { data, loading, error } = usePilots();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <PilotsTable data={data} />
    </div>
  );
};

export default PilotsTablePage;
