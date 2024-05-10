import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A2E3C",
        primaryLight: "#3B575B",
        secondary: "#34A853",
        secondaryLight: "#338B56",
        secondaryDark: "#004D1E",
      },
      fontFamily: {
        display: "Righteous, sans-serif",
      },
    },
  },
  plugins: [],
} satisfies Config;
