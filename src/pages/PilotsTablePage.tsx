import { useState } from "react";
import PageBanner from "../components/ui/PageBanner";
import PilotsTable from "../components/ui/PilotsTable";
import { LoadingCard, ErrorCard } from "../components/ui/QueryState";
import { usePilots } from "../hooks/usePilots";
import NotFoundPage from "./NotFoundPage";

const PilotsTablePage = () => {
  const { data, isLoading, isError, error } = usePilots();
  const [search, setSearch] = useState("");

  if (isLoading) return <LoadingCard id="pilots-loading" />;

  if (isError) return <ErrorCard id="pilots-error" message={error?.message} />;

  if (!data) return <NotFoundPage />;

  const term = search.trim().toLowerCase();
  const filtered = data.filter((p) =>
    `${p.name} ${p.surname} ${p.team}`.toLowerCase().includes(term),
  );

  return (
    <div id="pilots-page">
      <PageBanner
        id="pilots-banner"
        as="h1"
        side="left"
        eyebrow="Drivers' championship"
        title="The 2026 grid"
        text="Twenty-two drivers, eleven teams and one title to settle. Search the grid, follow the standings and see who is carrying the momentum."
      />
      <div id="pilots-content" className="page-container">
        <input
          id="pilots-search"
          type="search"
          className="search-input mt-3"
          placeholder="Search pilot or team"
          aria-label="Search pilot or team"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <PilotsTable data={filtered} />
      </div>
      <PageBanner
        id="pilots-points-banner"
        mirrored
        side="right"
        eyebrow="Behind the points"
        title="A championship is won in the details"
        text="Every point on this table was earned somewhere: a clean launch, a late overtake, a patient one-stop. Open a driver to see how the season is really going, beyond the standings."
      >
        <p id="pilots-points-banner-rules" className="banner-text">
          The winner takes 25 points, followed by 18, 15, 12, 10, 8, 6, 4, 2
          and 1 down to tenth place. Sprint races reward the top eight.
        </p>
      </PageBanner>
    </div>
  );
};

export default PilotsTablePage;
