import { Link } from "react-router";

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/pilots">Pilot Table</Link>
        <Link to="races">Race Table</Link>
      </nav>
    </header>
  );
};

export default Header;
