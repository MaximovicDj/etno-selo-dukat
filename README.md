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

The celebration gallery's hall photo uses `public/images/retouched/celebration-gallery-1-contrast-v3.png`, finished with the built-in image generation tool for slightly stronger contrast, warmer wood and clearer existing detail. Its predecessor, `celebration-gallery-1-clarity-v2.png`, is retained for rollback. The adjacent `celebrations/celebration-owner-01.png` served as a tonal reference. This is an AI photo edit; the prompt requests preservation of the scene and framing.

<details>
<summary>Hall photo v3: final editing prompt</summary>

Edit target: FIRST image, the portrait restaurant hall photograph. SECOND image is a tonal reference only, showing the same venue with richer warm wood, stronger clean contrast and crisp detail. Apply a restrained professional photo-finishing pass to the FIRST image so it fits the other gallery photos: modestly deepen blacks and wood tones, increase midtone/local contrast a little, add a small amount of natural saturation and warmth, and improve perceived sharpness on existing wood grain, chairs, tablecloth patterns and glassware. Preserve white walls/tablecloths as neutral clean whites and keep shadow detail. Keep this looking like a real photo, not HDR or an illustration. Preserve EXACT first-image camera viewpoint, portrait 3:4 framing, image boundaries, all objects, chairs, furniture positions, wall decorations, signs and any text, beams, ceiling, lamps, materials, proportions and lighting direction. Do not borrow any composition or objects from the second image. No additions, removals, retouching of the architecture, invented texture, crop, reframing, perspective correction, excessive orange cast, sharpening halos, oversaturation or crushed shadows. The change should be visible but tasteful: a slightly punchier, clearer version of the exact first photo. Output a portrait 3:4 image, ideally at the original 1086 by 1448 dimensions.

</details>

## Hosting

The build creates Brotli and gzip copies of HTML, JavaScript, CSS and SVG. Configure the host to negotiate these using Accept-Encoding, with the matching Content-Encoding, original Content-Type and Vary: Accept-Encoding.

Use `Cache-Control: public, max-age=31536000, immutable` for hashed `/assets/*` and `/images/optimized/*`. Use revalidation for HTML and unversioned original images. Publish builds atomically or keep older hashed assets until cached pages expire. Actual compression, caching and performance must be checked on the chosen host.

## Search visibility and publishing

`npm run build` generates complete HTML for all six entry pages using the same Vue components as the interactive site. Vue hydrates this HTML in the browser. There is no production Node server requirement. Real image URLs, responsive sources, intrinsic dimensions and native lazy loading are included in the HTML. Keep the prerender step before compression in `postbuild`.

Page titles, descriptions and canonical routes are defined in `site.config.js`. Visible text targets the venue's actual location: Mislođin near Obrenovac and Belgrade. The build adds local-business, website and page structured data. Unconfirmed hours and Google review scores are not included in that markup.

Before publishing, copy `.env.example` to `.env.production` and set `SITE_URL` to the real public origin, for example `https://your-domain.rs`. This project expects deployment at the domain root. Rebuild after changing the domain. Never publish the example domain.

With `SITE_URL` set, the build automatically adds absolute canonical URLs, social sharing image URLs, breadcrumbs and `dist/sitemap.xml`, and references the sitemap from `dist/robots.txt`. The sitemap includes the five main pages. The legacy `/magaze.html` page points to `/smestaj/` as its canonical; new internal accommodation links use `/smestaj/`. Without a configured domain, robots.txt still allows crawling; domain-specific metadata and sitemap are omitted rather than publishing invented URLs.

After deployment: enable HTTPS and redirect alternate hosts to the chosen domain; preferably redirect `/magaze.html` to `/smestaj/` with a permanent server redirect. Verify the site in Google Search Console (DNS or HTML tag; `GOOGLE_SITE_VERIFICATION` supports the latter), submit `/sitemap.xml`, and inspect the five URLs. Check the actual server status codes, mobile performance and rendered structured data with Google's URL Inspection and Rich Results tools. Add the website address to the venue's Google Business Profile and keep its contact details consistent with the site. Rankings and indexing timing are controlled by search engines.
