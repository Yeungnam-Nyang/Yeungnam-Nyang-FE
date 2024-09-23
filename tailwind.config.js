module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#f9e673",
        orange: "#ffcc00",
      },
      boxShadow: {
        global: "rgba(100, 100, 111, 0.5) 0px 7px 29px 0px",
      },
      animation: {
        "scale-hover": "scaleHover 0.5s ease-in-out",
      },
      keyframes: {
        scaleHover: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".custom-hover": {
          transition: "transform 0.5s",
          "&:hover": {
            transform: "scale(1.1)",
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
