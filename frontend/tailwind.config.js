/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#284F9E',
        second: '#fbc73b',
        red: '#ED1B2F',
        overlay: 'rgba(0,0,0, 0.25)',
        'black-100': '#414042',
        'gray-100': '#dedede'
      },
      fontFamily: {
        sans: ['Lexend', 'sans-serif']
      }
    }
  },
}
