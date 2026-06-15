import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      className={`
        flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-out
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 active:scale-95
        ${
          isLight
            ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-xl"
            : "bg-white text-slate-900 hover:bg-gray-100 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        }
      `}
    >
      <div className={`transition-transform duration-500 ${isLight ? "rotate-0" : "-rotate-90"}`}>
        {isLight ? <FiMoon size={20} /> : <FiSun size={20} />}
      </div>
      <span>{isLight ? "Switch to Dark" : "Switch to Light"}</span>
    </button>
  );
}

export default ThemeToggle;