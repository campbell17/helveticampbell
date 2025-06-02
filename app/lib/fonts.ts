import { Bitter, Merriweather, JetBrains_Mono, Lobster, Lato } from 'next/font/google';

// Serif fonts
export const bitter = Bitter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

// Sans-serif fonts (also used as body font)
export const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: '400',
});

// Sans-serif variant of Lato for compatibility
export const latoSans = Lato({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: '400',
});

// Monospace font
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

// Display font
export const lobster = Lobster({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-helveticampbell',
  weight: '400',
});

// Default font (for backward compatibility)
export const font = lato;

// Export font variables object to easily apply multiple fonts
export const fontVariables = {
  bitter: bitter.variable,
  merriweather: merriweather.variable,
  lato: lato.variable,
  latoSans: latoSans.variable,
  sans: latoSans.variable,
  body: lato.variable,
  mono: jetbrainsMono.variable,
  lobster: lobster.variable,
}; 

