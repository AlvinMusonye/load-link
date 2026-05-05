/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Load Link Design Tokens
        primary: '#0F2A4A',      // Navy - primary actions, headings, nav active state
        'brand-blue': '#1D4ED8',  // Brand Blue - links, secondary buttons, icons
        'mid-blue': '#3B82F6',    // Mid Blue - hover states, accents
        sky: '#BFDBFE',           // Sky (Light Blue) - borders, dividers, table stripes
        pale: '#EFF6FF',          // Pale (Background) - card backgrounds, info boxes
        amber: '#D97706',         // Amber (Warning) - SLA warnings, expiry alerts
        green: '#15803D',         // Green (Success) - delivered status, payment success
        red: '#B91C1C',           // Red (Error/Danger) - exceptions, failed payments, errors
        dark: '#0D1117',          // Dark (Body Text) - primary text
        gray: '#6B7280',          // Gray (Secondary Text) - labels, captions, placeholders
        
        // Status Colors
        status: {
          draft: '#6B7280',
          confirmed: '#3B82F6',
          'pickup-scheduled': '#93C5FD',
          'picked-up': '#6366F1',
          'in-transit': '#3B82F6',
          'at-customs': '#D97706',
          'in-warehouse': '#9333EA',
          'out-for-delivery': '#F97316',
          delivered: '#15803D',
          exception: '#B91C1C',
          cancelled: '#374151',
        }
      },
      fontFamily: {
        'base': ['Lora', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'base': ['16px', '1.5'],
      },
      borderRadius: {
        'sm': '4px',   // inputs, badges
        'md': '8px',   // cards
        'lg': '12px',  // modals
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.12)',
        'modal': '0 8px 24px rgba(0,0,0,0.12)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
