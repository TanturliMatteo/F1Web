import { Link } from "react-router";
import logo from "../../assets/logo/logo_header.png";

const Header = () => {
  return (
    <header id="header" className="header">
      <nav id="header-nav" className="header-nav">
        <Link id="header-home-link" to="/">
          <img
            id="header-logo"
            src={logo}
            alt="F1 Logo"
            className="header-logo"
          />
        </Link>

        <Link id="header-pilots-link" to="/pilots">
          Pilot Table
        </Link>
        <Link id="header-races-link" to="/races">
          Race Table
        </Link>
      </nav>
    </header>
  );
};

export default Header;
