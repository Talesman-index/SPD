/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // === Envoll Primary Palette ===
        teal: {
          DEFAULT: '#145e69',
          dark:    '#0f2f35',
          light:   '#9ed8db',
          xlight:  '#e8f6f7',
        },
        gold:    '#f4d092',
        black:   '#000000',
        'black-olive': '#2c2500',

        // === Text ===
        'text-primary':   '#000000',
        'text-secondary': '#565656',
        'text-muted':     '#afafaf',

        // === Borders & Backgrounds ===
        border:   '#dbdbdb',
        'gray-soft': '#ebebeb',
        'gray-bg':   '#f5f5f5',

        // === Semantic ===
        safe:     '#2a9d5c',
        positive: '#e05a2b',
        warning:  '#f59e0b',
      },

      fontFamily: {
        sans:    ['Manrope', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
      },

      fontSize: {
        'h1':      ['96px',  { lineHeight: '0.9',  letterSpacing: '-0.025em', fontWeight: '800' }],
        'h2':      ['44px',  { lineHeight: '1.1',  letterSpacing: '-0.01em',  fontWeight: '700' }],
        'h3':      ['24px',  { lineHeight: '1.2',  letterSpacing: '0',        fontWeight: '600' }],
        'h4':      ['16px',  { lineHeight: '1.4',  letterSpacing: '0',        fontWeight: '500' }],
        'body-lg': ['18px',  { lineHeight: '1.7',  letterSpacing: '0',        fontWeight: '400' }],
        'body':    ['16px',  { lineHeight: '1.65', letterSpacing: '0',        fontWeight: '400' }],
        'small':   ['14px',  { lineHeight: '1.6',  letterSpacing: '0',        fontWeight: '400' }],
        'btn':     ['16px',  { lineHeight: '1',    letterSpacing: '0.015em',  fontWeight: '600' }],
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
        'lg':        '0 12px 48px rgba(0,0,0,0.12)',
        'card':      '0 2px 16px rgba(0,0,0,0.07)',
        'card-hover':'0 8px 32px rgba(20,94,105,0.15)',
        'brand':     '0 8px 32px rgba(20,94,105,0.15)',
        'brand-lg':  '0 20px 80px rgba(20,94,105,0.12)',
        // Legacy aliases
        'premium':   '0 10px 40px -10px rgba(20,94,105,0.08)',
        'premium-lg':'0 20px 80px -15px rgba(20,94,105,0.12)',
      },

      maxWidth: {
        'container': '1200px',
      },

      spacing: {
        // Envoll section padding tokens
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
