<script setup>

import { computed, ref, watch } from "vue";
import { copy } from "../content";
import ResponsiveImage from './ResponsiveImage.vue';

const props = defineProps({
  image: { type: Object, required: true },
  eager: Boolean,
  sizes: { type: String, default: '(max-width: 700px) 100vw, 720px' },
});

const failed = ref(false);

const imageStyle = computed(() => ({
  "--image-width": props.image.width || 1536,
  "--image-height": props.image.height || 1024,
}));

watch(
  () => props.image.src,
  () => {
    failed.value = false;
  },
);
</script>

<template>
  <figure
    class="venue-image"
    :class="{ 'venue-image--contain': image.fit === 'contain' }"
    :style="imageStyle"
  >
    <ResponsiveImage
      v-if="!failed"
      :source="image.src"
      :sizes="sizes"
      :alt="image.alt"
      :eager="eager"
      :priority="eager ? 'high' : 'auto'"
      @error="failed = true"
    />
    <div v-else class="image-placeholder" role="img" :aria-label="image.alt">
      <span aria-hidden="true">◇</span>{{ image.label }}
    </div>
    <figcaption v-if="image.illustrative">{{ copy.imageNotice }}</figcaption>
  </figure>
</template>
