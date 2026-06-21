import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#05070a",
          900: "#090d12",
          850: "#0d131a",
          800: "#111922",
          700: "#1b2733",
        },
        signal: {
          cyan: "#67e8f9",
          blue: "#60a5fa",
          green: "#86efac",
          amber: "#fbbf24",
          red: "#f87171",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px rgb(103 232 249 / 0.14)",
        panel: "0 18px 80px rgb(0 0 0 / 0.42)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgb(103 232 249 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(103 232 249 / 0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
