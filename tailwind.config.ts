import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-soft": "var(--color-primary-soft)",

        background: "var(--color-background)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",

        text: {
          DEFAULT: "var(--color-text)",
          muted: "var(--color-text-muted)",
        },
      },

      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.05)",
      },

      borderRadius: {
        md: "12px",
        lg: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
