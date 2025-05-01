/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      animation: {
        'raindrop': 'raindrop 0.6s ease-out forwards',
      },
      keyframes: {
        raindrop: {
          '0%': { transform: 'scale(0.2)', opacity: '0.9' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

