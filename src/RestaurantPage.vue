<script setup>
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";
import RestaurantExperience from "./components/RestaurantExperience.vue";
import WednesdayOffer from "./components/WednesdayOffer.vue";
import ContactSection from "./components/ContactSection.vue";
import BackToTop from "./components/BackToTop.vue";
import { copy } from "./content";
import { useScrollReveal } from "./useScrollReveal";
useScrollReveal();
</script>

<template>
  <a class="skip-link" href="#main">{{ copy.skip }}</a>
  <SiteHeader current="restaurant" :depth="1" />
  <main id="main">
    <RestaurantExperience />
    <WednesdayOffer />
    <ContactSection />
  </main>
  <SiteFooter :depth="1" />
  <BackToTop />
</template>
