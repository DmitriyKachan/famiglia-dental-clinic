import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm Medical Luxury Tokens
        'brand-base': '#FAF8F5',
        'brand-surface': '#FFFFFF',
        'brand-dark': '#1E1B18',
        'brand-muted': '#6E655F',
        'brand-gold': '#C5A880',
        'brand-gold-hover': '#B8976C',
        'brand-sage': '#2D6A4F',
        'brand-border': '#EFEBE4',
        // Compatibility tokens
        'brand-beige': '#F6F2EA',
        'brand-bg': '#FAF8F5',
        'brand-text-muted': '#6E655F',
        // Optics tokens (preserved for compatibility during redesign)
        'optic-dark': '#151210',
        'optic-slate': '#1E1916',
        'optic-gold': '#D4AF37',
        'optic-cyan': '#38BDF8',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shimmer-spin': 'shimmer-spin 3s linear infinite',
      },
      keyframes: {
        'shimmer-spin': {
          '0%': {
            transform: 'translate(-50%, -50%) rotate(0deg)',
          },
          '100%': {
            transform: 'translate(-50%, -50%) rotate(360deg)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
