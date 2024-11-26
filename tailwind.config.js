/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        animation: {
          'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
          'float': 'float 6s ease-in-out infinite',
          'spin-slow': 'spin 15s linear infinite',
          'wave': 'wave 2.5s ease-in-out infinite',
        },
        animation: {
          'spin-slower': 'spin 8s linear infinite',
          'spin-slow': 'spin 6s linear infinite',
          'reverse-spin': 'reverse-spin 4s linear infinite',
          'tilt': 'tilt 10s infinite linear',
          'slide-down': 'slide-down 0.5s ease-out forwards',
        },
        keyframes: {
          'reverse-spin': {
            from: {
              transform: 'rotate(360deg)'
            },
          },
          'tilt': {
            '0%, 50%, 100%': {
              transform: 'rotate(0deg)',
            },
            '25%': {
              transform: 'rotate(1deg)',
            },
            '75%': {
              transform: 'rotate(-1deg)',
            },
          },
        },
        keyframes: {
          'slide-down': {
            '0%': { transform: 'translateY(-100%) translateX(-50%)' },
            '100%': { transform: 'translateY(0) translateX(-50%)' }
          }
        },
        animation: {
          'droplet': 'droplet 4s ease-in-out infinite',
          'ripple': 'ripple 3s ease-in-out infinite',
          'ripple-delayed': 'ripple 3s ease-in-out infinite 1.5s',
        },
        keyframes: {
          'droplet': {
            '0%, 100%': { 
              transform: 'scale(1)',
              borderRadius: '50%',
            },
            '50%': { 
              transform: 'scale(1.02)',
              borderRadius: '45% 55% 52% 48% / 48% 52% 48% 52%',
            }
          },
          'ripple': {
            '0%': { 
              transform: 'scale(1)',
              opacity: '0.4',
            },
            '100%': { 
              transform: 'scale(1.2)',
              opacity: '0',
            }
          }
        },
        animation: {
          'slide-down': 'slide-down 0.5s ease-out forwards'
        },
        keyframes: {
          'fade-in-up': {
            '0%': {
              opacity: '0',
              transform: 'translateY(20px)',
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)',
            },
          },
          'slide-down': {
            '0%': { transform: 'translateY(-100%) translateX(-50%)' },
            '100%': { transform: 'translateY(0) translateX(-50%)' }
          },
          'float': {
            '0%, 100%': {
              transform: 'translateY(0)',
            },
            '50%': {
              transform: 'translateY(-20px)',
            },
          },
          'wave': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '10%': {
              transform: 'rotate(14deg)',
            },
            '20%': {
              transform: 'rotate(-8deg)',
            },
            '30%': {
              transform: 'rotate(14deg)',
            },
            '40%': {
              transform: 'rotate(-4deg)',
            },
            '50%': {
              transform: 'rotate(10deg)',
            },
            '60%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(0deg)',
            },
          },
        },
      },
    },
    plugins: [require('@tailwindcss/typography'),],
  };

