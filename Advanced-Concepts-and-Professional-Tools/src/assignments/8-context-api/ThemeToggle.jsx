import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Switch to {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}

export default ThemeToggle;