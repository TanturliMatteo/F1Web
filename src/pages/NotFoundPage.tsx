import { Link } from "react-router";
import { useI18n } from "../i18n/i18n";

const NotFoundPage = () => {
  const { t } = useI18n();
  return (
    <div id="not-found-page" className="page-container page-state">
      <div className="ui-card ui-stack">
        <h1 id="not-found-title">{t("common.notFound")}</h1>
        <Link id="not-found-home-link" to="/" className="link-button">
          {t("common.backHome")}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
