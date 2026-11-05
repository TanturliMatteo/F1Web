import { queryOptions, useQuery } from "@tanstack/react-query";
import { SEASON } from "../services/api";
import { fetchPilotStandings } from "../services/PilotStandingsServices";
import { fetchRaces } from "../services/RacesServices";
import { fetchResults } from "../services/ResultServices";

// One definition per API resource. The season is part of each key so a
// future season switch can never be served from the wrong cache.
const pilotsQuery = queryOptions({
  queryKey: ["pilots", SEASON],
  queryFn: ({ signal }) => fetchPilotStandings(signal),
});

const racesQuery = queryOptions({
  queryKey: ["races", SEASON],
  queryFn: ({ signal }) => fetchRaces(signal),
  // The calendar barely changes during a season
  staleTime: 60 * 60 * 1000,
});

const resultsQuery = queryOptions({
  queryKey: ["results", SEASON],
  queryFn: ({ signal }) => fetchResults(signal),
});

export const usePilots = () => useQuery(pilotsQuery);
export const useRaces = () => useQuery(racesQuery);
export const useResults = () => useQuery(resultsQuery);

// Single items: `select` picks them out of the cached list, so every page
// shares one request per resource. null = loaded but not found.
export const usePilot = (code?: string) =>
  useQuery({
    ...pilotsQuery,
    select: (pilots) =>
      pilots.find((p) => p.code.toLowerCase() === code?.toLowerCase()) ?? null,
  });

export const useRace = (round?: string) =>
  useQuery({
    ...racesQuery,
    select: (races) => races.find((r) => r.round === round) ?? null,
  });

export const useResultsRace = (round?: string) =>
  useQuery({
    ...resultsQuery,
    select: (results) => results.filter((r) => r.round === round),
  });
