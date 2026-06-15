import { Link } from "react-router";
import logo from "../../assets/logo/logo_header.png";

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <Link to="/">
          <img src={logo} alt="F1 Logo" className="header-logo" />
        </Link>

        <Link to="/pilots">Pilot Table</Link>
        <Link to="/races">Race Table</Link>
      </nav>
    </header>
  );
};

export default Header;
