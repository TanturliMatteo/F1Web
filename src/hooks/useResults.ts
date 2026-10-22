import { useQuery } from "@tanstack/react-query";
import { fetchResults } from "../services/ResultServices";

export function useResults() {
  return useQuery({
    queryKey: ["results"],
    queryFn: ({ signal }) => fetchResults(signal),
  });
}
