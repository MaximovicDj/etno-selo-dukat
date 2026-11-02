<script setup>
import { copy, venue, images } from "../content";
import IconSymbol from "./IconSymbol.vue";
const posterSource = `/${images.poster.src}`;
</script>
<template>
  <section
    id="sreda"
    class="offer section-space"
    aria-labelledby="offer-heading"
  >
    <div class="wrap offer-inner">
      <div class="offer-intro">
        <p class="eyebrow">{{ copy.offer.eyebrow }}</p>
        <h2 id="offer-heading">{{ copy.offer.title }}</h2>
        <p>{{ copy.offer.description }}</p>
        <p class="offer-accessible-price">{{ copy.offer.short }}</p>
        <p class="offer-menu-note">
          За тачан избор јела распитајте се код нашег особља.
        </p>
        <a class="text-link" :href="venue.tel"
          >{{ copy.offer.link }} <IconSymbol name="phone" /></a
        >
      </div>
      <a
        class="offer-poster"
        :href="posterSource"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Отвори плакат понуде средом у пуној величини"
      >
        <img
          :src="posterSource"
          :alt="images.poster.alt"
          :width="images.poster.width"
          :height="images.poster.height"
          loading="lazy"
        />
        <span>Погледајте плакат <IconSymbol name="arrow-up-right" /></span>
      </a>
    </div>
  </section>
</template>
