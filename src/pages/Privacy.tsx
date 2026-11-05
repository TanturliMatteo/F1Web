import { useI18n } from "../i18n/i18n";
import RichText from "../i18n/RichText";

const PrivacyPage = () => {
  const { t, tList } = useI18n();

  return (
    <div id="privacy-page" className="page-container page-state">
      <div id="privacy-card" className="ui-card ui-stack ui-stack--start">
        <section id="privacy-header" className="privacy-section">
          <h1>{t("privacy.title")}</h1>
          <p>
            <RichText text={t("privacy.updated")} />
          </p>
          <p>{t("privacy.welcome")}</p>
        </section>

        <section id="privacy-introduction" className="privacy-section">
          <h2>{t("privacy.introTitle")}</h2>
          <p>{t("privacy.intro")}</p>
        </section>

        <section id="privacy-data-collected" className="privacy-section">
          <h2>{t("privacy.dataTitle")}</h2>
          <p>
            <RichText text={t("privacy.data")} />
          </p>
        </section>

        <section id="privacy-data-source" className="privacy-section">
          <h2>{t("privacy.sourceTitle")}</h2>
          <p>
            <RichText text={t("privacy.source")} />
          </p>
          <ul id="privacy-data-source-list">
            {tList("privacy.sourceList").map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="privacy-purpose" className="privacy-section">
          <h2>{t("privacy.purposeTitle")}</h2>
          <p>{t("privacy.purpose")}</p>
        </section>

        <section id="privacy-third-party-links" className="privacy-section">
          <h2>{t("privacy.linksTitle")}</h2>
          <p>{t("privacy.links")}</p>
        </section>

        <section id="privacy-changes" className="privacy-section">
          <h2>{t("privacy.changesTitle")}</h2>
          <p>{t("privacy.changes")}</p>
        </section>

        <section id="privacy-contacts">
          <h2>{t("privacy.contactTitle")}</h2>
          <p>{t("privacy.contact")}</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
