import logo from "../../assets/logo/logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer pb-1">
      <div className=" display-card-row separation-line pb-1">
        <div className="display-card-column mid ">
          <img src={logo} alt="F1 Logo" className="footer-logo" />
          <p className="footer-left">
            F1Web Statistics è il portale dedicato all'analisi dei dati della
            Formula 1. Elaboriamo i risultati ufficiali in tempo reale per
            offrirti statistiche, medie e approfondimenti sulla stagione 2026.
            Dati forniti tramite Ergast API.
          </p>
        </div>
        <div className="display-card-row around mid">
          <div className="display-card-column">
            <h5>Links</h5>
            <Link to="/">Home</Link>
            <Link to="/pilots">Pilot Table</Link>
            <Link to="/races">Race Table</Link>
          </div>
          <div className="display-card-column">
            <h5>Contact</h5>
            <Link to="mailto:matteotanturli@gmail.com" target="_blank">
              Email
            </Link>
            <Link
              to="https://www.linkedin.com/in/matteo-tanturli/"
              target="_blank"
            >
              LinkedIn
            </Link>
            <Link to="https://github.com/TanturliMatteo/" target="_blank">
              GitHub
            </Link>
          </div>
        </div>
      </div>
      <div className="display-card-row around m-0 mt-1">
        <p>© 2026 F1Web Statistics. </p>
        <p>|</p>
        <Link to="/privacy" target="_blank">
          Privacy Policy
        </Link>
        <p>|</p>
        <p>Powered by Ergast API</p>
      </div>
    </footer>
  );
};

export default Footer;
