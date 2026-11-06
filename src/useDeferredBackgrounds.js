import { onMounted, onUnmounted } from 'vue';
import { backgroundImages, backgroundVariable } from './backgroundImages';
import { imageSource } from './imageSources';

export function useDeferredBackgrounds() {
  let observer;
  let disposed = false;
  onMounted(() => {
    const primary = [...document.querySelectorAll('main img[fetchpriority="high"]')];
    // Let the primary image finish before decorative rasters compete for bandwidth.
    const primaryReady = Promise.allSettled(primary.map(image => image.decode()));
    const show = async section => {
      await primaryReady;
      if (disposed || !section.isConnected) return;
      for (const source of backgroundImages) {
        section.style.setProperty(backgroundVariable(source), `url("${imageSource(source)}")`);
      }
    };
    const sections = document.querySelectorAll('main > section');
    if (!('IntersectionObserver' in window)) { sections.forEach(show); return; }
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target);
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '300px 0px' });
    sections.forEach(section => observer.observe(section));
  });
  onUnmounted(() => { disposed = true; observer?.disconnect(); });
}
