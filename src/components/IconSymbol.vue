<script setup>
defineProps({ name: { type: String, required: true } });
</script>

<template>
  <svg class="icon-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <template v-if="name === 'phone'">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.63a2 2 0 0 1-.45 2.11L8.04 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.31 1.73.53 2.63.65A2 2 0 0 1 22 16.92Z" />
    </template>
    <template v-else-if="name === 'map-pin'">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" />
    </template>
    <template v-else-if="name === 'arrow-up-right'">
      <path d="M7 17 17 7" /><path d="M7 7h10v10" />
    </template>
    <template v-else-if="name === 'arrow-left'">
      <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
    </template>
    <template v-else-if="name === 'arrow-right'">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </template>
    <template v-else-if="name === 'arrow-down'">
      <path d="M12 5v14" /><path d="m5 12 7 7 7-7" />
    </template>
    <template v-else-if="name === 'arrow-up'">
      <path d="M12 19V5" /><path d="m5 12 7-7 7 7" />
    </template>
    <template v-else-if="name === 'utensils'">
      <path d="M4 3v8" /><path d="M2 3v4a2 2 0 0 0 4 0V3" /><path d="M4 11v10" />
      <path d="M16 3v18" /><path d="M16 3c3 1.5 4 4.2 4 7v2h-4" />
    </template>
    <template v-else-if="name === 'cloche'">
      <path d="M3 18h18" /><path d="M5 18c.4-4.8 3.1-8 7-8s6.6 3.2 7 8" />
      <path d="M12 10V8" /><path d="M10.5 8a1.5 1.5 0 0 1 3 0" />
      <path d="M6 21h12" />
    </template>
    <template v-else-if="name === 'bed'">
      <path d="M3 4v16" /><path d="M21 12v8" /><path d="M3 12h18" /><path d="M3 16h18" />
      <path d="M6 12V9a3 3 0 0 1 6 0v3" />
    </template>
    <template v-else-if="name === 'home'">
      <path d="m3 11 9-8 9 8v10H3V11Z" /><path d="M9 21v-6h6v6" />
    </template>
    <template v-else-if="name === 'tree'">
      <path d="M12 21V11" /><path d="m12 3-5 7h3l-4 6h12l-4-6h3l-5-7Z" />
    </template>
    <template v-else-if="name === 'calendar'">
      <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" />
    </template>
    <template v-else-if="name === 'glasses'">
      <path d="M4 4h6l-1 8a3 3 0 0 1-4 0L4 4Z" /><path d="M7 15v5" /><path d="M4 20h6" />
      <path d="M14 4h6l-1 8a3 3 0 0 1-4 0l-1-8Z" /><path d="M17 15v5" /><path d="M14 20h6" />
    </template>
    <template v-else-if="name === 'horse'">
      <path d="M6 20v-5l2-3V7l3-3 4 3 3 1v4l2 2v6" /><path d="M9 12h6" /><path d="M10 20v-3M17 20v-3" /><path d="M13 8h.01" />
    </template>
    <template v-else-if="name === 'goat'">
      <path d="M6 20v-5l2-3V8l2-3 2 3h4l2-3 1 4 2 2v4l-2 2v3" /><path d="M9 20v-3M17 20v-3" /><path d="M7 9 5 7M17 9l2-2" /><path d="M13 10h.01" />
    </template>
    <template v-else-if="name === 'dog'">
      <path d="M8 7 5 4 2 8l3 7 2-3M16 7l3-3 3 4-3 7-2-3" />
      <path d="M7 8a5 5 0 0 1 10 0v8a5 5 0 0 1-10 0V8Z" />
      <path d="M9 11h.01M15 11h.01M10 15h4l-2 2-2-2ZM12 17v2" />
    </template>
    <template v-else-if="name === 'cat'">
      <path d="M5 10 4 5l4 2a8 8 0 0 1 8 0l4-2-1 5v4a7 7 0 0 1-14 0v-4Z" /><path d="M9 14h.01M15 14h.01" /><path d="m10 17 2 1 2-1" /><path d="M3 15h4M17 15h4" />
    </template>
    <template v-else-if="name === 'bird'">
      <path d="M3 13c4-1 6-4 8-8 2 3 4 5 8 5-1 5-4 8-9 8-3 0-5-2-7-5Z" /><path d="M11 5c1 5 4 7 8 7" /><path d="M8 11h.01" />
    </template>
    <template v-else-if="name === 'playground'">
      <path d="M5 21V8l7-5 7 5v13" /><path d="M8 21v-6h8v6" /><path d="M3 10h18" /><path d="M3 21h18" />
    </template>
    <template v-else-if="name === 'camera'">
      <path d="M4 7h4l2-3h4l2 3h4v12H4V7Z" /><circle cx="12" cy="13" r="3.5" />
    </template>
  </svg>
</template>
