/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ['"Dancing Script"', 'cursive'],
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        cream: '#f5f0e8',
        blush: '#e8c4c4',
        rose: '#c2706e',
        'deep-rose': '#8b3a3a',
        midnight: '#0d0d0d',
        'warm-dark': '#1a1410',
        'paper': '#f9f5ef',
        'aged-paper': '#e8dcc8',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
