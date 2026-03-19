/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme
        'dark-bg': '#0A0F24',
        'surface-dark': '#141B33',
        'surface-hover': '#1A2344',
        // Neon Cyberpunk Theme
        'neon-cyan': '#00FFFF',
        'neon-green': '#00FF7F',
        'neon-blue': '#5C9EFF',
        'neon-orange': '#FF8C00',
        'neon-pink': '#FF0055',
        'overlay': 'rgba(10, 15, 36, 0.95)',
        // Status colors
        'warning': '#FFD700',
        'success': '#00FF7F',
        'error': '#FF3232',
        'info': '#5C9EFF',
        // Text colors
        'text-primary': '#E0E6F0',
        'text-secondary': '#8A94A8',
        'text-muted': '#5A6374',
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 255, 255, 0.3)',
        'neon-blue': '0 0 10px rgba(92, 158, 255, 0.3)',
        'neon-pink': '0 0 10px rgba(255, 0, 85, 0.3)',
        'neon-orange': '0 0 10px rgba(255, 140, 0, 0.3)',
        'neon-glow-cyan': '0 0 20px rgba(0, 255, 255, 0.5)',
        'neon-glow-blue': '0 0 20px rgba(92, 158, 255, 0.5)',
        'neon-glow-green': '0 0 20px rgba(0, 255, 127, 0.5)',
        'neon-glow-pink': '0 0 20px rgba(255, 0, 85, 0.5)',
        'neon-glow-orange': '0 0 20px rgba(255, 140, 0, 0.5)',
      },
      borderColor: {
        DEFAULT: 'rgba(0, 255, 255, 0.3)', // neon-cyan with transparency
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#E0E6F0',
            a: {
              color: '#00FFFF',
              '&:hover': {
                color: '#5C9EFF',
              },
            },
            strong: { color: '#E0E6F0' },
            h1: { color: '#00FF7F' },
            h2: { color: '#00FF7F' },
            h3: { color: '#00FF7F' },
            code: {
              color: '#5C9EFF',
              backgroundColor: '#141B33',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: '#141B33',
              border: '1px solid rgba(92, 158, 255, 0.3)',
            },
            table: {
              borderColor: 'rgba(92, 158, 255, 0.3)',
            },
            th: {
              color: '#00FFFF',
              backgroundColor: '#141B33',
            },
          },
        },
      },
    },
  },
  plugins: [],
}