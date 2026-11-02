<script setup>
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";
import ContactSection from "./components/ContactSection.vue";
import BackToTop from "./components/BackToTop.vue";
import { copy } from "./content";
import { useScrollReveal } from "./useScrollReveal";
useScrollReveal();
</script>

<template>
  <a class="skip-link" href="#main">{{ copy.skip }}</a>
  <SiteHeader current="contact" :depth="1" />
  <main id="main">
    <section
      class="page-intro contact-page-intro section-space"
      aria-labelledby="contact-page-title"
    >
      <div class="wrap page-intro-copy">
        <p class="eyebrow">КОНТАКТ · ЕТНО СЕЛО ДУКАТ</p>
        <h1 id="contact-page-title">Видимо се<br />у Мислођину.</h1>
        <p>Позовите нас, пишите нам или отворите мапу — радо ћемо вам помоћи око доласка.</p>
      </div>
    </section>
    <ContactSection />
  </main>
  <SiteFooter :depth="1" />
  <BackToTop />
</template>
