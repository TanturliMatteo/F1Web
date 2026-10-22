import { useState } from "react";
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
    <div id="pilots-page" className="page-container">
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
  );
};

export default PilotsTablePage;
