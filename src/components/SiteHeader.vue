<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import BrandMark from "./BrandMark.vue";
import IconSymbol from "./IconSymbol.vue";
import { copy, venue } from "../content";
const props = defineProps({
  current: { type: String, default: "home" },
  depth: { type: Number, default: 0 },
});
const root = () => (props.depth ? ".." : ".");
const navigation = [
  { id: "home", href: `${root()}/`, label: "Почетна" },
  { id: "restaurant", href: `${root()}/restoran/`, label: "Ресторан" },
  { id: "stay", href: `${root()}/smestaj/`, label: "Смештај" },
  { id: "celebrations", href: `${root()}/proslave/`, label: "Прославе" },
  { id: "contact", href: `${root()}/kontakt/`, label: "Контакт" },
];
const open = ref(false);
const toggle = ref(null);
function close(event) {
  if (event.key === "Escape" && open.value) {
    open.value = false;
    toggle.value?.focus();
  }
}
function desktop(event) {
  if (event.matches) open.value = false;
}
let media;
onMounted(() => {
  document.addEventListener("keydown", close);
  media = window.matchMedia("(min-width: 800px)");
  media.addEventListener("change", desktop);
});
onUnmounted(() => {
  document.removeEventListener("keydown", close);
  media?.removeEventListener("change", desktop);
});
</script>
<template>
  <div class="contact-bar">
    <div class="wrap contact-bar-inner">
      <a :href="venue.tel"><IconSymbol name="phone" /> {{ venue.phone }}</a>
      <span v-if="venue.emailIsPlaceholder" class="contact-email"
        >{{ venue.email }} <small>пример адресе</small></span
      >      <a v-else :href="`mailto:${venue.email}`">{{ venue.email }}</a>
      <a
        class="contact-address"
        :href="venue.directions"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Отворите упутства у Гугл мапама за Етно село Дукат"
      >
        <IconSymbol name="map-pin" /> {{ venue.address }}, {{ venue.locality }}
      </a>
    </div>
  </div>
  <header class="site-header wrap">
    <a
      class="brand-link"
      :href="`${root()}/`"
      aria-label="Етно село ДУКАТ — почетак"
      @click="open = false"
      ><BrandMark
    /></a>
    <button
      ref="toggle"
      class="menu-toggle"
      :aria-expanded="open"
      aria-controls="main-navigation"
      @click="open = !open"
    >
      {{ open ? copy.menuClose : copy.menu }}
      <span aria-hidden="true">{{ open ? "×" : "☰" }}</span>
    </button>
    <nav id="main-navigation" aria-label="Главна навигација" :class="{ open }">
      <a
        v-for="item in navigation"
        :key="item.href"
        :href="item.href"
        :aria-current="current === item.id ? 'page' : undefined"
        @click="open = false"
        >{{ item.label }}</a
      >
    </nav>
  </header>
</template>
