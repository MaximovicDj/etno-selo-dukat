import manifest from './image-manifest.json';

const variants = (source) => manifest[source?.replace(/^\//, '')];
export function imageDimensions(source) {
  const image = variants(source)?.at(-1);
  return image ? { width: image.width, height: image.height } : undefined;
}

// Initial hints for images that must be discoverable before Vue mounts. Lazy
// images measure their actual object-fit surface before starting a request.
export { heroSizes, stayHeroSizes, menuSizes } from './imageLayouts';
export function imageSource(source, width = Infinity) {
  if (!source) return undefined;
  const images = variants(source);
  const selected = images?.find(image => image.width >= width) || images?.at(-1);
  const result = selected?.src || source;
  return /^(https?:)?\/\//.test(result) || result.startsWith('/') ? result : `/${result}`;
}
export function imageSrcset(source) {
  return variants(source)?.map(image => `/${image.src} ${image.width}w`).join(', ');
}
