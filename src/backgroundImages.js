// These are decorations, not primary content. Keep their CSS placement intact.
export const backgroundImages = [
  'images/home-highlights-ethno-watermark.png',
  'images/celebration-offer.jpg',
  'images/restaurant-homestead-watermark.png',
  'images/gallery-village-1.jpg',
  'images/playground-bottom-illustration.png',
];
export const backgroundVariable = source => `--decoration-${source.replace(/[^a-z0-9]/gi, '-')}`;
