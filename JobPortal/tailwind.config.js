/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        backGround:"var(--background-color)",
        textColor:"var(--text-color)",
        border:"var(--border-color)"
      },
      fontFamily:{
        'google':["Montserrat"]
      }
    },
  },
  plugins: [],
}