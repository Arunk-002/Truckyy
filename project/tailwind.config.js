/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F38181',
        secondary: '#FCE38A',
        accent: '#EAFFD0',
        dark: '#95E1D3',
      }
    },
  },
  plugins: [],
};