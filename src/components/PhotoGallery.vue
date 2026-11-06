<script setup>
import { computed, ref } from 'vue';
import ResponsiveImage from './ResponsiveImage.vue';
import ImageLightbox from './ImageLightbox.vue';
import IconSymbol from './IconSymbol.vue';
import { gallerySizesFor } from '../imageLayouts';
import { imageDimensions } from '../imageSources';

const props = defineProps({
  images: { type: Array, required: true },
  label: { type: String, default: 'Галерија фотографија' },
  heading: { type: String, default: '' },
  description: { type: String, default: '' },
  eager: Boolean,
});
const active = ref(0);
const lightboxOpen = ref(false);
const count = computed(() => props.images.length);
const activeImage = computed(() => props.images[active.value]);
const previousImage = computed(() => props.images[(active.value - 1 + count.value) % count.value]);
const nextImage = computed(() => props.images[(active.value + 1) % count.value]);
const frameStyle = computed(() => {
  const style = {};
  for (const [name, image] of [['main', activeImage.value], ['previous', previousImage.value], ['next', nextImage.value]]) {
    const dimensions = imageDimensions(image?.src) || image || {};
    const width = dimensions.width || 1536;
    const height = dimensions.height || 1024;
    style[`--${name}-ratio`] = width / height;
    style[`--${name}-native-width`] = `${width}px`;
  }
  return style;
});
const mainSizes = computed(() => {
  const dimensions = imageDimensions(activeImage.value?.src) || activeImage.value || {};
  return gallerySizesFor(dimensions.width, dimensions.height);
});
let startX = null;
let lastSwipe = 0;
function openLightbox() {
  if (Date.now() - lastSwipe > 350) lightboxOpen.value = true;
}
function move(step) { active.value = (active.value + step + count.value) % count.value; }
function keyboard(event) {
  if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
  if (event.key === 'Home') { event.preventDefault(); active.value = 0; }
  if (event.key === 'End') { event.preventDefault(); active.value = count.value - 1; }
}
function swipe(event) {
  const delta = event.changedTouches[0].clientX - startX;
  if (startX !== null && Math.abs(delta) > 50) { move(delta < 0 ? 1 : -1); lastSwipe = Date.now(); }
  startX = null;
}
</script>

<template>
  <div class="photo-gallery" role="region" aria-roledescription="галерија" :aria-label="label" :data-image-count="count">
    <header v-if="heading" class="photo-gallery__heading wrap">
      <div class="photo-gallery__rule" aria-hidden="true"><span></span>❈<span></span></div>
      <h2>{{ heading }}</h2>
      <p v-if="description">{{ description }}</p>
    </header>
    <div v-if="activeImage" class="photo-gallery__stage" :style="frameStyle" tabindex="0" @keydown="keyboard" @touchstart.passive="startX = $event.touches[0].clientX" @touchend.passive="swipe" @touchcancel="startX = null">
      <template v-if="count > 1">
        <figure class="photo-gallery__side photo-gallery__side--previous" aria-hidden="true"><ResponsiveImage :source="previousImage.src" alt="" priority="low" /></figure>
        <figure class="photo-gallery__side photo-gallery__side--next" aria-hidden="true"><ResponsiveImage :source="nextImage.src" alt="" priority="low" /></figure>
      </template>
      <button type="button" class="photo-gallery__main" aria-haspopup="dialog" :aria-label="`Увећај фотографију: ${activeImage.label || activeImage.alt}`" @click="openLightbox">
        <ResponsiveImage :key="activeImage.src" :source="activeImage.src" :alt="activeImage.alt" :eager="eager" :priority="eager ? 'high' : 'auto'" :sizes="mainSizes" draggable="false" />
        <span class="photo-gallery__zoom"><IconSymbol name="zoom-in" /><span>Увећај</span></span>
      </button>
      <template v-if="count > 1">
        <button type="button" class="photo-gallery__arrow photo-gallery__arrow--previous" aria-label="Претходна фотографија" @click="move(-1)"><IconSymbol name="arrow-left" /></button>
        <button type="button" class="photo-gallery__arrow photo-gallery__arrow--next" aria-label="Следећа фотографија" @click="move(1)"><IconSymbol name="arrow-right" /></button>
      </template>
      <p class="photo-gallery__caption" aria-live="polite">{{ activeImage.label || label }}</p>
    </div>
    <ImageLightbox :images="images" :open="lightboxOpen" :start-index="active" :label="label" @close="lightboxOpen = false" />
  </div>
</template>
