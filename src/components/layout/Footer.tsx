import logo from "../../assets/logo/logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer>
      <div className=" display-card-row stretch footer footer-separation-line">
        <div className="display-card-column min ">
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
            <h5>Resources</h5>
          </div>
          <div className="display-card-column">
            <h5>Contact</h5>
            <a href="mailto:matteotanturli@gmail.com" target="_blank">
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/matteo-tanturli/"
              target="_blank"
            >
              LinkedIn
            </a>
            <a href="https://github.com/TanturliMatteo/" target="_blank">
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="display-card-row around m-0">
        <div>aa</div>
        <div>bb</div>
      </div>
    </footer>
  );
};

export default Footer;
