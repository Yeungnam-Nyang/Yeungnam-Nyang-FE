module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#f9e673",
        orange: "#ffcc00",
        darkOrange:"#ff9500"
      },
      boxShadow: {
        global: "rgba(100, 100, 111, 0.5) 0px 7px 29px 0px",
      },
    },
  },
  plugins: [],
};
