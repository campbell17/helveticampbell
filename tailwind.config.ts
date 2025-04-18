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
        display: ['Raleway', 'sans-serif'],
        body: ['Bitter', 'serif'],
        helveticampbell: ['Lobster', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config 