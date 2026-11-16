<script setup>

import BrandMark from "./BrandMark.vue";
import IconSymbol from "./IconSymbol.vue";
import { copy, venue } from "../content";

const props = defineProps({
  depth: { type: Number, default: 0 },
  homeHref: { type: String, default: '' } }
);

const home = () => props.homeHref || (props.depth ? "../" : "./");

</script>

<template>
  <footer class="site-footer">
    <div class="wrap footer-main">
      <div>
        <a :href="home()" aria-label="Етно село ДУКАТ — почетак">
          <BrandMark />
        </a>
        <p>{{ copy.footer.tagline }}</p>
      </div>
      <div class="footer-socials">
        <a
          class="text-link"
          :href="venue.instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ copy.footer.instagram }}
          <IconSymbol name="arrow-up-right" />
        </a>
        <a
          class="text-link"
          :href="venue.tiktok"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ copy.footer.tiktok }}
          <IconSymbol name="arrow-up-right" />
        </a>
      </div>
    </div>
    <p class="wrap footer-description" lang="sr-Latn">Etno selo Dukat — restoran domaće kuhinje, sala za proslave i smeštaj u prirodi u Mislođinu kod Obrenovca, blizu Beograda.</p>
    <div class="wrap footer-bottom">
      <span>© {{ new Date().getFullYear() }} {{ copy.footer.copyright }}</span>
      <span>{{ copy.footer.bottom }}</span>
      <span class="footer-credit">
        {{ copy.footer.credit.label }}:
        <a :href="copy.footer.credit.url" target="_blank" rel="noopener noreferrer">{{ copy.footer.credit.name }}</a>
      </span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer .footer-description {
  margin-block: 24px;
  font-family: inherit;
  font-style: normal;
  font-size: 0.85rem;
  line-height: 1.7;
}
</style>
