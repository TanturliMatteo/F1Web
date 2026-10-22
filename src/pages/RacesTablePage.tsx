import RacesTable from "../components/ui/RacesTable";
import { LoadingCard, ErrorCard } from "../components/ui/QueryState";
import { useRaces } from "../hooks/useRaces";
import NotFoundPage from "./NotFoundPage";

const RaceTablePage = () => {
  const { data, isError, isLoading, error } = useRaces();

  if (isLoading) return <LoadingCard id="races-loading" />;

  if (isError) return <ErrorCard id="races-error" message={error?.message} />;

  if (!data) return <NotFoundPage />;

  return (
    <div id="races-page" className="page-container">
      <RacesTable data={data} />
    </div>
  );
};

export default RaceTablePage;
