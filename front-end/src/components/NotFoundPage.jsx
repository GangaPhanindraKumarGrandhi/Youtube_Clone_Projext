import { Link, useLocation } from "react-router-dom";

function NotFound() {
  const location = useLocation(); // Get the current URL path

  return (
    <div className="notfound">
      <h1>404 - Page Not Found</h1>

      {/* Show the path that caused the 404 */}
      <h3>
        The path <code style={{ color: "red" }}>{location.pathname}</code> does not exist.
      </h3>

      {/* Button to navigate back to home */}
      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}

export default NotFound;
