<script setup>

import { computed, ref, watch } from "vue";
import { copy } from "../content";

const props = defineProps({
  image: { type: Object, required: true },
  eager: Boolean,
});

const failed = ref(false);

const imageStyle = computed(() => ({
  "--image-width": props.image.width || 1536,
  "--image-height": props.image.height || 1024,
}));

const publicSource = computed(() => {
  const source = props.image.src;

  return /^(https?:)?\/\//.test(source) || source.startsWith("/")
    ? source
    : `/${source}`;
});

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
    <img
      v-if="!failed"
      :src="publicSource"
      :alt="image.alt"
      :width="image.width || 1536"
      :height="image.height || 1024"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
      @error="failed = true"
    />
    <div v-else class="image-placeholder" role="img" :aria-label="image.alt">
      <span aria-hidden="true">◇</span>{{ image.label }}
    </div>
    <figcaption v-if="image.illustrative">{{ copy.imageNotice }}</figcaption>
  </figure>
</template>
