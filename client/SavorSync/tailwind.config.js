/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#0A0A1A',
        'deep-purple': '#2D1B4E',
        'nebula-violet': '#6C4AB6',
        'cosmic-blue': '#3B82F6',
        'star-white': '#E8E8F0',
      },
      fontFamily: {
        display: ['Orbitron', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}