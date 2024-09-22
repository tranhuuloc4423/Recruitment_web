/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#284F9E',
        second: '#fbc73b',
        red: '#ED1B2F',
        overlay: 'rgba(0,0,0, 0.25)'
      },
      fontFamily: {
        sans: ['Lexend', 'sans-serif']
      }
    }
  },
  plugins: []
}
