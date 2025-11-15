import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Synthwave neon theme
        'neon-pink': '#ff49db',
        'dark-purple': '#1c1c3e',
        'neon-cyan': '#32f0ff',
        'neon-orange': '#ff8132',
        'deep-purple': '#5a347b',
      },
    },
  },
  plugins: [],
}
export default config
