/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tv': '1920px',
      },
      spacing: {
        'tv-safe': '60px',
      },
      fontSize: {
        'tv-sm': '24px',
        'tv-base': '28px',
        'tv-lg': '32px',
        'tv-xl': '36px',
        'tv-2xl': '42px',
        'tv-3xl': '48px',
      },
    },
  },
  plugins: [],
} 