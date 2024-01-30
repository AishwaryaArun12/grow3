/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{html,js,ts,jsx,tsx}",'node_modules/flowbite-react/lib/esm/**/*.js',
  "./node_modules/tw-elements/dist/js/**/*.js"],
  
  theme: {
    extend: {},
  },
  plugins: [ require('flowbite/plugin'),require("tw-elements/dist/plugin.cjs")],
  darkMode: "class"
}

