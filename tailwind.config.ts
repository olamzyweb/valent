import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          25: '#fff6f8'
        }
      },
      boxShadow: {
        glow: '0 0 30px rgba(244, 114, 182, 0.35)'
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        script: ['var(--font-script)']
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        heartFloat: {
          '0%': { transform: 'translateY(0) scale(0.9)', opacity: '0' },
          '20%': { opacity: '0.7' },
          '100%': { transform: 'translateY(-140px) scale(1.15)', opacity: '0' }
        },
        heartDrift: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(14px)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(244, 114, 182, 0)' },
          '50%': { boxShadow: '0 0 30px rgba(244, 114, 182, 0.7)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        heartFloat: 'heartFloat 8s ease-in-out infinite',
        heartDrift: 'heartDrift 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
        shimmer: 'shimmer 8s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;
