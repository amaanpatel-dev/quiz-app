/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Roboto Mono", "monospace"], // Add Roboto Mono to the "mono" font stack
      },
    },
  },
  plugins: [],
}

