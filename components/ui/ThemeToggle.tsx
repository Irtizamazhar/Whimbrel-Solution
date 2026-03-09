"use client";

import { SunMoon } from "lucide-react";
type ThemeMode = "dark" | "light";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const currentTheme =
      root.dataset.theme === "light" || root.dataset.theme === "dark"
        ? (root.dataset.theme as ThemeMode)
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    const nextTheme: ThemeMode = currentTheme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    root.classList.toggle("light", nextTheme === "light");
    localStorage.setItem("theme-mode", nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-teal/60 text-teal transition hover:bg-teal/10"
      aria-label="Toggle dark and light mode"
      data-magnetic="true"
    >
      <SunMoon size={18} />
    </button>
  );
}
