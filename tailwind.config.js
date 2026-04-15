/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: { 50:'#fff5f3', 100:'#ffe4df', 200:'#ffbfb5', 300:'#ff8f80', 400:'#ff6b57', 500:'#f04b35', 600:'#d93620', 700:'#b52918', 800:'#941f13', 900:'#7a1a10' },
        teal:  { 50:'#f0fdfb', 100:'#ccfbf4', 200:'#99f5e8', 300:'#5de8d6', 400:'#2dd4bf', 500:'#14b8a6', 600:'#0d9488', 700:'#0f766e', 800:'#115e59', 900:'#134e4a' },
        warm:  { 50:'#fdfbf7', 100:'#faf5ec', 200:'#f3e8d0', 300:'#e8d3a8', 400:'#d9b87a', 500:'#c99a50', 600:'#b07d38', 700:'#8f6229', 800:'#74501f', 900:'#5f421a' },
      },
      fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] },
      borderRadius: { xl: '1rem', '2xl': '1.5rem', '3xl': '2rem' },
    },
  },
  plugins: [],
}
