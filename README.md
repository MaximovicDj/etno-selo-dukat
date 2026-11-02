# Etno selo DUKAT

Static Serbian Cyrillic website built with Vue 3 and Vite. No backend, booking service, database, analytics, embedded map, or remote fonts. All images are served locally. No deployment was performed.

All visitor-facing copy, branding, alt text, accessible labels, gallery controls, page titles and SEO descriptions use Serbian Cyrillic (`sr-Cyrl`). Keep code identifiers, asset filenames, telephone numbers, email addresses and URLs in their standard format. The original Latin destination query is intentionally retained inside the Google Maps URL. Owner documentation and original reference files are not visitor-facing page content.

## Run and build

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Open the URL printed by Vite. The production output is in `dist/`; upload its contents to any static host. Serve the files through HTTP rather than opening `index.html` with `file://`. The relative Vite base supports hosting within a subdirectory. `preserveSymlinks` avoids Windows sandbox realpath restrictions and does not introduce a runtime dependency.

## Edit content

`src/content.js` holds the visitor copy, contact information, navigation, offer, rating, opening hours, image paths, captions, and alt text. It also contains `restaurantImages`, `animalGallery`, and the three entries in `accommodationPage.units`. Numbered magaza labels are neutral placeholders, not confirmed property names; update them when the owner supplies names and unit-specific information. Do not add capacities or amenities until confirmed.

`App.vue` arranges the home page; `AccommodationPage.vue` is the separate accommodation page at `magaze.html`. Vite builds both HTML entry points, so no router or server rewrite is required. Shared components remain in `src/components/`. `style.css` contains the original responsive styles; `ethno.css` adds traditional accents and the revised layouts. SEO text is in `index.html` and `magaze.html`.

The restaurant carousel has previous/next buttons, thumbnails, arrow-key and Home/End controls, and touch swipe. It does not auto-advance. Add or replace slides in `restaurantImages`.

“Duh seoskog odmora” reuses `ImageCarousel` with `variant="strip"` and the existing `galleryImages`. Left/right buttons, arrow keys, Home/End and swipe rotate the images with wraparound in either direction. The desktop staggered cards and responsive image sizes are retained; the gallery does not auto-advance. The shared ornament rule in `ethno.css` applies the existing `ethno-border.svg` to the top of every semantic section on both pages.

Every section now spans the viewport, with centered `.wrap` containers **inside** it. Keep that structure when adding sections: the shared top ornament will then align across the full page without negative margins or horizontal overflow. `enhancements.css` contains the contact bar, reveal animations, compact gallery layout and celebration pricing cards.

Section ornaments use one shared 12px-high rule in `ethno.css`: a transparent SVG with medium outline motifs, spaced 120px apart, at 85% opacity. Muted gold and 1.1–1.35px strokes keep the details visible on both light and dark sections without restoring the original filled band. The treatment is consistent on both pages.

The home-page Magaze teaser and each unit on `magaze.html` reuse `ImageCarousel` with `variant="compact"`. Each unit starts on its own illustration and can browse all three via the shared `magazaImages` list. Gallery controls stay inside the original image frame. These remain illustrations until real photos are provided.

Scroll reveals are a progressive enhancement in `src/useScrollReveal.js`: content below the initial viewport fades in and moves up 14px once, over 550ms. Sections' decorative borders remain fixed. Reduced-motion preferences disable the animation at load and reveal all content immediately when changed. Keyboard focus, anchor navigation, print, and missing IntersectionObserver support keep content accessible.

The slim contact bar uses `venue.phone`, `venue.email` and `venue.emailIsPlaceholder`. The supplied example email is visibly marked “пример адресе” and is not a mail link. Confirm the mailbox, replace the address as needed and set `emailIsPlaceholder: false` to enable its `mailto:` link.

