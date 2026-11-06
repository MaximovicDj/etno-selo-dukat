<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { imageDimensions, imageSource, imageSrcset } from '../imageSources';

const props = defineProps({
  source: { type: String, required: true },
  eager: Boolean,
  priority: { type: String, default: 'auto' },
  sizes: { type: String, default: '100vw' },
});
const element = ref(null);
const visible = ref(props.eager);
const box = ref(null);
let intersection;
let resize;
const dimensions = computed(() => imageDimensions(props.source));
// Real image URLs are present in the prerendered HTML for search engines and
// no-JavaScript visitors. Native lazy loading defers offscreen image transfers;
// intrinsic dimensions reserve layout space while sizes is refined after mount.
const measuredSizes = computed(() => {
  if (!box.value || !dimensions.value) return props.sizes;
  const { width, height, fit } = box.value;
  const ratio = dimensions.value.width / dimensions.value.height;
  // Width alone underestimates the resolution required when object-fit: cover
  // enlarges a portrait/landscape source to fill a differently shaped frame.
  const contentWidth = fit === 'cover' ? Math.max(width, height * ratio)
    : fit === 'contain' ? Math.min(width, height * ratio)
    : fit === 'scale-down' ? Math.min(width, height * ratio, dimensions.value.width) : width;
  return `${Math.ceil(contentWidth)}px`;
});
function measure() {
  const img = element.value;
  if (!img) return;
  const style = getComputedStyle(img);
  const width = parseFloat(style.width);
  const height = parseFloat(style.height);
  if (width > 0 && height > 0) box.value = { width, height, fit: style.objectFit };
  const rect = img.getBoundingClientRect();
  visible.value = rect.width > 0 && rect.top < innerHeight && rect.bottom > 0;
}
onMounted(() => {
  measure();
  if ('ResizeObserver' in window) {
    resize = new ResizeObserver(measure);
    resize.observe(element.value);
  }
  if (props.eager || !('IntersectionObserver' in window)) {
    return;
  }
  intersection = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    measure();
    intersection.disconnect();
  }, { rootMargin: '300px 0px' });
  intersection.observe(element.value);
});
onBeforeUnmount(() => { intersection?.disconnect(); resize?.disconnect(); });
</script>

<template>
  <img
    ref="element"
    :src="imageSource(source)"
    :srcset="imageSrcset(source)"
    :sizes="measuredSizes"
    :width="dimensions?.width"
    :height="dimensions?.height"
    :data-source="source"
    :loading="eager || visible ? 'eager' : 'lazy'"
    :fetchpriority="priority"
    decoding="async"
  />
</template>
