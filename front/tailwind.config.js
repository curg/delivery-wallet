/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        transparent: "transparent",
        purple: {
          50: "#8247E5",
          100: "#6B26DF",
        },
        yellow: {
          50: "#FFF613",
        },
        dark: {
          50: "#AAAAAA",
          100: "#888888",
          150: "#555555",
          200: "#222222",
        },
      },
      keyframes: {
        slideDownModal: {
          from : { 
            transform: 'translate(-50%, -100%)', 
            opacity: 0
          },
          to : { 
            transform: 'translate(-50%, -50%)',
            opacity: 1
          }
        }
      },
      animation: {
        slideDownModal: 'slideDownModal .4s ease forwards'
      }
    },
  },

  plugins: [],
};
