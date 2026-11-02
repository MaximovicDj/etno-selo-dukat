<script setup>
import SiteHeader from "./components/SiteHeader.vue";
import VenueImage from "./components/VenueImage.vue";
import WednesdayOffer from "./components/WednesdayOffer.vue";
import ContactSection from "./components/ContactSection.vue";
import SiteFooter from "./components/SiteFooter.vue";
import AnimalGallery from "./components/AnimalGallery.vue";
import ImageCarousel from "./components/ImageCarousel.vue";
import BackToTop from "./components/BackToTop.vue";
import IconSymbol from "./components/IconSymbol.vue";
import { useScrollReveal } from "./useScrollReveal";
import {
  venue,
  copy,
  images,
  homeGalleryImages,
  bannerImage,
  celebration,
} from "./content";
useScrollReveal();
const highlights = [
  {
    number: "01",
    title: "Ресторан",
    text: "Домаћа јела, јеловници припремљени по традиционалним рецептима и уживање у аутентичном амбијенту.",
    image: images.restaurantCard,
    icon: "utensils",
    href: "./restoran/",
    action: "Погледајте ресторан",
  },
  {
    number: "02",
    title: "Смештај",
    text: "Три традиционалне магазе за удобан одмор и истински доживљај природе.",
    image: images.stayCard,
    icon: "bed",
    href: "./smestaj/",
    action: "Погледајте смештај",
  },
  {
    number: "03",
    title: "Прославе",
    text: "Сала за прославе, домаћа трпеза и договор по мери за ваше важне тренутке.",
    image: celebration.image,
    icon: "glasses",
    href: "./proslave/",
    action: "Организујте прославу",
  },
];
</script>
<template>
  <a class="skip-link" href="#main">{{ copy.skip }}</a>
  <div id="pocetak"><SiteHeader /></div>
  <main id="main">
    <section class="hero hero-full" aria-labelledby="hero-heading">
      <div class="hero-full-art">
        <VenueImage :image="bannerImage" eager />
      </div>
      <div class="hero-copy wrap">
        <p class="eyebrow">
          <span class="tiny-diamond" aria-hidden="true">◆</span>
          {{ copy.hero.eyebrow }}
        </p>
        <h1 id="hero-heading">
          {{ copy.hero.title[0] }}<br /><em>{{ copy.hero.title[1] }}</em>
        </h1>
        <p class="hero-description">{{ copy.hero.description }}</p>
        <div class="hero-actions">
          <a class="button button-dark" :href="venue.tel"
            >{{ copy.call }} <IconSymbol name="phone" /></a
          ><a
            class="button button-outline"
            :href="venue.directions"
            target="_blank"
            rel="noopener noreferrer"
            >{{ copy.directions }} <IconSymbol name="map-pin" /></a
          >
        </div>
        <a
          class="rating"
          :href="venue.rating.source"
          target="_blank"
          rel="noopener noreferrer"
          ><span class="rating-stars" aria-hidden="true">★★★★★</span
          ><strong>{{ venue.rating.score }}</strong
          ><span>{{ venue.rating.count }} рецензија на Гуглу</span></a
        >
      </div>
      <div class="hero-bottom wrap">
        <span>{{ venue.location }}</span
        ><a href="./restoran/"
          >{{ copy.hero.scroll }} <IconSymbol name="arrow-down" /></a
        >
      </div>
    </section>
    <div class="offer-ribbon" role="note"
      ><IconSymbol name="utensils" /><span>{{ copy.offer.short }}</span
      ></div
    >
    <WednesdayOffer />
    <section class="home-highlights section-space" aria-labelledby="highlights-heading">
      <div class="wrap">
        <div class="home-highlights-intro">
          <p class="eyebrow">НАША ПОНУДА</p>
          <h2 id="highlights-heading">Традиција, укуси и доживљаји</h2>
          <p>Откријте све што наше етно село нуди — од домаће кухиње и смештаја до прослава у срцу природе.</p>
        </div>
        <div class="home-highlights-grid">
          <article v-for="item in highlights" :key="item.title" class="home-highlight-card">
            <div class="home-highlight-image">
              <VenueImage :image="item.image" />
            </div>
            <div class="home-highlight-copy">
              <span class="home-highlight-icon"><IconSymbol :name="item.icon" /></span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
              <a class="home-highlight-link" :href="item.href">{{ item.action }} <IconSymbol name="arrow-right" /></a>
            </div>
          </article>
        </div>
      </div>
    </section>
    <AnimalGallery />
    <section
      id="galerija"
      class="gallery section-space"
      aria-labelledby="gallery-heading"
    >
      <div class="wrap">
        <div class="gallery-heading">
          <p class="eyebrow"><IconSymbol name="camera" /> {{ copy.gallery.eyebrow }}</p>
          <h2 id="gallery-heading">{{ copy.gallery.title }}</h2>
          <p>{{ copy.gallery.description }}</p>
        </div>
        <ImageCarousel
          :images="homeGalleryImages"
          :label="copy.gallery.title"
          variant="village"
        />
      </div>
    </section>
    <ContactSection />
  </main>
  <SiteFooter />
  <BackToTop />
</template>
