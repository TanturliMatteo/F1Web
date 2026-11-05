import { useEffect, useState } from "react";
import { Link } from "react-router";
import logo from "../../assets/logo/logo_header.png";
import { LANGUAGES, useI18n } from "../../i18n/i18n";

const Header = () => {
  const { t, lang, setLang } = useI18n();
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
            alt={t("common.logoAlt")}
            className="header-logo"
          />
        </Link>

        <Link id="header-pilots-link" to="/pilots">
          {t("nav.pilots")}
        </Link>
        <Link id="header-races-link" to="/races">
          {t("nav.races")}
        </Link>

        <div
          id="header-lang"
          className="lang-switch"
          role="group"
          aria-label={t("nav.language")}
        >
          {LANGUAGES.map((code) => (
            <button
              key={code}
              id={`header-lang-${code}`}
              type="button"
              className="lang-switch-option"
              aria-pressed={lang === code}
              lang={code}
              onClick={() => setLang(code)}
            >
              {code === "en" ? "ENG" : "IT"}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
