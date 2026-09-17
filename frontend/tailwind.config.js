/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warmbg: '#FAFAF9',
        charcoal: {
          800: '#292524',
          900: '#1C1917',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e3ebe4',
          200: '#c8d8cb',
          300: '#a3beaa',
          400: '#34d399',
          500: '#10B981', // Emerald / Salvia
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#F43F5E', // Nude / Rosáceo
          600: '#E11D48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        clay: {
          50: '#faf5f3',
          100: '#f4e9e5',
          200: '#ebd4cc',
          300: '#dcb5a7',
          400: '#ca9280',
          500: '#c28d75',
          600: '#aa6b52',
          700: '#8e543e',
          800: '#754636',
          900: '#613d30',
        },
        linen: {
          50: '#fdfbf7',
          100: '#f8f5ee',
          200: '#eee8da',
          300: '#e1d6c0',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
