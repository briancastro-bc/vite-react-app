/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f4f8fa",
          100: "#e6eef3",
          200: "#d2e0eb",
          300: "#b4ccdc",
          400: "#8fb2cb",
          500: "#759abc",
          600: "#5e81ac", // main
          700: "#57739e",
          800: "#4b5f82",
          900: "#3f5069",
          950: "#2a3241",
        },
        secondary: {
          50: "#f3f8f7",
          100: "#e0edec",
          200: "#c5dcdb",
          300: "#8fbcbb", // main
          400: "#6ca4a4",
          500: "#518989",
          600: "#467174",
          700: "#3d5e61",
          800: "#385052",
          900: "#324447",
          950: "#1e2c2e",
        }
      },
      fontFamily: {
        'primary': '"Raleway", sans-serif',
        'primary-alt': '"Montserrat Alternates", sans-serif',
        'secondary': '"Platypi", serif',
        'secondary-alt': '"Merriweather", serif',
      }
    },
  },
  plugins: [],
}

