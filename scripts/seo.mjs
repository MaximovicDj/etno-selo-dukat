import { readFileSync } from 'node:fs';
import { pages, normalizeSiteUrl } from '../site.config.js';
import { venue } from '../src/content.js';

const manifest = JSON.parse(readFileSync(new URL('../src/image-manifest.json', import.meta.url), 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');

export function structuredData(page, origin) {
  const url = route => `${origin}${route}`;
  const image = url(`/${manifest[page.image]?.at(-1)?.src || page.image}`);
  const businessId = url('/#business');
  const business = {
    '@type': ['Restaurant', 'LodgingBusiness'], '@id': businessId,
    name: venue.name, alternateName: 'Etno selo Dukat',
    description: 'Етно село у Мислођину код Обреновца: ресторан домаће кухиње, смештај у магазама и сала за прославе.',
    telephone: venue.tel.replace('tel:', ''), email: venue.email,
    address: { '@type': 'PostalAddress', streetAddress: venue.address, addressLocality: 'Мислођин', addressRegion: 'Обреновац, Београд', postalCode: '11500', addressCountry: 'RS' },
    servesCuisine: 'Српска домаћа кухиња', hasMap: venue.directions,
    sameAs: [venue.instagram, venue.tiktok], image,
    ...(origin ? { url: url('/'), hasMenu: url('/restoran/#menu-prikaz') } : {}),
  };
  // Unconfirmed opening hours and third-party review scores are intentionally not marked up.
  const graph = [business, {
    '@type': 'WebSite', '@id': url('/#website'), name: venue.name,
    inLanguage: 'sr-Cyrl', publisher: { '@id': businessId },
    ...(origin ? { url: url('/') } : {}),
  }, {
    '@type': page.component === 'contact' ? 'ContactPage' : 'WebPage',
    '@id': url(`${page.path}#webpage`), name: page.title, description: page.description,
    inLanguage: 'sr-Cyrl', isPartOf: { '@id': url('/#website') }, about: { '@id': businessId },
    ...(origin ? { url: url(page.path) } : {}),
  }];
  if (origin && page.path !== '/') graph.push({
    '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Почетна', item: url('/') },
      { '@type': 'ListItem', position: 2, name: page.label, item: url(page.path) },
    ],
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function seoPlugin(siteUrl = '', verification = '') {
  const origin = normalizeSiteUrl(siteUrl);
  return {
    name: 'local-search-metadata',
    transformIndexHtml: {
      order: 'pre',
      handler(html, context) {
        const page = pages.find(page => `/${page.file}` === context.path);
        if (!page) return html;
        html = html.replace(/<title>[\s\S]*?<\/title>/i, '')
          .replace(/<meta\s+[^>]*(?:name=["'](?:description|twitter:[^"']+)["']|property=["']og:[^"']+["'])[^>]*>/gi, '');
        const meta = (key, value, property = false) => `<meta ${property ? 'property' : 'name'}="${key}" content="${escape(value)}">`;
        const tags = [
          `<title>${escape(page.title)}</title>`, meta('description', page.description),
          meta('robots', 'index, follow, max-image-preview:large'),
          meta('og:title', page.title, true), meta('og:description', page.description, true),
          meta('og:type', 'website', true), meta('og:site_name', venue.name, true), meta('og:locale', 'sr_RS', true),
          meta('twitter:card', 'summary_large_image'), meta('twitter:title', page.title), meta('twitter:description', page.description),
          '<noscript><style>.readable-menu__panel{display:block!important}.readable-menu__tabs{display:none}</style></noscript>',
          `<script type="application/ld+json">${json(structuredData(page, origin))}</script>`,
        ];
        if (origin) {
          const image = `${origin}/${manifest[page.image]?.at(-1)?.src || page.image}`;
          tags.push(`<link rel="canonical" href="${escape(origin + page.path)}">`, meta('og:url', origin + page.path, true),
            meta('og:image', image, true), meta('og:image:alt', venue.name, true), meta('twitter:image', image));
        }
        if (verification) tags.push(meta('google-site-verification', verification));
        return html.replace('</head>', `${tags.join('\n    ')}\n  </head>`);
      },
    },
    generateBundle() {
      const sitemap = origin ? `\nSitemap: ${origin}/sitemap.xml\n` : '';
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${sitemap}` });
      if (origin) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(page => !page.legacy).map(page => `  <url><loc>${escape(origin + page.path)}</loc></url>`).join('\n')}\n</urlset>\n` });
    },
  };
}
