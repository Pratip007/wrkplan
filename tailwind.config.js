/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        'emerald': {
          50: '#ecfdf5',
          100: '#d1fae5',
          600: '#059669',
          700: '#047857',
        },
        'navbar': {
          DEFAULT: '#0a182e',
        },
        'deepteal': {
          DEFAULT: '#024b59',
        },
        'softteal': {
          DEFAULT: '#e6f6f8',
        },
        'dark': {
          DEFAULT: '#1a1a1a',
        },
        'tabnav': {
          DEFAULT: '#e8f4f8',
        },
      }
    },
  },
  plugins: [],
}
