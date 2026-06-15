import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import ThemeToggle from "./ThemeToggle";

function ThemeAssignment() {
  const { theme } = useContext(ThemeContext);

  const isLight = theme === "light";

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center transition-colors duration-500 ${
        isLight ? "bg-slate-50 text-slate-900" : "bg-gray-950 text-gray-50"
      }`}
    >
      {/* Main Content Card */}
      <div
        className={`relative p-10 md:p-14 max-w-lg w-full mx-4 rounded-3xl shadow-2xl transition-all duration-500 border ${
          isLight
            ? "bg-white border-slate-200 shadow-slate-200/50"
            : "bg-gray-900 border-gray-800 shadow-black/50"
        }`}
      >
        {/* Decorative background element for extra flair */}
        <div 
          className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 transition-colors duration-500 ${
            isLight ? "bg-blue-400" : "bg-blue-600"
          }`} 
        />

        <div className="relative z-10 flex flex-col items-start">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
            Theme <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Toggle</span>
          </h1>
          
          <p className={`mb-10 leading-relaxed ${isLight ? "text-slate-600" : "text-gray-400"}`}>
            A production-ready UI demonstrating seamless context-based theme switching with custom Tailwind CSS utility classes.
          </p>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default ThemeAssignment;