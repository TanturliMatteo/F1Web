import { Link, useRouteError } from "react-router";
import { useI18n } from "../i18n/i18n";

const ErrorPage = () => {
  const { t } = useI18n();
  const error = useRouteError();
  const message = error instanceof Error ? error.message : undefined;

  return (
    <div id="error-page" className="page-container page-state">
      <div className="ui-card ui-stack">
        <h1 id="error-page-title">{t("common.errorTitle")}</h1>
        {message && <p id="error-page-message">{message}</p>}
        <Link id="error-page-home-link" to="/" className="link-button">
          {t("common.backHome")}
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
