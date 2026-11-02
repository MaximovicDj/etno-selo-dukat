<script setup>

import { nextTick, ref } from "vue";
import RestaurantSpecialtiesGallery from "./RestaurantSpecialtiesGallery.vue";
import IconSymbol from "./IconSymbol.vue";
import {
  celebration as content,
  celebrationGalleryImages as galleryImages,
  venue,
} from "../content";

const selectedImage = ref(0);
const lightboxOpen = ref(false);
const lightboxDialog = ref(null);
const imageOpenButton = ref(null);

async function openLightbox(image) {
  selectedImage.value = galleryImages.indexOf(image);
  imageOpenButton.value = document.activeElement;
  lightboxOpen.value = true;
  await nextTick();
  lightboxDialog.value?.showModal();
}

async function closeLightbox() {
  lightboxDialog.value?.close();
  lightboxOpen.value = false;
  await nextTick();
  imageOpenButton.value?.focus();
}

function moveImage(step) {
  selectedImage.value =
    (selectedImage.value + step + galleryImages.length) % galleryImages.length;
}
</script>

<template>
  <section
    id="proslave"
    class="celebration-section section-space"
    aria-labelledby="celebration-heading"
  >
    <div class="wrap">
      <div class="celebration-intro celebration-intro--gallery">
        <div class="celebration-copy">
          <p class="eyebrow">{{ content.eyebrow }}</p>
          <h2 id="celebration-heading">{{ content.title }}</h2>
          <p>{{ content.description }}</p>
        </div>
        <RestaurantSpecialtiesGallery
          :images="galleryImages"
          :label="content.galleryTitle"
          hide-heading
          fullscreen
          @open="openLightbox"
        />
        <div class="celebration-gallery-footer">
          <div>
            <p class="celebration-gallery-capacity">Прославе до 70 гостију</p>
            <p class="celebration-gallery-menu">Мени прилагођавамо вашим жељама</p>
          </div>
          <a class="button button-dark" :href="venue.tel">
            {{ content.cta }} <IconSymbol name="phone" />
          </a>
        </div>
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
  <Teleport to="body">
    <dialog
      v-if="lightboxOpen"
      ref="lightboxDialog"
      class="stay-lightbox celebration-lightbox"
      :aria-label="content.galleryTitle"
      @cancel.prevent="closeLightbox"
      @click.self="closeLightbox"
      @keydown.left.prevent="moveImage(-1)"
      @keydown.right.prevent="moveImage(1)"
    >
      <button
        type="button"
        class="stay-lightbox-close"
        aria-label="Затвори фотографију"
        autofocus
        @click="closeLightbox"
      >
        ×
      </button>
      <button
        type="button"
        class="stay-lightbox-nav stay-lightbox-prev"
        aria-label="Претходна фотографија"
        @click="moveImage(-1)"
      >
        <IconSymbol name="arrow-left" />
      </button>
      <img
        :src="`/${galleryImages[selectedImage].src}`"
        :alt="galleryImages[selectedImage].alt"
        draggable="false"
        @mousedown.prevent
      />
      <button
        type="button"
        class="stay-lightbox-nav stay-lightbox-next"
        aria-label="Следећа фотографија"
        @click="moveImage(1)"
      >
        <IconSymbol name="arrow-right" />
      </button>
    </dialog>
  </Teleport>
</template>
