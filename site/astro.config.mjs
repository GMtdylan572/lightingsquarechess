// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Used for the sitemap and canonical URLs. Change this when the
  // real domain is live (lightningsquarechess.com).
  site: 'https://lightningsquarechess.com',
  vite: {
      plugins: [tailwindcss()],
    },

  integrations: [react(), sitemap()],
});