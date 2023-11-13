/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#073763',
        accent: '#0c343d',
        complementary1: '#cb6b34',
        complementary2: '#34cbb7',
        complementary3: '#3448cb',
        complementary4: '#6b34cb',
        complementary5: '#cb3494',
      },
    },
  },
  plugins: [],
};
