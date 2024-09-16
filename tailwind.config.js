/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ff4d4d",
        secondary: "#ff3838",
      },
    },
    keyframes: {
      move: {
        "50%": { transform: "translateY(-1rem)" },
      },
      rotate: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
      scaleUp: {
        "0%": { transform: "scale(0.8)" },
        "50%": { transform: "scale(1.2)" },
        "100%": { transform: "scale(0.8)" },
      },
    },
    animation: {
      movingY: "move 3s linear infinite",
      scalingUp: "scaleUp 3s linear infinite",
      rotating: "rotate 5s linear infinite",
    },

    fontFamily: {
      Jost: ["Jost", "sans-serif"],
      Lobster: ["Lobster", "sans-serif"],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "3rem",
        md: "5rem",
        lg: "6rem",
        xl: "16rem",
        "2xl": "20rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
