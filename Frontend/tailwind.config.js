/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        mainBackgroundImage : "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"
      },
      fontFamily: {
        mainFont: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
}

