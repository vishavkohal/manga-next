/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // or 'media' for OS-level preference
  theme: {
    extend: {
      colors: {
        darkblue: '#263855',
        deepdark: '#070c13',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

