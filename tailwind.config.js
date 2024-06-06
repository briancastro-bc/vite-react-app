/** @type {import('tailwindcss').Config} */
export default {
  // important: '#root',
  darkMode: 'class',
  important: 'body',
  corePlugins: {
    preflight: true,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': "#f4f8fa",
          '100': "#e6eef3",
          '200': "#d2e0eb",
          '300': "#b4ccdc",
          '400': "#8fb2cb",
          '500': "#759abc",
          '600': "#5e81ac", // main
          '700': "#57739e",
          '800': "#4b5f82",
          '900': "#3f5069",
          '950': "#2a3241",
        },
        'secondary': {
          '50': "#f3f8f7",
          '100': "#e0edec",
          '200': "#c5dcdb",
          '300': "#8fbcbb", // main
          '400': "#6ca4a4",
          '500': "#518989",
          '600': "#467174",
          '700': "#3d5e61",
          '800': "#385052",
          '900': "#324447",
          '950': "#1e2c2e",
        },
        'juridica': {
          '50': '#eef5ff',
          '100': '#dae7ff',
          '200': '#bdd6ff',
          '300': '#90bcff',
          '400': '#5493ff', // main
          '500': '#3571fc',
          '600': '#1f50f1',
          '700': '#173bde',
          '800': '#1932b4',
          '900': '#1a2f8e',
          '950': '#151f56',
        },
        'juridica-gray': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#000000',
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

