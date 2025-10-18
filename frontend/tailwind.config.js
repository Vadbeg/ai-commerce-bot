/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'tesla-black': '#000000',
        'tesla-gray': '#393c41',
        'tesla-light': '#f4f4f4',
      },
    },
  },
  plugins: [],
}
