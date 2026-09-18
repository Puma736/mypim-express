/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Rosa/Magenta — identidad de salones de belleza
        rose: {
          50:  '#fff1f5',
          100: '#ffe4ed',
          200: '#fecdd9',
          300: '#fda4bb',
          400: '#fb7299',
          500: '#f43f74',  // Primario
          600: '#e11d5a',
          700: '#be1249',
          800: '#9d1240',
          900: '#841139',
        },
        // Dorado/Cobre — acento premium
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',  // Acento
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Carbón — textos y fondos oscuros
        charcoal: {
          800: '#1f2937',
          900: '#111827',
        },
        // Crema — fondo general
        cream: {
          50:  '#fdfaf7',
          100: '#f9f4ee',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
