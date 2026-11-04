const HomeHero = () => {
  return (
    <div id="home-hero" className="home-hero-container">
      <h1 id="home-hero-title" className="home-hero-title">
        F1 Analytics Website
      </h1>
      <img
        id="home-hero-bg"
        src="/HeroBg.png"
        alt=""
        className="home-hero-bg"
      />
      <img
        id="home-hero-cars"
        src="/Hero-cars.png"
        alt="Three Formula 1 cars on the grid"
        className="home-hero-cars"
      />
    </div>
  );
};

export default HomeHero;
