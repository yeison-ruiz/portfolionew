// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Inter',
        cssVariable: '--font-inter-family',
        // A single variable file spans the whole range, so font-black (900)
        // finally has a real weight to render instead of being synthesized by
        // the browser, and the six separate static files collapse into one.
        weights: ['300 900'],
        styles: ['normal'],
        subsets: ['latin'],
        display: 'swap',
        fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
      },
    ],
  },
});
