// The one place that defines how the app classifies, retries, logs and
// describes errors. The rules, by type of failure:
//
// - Missing or malformed FIELDS in API data are not errors: the services
//   normalize them to fallback values and skip rows they cannot use.
// - A REQUEST that fails as a whole is thrown by apiGet() as one of the
//   AppError classes below. React Query catches it and the page shows an
//   <ErrorCard>. Cancelled requests (AbortError) are passed through as-is.
// - A RENDER crash is caught by an error boundary: <ErrorBoundary> around a
//   section, or the route's <ErrorPage>.
//
// The visitor always sees a translated message chosen by the error's class
// (errorMessageKey), never the raw technical message, which may expose
// internals; that one goes to the console through logError().

import type { TranslationKey } from "./i18n/i18n";

export abstract class AppError extends Error {
  abstract readonly kind: "network" | "http" | "invalid-response";
}

// The request never got an answer: offline, DNS, CORS, connection reset
export class NetworkError extends AppError {
  readonly kind = "network";
  constructor(resource: string, options?: ErrorOptions) {
    super(`Network error: ${resource}`, options);
    this.name = "NetworkError";
  }
}

// The server answered with a non-2xx status
export class HttpError extends AppError {
  readonly kind = "http";
  readonly status: number;
  constructor(status: number, resource: string) {
    super(`HTTP ${status}: ${resource}`);
    this.name = "HttpError";
    this.status = status;
  }
}

// The server answered 2xx, but not with the data we expect
export class InvalidResponseError extends AppError {
  readonly kind = "invalid-response";
  constructor(resource: string, options?: ErrorOptions) {
    super(`Invalid response: ${resource}`, options);
    this.name = "InvalidResponseError";
  }
}

// fetch() rejects with this when its AbortSignal fires (page left, query
// cancelled): not a failure, it must reach React Query untouched
export const isAbortError = (error: unknown) =>
  error instanceof DOMException && error.name === "AbortError";

// Worth asking again only if the cause may be temporary: the connection,
// a server hiccup or rate limiting. A 404 or a malformed body won't change.
export const isRetryable = (error: unknown) =>
  error instanceof NetworkError ||
  (error instanceof HttpError && (error.status >= 500 || error.status === 429));

// Translated, user-facing description of any error
export const errorMessageKey = (error: unknown): TranslationKey => {
  if (error instanceof NetworkError) return "errors.network";
  if (error instanceof HttpError) return "errors.server";
  if (error instanceof InvalidResponseError) return "errors.invalidResponse";
  return "errors.unexpected";
};

// Single sink for technical details (swap in a monitoring service here)
export const logError = (error: unknown, context?: string) => {
  console.error(context ? `[F1Web] ${context}` : "[F1Web]", error);
};
