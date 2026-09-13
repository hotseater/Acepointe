// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.acepointe.com',

  // Static pages by default; the contact API opts into on-demand via prerender=false
  // (becomes a Vercel serverless function).
  adapter: vercel(),
  integrations: [
    sitemap({
      // /brightcover is a private, password-gated case page for named prospects.
      // It is noindex on the page itself; keeping it out of the sitemap means a
      // crawler is never handed the URL in the first place.
      filter: (page) => !page.includes('/brightcover'),
    }),
  ],

  // Native Fonts API (Astro 7, stable): fonts are downloaded and self-hosted
  // at build time — no Google CDN calls in production.
  fonts: [
    {
      name: 'Bricolage Grotesque',
      cssVariable: '--font-display',
      provider: fontProviders.google(),
      weights: [500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['Segoe UI', 'system-ui', 'sans-serif'],
    },
    {
      name: 'Hanken Grotesk',
      cssVariable: '--font-body',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['Segoe UI', 'system-ui', 'sans-serif'],
    },
  ],
});
