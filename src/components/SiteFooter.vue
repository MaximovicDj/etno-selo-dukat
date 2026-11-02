<script setup>

import BrandMark from "./BrandMark.vue";
import IconSymbol from "./IconSymbol.vue";
import { copy, venue } from "../content";

const props = defineProps({
  depth: { type: Number, default: 0 } }
);

const home = () => (props.depth ? "../" : "./");

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
    <div class="wrap footer-bottom">
      <span>© {{ new Date().getFullYear() }} {{ copy.footer.copyright }}</span>
      <span>{{ copy.footer.bottom }}</span>
    </div>
  </footer>
</template>
