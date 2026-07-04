import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury & Premium Theme Colors
        gold: {
          50: "#fbf8ee",
          100: "#f5eecd",
          200: "#ebdc9b",
          300: "#dec261",
          400: "#d2a634",
          500: "#b98c25", // Premium Accent Gold
          600: "#9b6e1c",
          700: "#7a5117",
          800: "#634117",
          900: "#523519",
          950: "#301c0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;