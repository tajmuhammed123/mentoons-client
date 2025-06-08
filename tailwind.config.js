const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
orange: {
  50:  "#fff7ed",  // Very light orange
  100: "#F7941D",  // Your specified main orange
  200: "#fbbf77",  // Light orange
  300: "#f59e38",  // Soft orange
  400: "#f2811a",  // Strong orange
  500: "#e76a00",  // Primary button orange
  600: "#c65400",  // Slightly deeper
  700: "#a84300",  // Darker
  800: "#7e3200",  // Even darker
  900: "#541f00",  // Very dark brownish-orange
},
        },
      },
    },
  },
  plugins: [],
});