# Validation

Updated on 15 October 2026 for the revised home page and new accommodation page.

Latest update: contact bar, full-width section layout, scroll reveals, compact magaza galleries, and celebration hall with owner-supplied photo and pricing.

- Production Vite multi-page build passed for `index.html` and `magaze.html`. Output includes local venue photo, poster, WebP artwork, decorative border and favicon. No new application dependencies were added.
- Automated Chromium browser checks passed against both production pages at 320, 375, 768, 1024 and 1440 CSS pixels: no horizontal overflow, broken images or JavaScript runtime errors.
- Verified one main heading, Serbian Cyrillic language tag (`sr-Cyrl`), matching anchor targets, correct phone destinations, Google Maps destination and Instagram URL.
- Verified mobile menu click and keyboard activation, Escape dismissal and focus return, tab access to navigation, skip-link activation and reduced-motion behavior.
- Verified the hero fills the viewport width, the Wednesday poster retains its natural aspect ratio without cropping, four animal cards are present, and all three magaze are rendered on the dedicated page.
- Verified restaurant carousel arrows, wraparound, thumbnails, Home/End keys and swipe behavior. It does not auto-advance.
- Verified “Duh seoskog odmora” uses the same four original images, loops through two complete forward cycles, wraps backward from first to last, and supports arrow keys, Home/End and swipe. Its staggered card layout is preserved.
- Every semantic section on both pages uses one shared top ornament, with no pointer interception. The former Wednesday bottom border was removed to avoid doubling the next section's ornament. The latest styling uses a 12px transparent band, muted gold, 1.1–1.35px strokes and 85% opacity: a middle weight between the original filled 18px band and the faint 10px treatment. The production build was rerun successfully.
- Visually compared the AI-enhanced 1254 × 1254 banner with the original: square framing, entrance display, wagon, trees and Cyrillic sign wording are retained. The original asset and gallery photo remain unchanged. Enhancement tool and prompt are recorded in `BANNER-ENHANCEMENT.md`.
- Verified the home-page accommodation CTA opens `magaze.html`, all three unit inquiry buttons use the correct phone link, and navigation returns to home-page sections.
- Generated assets retain illustration notices; the two user-supplied images are not labeled as generated. The Wednesday ribbon is visible, and provisional opening hours retain their warning.
- Visually reviewed full-page desktop, tablet and mobile screenshots. Primary text, button, offer and warning color pairs meet WCAG AA contrast thresholds; the large italic hero text meets the large-text threshold. This is targeted validation, not a full accessibility certification.
- All third-party actions are outbound links. Phone calls were not placed, and external services' availability is outside the static site's control.

- Latest production build and browser checks passed at 320, 375, 768, 1024 and 1440px on both pages: no horizontal overflow, broken images or runtime errors. Each section's rectangle and top ornament match the full page width, including the previously narrow story, gallery and accommodation sections.
- Verified the contact phone link, visible example-email label, mobile menu and navigation to the celebration section. No dummy-mailbox link is exposed as a real contact.
- Verified reveals become visible on scroll, reduced-motion changes clear pending reveals, reduced-motion at load suppresses animation, and missing IntersectionObserver leaves everything visible.
- Verified home-page and all three dedicated magaza galleries, correct initial unit images, left/right wraparound and keyboard controls within the existing frames.
- Verified prices €28/€35/€40, six feature labels per package, correct 4/5/6 included items and 2/1/0 excluded items, and phone CTAs against the supplied pricing reference.
- Visually reviewed desktop, tablet and mobile screenshots, including stacked pricing cards on mobile and full-width ornaments. The hall image is the owner-supplied photo, not an illustration.

- Cyrillic update: browser audit found no Latin letters in page text nodes (including hidden menu and gallery content), image alternatives, accessible labels, page titles or SEO descriptions on either page, except the intentionally unchanged email address. Branding, favicon monogram, map labels and currency wording also use Cyrillic.
- Layout and asset checks passed at 320, 375, 768, 800, 1024 and 1440px. Cyrillic menu controls, gallery wraparound, accommodation navigation, celebration navigation and all prices remain correct, with no runtime errors.
- Verified unchanged phone number, email, Instagram URL and the original Google Maps destination query. Code identifiers, HTML attributes, route hashes and asset paths retain their original standard format.

The primary phone, address and Google rating were checked during planning. The opening schedule remains unverified. The user confirmed three magaze but supplied no names or distinguishing specifications; the page uses neutral numbered labels and warm descriptions without fabricated amenities, capacities or rates. The banner enhancement improves clarity from a low-resolution source; reconstructed fine texture is not a substitute for an original high-resolution photograph. No live updates are implied.
