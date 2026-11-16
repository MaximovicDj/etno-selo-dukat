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
  assert(!/[\uFFFD]|\?{3,}/.test(html), `${label}: damaged text encoding`);
  assert(html.includes('<html lang="sr">'), `${label}: missing Serbian language`);
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
  assert(canonical, `${label}: missing canonical URL`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${label}: duplicate canonical`);
  assert.equal(html.match(/property="og:url" content="([^"]+)"/)?.[1], canonical, `${label}: social URL differs from canonical`);
  for (const field of ['robots', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
    assert(html.includes(`name="${field}"`), `${label}: missing ${field}`);
  }
  assert(html.includes('lang="sr-Latn"'), `${label}: missing Latin-script footer`);
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    // Vue SSR serializes an intentionally empty decorative alt as a bare attribute.
    assert(/\salt(?:="[^"]*")?(?=\s|\/?>)/.test(match[0]), `${label}: image missing alt attribute`);
    assert(/\bloading="(?:lazy|eager)"/.test(match[0]), `${label}: image missing loading behavior`);
    assert(!/\bfetchpriority="high"[^>]*\bloading="lazy"|\bloading="lazy"[^>]*\bfetchpriority="high"/.test(match[0]), `${label}: priority image is lazy-loaded`);
  }
  for (const field of ['og:image', 'twitter:image']) {
    const image = html.match(new RegExp(`(?:property|name)="${field}" content="([^"]+)"`))?.[1];
    assert(image && new URL(image).origin === new URL(canonical).origin, `${label}: invalid social image URL`);
    await access(path.join(root, decodeURIComponent(new URL(image).pathname)));
  }
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
const notFound = await readFile(path.join(root, '404.html'), 'utf8');
assert(notFound.includes('noindex, follow'), '404 page must not be indexed');
assert(notFound.includes('data-prerendered="true"'), '404 must include prerendered content');
assert.equal((notFound.match(/<h1\b/g) || []).length, 1, '404 must have one main heading');
const homeHtml = await readFile(path.join(root, 'index.html'), 'utf8');
const footer = html => html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0].replace(/ data-v-[a-f0-9]{8}/g, '');
// The 404 uses an absolute home link because it can be served at any URL depth.
assert.equal(footer(notFound)?.replace('href="/"', 'href="./"'), footer(homeHtml), '404 must use the same footer as the homepage');
assert(notFound.includes('data-source="images/dukat-logo-enhanced.png"'), '404 must use the real brand logo');
for (const id of new Set(notFound.match(/data-v-[a-f0-9]{8}/g))) {
  assert(css.includes(id), `404: prerendered scoped style ${id} does not match CSS`);
}
for (const [, value] of notFound.matchAll(/\b(?:href|src)="([^"<>]+)"/g)) {
  if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(value)) continue;
  assert(value.startsWith('/') && !value.startsWith('//'), `404: URL must resolve from origin: ${value}`);
  await access(path.join(root, value + (value.endsWith('/') ? 'index.html' : '')));
}
const redirects = await readFile(path.join(root, '_redirects'), 'utf8');
assert(redirects.includes('/magaze /smestaj/ 301') && redirects.includes('/magaze.html /smestaj/ 301'), 'Legacy accommodation URLs must redirect');
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
