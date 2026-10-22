import { QueryClient } from "@tanstack/react-query";

// Season data changes at most once per race weekend: avoid refetching on every
// mount/focus to stay within the public API rate limits.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});
