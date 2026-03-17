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
        black: 'var(--color-black)',
        ivory: 'var(--color-ivory)',
        green: 'var(--color-green)',
        yellow: 'var(--color-yellow)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(4.5rem, 9vw, 11rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'section': ['clamp(2.5rem, 4vw, 4.5rem)', { lineHeight: '1.1' }],
      },
      zIndex: {
        '5000': '5000',
        '9000': '9000',
        '10000': '10000',
      },
      animation: {
        'grain': 'grain 0.5s steps(2) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