The celebration section uses the supplied hall photo and the three packages transcribed from `reference/cenovnikzastolice.png`. Edit copy and pricing in `celebration` within `src/content.js`. Prices are EUR **per chair**, not per room or a total booking amount. See `CELEBRATION-PRICING.md` for the transcription. Package buttons call the venue; no booking or payment system is added.

The supplied opening hours are **unverified** and visibly labeled. Confirm the days and times with the owner, update `venue.hours`, then set `verified: true` to remove the notice. This flag does not verify the information automatically. The rating is a static snapshot, not a live feed; update its score and count together.

## Replace illustrations

`dukat-venue.webp` is the user's supplied venue photo. `wednesday-poster.webp` is the user's supplied promotional poster, displayed uncropped and linked to its full-size file. Both were optimized without changing their content. The venue source is only 447 × 447 pixels; a higher-resolution original will improve the full-width hero's sharpness.

The banner now uses `bannerImage` and `dukat-banner-enhanced.webp`, an AI-enhanced 1254 × 1254 version of the supplied venue photo. The original file and gallery image are unchanged. See `BANNER-ENHANCEMENT.md` for the tool, final prompt and restoration notes. This enhancement is a photographic restoration, separate from the illustrative gallery assets.

The remaining raster images were made with the built-in image-generation tool. They illustrate an imagined rural atmosphere and do not depict the actual venue, individual accommodation units, animals, or dishes. Their notices must remain while those images are used. The user approved labeled illustrations as interim assets. Final generation prompts are recorded in `IMAGE-PROMPTS.md` and `REVISION-IMAGE-PROMPTS.md`. The decorative woven border is a lightweight native SVG.

To replace an image with an owner-approved venue photo:

1. Save an optimized WebP in `public/images/` and update the corresponding entry in `images`, `restaurantImages`, `animalGallery` or `accommodationPage.units` in `src/content.js`.
2. Update its descriptive Serbian alt text and label. Set `illustrative: false` only for a real photo of the venue.
3. When all images are real photos, update the gallery heading and description to match. Keep the general notice if any illustrations remain.
4. Run `npm run build` again. Images are intentionally cropped with `object-fit: cover`; check the subject on mobile and desktop.

Generated image widths are at most 1440px, with fixed display containers to reserve layout space. Supplied assets retain their original resolution. The hero loads eagerly; remaining images load lazily. The poster uses its natural aspect ratio so none of its text is cropped. Missing images show a labeled fallback.

## Content provenance

Checked on 14 October 2026:

- Google public listing: https://www.google.com/travel/hotels/entity/CgoIzNHHrP30wqQqEAE?gsas=1 — address, +381 64 005 0106, 4.8 stars and 286 reviews.
- Instagram: https://www.instagram.com/etnoselodukat/ — could not be read through the available web tool; no Instagram photos were copied.
- Direct Maps content was inaccessible. The directions button opens a Google Maps destination query; the decorative location panel is not a geographical map.
- Restaurant, magaza stays, activities, animals and Wednesday offer come from the supplied brief. Opening hours remain provisional. No second phone number, distance, travel time, menu, stay price or capacity was added.

On 15 October 2026 the user supplied the venue photo and Wednesday poster, confirmed there are three magaze, and approved labeled illustrations for the additional galleries. The poster's Cyrillic Serbian text is preserved exactly as supplied; surrounding site text now consistently uses Serbian Cyrillic. Dishes pictured in illustrations or mentioned as examples in the supplied poster are not represented as a guaranteed daily menu.

The user also supplied `sala.jpg` and `cenovnikzastolice.png`. The hall photo is saved as `public/images/celebration-hall.webp`, without creative edits. The pricing reference is retained in `reference/`. No hall capacity, equipment, discounts or event service details were invented.

## Accessibility and delivery

Semantic sections, one main heading, skip link, keyboard-visible focus, an Escape-dismissable mobile menu, descriptive alternatives, reduced-motion support, `sr-Cyrl`, and local imagery are included. External destinations are regular links; phone controls use `tel:+381640050106`.

See `VALIDATION.md` for the checks actually completed and any environment limitations.
