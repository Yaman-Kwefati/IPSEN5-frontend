/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary-dark-purple": "#5236AA",
        "primary-red": "#E21938",
        "secondary-purple-light": "#ECE9F6",
        "secondary-dark-pink": "#A92565",
        "secondary-purple": "#802D85",
      }
    },
  },
  plugins: [],
}

