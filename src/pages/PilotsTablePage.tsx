import PilotsTable from "../components/ui/PilotsTable";
import { LoadingCard, ErrorCard } from "../components/ui/QueryState";
import { usePilots } from "../hooks/usePilots";
import NotFoundPage from "./NotFoundPage";

const PilotsTablePage = () => {
  const { data, isLoading, isError, error } = usePilots();

  if (isLoading) return <LoadingCard id="pilots-loading" />;

  if (isError) return <ErrorCard id="pilots-error" message={error?.message} />;

  if (!data) return <NotFoundPage />;

  return (
    <div id="pilots-page" className="page-container">
      <PilotsTable data={data} />
    </div>
  );
};

export default PilotsTablePage;
