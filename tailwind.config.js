/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#0B0616',
          light: '#0F0820',
          dark: '#070310',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF2E9F 0%, #5B6CFF 100%)',
        'gradient-glow': 'radial-gradient(circle at 30% 50%, rgba(91, 108, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 46, 159, 0.1) 0%, transparent 50%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}