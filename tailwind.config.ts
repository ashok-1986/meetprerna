import type { Config } from 'tailwindcss';

/**
 * Tailwind is the *layout* layer only.
 * Color tokens, type scale, and motion timings live in `src/styles/tokens.css`
 * so they can be consumed by GSAP, R3F, and raw CSS modules without coupling
 * to Tailwind's JIT.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand palette — single source of truth in tokens.css.
        // These are *aliases* and intentionally duplicate the CSS variables
        // so Tailwind utilities can reference them.
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          90: 'rgb(var(--color-ink-90) / <alpha-value>)',
          70: 'rgb(var(--color-ink-70) / <alpha-value>)',
          50: 'rgb(var(--color-ink-50) / <alpha-value>)',
          20: 'rgb(var(--color-ink-20) / <alpha-value>)',
        },
        ivory: {
          DEFAULT: 'rgb(var(--color-ivory) / <alpha-value>)',
          dim: 'rgb(var(--color-ivory-dim) / <alpha-value>)',
        },
        inchworm: {
          DEFAULT: 'rgb(var(--color-inchworm) / <alpha-value>)',
          deep: 'rgb(var(--color-inchworm-deep) / <alpha-value>)',
        },
        marigold: {
          DEFAULT: 'rgb(var(--color-marigold) / <alpha-value>)',
        },
        // Functional colors
        focus: 'rgb(var(--color-focus) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        editorial: ['var(--font-editorial)', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Fluid type — see src/styles/tokens.css for full clamp() definitions.
        'display-xl': 'clamp(4.5rem, 14vw, 18rem)',
        'display-lg': 'clamp(3.5rem, 9vw, 10rem)',
        'display-md': 'clamp(2.75rem, 6vw, 6rem)',
        'display-sm': 'clamp(2rem, 4vw, 4rem)',
        'h1': 'clamp(2.25rem, 4vw, 4rem)',
        'h2': 'clamp(1.75rem, 3vw, 3rem)',
        'h3': 'clamp(1.375rem, 2.2vw, 2rem)',
        'body-lg': 'clamp(1.125rem, 1.4vw, 1.25rem)',
        'body': 'clamp(1rem, 1.1vw, 1.0625rem)',
        'body-sm': 'clamp(0.875rem, 0.95vw, 0.9375rem)',
        'caption': 'clamp(0.75rem, 0.8vw, 0.8125rem)',
        'eyebrow': 'clamp(0.6875rem, 0.7vw, 0.75rem)',
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'editorial': '-0.02em',
        'wide': '0.04em',
        'wider': '0.08em',
        'widest': '0.2em',
      },
      spacing: {
        'gutter': 'var(--space-gutter)',
        'rail': 'var(--space-rail)',
        'section': 'var(--space-section)',
      },
      transitionTimingFunction: {
        'studio': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'soft': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      transitionDuration: {
        '120': '120ms',
        '180': '180ms',
        '260': '260ms',
        '420': '420ms',
        '620': '620ms',
        '900': '900ms',
        '1400': '1400ms',
      },
      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'breath': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.04)', opacity: '0.85' },
        },
        'grain': {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-5%)' },
          '20%': { transform: 'translate(-10%,5%)' },
          '30%': { transform: 'translate(5%,-10%)' },
          '40%': { transform: 'translate(-5%,15%)' },
          '50%': { transform: 'translate(-10%,5%)' },
          '60%': { transform: 'translate(15%,0)' },
          '70%': { transform: 'translate(0,10%)' },
          '80%': { transform: 'translate(-15%,0)' },
          '90%': { transform: 'translate(10%,5%)' },
        },
      },
      animation: {
        'cursor-blink': 'cursor-blink 1.1s steps(2, end) infinite',
        'marquee': 'marquee 40s linear infinite',
        'breath': 'breath 6s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
