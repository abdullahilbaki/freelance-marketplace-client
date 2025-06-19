import { useEffect, useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "pastel");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "pastel" ? "forest" : "pastel"));
  };

  return (
    <button className="btn btn-dash btn-sm" onClick={toggleTheme}>
      {theme === "pastel" ? (
        <div className="flex items-center gap-1">
          <CiDark className="text-lg" />
          <p>Dark</p>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <CiLight className="text-lg" />
          <p>Light</p>
        </div>
      )}
    </button>
  );
}
