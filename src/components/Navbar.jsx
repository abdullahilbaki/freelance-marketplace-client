import { Link, NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import Swal from "sweetalert2";
import profilePhoto from "../assets/profile.png";

const Navbar = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Must be used within an AuthProvider");
  }

  const { user, initialLoading, actionLoading, logOut } = context;

  let navLinks = [
    { name: "Home", path: "/" },
    { name: "Add Task", path: "/add-task" },
    { name: "Browse Tasks", path: "/tasks" },
    { name: "My Posted Tasks", path: "/my-tasks" },
  ];

  if (!user && !(initialLoading || actionLoading)) {
    navLinks = navLinks.concat([
      { name: "Signup", path: "/signup" },
      { name: "Login", path: "/login" },
    ]);
  }

  return (
    <div className="bg-base-300 shadow-md">
      <div className="navbar container mx-auto p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link to={"/"}>
              <img
                src={"/freelancer.png"}
                alt="Freelance logo"
                className="w-10 h-10"
              />
            </Link>

            <Link
              to="/"
              className="text-base lg:text-xl font-bold hidden sm:block"
            >
              <h1 className="libre-baskerville">Freelance Marketplace</h1>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex flex-none">
          <ul className="menu menu-horizontal px-3 gap-2">
            {navLinks.map(({ name, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? "font-semibold border" : "text-base-content"
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <ThemeToggle />

        {/* Mobile dropdown */}
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks.map(({ name, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? "font-semibold border" : "text-base-content"
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {!(initialLoading || actionLoading) && user && (
          <Profile
            user={user}
            logOut={logOut}
            initialLoading={initialLoading}
            actionLoading={actionLoading}
          />
        )}
      </div>
    </div>
  );
};

const Profile = ({ user, logOut, initialLoading, actionLoading }) => {
  const [validPhoto, setValidPhoto] = useState(true);

  useEffect(() => {
    setValidPhoto(true);
  }, [user?.photoURL]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Success", "Sign-out successful.", "success");
      })
      .catch((error) => {
        if (error) {
          Swal.fire("Logout Error", error.message, "error");
        } else {
          Swal.fire("Error", "Unknown error occurred during Logout", "error");
        }
      });
  };

  return (
    <div className="dropdown dropdown-end sm:pl-3">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full border">
          {initialLoading || actionLoading ? (
            <span className="loading loading-ring loading-lg"></span>
          ) : user && user?.photoURL && validPhoto ? (
            <img
              alt={user.displayName}
              src={user.photoURL}
              referrerPolicy="no-referrer"
              onError={() => setValidPhoto(false)}
            />
          ) : (
            <img src={profilePhoto} alt={user.displayName} />
          )}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-2"
      >
        <li>
          <a className="font-medium mx-auto block">{user.displayName}</a>
        </li>
        <li>
          <button onClick={handleLogOut} className="btn btn-sm btn-outline">
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
