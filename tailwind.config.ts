import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: {
          100: "#ffffff",
          200: "#F0F0F0",
          400: "#E8E8E8",
          500: "#CACACA",
          700: "#7E7E7E",
          800: "#424242",
          900: "#000000"
        },
        blue: {
          100: "#DCE5E5",
          400: "#258280"
        },
        green: {
          100: "#D9EFCC",
          700: "#6C885C"
        },
        yellow: {
          100: "#F2EAD6",
          700: "#8E805B"
        },
        red: {
          100: "#FFE0E0",
          400: "#F62A2A",
          700: "#7F4D4D"
        }
      },
      fontFamily: {
        "font-inter": "var(--font-inter)"
      }
    },
  },
  plugins: [],
} satisfies Config;
