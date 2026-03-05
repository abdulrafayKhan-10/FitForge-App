/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend-Regular", "sans-serif"],
        "lexend-semibold": ["Lexend-Semibold", "sans-serif"],
        "lexend-bold": ["Lexend-Bold", "sans-serif"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
