/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(34, 34, 34)",
          10: "#3e3e3e",
          20: "#0000002d",
        },
      },
      screens: {
        "3xl": "1800px",
      },
    },
  },
  plugins: [],
};

