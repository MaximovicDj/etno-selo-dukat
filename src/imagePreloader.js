import { responsiveImageAttributes } from './imageSources';

// Keep decoded neighbors alive without retaining every full-size gallery image.
const cache = new Map();
const limit = 18;

export function prepareImage(source, sizes, priority = 'low') {
  if (typeof window === 'undefined') return Promise.resolve();
  const attributes = responsiveImageAttributes(source, sizes);
  // CSS sizes can select a different candidate after rotation or a DPR change.
  const key = JSON.stringify([attributes, window.innerWidth, window.innerHeight, window.devicePixelRatio]);
  const existing = cache.get(key);
  if (existing) {
    cache.delete(key);
    cache.set(key, existing);
    if (priority === 'high') existing.image.fetchPriority = 'high';
    return existing.ready;
  }
  const image = new Image();
  image.loading = 'eager';
  image.decoding = 'async';
  image.fetchPriority = priority;
  const ready = new Promise((resolve, reject) => {
    image.onload = async () => {
      try {
        if (typeof image.decode === 'function') await image.decode();
        resolve(image);
      } catch (error) { reject(error); }
    };
    image.onerror = () => reject(new Error(`Image failed to load: ${source}`));
    // Set selection hints before src to avoid starting a fallback-sized request.
    image.sizes = attributes.sizes;
    if (attributes.srcset) image.srcset = attributes.srcset;
    image.src = attributes.src;
  });
  const entry = { image, ready };
  cache.set(key, entry);
  while (cache.size > limit) cache.delete(cache.keys().next().value);
  // Failed requests must be retryable, and speculative failures must not escape.
  ready.catch(() => { if (cache.get(key) === entry) cache.delete(key); });
  return ready;
}

export function createImageNavigation({ getImages, getSizes, onReady, onLoading, onError, load = prepareImage }) {
  let requestedIndex = 0;
  let version = 0;
  let timer;
  const wrap = (index, length) => ((index % length) + length) % length;
  function cancel() {
    version++;
    clearTimeout(timer);
    onLoading(false);
  }
  async function select(index) {
    const images = getImages();
    if (!images.length) { cancel(); return false; }
    requestedIndex = wrap(index, images.length);
    const target = requestedIndex;
    const request = ++version;
    clearTimeout(timer);
    onLoading(false);
    onError?.(false);
    timer = setTimeout(() => { if (request === version) onLoading(true); }, 250);
    const image = images[target];
    // Current request goes first; neighbors are speculative and low-priority.
    const ready = load(image.src, getSizes(image), 'high');
    for (const neighbor of new Set([wrap(target - 1, images.length), wrap(target + 1, images.length)])) {
      if (neighbor !== target) {
        const next = images[neighbor];
        void load(next.src, getSizes(next), 'low').catch(() => {});
      }
    }
    try {
      await ready;
      if (request !== version) return false;
      onReady(target);
      return true;
    } catch {
      if (request === version) onError?.(true);
      return false;
    } finally {
      if (request === version) { clearTimeout(timer); onLoading(false); }
    }
  }
  return { select, move: step => select(requestedIndex + step), cancel, get requestedIndex() { return requestedIndex; } };
}
