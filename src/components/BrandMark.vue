<script setup>
import ResponsiveImage from './ResponsiveImage.vue';
</script>

<template>
  <span class="brand">
    <ResponsiveImage
      class="brand-logo"
      source="images/dukat-logo-enhanced.png"
      sizes="(max-width: 599px) 64px, 74px"
      eager
      alt="Етно село Дукат"
    />
    <span class="brand-words">
      <span class="brand-small">ЕТНО СЕЛО</span>
      <span class="brand-name">ДУКАТ</span>
    </span>
  </span>
</template>
