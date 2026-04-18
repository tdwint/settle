/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:  { 50:'#f0f4ff', 100:'#e0e9ff', 200:'#c7d7fe', 300:'#a5b4fc', 400:'#818cf8', 500:'#3730a3', 600:'#1e1b6e', 700:'#16134f', 800:'#0f0d38', 900:'#080720' },
        amber: { 50:'#fffbeb', 100:'#fef3c7', 200:'#fde68a', 300:'#fcd34d', 400:'#fbbf24', 500:'#f59e0b', 600:'#d97706', 700:'#b45309', 800:'#92400e', 900:'#78350f' },
        slate: { 50:'#f8fafc', 100:'#f1f5f9', 200:'#e2e8f0', 300:'#cbd5e1', 400:'#94a3b8', 500:'#64748b', 600:'#475569', 700:'#334155', 800:'#1e293b', 900:'#0f172a' },
        cream: { 50:'#fefdfb', 100:'#fdf9f0', 200:'#faf3e0', 300:'#f5e6c8' },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['DM Serif Display', 'serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.04), 0 4px 16px -2px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 6px -1px rgba(0,0,0,0.06), 0 12px 32px -4px rgba(0,0,0,0.1)',
        'nav': '0 1px 0 0 rgba(0,0,0,0.06)',
        'input-focus': '0 0 0 3px rgba(245,158,11,0.15)',
        'btn': '0 1px 2px 0 rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
        'btn-amber': '0 1px 2px 0 rgba(0,0,0,0.12), 0 4px 12px -2px rgba(245,158,11,0.3)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
        'gradient-navy': 'linear-gradient(135deg, #0f0d38 0%, #16134f 50%, #1e1b6e 100%)',
        'gradient-card': 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        'gradient-amber': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      },
      backgroundSize: {
        'dot-sm': '20px 20px',
      },
    },
  },
  plugins: [],
}
