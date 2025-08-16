/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        // TukangIn Design System Colors (exact tokens)
        primary: {
          DEFAULT: '#0B63CE',
          600: '#0954A8'
        },
        secondary: {
          DEFAULT: '#FF6A00'
        },
        accent: {
          DEFAULT: '#FFC107'
        },
        success: {
          DEFAULT: '#28A745'
        },
        danger: {
          DEFAULT: '#E53E3E'
        },
        'bg-page': '#F6F8FA',
        'bg-surface': '#FFFFFF',
        'text-900': '#1F2937',
        'text-500': '#6B7280',
        border: '#E5E7EB'
      },
      fontFamily: {
        // Typography from Google Fonts
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif']
      },
      fontSize: {
        // Base font-size: 16px
        'base': ['1rem', { lineHeight: '1.5rem' }]
      },
      spacing: {
        // Spacing scale: 4,8,12,16,24,32
        '1': '0.25rem', // 4px
        '2': '0.5rem',  // 8px
        '3': '0.75rem', // 12px
        '4': '1rem',    // 16px
        '6': '1.5rem',  // 24px
        '8': '2rem'     // 32px
      },
      borderRadius: {
        // Radius: 8px
        DEFAULT: '0.5rem' // 8px
      },
      height: {
        // Button height: 44px
        'btn': '2.75rem' // 44px
      },
      minHeight: {
        'btn': '2.75rem' // 44px
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
