<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: "Галерија специјалитета",
  },
});

const currentIndex = ref(0);
const dragStart = ref(null);

const count = computed(() => props.images.length);
const activeIndex = computed(() => {
  if (!count.value) return 0;
  return ((currentIndex.value % count.value) + count.value) % count.value;
});
const activeImage = computed(() => props.images[activeIndex.value] ?? {});
const previousImage = computed(() =>
  count.value ? props.images[(activeIndex.value - 1 + count.value) % count.value] : {},
);
const nextImage = computed(() =>
  count.value ? props.images[(activeIndex.value + 1) % count.value] : {},
);

function goTo(index) {
  if (!count.value) return;
  currentIndex.value = (index + count.value) % count.value;
}

function previous() {
  goTo(activeIndex.value - 1);
}

function next() {
  goTo(activeIndex.value + 1);
}

function onKeydown(event) {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    previous();
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    next();
  } else if (event.key === "Home") {
    event.preventDefault();
    goTo(0);
  } else if (event.key === "End") {
    event.preventDefault();
    goTo(count.value - 1);
  }
}

function beginDrag(event) {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  dragStart.value = { x: event.clientX };
  event.currentTarget.setPointerCapture?.(event.pointerId);
}

function finishDrag(event) {
  if (!dragStart.value) return;

  const distance = event.clientX - dragStart.value.x;
  if (Math.abs(distance) > 42) {
    distance < 0 ? next() : previous();
  }
  dragStart.value = null;
}

function clearDrag() {
  dragStart.value = null;
}
</script>

<template>
  <section class="specialties-gallery" :aria-label="label">
    <header class="specialties-gallery__heading">
      <div class="specialties-gallery__rule" aria-hidden="true">
        <span></span><b>❈</b><span></span>
      </div>
      <h2>Специјалитети наше кухиње</h2>
      <p>Уживајте у аутентичним јелима домаће кухиње, припремљеним по традиционалним рецептима нашег краја.</p>
    </header>

    <div
      v-if="count"
      class="specialties-gallery__stage"
      tabindex="0"
      @keydown="onKeydown"
      @pointerdown="beginDrag"
      @pointerup="finishDrag"
      @pointercancel="clearDrag"
    >
      <figure class="specialties-gallery__side specialties-gallery__side--previous" aria-hidden="true">
        <img
          :src="previousImage.src"
          alt=""
          :width="previousImage.width"
          :height="previousImage.height"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <figure class="specialties-gallery__side specialties-gallery__side--next" aria-hidden="true">
        <img
          :src="nextImage.src"
          alt=""
          :width="nextImage.width"
          :height="nextImage.height"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div class="specialties-gallery__main">
        <Transition name="specialties-photo" mode="out-in">
          <img
            :key="activeImage.src"
            :src="activeImage.src"
            :alt="activeImage.alt"
            :width="activeImage.width"
            :height="activeImage.height"
            draggable="false"
            decoding="async"
          />
        </Transition>
      </div>

      <button
        class="specialties-gallery__button specialties-gallery__button--previous"
        type="button"
        aria-label="Прикажи претходну фотографију"
        @click.stop="previous"
        @pointerdown.stop
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        class="specialties-gallery__button specialties-gallery__button--next"
        type="button"
        aria-label="Прикажи следећу фотографију"
        @click.stop="next"
        @pointerdown.stop
      >
        <span aria-hidden="true">›</span>
      </button>

      <p class="specialties-gallery__caption">{{ activeImage.label }}</p>
    </div>

    <div class="specialties-gallery__dots" role="tablist" :aria-label="`Избор фотографије: ${label}`">
      <button
        v-for="(_, index) in images"
        :key="index"
        type="button"
        :class="{ 'is-active': activeIndex === index }"
        :aria-label="`Прикажи фотографију ${index + 1}`"
        :aria-selected="activeIndex === index"
        role="tab"
        @click="goTo(index)"
      ></button>
    </div>
  </section>
</template>
