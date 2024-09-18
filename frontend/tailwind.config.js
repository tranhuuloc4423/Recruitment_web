/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#284F9E',
        second: '#fbc73b',
        red: '#ED1B2F'
      },
      fontFamily: {
        sans: ['Lexend', 'sans-serif']
      }
    }
  },
  plugins: []
}
