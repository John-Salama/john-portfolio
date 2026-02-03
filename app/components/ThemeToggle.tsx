"use client";

import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group flex items-center justify-center w-11 h-11 rounded-full
                 bg-white dark:bg-gray-800 backdrop-blur-xl
                 border-2 border-gray-200 dark:border-gray-700
                 shadow-md hover:shadow-lg
                 hover:border-purple-400 dark:hover:border-purple-500
                 hover:scale-110 active:scale-95
                 transition-all duration-300 ease-out
                 overflow-hidden"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Sun icon */}
      <Sun
        className={`absolute w-5 h-5 transition-all duration-500 ease-out
                   ${
                     theme === "light"
                       ? "rotate-0 scale-100 opacity-100 text-amber-500"
                       : "rotate-90 scale-0 opacity-0 text-amber-500"
                   }`}
        strokeWidth={2.5}
      />

      {/* Moon icon */}
      <Moon
        className={`absolute w-5 h-5 transition-all duration-500 ease-out
                   ${
                     theme === "dark"
                       ? "rotate-0 scale-100 opacity-100 text-purple-400"
                       : "-rotate-90 scale-0 opacity-0 text-purple-400"
                   }`}
        strokeWidth={2.5}
      />
    </button>
  );
}
