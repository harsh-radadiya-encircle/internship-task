import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import ThemeToggle from "./ThemeToggle";

function ThemeAssignment() {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={
                theme === "light"
                    ? "min-h-screen flex flex-col justify-center items-center bg-white text-black"
                    : "min-h-screen flex flex-col justify-center items-center bg-black text-white"
            }
        >
            <h1 className="text-3xl font-bold mb-5">
                Context API Theme Toggle
            </h1>

            <ThemeToggle />
        </div>
    );
}

export default ThemeAssignment;