module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "green",
      },
      fontFamily: {
        rubik: ["rubik", "sans-serif"],
        karla: ["karla", "sans-serif"],
        roboto: ["roboto", "sans-serif"],
      },
      borderWidth: {
        0: "0",
        1: "1px",
      },
      backgroundImage: {
        // 'fitness-card': "url('images/fitness.jpeg')",
        // 'coding-card': "url('images/simple_setup.jpeg')",
        // 'lifestyle-card': "url('images/medellin.jpeg')",
      },
      gridTemplateRows: {
        pancake: "1fr 4fr 1fr",
      },
      spacing: {
        "9/10": "90%",
        "95/100": "95%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
