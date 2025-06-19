import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import GoogleLogin from "./GoogleLogin";
import { AuthContext } from "../contexts/authContext";

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!context) {
    throw new Error("Must be used within an AuthProvider");
  }

  const { logIn, setUser } = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return Swal.fire("Error", "Please fill in all fields", "error");
    }

    try {
      const userCredential = await logIn(email, password);
      setUser(userCredential.user);
      Swal.fire("Success", "Sign-in successfully", "success");
      navigate(location.state ? location.state : "/");
    } catch (error) {
      Swal.fire("Error", error.message || "Login failed", "error");
    }
  };


  return (
    <div className="py-20 px-4 rounded-2xl flex items-center justify-center bg-base-300">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 p-6">
        <h2 className="text-3xl font-bold text-center mb-6 libre-baskerville">
          Welcome back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-outline w-full">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        <GoogleLogin />

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 font-semibold underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
