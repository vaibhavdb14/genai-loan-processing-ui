/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        banking: {
          navy: '#0D1B2A',       // 60% Primary / Overall
          softBlue: '#E8EEF6',   // 30% Secondary / Sections
          background: '#F7F9FC', // 30% Main Page Background
          card: '#FFFFFF',       // 30% Card Background
          primary: '#2563EB',    // 10% Primary Action Blue
          success: '#16A34A',    // 10% Approved / Success
          warning: '#F59E0B',    // 10% Pending / Warning
          error: '#DC2626',      // 10% Declined / Error
          info: '#0891B2',       // 10% Information / AI
        },
        text: {
          primary: '#1A1F2B',
          secondary: '#6B7280',
          muted: '#9CA3AF',
        },
        border: {
          DEFAULT: '#D1D5DB',
          light: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'], // Primary typography
      }
    },
  },
  plugins: [],
}