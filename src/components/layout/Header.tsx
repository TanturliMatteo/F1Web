import { useEffect, useState } from "react";
import { Link } from "react-router";
import logo from "../../assets/logo/logo_header.png";

const Header = () => {
  // Once the page scrolls, the sticky header turns see-through and blurred
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="header"
      className={`header${scrolled ? " header--scrolled" : ""}`}
    >
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
