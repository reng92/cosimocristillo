import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({ platformProxy: { enabled: true } }),
  integrations: [keystatic()],
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
