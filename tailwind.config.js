/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00BA88',
        secondary: '#FF6B00',
        background: {
          DEFAULT: 'rgb(23,25,29)',
          secondary: '#1E1F24',
          hover: '#2A2B30'
        },
        foreground: '#ededed'
      },
      maxHeight: {
        'search-results': '300px',
      }
    },
  },
  plugins: [],
}
