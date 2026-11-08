import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { useI18n } from "../i18n/i18n";
import NotFoundPage from "./NotFoundPage";

const ErrorPage = () => {
  const { t } = useI18n();
  const error = useRouteError();

  // A route that does not exist is a plain 404, not a crash
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />;
  }

  const message =
    error instanceof Error
      ? error.message
      : isRouteErrorResponse(error)
        ? `${error.status} ${error.statusText}`
        : undefined;

  return (
    <div id="error-page" className="page-container page-state">
      <div className="ui-card ui-stack">
        <h1 id="error-page-title">{t("common.errorTitle")}</h1>
        {message && <p id="error-page-message">{message}</p>}
        <div className="banner-actions">
          {/* A full reload also picks up a newer deploy of the site */}
          <button
            id="error-page-retry"
            type="button"
            className="link-button"
            onClick={() => window.location.reload()}
          >
            {t("common.retry")}
          </button>
          <Link id="error-page-home-link" to="/" className="link-button">
            {t("common.backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
