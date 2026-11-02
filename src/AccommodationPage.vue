<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";
import VenueImage from "./components/VenueImage.vue";
import BackToTop from "./components/BackToTop.vue";
import IconSymbol from "./components/IconSymbol.vue";
import ImageCarousel from "./components/ImageCarousel.vue";
import { accommodationPage as page, venue, copy, galleryImages, accommodationHeroImage, accommodationInquiryImage } from "./content";
import { useScrollReveal } from "./useScrollReveal";

useScrollReveal();

const lightboxImages = ref([]);
const lightboxIndex = ref(0);
const lightboxImage = computed(() => lightboxImages.value[lightboxIndex.value] || null);
const publicSource = (source) => /^(https?:)?\/\//.test(source) || source.startsWith("/") ? source : `/${source}`;
function openLightbox(images, index = 0) {
  lightboxImages.value = images;
  lightboxIndex.value = index;
}
function closeLightbox() {
  lightboxImages.value = [];
  lightboxIndex.value = 0;
}
function moveLightbox(step) {
  lightboxIndex.value = (lightboxIndex.value + step + lightboxImages.value.length) % lightboxImages.value.length;
}
function closeOnEscape(event) {
  if (event.key === "Escape" && lightboxImage.value) closeLightbox();
}
onMounted(() => window.addEventListener("keydown", closeOnEscape));
onBeforeUnmount(() => window.removeEventListener("keydown", closeOnEscape));
</script>

<template>
  <a class="skip-link" href="#main">{{ copy.skip }}</a>
  <div id="pocetak"><SiteHeader current="stay" :depth="1" /></div>
  <main id="main" class="accommodation-page">
    <section class="stay-hero section-space" aria-labelledby="stay-heading">
      <div class="wrap stay-hero-grid">
        <div class="stay-hero-copy" data-reveal>
          <p class="eyebrow">ТРИ МАГАЗЕ · ЈЕДАН ДОМАЋИНСКИ ДОМ</p>
          <h1 id="stay-heading">Останите још мало.<br />Осећајте се као<br />код куће.</h1>
          <p class="stay-description">{{ page.description }}</p>
          <div class="stay-hero-actions">
            <span class="stay-price"><IconSymbol name="bed" /> 35 € са доручком</span>
            <a class="button button-dark" :href="venue.tel">Резервишите боравак <IconSymbol name="phone" /></a>
          </div>
        </div>
        <VenueImage class="stay-hero-image" :image="accommodationHeroImage" eager data-reveal />
      </div>
    </section>

    <section id="magaze" class="stay-magaze section-space" aria-labelledby="magaze-heading">
      <div class="wrap">
        <header class="stay-section-heading" data-reveal>
          <p class="eyebrow">ДОМАЋИНСКИ ПРЕДАХ</p>
          <h2 id="magaze-heading">Наше магазе</h2>
          <p>Три аутентичне магазе, уређене у духу традиције, пружају мир, удобност и прави сеоски доживљај.</p>
        </header>
        <div class="magaza-cards" data-reveal>
          <article v-for="unit in page.units" :key="unit.number" class="magaza-card" :aria-labelledby="`magaza-${unit.number}`">
            <button type="button" class="magaza-image-open" :aria-label="`Отвори галерију: ${unit.name}`" @click="openLightbox(unit.gallery)">
              <VenueImage :image="unit.gallery[0]" />
              <span class="magaza-image-open-hint">Погледајте галерију</span>
            </button>
            <div class="magaza-copy">
              <h3 :id="`magaza-${unit.number}`">{{ unit.name }}</h3>
              <span v-if="unit.status" class="magaza-status">{{ unit.status }}</span>
              <p>{{ unit.description }}</p>
            </div>
          </article>
        </div>
        <div class="stay-facts" data-reveal aria-label="Информације о смештају">
          <div><IconSymbol name="bed" /><strong>35 € / ноћ</strong><span>са доручком</span></div>
          <div><IconSymbol name="home" /><strong>3 традиционалне</strong><span>магазе</span></div>
          <div><IconSymbol name="tree" /><strong>Природа и мир</strong><span>у сваком годишњем добу</span></div>
          <div><IconSymbol name="calendar" /><strong>Резервације</strong><span>телефоном</span></div>
        </div>
      </div>
    </section>

    <section class="stay-gallery section-space" aria-labelledby="stay-gallery-heading">
      <div class="wrap">
        <header class="stay-section-heading" data-reveal>
          <p class="eyebrow">ДЕТАЉИ ИЗ НАШЕГ КУТКА</p>
          <h2 id="stay-gallery-heading">Галерија смештаја</h2>
          <p>Погледајте атмосферу нашег имања и доживите дух Етно села ДУКАТ.</p>
        </header>
        <ImageCarousel
          class="stay-gallery-carousel"
          :images="galleryImages"
          label="Галерија смештаја"
          variant="featured"
          fullscreen
          data-reveal
          @open="openLightbox(galleryImages, galleryImages.indexOf($event))"
        />
      </div>
    </section>

    <section class="stay-inquiry section-space" aria-labelledby="inquiry-heading">
      <div class="wrap stay-inquiry-inner" data-reveal>
        <div class="stay-inquiry-copy">
          <p class="eyebrow">ДОГОВОРИМО ВАШ ДОЛАЗАК</p>
          <h2 id="inquiry-heading">Ваш предах почиње<br />једним позивом.</h2>
          <p>За доступност, цене и информације о смештају, јавите нам се. Радујемо се вашем доласку.</p>
          <a class="button button-dark" :href="venue.tel"><IconSymbol name="phone" /> {{ venue.phone }}</a>
        </div>
        <VenueImage class="stay-inquiry-image" :image="accommodationInquiryImage" />
      </div>
    </section>
  </main>
  <SiteFooter :depth="1" />
  <BackToTop />
  <Teleport to="body">
    <div v-if="lightboxImage" class="stay-lightbox" role="dialog" aria-modal="true" :aria-label="lightboxImage.label" @click.self="closeLightbox">
      <button type="button" class="stay-lightbox-close" aria-label="Затвори фотографију" @click="closeLightbox">×</button>
      <button v-if="lightboxImages.length > 1" type="button" class="stay-lightbox-nav stay-lightbox-prev" aria-label="Претходна фотографија" @click="moveLightbox(-1)"><IconSymbol name="arrow-left" /></button>
      <img :src="publicSource(lightboxImage.src)" :alt="lightboxImage.alt" />
      <button v-if="lightboxImages.length > 1" type="button" class="stay-lightbox-nav stay-lightbox-next" aria-label="Следећа фотографија" @click="moveLightbox(1)"><IconSymbol name="arrow-right" /></button>
    </div>
  </Teleport>
</template>
