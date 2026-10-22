import { usePilot } from "../hooks/usePilot";
import { useResultsPilot } from "../hooks/useResultsPilot";
import { useParams } from "react-router";
import PilotCardStats from "../components/ui/PilotCardStats";
import PilotCard from "../components/ui/PilotCardInfo";
import PilotCardHeader from "../components/ui/PilotCardHeader";
import { LoadingCard, ErrorCard } from "../components/ui/QueryState";
import NotFoundPage from "./NotFoundPage";

const PilotCardPage = () => {
  const { id } = useParams();
  const { data, isError, isLoading, error } = usePilot(id);
  const {
    data: stats,
    isError: isStatsError,
    isLoading: isStatsLoading,
    error: statsError,
  } = useResultsPilot(id);

  if (isLoading || isStatsLoading)
    return <LoadingCard id="pilot-card-loading" />;

  if (isError || isStatsError)
    return (
      <ErrorCard
        id="pilot-card-error"
        message={(error ?? statsError)?.message}
      />
    );

  if (!data || !stats) return <NotFoundPage />;

  return (
    <div id="pilot-card-page" className="page-container ">
      <PilotCardHeader data={data} />
      <PilotCard pilot={data} />
      <PilotCardStats stats={stats} />
    </div>
  );
};

export default PilotCardPage;
