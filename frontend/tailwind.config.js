/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f4f7f4',
          100: '#e3ebe4',
          200: '#c8d8cb',
          300: '#a3beaa',
          400: '#7a9f84',
          500: '#5b7065', // Main Sage Accent
          600: '#485b50',
          700: '#3a4a41',
          800: '#303c35',
          900: '#2a332d',
        },
        clay: {
          50: '#faf5f3',
          100: '#f4e9e5',
          200: '#ebd4cc',
          300: '#dcb5a7',
          400: '#ca9280',
          500: '#c28d75', // Main Terracotta/Clay Accent
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
        },
        charcoal: {
          800: '#2d3748',
          900: '#1f2937',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
