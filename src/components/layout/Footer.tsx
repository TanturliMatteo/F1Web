import logo from "../../assets/logo/logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer id="footer" className="footer pb-1">
      <div
        id="footer-top"
        className="ui-row divider-bottom pb-1"
      >
        <div
          id="footer-about"
          className="ui-stack ui-grow-2"
        >
          <img
            id="footer-logo"
            src={logo}
            alt="F1 Logo"
            className="footer-logo"
          />
          <p id="footer-description" className="footer-description">
            F1Web Statistics è il portale dedicato all'analisi dei dati della
            Formula 1. Elaboriamo i risultati ufficiali in tempo reale per
            offrirti statistiche, medie e approfondimenti sulla stagione 2026.
            Dati forniti tramite Ergast API.
          </p>
        </div>
        <div id="footer-links-wrapper" className="ui-row ui-row--around ui-grow-2">
          <div id="footer-links" className="ui-stack">
            <h5 id="footer-links-title">Links</h5>
            <Link id="footer-home-link" to="/">
              Home
            </Link>
            <Link id="footer-pilots-link" to="/pilots">
              Pilot Table
            </Link>
            <Link id="footer-races-link" to="/races">
              Race Table
            </Link>
          </div>
          <div id="footer-contact" className="ui-stack">
            <h5 id="footer-contact-title">Contact</h5>
            <Link
              id="footer-email-link"
              to="mailto:matteotanturli@gmail.com"
              target="_blank"
            >
              Email
            </Link>
            <Link
              id="footer-linkedin-link"
              to="https://www.linkedin.com/in/matteo-tanturli/"
              target="_blank"
            >
              LinkedIn
            </Link>
            <Link
              id="footer-github-link"
              to="https://github.com/TanturliMatteo/"
              target="_blank"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
      <div id="footer-bottom" className="ui-row ui-row--around m-0 mt-1">
        <p id="footer-copyright">© 2026 F1Web Statistics. </p>
        <p>|</p>
        <Link id="footer-privacy-link" to="/privacy" target="_blank">
          Privacy Policy
        </Link>
        <p>|</p>
        <p id="footer-credits">Powered by Ergast API</p>
      </div>
    </footer>
  );
};

export default Footer;
