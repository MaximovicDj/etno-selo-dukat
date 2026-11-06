<script setup>

import { computed, ref } from "vue";
import VenueImage from "./VenueImage.vue";
import IconSymbol from "./IconSymbol.vue";
import { imageSource } from '../imageSources';
import ResponsiveImage from './ResponsiveImage.vue';
import { menuSizes } from '../imageSources';

const props = defineProps({
  images: { type: Array, required: true },
  label: { type: String, required: true },
  variant: { type: String, default: "single" },
  startIndex: { type: Number, default: 0 },
  fullscreen: Boolean,
  eager: Boolean,
});

defineEmits(["open"]);

const active = ref(Math.max(0, Math.min(props.startIndex, props.images.length - 1)),);

const orderedImages = computed(() =>
  props.images.map((_, index) => {
    const position = (active.value + index) % props.images.length;
    return { image: props.images[position], position };
  }),
);

const isShowcase = computed(() => ["playground", "village"].includes(props.variant));
const isFeatured = computed(() => props.variant === "featured");

const displayedImages = computed(() => {
  if (!isShowcase.value) return orderedImages.value;

  const total = props.images.length;

  return [-1, 0, 1].map((offset) => {
    const position = (active.value + offset + total) % total;
    return { image: props.images[position], position };
  });
});

const publicSource = (source) =>
  /^(https?:)?\/\//.test(source) || source.startsWith("/")
    ? source
    : `/${source}`;

function move(step) {
  active.value =
    (active.value + step + props.images.length) % props.images.length;
}

function keyboard(event) {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    move(1);
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    move(-1);
  }
  if (event.key === "Home") {
    event.preventDefault();
    active.value = 0;
  }
  if (event.key === "End") {
    event.preventDefault();
    active.value = props.images.length - 1;
  }
}

let startX = null;

function swipe(event) {
  if (
    startX !== null &&
    Math.abs(event.changedTouches[0].clientX - startX) > 50
  )
    move(event.changedTouches[0].clientX < startX ? 1 : -1);
  startX = null;
}
</script>

<template>
  <div
    class="image-carousel"
    :class="{
      'gallery-carousel': variant === 'strip',
      'compact-carousel': variant === 'compact',
      'playground-carousel': variant === 'playground',
      'village-carousel': variant === 'village',
      'featured-carousel': variant === 'featured',
    }"
    role="region"
    aria-roledescription="галерија"
    :aria-label="label"
    tabindex="0"
    @keydown="keyboard"
  >
    <div
      v-if="variant === 'strip' || isShowcase"
      class="gallery-window"
      @touchstart.passive="startX = $event.touches[0].clientX"
      @touchend.passive="swipe"
      @touchcancel="startX = null"
    >
      <TransitionGroup
        v-if="variant === 'strip'"
        name="restaurant-food-slide"
        tag="div"
        class="gallery-grid"
      >
        <div
          v-for="{ image, position } in displayedImages"
          :key="image.src"
          role="group"
          :aria-label="`${position + 1} од ${images.length}`"
        >
          <VenueImage :image="image" />
          <p class="gallery-label">{{ image.label }}</p>
        </div>
      </TransitionGroup>
      <div v-else class="gallery-grid">
        <div
          v-for="{ image, position } in displayedImages"
          :key="image.src"
          :class="{ 'is-active': position === active }"
          role="group"
          :aria-label="`${position + 1} од ${images.length}`"
        >
          <VenueImage :image="image" />
          <p class="gallery-label">{{ image.label }}</p>
        </div>
      </div>
    </div>
    <div
      v-else
      class="carousel-stage"
      @touchstart.passive="startX = $event.touches[0].clientX"
      @touchend.passive="swipe"
      @touchcancel="startX = null"
    >
      <Transition v-if="isFeatured" name="featured-gallery-fade" mode="out-in">
        <div
          :key="images[active].src"
          class="featured-gallery-slide"
          role="group"
          :aria-label="`${active + 1} од ${images.length}`"
        >
          <img
            class="featured-gallery-backdrop"
            :src="imageSource(images[active].src, 160)"
            loading="lazy"
            alt=""
            aria-hidden="true"
          />
          <button
            v-if="fullscreen"
            type="button"
            class="carousel-image-open"
            :aria-label="`Увећај слику: ${images[active].label}`"
            @click="$emit('open', images[active])"
          >
            <VenueImage :image="images[active]" />
          </button>
          <VenueImage v-else :image="images[active]" />
          <div class="featured-gallery-meta">
            <IconSymbol name="bed" />
            <div>
              <strong>{{ images[active].label }}</strong>
              <p>Аутентичан етно амбијент за миран предах.</p>
            </div>
          </div>
          <span class="featured-gallery-count">
            {{ active + 1 }} / {{ images.length }}
          </span>
        </div>
      </Transition>
      <div
        v-else
        v-for="(image, index) in images"
        v-show="index === active"
        :key="image.src"
        role="group"
        :aria-label="`${index + 1} од ${images.length}`"
      >
        <a
          v-if="variant === 'single' && image.fullView"
          class="carousel-full-image"
          :href="publicSource(image.src)"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Отвори у пуној величини: ${image.label}`"
        >
          <VenueImage :image="image" :eager="eager && index === active" :sizes="menuSizes" />
        </a>
        <button
          v-else-if="fullscreen"
          type="button"
          class="carousel-image-open"
          :aria-label="`Увећај слику: ${image.label}`"
          @click="$emit('open', image)"
        >
          <VenueImage :image="image" :eager="eager && index === active" />
        </button>
        <VenueImage v-else :image="image" :eager="eager && index === active" />
      </div>
    </div>
    <div
      class="carousel-controls"
      :class="{ 'featured-gallery-controls': isFeatured }"
    >
      <button type="button" aria-label="Претходна слика" @click="move(-1)">
        <IconSymbol name="arrow-left" />
      </button>
      <p v-if="!isShowcase && !isFeatured" aria-live="polite" aria-atomic="true">
        <span class="carousel-count">
          {{ String(active + 1).padStart(2, "0") }} /
          {{ String(images.length).padStart(2, "0") }}
        </span>
        {{ images[active].label }}
      </p>
      <button type="button" aria-label="Следећа слика" @click="move(1)">
        <IconSymbol name="arrow-right" />
      </button>
    </div>
    <div
      v-if="variant === 'single' || isFeatured"
      class="carousel-thumbnails"
      aria-label="Изаберите слику"
    >
      <button
        v-for="(image, index) in images"
        :key="image.src"
        type="button"
        :aria-label="`Прикажи слику ${index + 1}: ${image.label}`"
        :aria-pressed="active === index"
        @click="active = index"
      >
        <ResponsiveImage
          :source="image.src"
          alt=""
        />
      </button>
    </div>
  </div>
</template>
