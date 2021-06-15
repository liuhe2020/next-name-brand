module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        88: "352px",
        100: "400px",
        115: "460px",
        128: "500px",
        150: "600px",
        200: "800px",
        225: "900px",
        250: "1000px",
        275: "1100px",
      },
      maxWidth: {
        xxs: "288px",
        xs: "480px",
        md: "768px",
        "3xl": "1760px",
        hd: "1920px",
      },
      minHeight: {
        128: "500px",
      },
      height: {
        toggle: "calc(-64px + 100vh)",
        "toggle-lg": "calc(-80px + 100vh)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
