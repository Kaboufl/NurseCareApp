/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      fontFamily: {
        colortube: ['colortube', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#f6a2d2',
          100: ''
        }
      }
    }
  },
  plugins: []
}
