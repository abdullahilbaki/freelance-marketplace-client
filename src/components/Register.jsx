import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/authContext";
import GoogleLogin from "./GoogleLogin";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Must be used within an AuthProvider");
  }
  const { createUser, setUser, updateUser } = context;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLong = password.length >= 6;
    return hasUpper && hasLower && isLong;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, photoURL, password } = form;
    if (!name || !email || !photoURL || !password) {
      return Swal.fire("Error", "Please fill in all fields", "error");
    }

    if (!validatePassword(password)) {
      return Swal.fire(
        "Weak Password",
        "Password must contain uppercase, lowercase, and be at least 6 characters.",
        "warning"
      );
    }

    try {
      const userCredential = await createUser(email, password);
      await updateUser({ displayName: name, photoURL });

      setUser({
        ...userCredential.user,
        displayName: name,
        photoURL: photoURL,
      });

      Swal.fire("Success", "Registered successfully", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message || "Registration failed", "error");
    }
  };

  return (
    <div className="py-20 px-4 rounded-2xl flex items-center justify-center bg-base-300">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 p-6">
        <h2 className="text-3xl font-bold text-center mb-6 libre-baskerville">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label" htmlFor="name">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className="input input-bordered w-full"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@example.com"
              className="input input-bordered w-full"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label" htmlFor="photoURL">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              id="photoURL"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full"
              value={form.photoURL}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              className="input input-bordered w-full"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-outline w-full">
            Register
          </button>
        </form>

        <div className="divider">OR</div>

        <GoogleLogin />

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
