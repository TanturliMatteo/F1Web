import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : undefined;

  return (
    <div
      id="error-page"
      className="page-container ui-card ui-stack"
    >
      <h1 id="error-page-title">Qualcosa è andato storto</h1>
      {message && <p id="error-page-message">{message}</p>}
      <Link id="error-page-home-link" to="/" className="link-button">
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
