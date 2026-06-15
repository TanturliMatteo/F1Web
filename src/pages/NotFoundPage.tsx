import { Link } from "react-router";
const NotFoundPage = () => {
  return (
    <div className="page-container display-card display-card-column ">
      <h1>404 - Not Found</h1>
      <Link to="/" className="not-found-button">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
