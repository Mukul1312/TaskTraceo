import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#34A853",
          secondary: "#ff00ff",
          accent: "#00ffff",
          neutral: "#ff00ff",
          "base-100": "#ffffff",
          info: "#0000ff",
          success: "#00ff00",
          warning: "#00ff00",
          error: "#ff0000",
        },
      },
    ],
  },

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
        sans: "Poppins, sans-serif",
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
