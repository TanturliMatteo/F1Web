import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { useI18n } from "../i18n/i18n";
import { errorMessageKey } from "../errors";
import NotFoundPage from "./NotFoundPage";

// Route-level boundary: a page (or the layout) crashed while rendering.
// React Router already logs the error to the console, so it is not logged
// again here; the visitor gets the translated message for its class.
const ErrorPage = () => {
  const { t } = useI18n();
  const error = useRouteError();

  // A route that does not exist is a plain 404, not a crash
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />;
  }

  return (
    <div id="error-page" className="page-container page-state">
      <div className="ui-card ui-stack">
        <h1 id="error-page-title">{t("common.errorTitle")}</h1>
        <p id="error-page-message">{t(errorMessageKey(error))}</p>
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
