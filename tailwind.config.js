// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure the proper paths are included for tailwind to work
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "custom-bg": "#1F1D2B",
        "custom-tab": "#252836",
        "custom-dark-cont": "#35358E",
        "custom-dark-active-icon": "#6A6AE3",
        "custom-light-active": "#2F2FA7",
        "custom-btn-dark": "#6366F1",
        "custom-btn-light":"#4F46E5",
        "custom-btn-hover-dark": "#818CF8",
        "custom-btn-hover-light": "#6366F1",
        "highlight": "#4F46E5",
        surface: {
          a0: "#111827", // background surface color (dark).
          a10: "#29303D",
          a20: "#232323",
          a30: "#252525",
          a40: "#272727",
          a50: "#2C2C2C",
          a60: "#2E2E2E",
          a70: "#333333",
          a80: "#363636",
          a90: "#383838",
        },
      },

      fontFamily: {
        pop: ['Poppins', 'sans-serif'], // Use Open Sans as the primary font
      },

      screens: {
        xs : '360px'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
