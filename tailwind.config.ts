import { defineConfig } from 'windicss';

// Tailwind-like config in TS for Vite setup. We expose brand colors using Tailwind-friendly syntax
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0066FF',
        primary: '#0066FF',
        accent: '#FF9900',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
} as const;
