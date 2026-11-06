<script setup>

import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";
import CelebrationSection from "./components/CelebrationSection.vue";
import ContactSection from "./components/ContactSection.vue";
import BackToTop from "./components/BackToTop.vue";
import { useScrollReveal } from "./useScrollReveal";

useScrollReveal();

</script>

<template>
  <a class="skip-link" href="#main">Пређи на садржај</a>
  <SiteHeader current="celebrations" :depth="1" />
  <main id="main">
    <section
      class="page-intro celebrations-intro section-space"
      aria-labelledby="celebrations-page-title"
    >
      <div class="wrap page-intro-copy">
        <p class="eyebrow">ПРОСЛАВЕ · ЕТНО СЕЛО ДУКАТ</p>
        <h1 id="celebrations-page-title">Сала за прославе<br />код Обреновца.</h1>
        <p>
          Прославите важне тренутке у Етно селу Дукат, у Мислођину код Обреновца,
          у близини Београда. Сала за прославе до 70 гостију, домаћа трпеза и
          договор о менију, броју гостију и слободном термину.
        </p>
      </div>
    </section>
    <CelebrationSection />
    <ContactSection />
  </main>
  <SiteFooter :depth="1" />
  <BackToTop />
</template>

