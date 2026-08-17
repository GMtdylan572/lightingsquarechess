// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Used for the sitemap and canonical URLs.
  site: 'https://lightningsquarechess.org',
  vite: {
      plugins: [tailwindcss()],
    },

  // /flyers/* are print sheets rendered to PDF, not pages to be found in
  // search results. They stay reachable by direct link.
  integrations: [react(), sitemap({ filter: (page) => !page.includes("/flyers/") })],
});