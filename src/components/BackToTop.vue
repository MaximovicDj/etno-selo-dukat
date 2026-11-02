<script setup>

import { onBeforeUnmount, onMounted, ref } from "vue";
import IconSymbol from "./IconSymbol.vue";

const visible = ref(false);

const updateVisibility = () => {
  visible.value = window.scrollY > 520;
};

const goToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

onMounted(() => {
  updateVisibility();
  window.addEventListener("scroll", updateVisibility, { passive: true });
});

onBeforeUnmount(() => window.removeEventListener("scroll", updateVisibility));

</script>

<template>
  <button
    v-show="visible"
    class="back-to-top"
    type="button"
    aria-label="Назад на врх странице"
    title="Назад на врх"
    @click="goToTop"
  >
    <IconSymbol name="arrow-up" />
    <span class="back-to-top-label">На врх</span>
  </button>
</template>
