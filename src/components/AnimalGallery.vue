<script setup>

import { computed, ref } from "vue";
import VenueImage from "./VenueImage.vue";
import PhotoGallery from "./PhotoGallery.vue";
import IconSymbol from "./IconSymbol.vue";
import { copy, animalGallery, playgroundImages } from "../content";

const active = ref(0);

const orderedAnimals = computed(() =>
  animalGallery.map((_, offset) => animalGallery[(active.value + offset) % animalGallery.length],),
);

function move(step) {
  active.value =
    (active.value + step + animalGallery.length) % animalGallery.length;
}

</script>

<template>
  <section
    id="dozivljaji"
    class="activities section-space"
    aria-labelledby="activities-heading"
  >
    <div class="wrap">
      <div class="animal-intro">
        <p class="eyebrow">НАШЕ ЖИВОТИЊЕ</p>
        <h2 id="activities-heading">{{ copy.activities.title }}</h2>
        <p>{{ copy.activities.description }}</p>
      </div>

      <div class="animal-carousel" role="region" aria-label="Галерија животиња">
        <button
          class="animal-arrow animal-arrow--previous"
          type="button"
          aria-label="Претходне животиње"
          @click="move(-1)"
        >
          <IconSymbol name="arrow-left" />
        </button>
        <div class="animal-window">
          <div class="animal-grid animal-grid--rail">
            <article
              v-for="animal in orderedAnimals"
              :key="animal.name"
              class="animal-card animal-feature-card"
              :class="`animal-feature-card--${animal.theme}`"
            >
              <div class="animal-feature-image">
                <VenueImage :image="animal.image" />
              </div>
              <div class="animal-copy">
                <span class="animal-feature-icon">
                  <IconSymbol :name="animal.icon" />
                </span>
                <h3>{{ animal.name }}</h3>
                <p>{{ animal.description }}</p>
              </div>
            </article>
          </div>
        </div>
        <button
          class="animal-arrow animal-arrow--next"
          type="button"
          aria-label="Следеће животиње"
          @click="move(1)"
        >
          <IconSymbol name="arrow-right" />
        </button>
      </div>

      <div class="family-notes">
        <p>
          <span aria-hidden="true">◇</span> Дечје игралиште за мале авантуре.
          Башта и тераса за породични предах.
        </p>
        <p>
          <span aria-hidden="true">◇</span> За љубитеље риболова, пецање је
          могуће у близини.
        </p>
      </div>

    </div>
    <div class="playground-gallery" aria-labelledby="playground-heading">
      <div class="playground-heading wrap">
          <p class="eyebrow"><IconSymbol name="playground" /> МЕСТО ЗА ИГРУ</p>
          <h3 id="playground-heading">Мале авантуре у башти.</h3>
          <p>Простор за игру, забаву и истраживање природе.</p>
        </div>
      <PhotoGallery
        :images="playgroundImages"
        label="Галерија дечјег игралишта"
      />
    </div>
  </section>
</template>
