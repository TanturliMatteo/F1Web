import logo from "../../assets/logo/logo.png";
import { Link } from "react-router";
import { useI18n } from "../../i18n/i18n";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer id="footer" className="footer">
      <div id="footer-top" className="footer-top divider-bottom">
        <div id="footer-about" className="footer-about">
          <img
            id="footer-logo"
            src={logo}
            alt={t("common.logoAlt")}
            className="footer-logo"
          />
          <p id="footer-description" className="footer-description">
            {t("footer.description")}
          </p>
        </div>
        <nav
          id="footer-links"
          className="footer-links"
          aria-label={t("footer.siteLinks")}
        >
          <Link id="footer-home-link" to="/">
            {t("nav.home")}
          </Link>
          <Link id="footer-pilots-link" to="/pilots">
            {t("nav.pilots")}
          </Link>
          <Link id="footer-races-link" to="/races">
            {t("nav.races")}
          </Link>
        </nav>
        <nav
          id="footer-contact"
          className="footer-links"
          aria-label={t("footer.contactLinks")}
        >
          <a id="footer-email-link" href="mailto:matteotanturli@gmail.com">
            Email
          </a>
          <a
            id="footer-linkedin-link"
            href="https://www.linkedin.com/in/matteo-tanturli/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            id="footer-github-link"
            href="https://github.com/TanturliMatteo/"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
      <div id="footer-bottom" className="footer-bottom">
        <p id="footer-copyright">{t("footer.copyright")}</p>
        <Link id="footer-privacy-link" to="/privacy" target="_blank">
          {t("footer.privacy")}
        </Link>
        <p id="footer-credits">{t("footer.credits")}</p>
      </div>
    </footer>
  );
};

export default Footer;
