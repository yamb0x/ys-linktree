import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        surface: '#1e1e1e',
        'surface-hover': '#2a2a2a',
        'text-primary': '#ffffff',
        'text-muted': '#a0a0a0',
        border: '#333333',
      },
      fontFamily: {
        'basis': ['Basis Grotesque', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'title': '24px',
        'description': '14px',
        'link': '16px',
        'section': '12px',
      },
      spacing: {
        'container': '16px',
        'link-gap': '12px',
      },
      borderRadius: {
        'link': '8px',
      },
      maxWidth: {
        'mobile': '680px',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(255, 255, 255, 0)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.15)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        },
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'bounce-subtle': 'bounce 0.3s ease-in-out',
        'shake': 'shake 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
