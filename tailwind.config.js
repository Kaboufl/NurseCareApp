/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      fontFamily: {
        colortube: ['colortube', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif']
      }
    }
  },
  plugins: []
}
