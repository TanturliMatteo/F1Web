import { Link } from "react-router";

const Header = () => {
  return (
    <header className="header">
      <nav className="d-flex justify-content-evenly align-items-center p-3">
        <Link to="/">Home</Link>
        <Link to="/pilots">Pilot Table</Link>
        <Link to="races">Race Table</Link>
      </nav>
    </header>
  );
};

export default Header;
