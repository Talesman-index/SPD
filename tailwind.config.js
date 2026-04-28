/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: '#10102e',
          900: '#1e1a4a',
          800: '#2d2872',
          700: '#3d37a0',
          600: '#4a44c0',
          400: '#7b77d8',
          300: '#b0ace8',
          200: '#d8d6f5',
          100: '#eeedf9',
        },
        petri: {
          900: '#003838',
          800: '#005858',
          700: '#007878',
          600: '#009898',
          500: '#00b8b0',
          400: '#40d0c8',
          300: '#80e0d8',
          200: '#b8f0ec',
          100: '#e0f8f6',
        },
        amber: {
          600: '#e8a020',
          400: '#f0be60',
          100: '#fef4e0',
        },
        bg: {
          primary:      '#f8f8fc',
          secondary:    '#eeedf9',
          cyan:         '#e0f8f6',
          dark:         '#1e1a4a',
          darkest:      '#10102e',
        },
        text: {
          primary:   '#10102e',
          secondary: '#5a5a8a',
          muted:     '#9898b8',
        },
        // Legacy Semantic Aliases (mapped to new palette)
        teal: {
          DEFAULT: '#1e1a4a',
          dark:    '#10102e',
          light:   '#b0ace8',
          xlight:  '#eeedf9',
        },
        gold: '#e8a020',
        border: '#d8d6f5',
        safe:     '#00b8b0',
        positive: '#e8a020',
      },

      letterSpacing: {
        widest: '0.15em',
        tight: '-0.025em',
        tighter: '-0.05em',
        normal: '0em',
      },

      fontFamily: {
        sans:    ['Manrope', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
      },

      fontSize: {
        'label':       ['11px', { lineHeight: '1.4', letterSpacing: '0.07em', fontWeight: '600' }],
        'button':      ['13px', { lineHeight: '1', letterSpacing: '0.04em', fontWeight: '600' }],
        'placeholder': ['14px', { lineHeight: '1.5', letterSpacing: '0em' }],
        'body':        ['14px', { lineHeight: '1.6', letterSpacing: '0em' }],
        'h1':          ['24px', { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '700' }],
        'h2':          ['20px', { lineHeight: '1.3', letterSpacing: '0.02em', fontWeight: '700' }],
        'h3':          ['18px', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '600' }],
        'h4':      ['16px',  { lineHeight: '1.4',  letterSpacing: '0',        fontWeight: '500' }],
        'body-lg': ['18px',  { lineHeight: '1.7',  letterSpacing: '0',        fontWeight: '400' }],
        'small':   ['14px',  { lineHeight: '1.6',  letterSpacing: '0',        fontWeight: '400' }],
        'eyebrow': ['12px',  { lineHeight: '1',    letterSpacing: '0.12em',   fontWeight: '700' }],
      },

      fontWeight: {
        light:     '300',
        normal:    '400',
        medium:    '500',
        semibold:  '600',
        bold:      '700',
        extrabold: '800',
      },

      borderRadius: {
        'none':  '0',
        'sm':    '4px',
        'DEFAULT': '8px',
        'md':    '12px',
        'lg':    '16px',    // cards
        'xl':    '24px',
        '2xl':   '32px',
        '3xl':   '40px',
        '4xl':   '48px',
        '5xl':   '60px',
        'pill':  '999px',  // all buttons & tags
        'full':  '9999px',
      },

      boxShadow: {
        'sm':        '0 1px 8px rgba(0,0,0,0.06)',
        'DEFAULT':   '0 4px 20px rgba(0,0,0,0.08)',
        'lg':        '0 12px 48px rgba(30,26,74,0.12)',
        'card':      '0 2px 16px rgba(30,26,74,0.07)',
        'card-hover':'0 8px 32px rgba(30,26,74,0.15)',
        'brand':     '0 8px 32px rgba(30,26,74,0.15)',
        'brand-lg':  '0 20px 80px rgba(30,26,74,0.12)',
        'premium':   '0 10px 40px -10px rgba(30,26,74,0.08)',
        'premium-lg':'0 20px 80px -15px rgba(30,26,74,0.12)',
      },

      maxWidth: {
        'container': '1200px',
      },

      spacing: {
        'section-sm': '60px',
        'section-md': '80px',
        'section-lg': '120px',
      },

      animation: {
        'ticker': 'ticker 25s linear infinite',
        'float':  'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },

      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      transitionTimingFunction: {
        'envoll': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'reveal': 'cubic-bezier(0.21, 0.47, 0.32, 0.98)',
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
