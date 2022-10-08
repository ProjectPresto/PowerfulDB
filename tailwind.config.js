/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#292A33",
        "secondary-dark": "#1B1C22",
        "tertiary-dark": "#363844",
        "primary-light": "#F3EFF5",
        "primary-accent": "#4EFFA6",
        "secondary-accent": "#5E2BFF",
      },
      fontFamily: {
        serif: ["Lora", "serif"],
        sans: ["Staatliches", "sans-serif"],
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, 12rem)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
