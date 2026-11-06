import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import vue from '@vitejs/plugin-vue';
import { pages } from '../site.config.js';

// Compile the same Vue components at build time; production hosting stays static.
const server = await createServer({
  configFile: false, mode: 'production',
  plugins: [vue({ features: { componentIdGenerator: 'filepath-source' }, template: { compilerOptions: { comments: false } } })], appType: 'custom',
  resolve: { preserveSymlinks: true },
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, watch: null },
});
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.js');
  for (const page of pages) {
    const file = `dist/${page.file}`;
    const template = await readFile(file, 'utf8');
    const { html: content, lightboxes } = await render(page.component, { depth: page.legacy || page.path === '/' ? 0 : 1 });
    if (!content.includes('<h1') || !content.includes('<main')) throw new Error(`Empty prerender: ${page.file}`);
    const marker = '<div id="app"></div>';
    if (!template.includes(marker)) throw new Error(`Missing app container: ${page.file}`);
    // Callback replacement preserves literal $ sequences in owner-editable copy.
    await writeFile(file, template.replace(marker, () => `<div id="app" data-prerendered="true">${content}</div>`)
      .replace('<div id="image-lightboxes"></div>', () => `<div id="image-lightboxes">${lightboxes}</div>`));
  }
  console.log(`Prerendered ${pages.length} complete HTML pages.`);
} finally {
  await server.close();
}
