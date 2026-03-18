/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['system-ui', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#f75d00',
          dark: '#c64a00',
        }
      },
      animation: {
      }
    },
  },
  plugins: [],
}