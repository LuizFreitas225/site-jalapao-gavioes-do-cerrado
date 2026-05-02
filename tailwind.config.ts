import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "var(--color-brand-navy)",
          sand: "var(--color-brand-sand)",
          gold: "var(--color-brand-gold)",
          amber: "var(--color-brand-amber)",
          cream: "var(--color-brand-cream)",
          earth: "var(--color-brand-earth)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
