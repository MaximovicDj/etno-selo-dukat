import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import { pages } from '../site.config.js';

const root = path.resolve('dist');
const cssFiles = (await readdir(path.join(root, 'assets'))).filter(file => file.endsWith('.css'));
const css = (await Promise.all(cssFiles.map(file => readFile(path.join(root, 'assets', file), 'utf8')))).join('\n');
let origin;
for (const page of pages) {
  const html = await readFile(path.join(root, page.file), 'utf8');
  const label = page.file;
  assert(html.includes('data-prerendered="true"'), `${label}: missing prerendered content`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${label}: expected one main heading`);
  assert.equal((html.match(/<title>/g) || []).length, 1, `${label}: duplicate or missing title`);
  assert.equal((html.match(/name="description"/g) || []).length, 1, `${label}: missing page description`);
  assert(!html.includes('data:image/svg+xml'), `${label}: image placeholder hides the actual image URL`);
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1] || 'null');
  assert(data?.['@graph']?.some(item => item.address && item.telephone), `${label}: missing business data`);
  for (const id of new Set(html.match(/data-v-[a-f0-9]{8}/g))) {
    assert(css.includes(id), `${label}: prerendered scoped style ${id} does not match the built CSS`);
  }
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical) {
    origin ??= new URL(canonical).origin;
    assert.equal(canonical, origin + page.path, `${label}: inconsistent canonical`);
  }
  const current = new URL(page.legacy ? '/magaze.html' : page.path, 'https://local.invalid');
  for (const match of html.matchAll(/\b(?:href|src)="([^"<>]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value)) continue;
    const url = new URL(value, current);
    const target = path.resolve(root, '.' + decodeURIComponent(url.pathname) + (url.pathname.endsWith('/') ? 'index.html' : ''));
    assert(target.startsWith(root + path.sep), `${label}: invalid local URL ${value}`);
    await access(target).catch(() => { throw new Error(`${label}: broken local URL ${value}`); });
  }
}
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
assert(robots.includes('Allow: /'), 'robots.txt must allow crawling');
if (origin) {
  const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, pages.filter(page => !page.legacy).length);
  for (const page of pages.filter(page => !page.legacy)) assert(sitemap.includes(`<loc>${origin}${page.path}</loc>`));
  assert(!sitemap.includes('magaze.html'), 'Legacy URL must not appear in the sitemap');
  assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
}
console.log(`Verified ${pages.length} HTML pages: headings, metadata, structured data, scoped CSS and local links.`);
if (!origin) console.log('SITE_URL is not set: absolute canonicals and sitemap will be generated once the real domain is configured.');
