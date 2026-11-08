import { QueryClient } from "@tanstack/react-query";
import { isRetryable } from "./errors";

// Retries for an error that may be temporary (see isRetryable)
const MAX_RETRIES = 2;

// Season data changes at most once per race weekend: avoid refetching on every
// mount/focus to stay within the public API rate limits.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      // Asking again for a 404 or a malformed body only adds load on the API
      retry: (failureCount, error) =>
        failureCount < MAX_RETRIES && isRetryable(error),
    },
  },
});
