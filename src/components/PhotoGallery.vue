<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import ResponsiveImage from './ResponsiveImage.vue';
import ImageLightbox from './ImageLightbox.vue';
import IconSymbol from './IconSymbol.vue';
import { gallerySizesFor } from '../imageLayouts';
import { imageDimensions } from '../imageSources';
import { createImageNavigation } from '../imagePreloader';

const props = defineProps({
  images: { type: Array, required: true },
  label: { type: String, default: 'Галерија фотографија' },
  heading: { type: String, default: '' },
  description: { type: String, default: '' },
  eager: Boolean,
});
const active = ref(0);
const gallery = ref(null);
const enabled = ref(false);
const loading = ref(false);
const failed = ref(false);
let intersection;
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
function sizesFor(image) {
  const dimensions = imageDimensions(image?.src) || image || {};
  return gallerySizesFor(dimensions.width, dimensions.height);
}
const mainSizes = computed(() => sizesFor(activeImage.value));
const navigation = createImageNavigation({
  getImages: () => props.images,
  getSizes: sizesFor,
  onReady: index => { active.value = index; },
  onLoading: value => { loading.value = value; },
  onError: value => { failed.value = value; },
});
function prepare() { if (enabled.value) void navigation.select(navigation.requestedIndex); }
onMounted(() => {
  if (props.eager || !('IntersectionObserver' in window)) {
    enabled.value = true;
    prepare();
  } else {
    intersection = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      enabled.value = true;
      prepare();
      intersection.disconnect();
    }, { rootMargin: '300px 0px' });
    intersection.observe(gallery.value);
  }
  window.addEventListener('resize', prepare);
});
watch(() => props.images, () => { active.value = 0; navigation.cancel(); if (enabled.value) void navigation.select(0); });
onBeforeUnmount(() => { intersection?.disconnect(); window.removeEventListener('resize', prepare); navigation.cancel(); });
let startX = null;
let lastSwipe = 0;
function openLightbox() {
  if (Date.now() - lastSwipe > 350) lightboxOpen.value = true;
}
function select(index) { enabled.value = true; void navigation.select(index); }
function move(step) { enabled.value = true; void navigation.move(step); }
function keyboard(event) {
  if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
  if (event.key === 'Home') { event.preventDefault(); select(0); }
  if (event.key === 'End') { event.preventDefault(); select(count.value - 1); }
}
function swipe(event) {
  const delta = event.changedTouches[0].clientX - startX;
  if (startX !== null && Math.abs(delta) > 50) { move(delta < 0 ? 1 : -1); lastSwipe = Date.now(); }
  startX = null;
}
</script>

<template>
  <div ref="gallery" class="photo-gallery" role="region" aria-roledescription="галерија" :aria-label="label" :data-image-count="count">
    <header v-if="heading" class="photo-gallery__heading wrap">
      <div class="photo-gallery__rule" aria-hidden="true"><span></span>❈<span></span></div>
      <h2>{{ heading }}</h2>
      <p v-if="description">{{ description }}</p>
    </header>
    <div v-if="activeImage" class="photo-gallery__stage" :style="frameStyle" tabindex="0" @keydown="keyboard" @touchstart.passive="startX = $event.touches[0].clientX" @touchend.passive="swipe" @touchcancel="startX = null">
      <template v-if="count > 1">
        <figure class="photo-gallery__side photo-gallery__side--previous" aria-hidden="true"><ResponsiveImage :key="previousImage.src" :source="previousImage.src" :sizes="sizesFor(previousImage)" fixed-sizes :eager="enabled" alt="" priority="low" /></figure>
        <figure class="photo-gallery__side photo-gallery__side--next" aria-hidden="true"><ResponsiveImage :key="nextImage.src" :source="nextImage.src" :sizes="sizesFor(nextImage)" fixed-sizes :eager="enabled" alt="" priority="low" /></figure>
      </template>
      <button type="button" class="photo-gallery__main" aria-haspopup="dialog" :aria-label="`Увећај фотографију: ${activeImage.label || activeImage.alt}`" @click="openLightbox">
        <ResponsiveImage :key="activeImage.src" :source="activeImage.src" :alt="activeImage.alt" :eager="eager || enabled" :priority="eager ? 'high' : 'auto'" :sizes="mainSizes" fixed-sizes draggable="false" />
        <span class="photo-gallery__zoom"><IconSymbol name="zoom-in" /><span>Увећај</span></span>
      </button>
      <template v-if="count > 1">
        <button type="button" class="photo-gallery__arrow photo-gallery__arrow--previous" aria-label="Претходна фотографија" @click="move(-1)"><IconSymbol name="arrow-left" /></button>
        <button type="button" class="photo-gallery__arrow photo-gallery__arrow--next" aria-label="Следећа фотографија" @click="move(1)"><IconSymbol name="arrow-right" /></button>
      </template>
      <p class="photo-gallery__caption" aria-live="polite">{{ activeImage.label || label }}</p>
      <span v-if="loading" class="gallery-loading" role="status">Учитавање…</span>
      <span v-if="failed" class="gallery-loading" role="status">Слика није учитана. Покушајте поново.</span>
    </div>
    <ImageLightbox :images="images" :open="lightboxOpen" :start-index="active" :label="label" @close="lightboxOpen = false" />
  </div>
</template>
