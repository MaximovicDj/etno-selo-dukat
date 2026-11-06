<script setup>
import PhotoGallery from './PhotoGallery.vue';
import IconSymbol from './IconSymbol.vue';
import { celebration as content, celebrationGalleryImages as galleryImages, venue } from '../content';
</script>

<template>
  <section
    id="proslave"
    class="celebration-section section-space"
    aria-labelledby="celebration-heading"
  >
    <div class="wrap celebration-gallery-heading">
      <div class="celebration-copy">
        <p class="eyebrow">{{ content.eyebrow }}</p>
        <h2 id="celebration-heading">{{ content.title }}</h2>
        <p>{{ content.description }}</p>
      </div>
    </div>
    <PhotoGallery :images="galleryImages" :label="content.galleryTitle" eager />
    <div class="wrap">
      <div class="celebration-gallery-footer">
        <div>
          <p class="celebration-gallery-capacity">Прославе до 70 гостију</p>
          <p class="celebration-gallery-menu">Мени прилагођавамо вашим жељама</p>
        </div>
        <a class="button button-dark" :href="venue.tel">{{ content.cta }}<IconSymbol name="phone" /></a>
      </div>
      <div
        class="celebration-pricing celebration-offer-board"
        aria-labelledby="pricing-heading"
      >
        <header class="offer-board-heading">
          <p class="offer-board-kicker">{{ content.pricingLead }}</p>
          <h3 id="pricing-heading">{{ content.pricingTitle }}</h3>
        </header>

        <div class="drinks-included" role="group" aria-labelledby="drinks-heading">
          <div class="drinks-included-heading">
            <h4 id="drinks-heading">{{ content.drinksTitle }}</h4>
            <p class="drinks-kicker">{{ content.drinksLead }}</p>
          </div>
          <div class="drinks-grid">
            <div v-for="group in content.drinkGroups" :key="group.title">
              <h5>{{ group.title }}</h5>
              <p>{{ group.items.join(" · ") }}</p>
            </div>
          </div>
        </div>

        <div class="pricing-grid pricing-grid--menus">
          <article
            v-for="(pack, index) in content.packages"
            :key="pack.name"
            class="pricing-card menu-card"
            :style="{ '--package-color': pack.color }"
            :aria-labelledby="`package-${index}`"
          >
            <header class="package-header">
              <h4 :id="`package-${index}`">{{ pack.name }}</h4>
              <p>{{ content.menuIncluded }}</p>
            </header>
            <ul class="menu-items">
              <li v-for="item in pack.items" :key="item.title">
                <h5>{{ item.title }}</h5>
                <p v-if="item.description">{{ item.description }}</p>
              </li>
            </ul>
          </article>
        </div>

        <aside class="menu-agreement">
          <h4>{{ content.agreementTitle }}</h4>
          <p>{{ content.agreementText }}</p>
          <strong>{{ content.agreementClosing }}</strong>
          <a :href="venue.tel">{{ venue.phone }}</a>
        </aside>
      </div>
    </div>
  </section>
</template>
