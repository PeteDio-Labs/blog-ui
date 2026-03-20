/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'dark-bg': 'var(--theme-bg)',
        'surface-dark': 'var(--theme-surface)',
        'surface-hover': 'var(--theme-surface-hover)',
        'overlay': 'var(--theme-overlay)',
        // Accents (semantic names kept for compat, values from theme)
        'accent-primary': 'var(--theme-accent-primary)',
        'accent-secondary': 'var(--theme-accent-secondary)',
        'accent-tertiary': 'var(--theme-accent-tertiary)',
        'accent-heading': 'var(--theme-accent-heading)',
        // Legacy neon aliases → map to theme accents
        'neon-cyan': 'var(--theme-accent-primary)',
        'neon-pink': 'var(--theme-accent-secondary)',
        'neon-blue': 'var(--theme-accent-tertiary)',
        'neon-green': 'var(--theme-accent-heading)',
        'neon-orange': 'var(--theme-accent-secondary)',
        // Status colors
        'warning': 'var(--theme-status-warning)',
        'success': 'var(--theme-status-success)',
        'error': 'var(--theme-status-error)',
        'info': 'var(--theme-status-info)',
        // Text colors
        'text-primary': 'var(--theme-text-primary)',
        'text-secondary': 'var(--theme-text-secondary)',
        'text-muted': 'var(--theme-text-muted)',
      },
      boxShadow: {
        'neon-cyan': 'var(--theme-glow-primary)',
        'neon-blue': 'var(--theme-glow-tertiary)',
        'neon-pink': 'var(--theme-glow-secondary)',
        'neon-orange': 'var(--theme-glow-secondary)',
        'neon-glow-cyan': 'var(--theme-glow-primary-lg)',
        'neon-glow-blue': 'var(--theme-glow-primary-lg)',
        'neon-glow-green': 'var(--theme-glow-primary-lg)',
        'neon-glow-pink': 'var(--theme-glow-secondary-lg)',
        'neon-glow-orange': 'var(--theme-glow-secondary-lg)',
      },
      borderColor: {
        DEFAULT: 'color-mix(in srgb, var(--theme-accent-primary) 30%, transparent)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--theme-text-primary)',
            a: {
              color: 'var(--theme-accent-primary)',
              '&:hover': {
                color: 'var(--theme-accent-tertiary)',
              },
            },
            strong: { color: 'var(--theme-text-primary)' },
            h1: { color: 'var(--theme-accent-heading)' },
            h2: { color: 'var(--theme-accent-heading)' },
            h3: { color: 'var(--theme-accent-heading)' },
            code: {
              color: 'var(--theme-accent-tertiary)',
              backgroundColor: 'var(--theme-surface)',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: 'var(--theme-surface)',
              border: '1px solid color-mix(in srgb, var(--theme-accent-tertiary) 30%, transparent)',
            },
            table: {
              borderColor: 'color-mix(in srgb, var(--theme-accent-tertiary) 30%, transparent)',
            },
            th: {
              color: 'var(--theme-accent-primary)',
              backgroundColor: 'var(--theme-surface)',
            },
          },
        },
      },
    },
  },
  plugins: [],
}
