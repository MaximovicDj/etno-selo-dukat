<script setup>
import VenueImage from "./VenueImage.vue";
import ImageCarousel from "./ImageCarousel.vue";
import IconSymbol from "./IconSymbol.vue";
import { venue } from "../content";
defineProps({
  id: String,
  content: Object,
  image: Object,
  gallery: Array,
  galleryVariant: { type: String, default: "single" },
  reverse: Boolean,
});
</script>
<template>
  <section
    :id="id"
    class="story-section section-space"
    :aria-labelledby="`${id}-heading`"
  >
    <div class="story wrap" :class="{ reverse }">
      <ImageCarousel
        v-if="gallery?.length"
        :images="gallery"
        :label="content.title.replaceAll('\n', ' ')"
        :variant="galleryVariant"
      />
      <VenueImage v-else :image="image" />
      <div class="story-copy">
        <p class="eyebrow">{{ content.eyebrow }}</p>
        <h2 :id="`${id}-heading`">{{ content.title }}</h2>
        <p>{{ content.description }}</p>
        <p class="story-detail">{{ content.detail }}</p>
        <div v-if="content.tags" class="tags">
          <span v-for="tag in content.tags" :key="tag">{{ tag }}</span>
        </div>
        <a class="text-link" :href="content.href || venue.tel"
          >{{ content.link }} <IconSymbol :name="content.icon || 'arrow-right'" /></a
        >
      </div>
    </div>
  </section>
</template>
