import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#3bbfb0",
          light: "#5dd6c8",
          dark: "#2a9d8f",
        },
        navy: {
          DEFAULT: "#0a1628",
          2: "#0f1e2e",
          3: "#152436",
          4: "#1b2d40",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
};

export default config;
