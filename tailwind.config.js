/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: '#ffc82c',
      },
      fontFamily: {
        ubuntu: 'Ubuntu, sans-serif',
      },
    },
  },
  plugins: [],
};
