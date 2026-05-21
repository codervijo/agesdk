// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://agesdk.dev',
  integrations: [sitemap()],
  output: 'static',
});
