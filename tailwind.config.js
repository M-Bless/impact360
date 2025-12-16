// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primaryBlue: "#306CEC",
        lightYellow: "#FFFEF9",
        pureBlack: "#000000",
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'league-spartan': ['League Spartan', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
