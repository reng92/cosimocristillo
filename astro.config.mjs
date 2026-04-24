import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({ platformProxy: { enabled: true } }),
  integrations: [react(), keystatic()],
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          { src: 'content/**/*', dest: 'content' },
          { src: 'img/**/*', dest: 'img' },
        ],
      }),
    ],
    ssr: {
      external: ['node:buffer'],
    },
  },
});
