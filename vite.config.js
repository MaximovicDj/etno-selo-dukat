import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { readFileSync } from 'node:fs';
import { bannerImage, accommodationHeroImage, celebrationGalleryImages } from './src/content.js';
import { backgroundImages, backgroundVariable } from './src/backgroundImages.js';
import { heroSizes, stayHeroSizes, gallerySizesFor } from './src/imageLayouts.js';
import { seoPlugin } from './scripts/seo.mjs';

const imageManifest = JSON.parse(readFileSync(new URL('./src/image-manifest.json', import.meta.url), 'utf8'));
const preloadImages = {
  '/index.html': [bannerImage.src, heroSizes],
  '/magaze.html': [accommodationHeroImage.src, stayHeroSizes],
  '/smestaj/index.html': [accommodationHeroImage.src, stayHeroSizes],
  '/proslave/index.html': [celebrationGalleryImages[0].src, gallerySizesFor(imageManifest[celebrationGalleryImages[0].src].at(-1).width, imageManifest[celebrationGalleryImages[0].src].at(-1).height)],
};

function optimizedImages() {
  return {
    name: 'optimized-images',
    enforce: 'pre',
    transform(code, id) {
      if (!id.split('?')[0].endsWith('.css')) return;
      return code.replace(/url\(["']?\/(images\/[^)"']+)["']?\)/g, (match, source) => {
        if (backgroundImages.includes(source)) return `var(${backgroundVariable(source)}, none)`;
        const variants = imageManifest[source];
        return variants ? `url("/${variants.at(-1).src}")` : match;
      });
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html, context) {
        const tags = [
          { tag: 'link', injectTo: 'head', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
          { tag: 'link', injectTo: 'head', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' } },
          { tag: 'link', injectTo: 'head', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Noto+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap' } },
        ];
        const entry = preloadImages[context.path];
        if (!entry) return tags;
        const [source, sizes] = entry;
        const variants = imageManifest[source];
        if (!variants) return tags;
        tags.push({ tag: 'link', injectTo: 'head', attrs: {
          rel: 'preload', as: 'image', fetchpriority: 'high',
          href: `/${variants.at(-1).src}`,
          imagesrcset: variants.map(image => `/${image.src} ${image.width}w`).join(', '),
          imagesizes: sizes,
        } });
        return tags;
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  return {
  plugins: [optimizedImages(), seoPlugin(env.SITE_URL, env.GOOGLE_SITE_VERIFICATION), vue({ features: { componentIdGenerator: 'filepath-source' } })],
  base: "./",
  resolve: { preserveSymlinks: true },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        magaze: fileURLToPath(new URL("./magaze.html", import.meta.url)),
        restoran: fileURLToPath(new URL("./restoran/index.html", import.meta.url)),
        smestaj: fileURLToPath(new URL("./smestaj/index.html", import.meta.url)),
        proslave: fileURLToPath(new URL("./proslave/index.html", import.meta.url)),
        kontakt: fileURLToPath(new URL("./kontakt/index.html", import.meta.url)),
      },
    },
  },
  };
});
