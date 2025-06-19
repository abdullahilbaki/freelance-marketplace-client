import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../contexts/authContext";
import Swal from "sweetalert2";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Must be used within an AuthProvider");
  }
  const { setUser, googleLogin } = context;

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await googleLogin();
      const user = userCredential.user;

      setUser(user);

      Swal.fire("Success", "Sign-in with Google", "success");
      navigate(location.state ? location.state : "/");
    } catch (error) {
      if (
        error.code === "auth/cancelled-popup-request" ||
        error.code === "auth/popup-closed-by-user"
      ) {
        return;
      }

      Swal.fire("Error", error.message || "Google Sign-In Failed", "error");
    }
  };
  return (
    <button onClick={handleGoogleLogin} className="btn bg-base-300 w-full">
      <FcGoogle />
      Continue with Google
    </button>
  );
};

export default GoogleLogin;
