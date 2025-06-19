import Loading from "./Loading";
import { Link, useNavigation } from "react-router";

const NotFound = () => {
  const navigation = useNavigation();
  return navigation.state === "loading" ? (
    <Loading />
  ) : (
    <div
      className={`min-h-screen bg-base-100 flex items-center justify-center 
        text-center p-6 transition-opacity duration-500 opacity-0 animate-fadeIn`}
    >
      <div>
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="mt-2 text-base-content">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn btn-outline mt-6">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
