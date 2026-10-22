import PageBanner from "../components/ui/PageBanner";
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
    <div id="races-page">
      <PageBanner
        id="races-banner"
        as="h1"
        side="left"
        eyebrow="Season calendar"
        title="Race calendar 2026"
        text="From the first red light to the final chequered flag: street circuits, historic temples of speed and everything in between. This is the road to the championship."
      />
      <div id="races-content" className="page-container">
        <RacesTable data={data} />
      </div>
      <PageBanner
        id="races-info-banner"
        mirrored
        side="right"
        eyebrow="Every circuit has a personality"
        title="Tight corners, long straights, no second chances"
        text="Narrow street layouts punish the smallest mistake, fast sweeping bends reward bravery, and long straights are made for slipstreams. Open a completed race to meet the circuit, read its story and see how the afternoon unfolded."
      />
    </div>
  );
};

export default RaceTablePage;
