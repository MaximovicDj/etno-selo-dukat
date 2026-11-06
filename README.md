# Etno selo DUKAT

Static website built with Vue 3 and Vite. Visitor-facing content uses Serbian Cyrillic. Images are local; Google Fonts loads externally. There is no backend or online booking service.

## Development and build

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Upload the contents of `dist/` to a static host. Serve through HTTP. Routes: `/`, `/restoran/`, `/smestaj/`, `/proslave/`, `/kontakt/` and the legacy `/magaze.html`.

If the Vite config loader encounters Windows directory-access restrictions, use `npm run build -- --configLoader native`.

## Content and images

Edit copy, gallery entries, contact details and celebration packages in `src/content.js`. Restaurant menu text is in `src/restaurantMenu.js`; food gallery images are in `src/components/RestaurantExperience.vue`. Preserve Serbian Cyrillic visitor text, descriptive alt text and illustration labels.

Source images are in `public/images/`. Retain the originals of active images: `scripts/optimize-images.mjs` needs them to regenerate responsive variants. `public/images/optimized/` and `src/image-manifest.json` contain the generated variants and their mapping. Multiple widths of the same image are used for responsive loading.

After adding or replacing images:

```sh
npm run images:optimize -- --prune
npm run build
```

When removing an image, check content declarations, Vue components, CSS backgrounds and `src/backgroundImages.js`; remove its unused source, then regenerate the manifest with the command above. The prune option removes obsolete generated variants only. Restart the dev server after regeneration.

Photo processing preserves full source dimensions. Existing JPEG/WebP images retain their original bytes at native size. PNG photographs use WebP quality 90/94; text and transparent artwork use lossless WebP. Images marked illustrative are generated artwork. The banner and two active images in `public/images/retouched/` were processed with AI and may contain reconstructed details.

## Hosting

The build creates Brotli and gzip copies of HTML, JavaScript, CSS and SVG. Configure the host to negotiate these using Accept-Encoding, with the matching Content-Encoding, original Content-Type and Vary: Accept-Encoding.

Use `Cache-Control: public, max-age=31536000, immutable` for hashed `/assets/*` and `/images/optimized/*`. Use revalidation for HTML and unversioned original images. Publish builds atomically or keep older hashed assets until cached pages expire. Actual compression, caching and performance must be checked on the chosen host.
