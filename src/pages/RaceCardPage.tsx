import { useParams } from "react-router";
import { useResultsRace } from "../hooks/useResultsRace";
import { useRace } from "../hooks/useRace";
import RaceCardHeader from "../components/ui/RaceCardHeader";
import RaceCardCircuit from "../components/ui/RaceCardCircuit";
import RaceCard from "../components/ui/RaceCardTable";
import { LoadingCard, ErrorCard } from "../components/ui/QueryState";
import NotFoundPage from "./NotFoundPage";

const RaceCardPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useRace(id);
  const {
    data: results,
    isLoading: isResultsLoading,
    isError: isResultsError,
    error: resultsError,
  } = useResultsRace(id);

  if (isLoading || isResultsLoading) return <LoadingCard id="race-card-loading" />;

  if (isError || isResultsError)
    return (
      <ErrorCard
        id="race-card-error"
        message={(error ?? resultsError)?.message}
      />
    );

  if (!data) return <NotFoundPage />;

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
