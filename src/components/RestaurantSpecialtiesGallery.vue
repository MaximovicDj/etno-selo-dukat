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
  hideHeading: Boolean,
  fullscreen: Boolean,
});

const emit = defineEmits(["open"]);

const currentIndex = ref(0);

const publicSource = (source) =>
  /^(https?:)?\/\//.test(source) || source.startsWith("/")
    ? source
    : `/${source}`;

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
  }
}
</script>

<template>
  <section class="specialties-gallery" :aria-label="label">
    <header v-if="!hideHeading" class="specialties-gallery__heading">
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
    >
      <figure class="specialties-gallery__side specialties-gallery__side--previous" aria-hidden="true">
        <img
          :src="publicSource(previousImage.src)"
          alt=""
          :width="previousImage.width"
          :height="previousImage.height"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <figure class="specialties-gallery__side specialties-gallery__side--next" aria-hidden="true">
        <img
          :src="publicSource(nextImage.src)"
          alt=""
          :width="nextImage.width"
          :height="nextImage.height"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <component
        :is="fullscreen ? 'button' : 'div'"
        class="specialties-gallery__main"
        :class="{ 'specialties-gallery__main--open': fullscreen }"
        :type="fullscreen ? 'button' : undefined"
        :aria-label="fullscreen ? `Увећај фотографију: ${activeImage.label || activeImage.alt}` : undefined"
        :aria-haspopup="fullscreen ? 'dialog' : undefined"
        @click="fullscreen && emit('open', activeImage)"
      >
        <Transition name="specialties-photo" mode="out-in">
          <img
            :key="activeImage.src"
            :src="publicSource(activeImage.src)"
            :alt="activeImage.alt"
            :width="activeImage.width"
            :height="activeImage.height"
            draggable="false"
            decoding="async"
          />
        </Transition>
      </component>

      <button
        class="specialties-gallery__button specialties-gallery__button--previous"
        type="button"
        aria-label="Прикажи претходну фотографију"
        @click.stop="previous"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        class="specialties-gallery__button specialties-gallery__button--next"
        type="button"
        aria-label="Прикажи следећу фотографију"
        @click.stop="next"
      >
        <span aria-hidden="true">›</span>
      </button>

      <p class="specialties-gallery__caption">{{ activeImage.label || label }}</p>
    </div>

  </section>
</template>
