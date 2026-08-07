import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // A single restrained accent — amber phosphor, used sparingly (the
        // "Decode signal" button, focus rings, station labels, and glow).
        accent: {
          DEFAULT: "#FF9F1C",
          hover: "#FFB74D",
        },
        canvas: "#0C1116",
        surface: "#12181F",
        border: "#2A343E",
        // Muted instrument-panel label color and the error/alert color.
        steel: "#9AA7B2",
        signal: "#E5484D",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      letterSpacing: {
        console: "0.16em",
      },
      boxShadow: {
        glow: "0 0 16px rgba(255, 159, 28, 0.35)",
      },
      keyframes: {
        dotPulse: {
          '0%, 100%': {
            backgroundColor: '#2A343E',
          },
          '50%': {
            backgroundColor: '#fff',
          },
        },
      },
      animation: {
        'dot-pulse': 'dotPulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
