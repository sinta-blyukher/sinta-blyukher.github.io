// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import relativeLinks from 'astro-relative-links';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sinta.fun',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    relativeLinks(),
    sitemap()
  ]
});
