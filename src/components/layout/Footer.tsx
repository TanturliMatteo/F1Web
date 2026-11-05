import logo from "../../assets/logo/logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div id="footer-top" className="footer-top divider-bottom">
        <div id="footer-about" className="footer-about">
          <img
            id="footer-logo"
            src={logo}
            alt="F1 Logo"
            className="footer-logo"
          />
          <p id="footer-description" className="footer-description">
            Statistiche, medie e approfondimenti sulla stagione 2026 di
            Formula 1, dai risultati ufficiali.
          </p>
        </div>
        <nav id="footer-links" className="footer-links" aria-label="Site">
          <Link id="footer-home-link" to="/">
            Home
          </Link>
          <Link id="footer-pilots-link" to="/pilots">
            Pilot Table
          </Link>
          <Link id="footer-races-link" to="/races">
            Race Table
          </Link>
        </nav>
        <nav id="footer-contact" className="footer-links" aria-label="Contact">
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
        <p id="footer-copyright">© 2026 F1Web Statistics</p>
        <Link id="footer-privacy-link" to="/privacy" target="_blank">
          Privacy Policy
        </Link>
        <p id="footer-credits">Data: Jolpica (Ergast) API</p>
      </div>
    </footer>
  );
};

export default Footer;
