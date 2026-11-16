/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#00a2e8',
          cyanHover: '#008ecb',
          cyanLight: '#e6f6fd',
          cyanGlow: 'rgba(0, 162, 232, 0.25)',
          dark: '#18222b',
          darkDeep: '#121920',
          darkCard: '#1f2b37',
          darkBorder: '#2a3a49',
          cream: '#faf8f5',
          creamDark: '#f4f0e8',
          borderMuted: '#e5e1d8',
          textMuted: '#7c8692',
          gold: '#c5a059',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widestLuxury: '0.25em',
        kicker: '0.18em'
      }
    },
  },
  plugins: [],
}

