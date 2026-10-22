import { Link } from "react-router";
const NotFoundPage = () => {
  return (
    <div
      id="not-found-page"
      className="page-container display-card display-card-column "
    >
      <h1 id="not-found-title">404 - Not Found</h1>
      <Link id="not-found-home-link" to="/" className="not-found-button">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
