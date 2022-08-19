import { defineConfig } from "astro/config";
import mdx from '@astrojs/mdx';
import tailwind from "@astrojs/tailwind";
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  site: 'https://ndebg.github.io',
  base: '/ndebgcom',
  sitemap: true,
  integrations: [mdx(), tailwind()],
  output: 'server',
  adapter: netlify(),
});
