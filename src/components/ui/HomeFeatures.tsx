import { Link } from "react-router";

const FEATURES = [
  {
    key: "standings",
    title: "Live standings",
    text: "The drivers' championship, updated after every Grand Prix.",
    to: "/pilots",
  },
  {
    key: "calendar",
    title: "Race calendar",
    text: "Every round of the 2026 season, with circuits, dates and results.",
    to: "/races",
  },
  {
    key: "analytics",
    title: "Driver analytics",
    text: "Averages, teammate battles and points efficiency for each driver.",
    to: "/pilots",
  },
];

const HomeFeatures = () => (
  <section id="home-features" className="banner">
    <div id="home-features-content" className="banner-content banner-content--wide">
      <p id="home-features-eyebrow" className="section-label">
        2026 season
      </p>
      <h2 id="home-features-title" className="banner-title">
        Formula 1, explained by the numbers
      </h2>
      <div id="home-features-list" className="ui-row ui-row--wrap mt-3">
        {FEATURES.map((f, index) => (
          <Link
            key={f.key}
            id={`home-feature-${f.key}`}
            to={f.to}
            className="feature-card"
          >
            <span className="feature-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default HomeFeatures;
