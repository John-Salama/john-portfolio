"use client";

import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group flex items-center justify-center w-12 h-12 rounded-xl
                 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl
                 border border-gray-200/50 dark:border-gray-700/50
                 shadow-lg shadow-gray-200/20 dark:shadow-black/30
                 hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/20
                 hover:border-purple-400/50 dark:hover:border-purple-500/50
                 hover:scale-105 active:scale-95
                 transition-all duration-300 ease-out
                 overflow-hidden"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Animated background gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-gradient-to-br from-amber-400/10 via-purple-500/10 to-blue-500/10
                      dark:from-amber-400/5 dark:via-purple-500/10 dark:to-blue-500/10"
      />

      {/* Sun icon */}
      <Sun
        className={`absolute w-5 h-5 transition-all duration-500 ease-out
                   ${
                     theme === "light"
                       ? "rotate-0 scale-100 opacity-100 text-amber-500"
                       : "rotate-90 scale-0 opacity-0 text-amber-500"
                   }`}
      />

      {/* Moon icon */}
      <Moon
        className={`absolute w-5 h-5 transition-all duration-500 ease-out
                   ${
                     theme === "dark"
                       ? "rotate-0 scale-100 opacity-100 text-purple-400"
                       : "-rotate-90 scale-0 opacity-0 text-purple-400"
                   }`}
      />

      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-xl transition-all duration-300
                      ${
                        theme === "dark"
                          ? "shadow-[inset_0_0_20px_rgba(168,85,247,0.15)]"
                          : "shadow-[inset_0_0_20px_rgba(251,191,36,0.15)]"
                      }`}
      />
    </button>
  );
}
