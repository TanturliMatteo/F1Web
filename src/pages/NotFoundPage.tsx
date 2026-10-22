import { Link } from "react-router";
const NotFoundPage = () => {
  return (
    <div
      id="not-found-page"
      className="page-container ui-card ui-stack"
    >
      <h1 id="not-found-title">404 - Not Found</h1>
      <Link id="not-found-home-link" to="/" className="link-button">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
