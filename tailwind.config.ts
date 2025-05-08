import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        helveticampbell: ['var(--font-helveticampbell)'],
        lato: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      animation: {
        'spin-fast': 'spin 0.7s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config 