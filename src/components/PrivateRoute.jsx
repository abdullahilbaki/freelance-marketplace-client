import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "./Loading";
import { AuthContext } from "../contexts/authContext";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Must be used within an AuthProvider");
  }

  const { user, initialLoading } = context;

  return initialLoading ? (
    <Loading />
  ) : user && user?.email ? (
    <div>{children}</div>
  ) : (
    <Navigate state={location.pathname} to={"/login"} />
  );
};

export default PrivateRoute;
