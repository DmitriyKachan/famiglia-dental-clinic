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
        'brand-dark': '#2D241E',
        'brand-gold': '#C5A880',
        'brand-beige': '#F6F2EA',
        'brand-bg': '#FBF9F5',
        'brand-surface': '#FFFFFF',
        'brand-text-muted': '#6E6259',
        // High-Tech Optics & 3D Redesign Tokens
        'optic-dark': '#151210',
        'optic-slate': '#1E1916',
        'optic-gold': '#D4AF37',
        'optic-cyan': '#38BDF8',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
