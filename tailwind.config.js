/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D',
        primary: '#00FFFF',
        secondary: '#FF00FF',
        accent: '#00FF00',
      },
    },
  },
  plugins: [],
};
