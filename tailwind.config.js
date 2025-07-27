/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "smooth-in": "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
        "smooth-out": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "smooth-in-out": "cubic-bezier(0.645, 0.045, 0.355, 1)",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        fadeInLeft: "fadeInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        fadeInRight: "fadeInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        float: "float 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-12px)",
          },
        },
      },
    },
  },
  plugins: [],
};
