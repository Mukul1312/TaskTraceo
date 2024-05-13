import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import flowbite from "flowbite/plugin";

export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/lib/**/*.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#34A853",
          secondary: "#0A2E3C",
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
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": ["0 35px 35px rgba(0, 0, 0, 0.25)", "0 45px 65px rgba(0, 0, 0, 0.15)"],
      },
    },
  },
  plugins: [daisyui, flowbite],
} satisfies Config;
