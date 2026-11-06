<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import ResponsiveImage from './ResponsiveImage.vue';
import IconSymbol from './IconSymbol.vue';
import '../gallery.css';

const props = defineProps({
  images: { type: Array, default: () => [] },
  open: Boolean,
  startIndex: { type: Number, default: 0 },
  label: { type: String, default: 'Галерија фотографија' },
});
const emit = defineEmits(['close']);
const dialog = ref(null);
const active = ref(0);
const image = computed(() => props.images[active.value]);
let returnFocus;
let previousOverflow;
let startX = null;

function move(step) {
  active.value = (active.value + step + props.images.length) % props.images.length;
}
function close() { emit('close'); }
function restore() {
  dialog.value?.close();
  if (previousOverflow !== undefined) {
    document.body.style.overflow = previousOverflow;
    previousOverflow = undefined;
  }
  if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
}
function keyboard(event) {
  if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
  if (event.key === 'Home') { event.preventDefault(); active.value = 0; }
  if (event.key === 'End') { event.preventDefault(); active.value = props.images.length - 1; }
}
function swipe(event) {
  const delta = event.changedTouches[0].clientX - startX;
  if (startX !== null && Math.abs(delta) > 50) move(delta < 0 ? 1 : -1);
  startX = null;
}
watch(() => props.open, async open => {
  if (!open) { restore(); return; }
  returnFocus = document.activeElement;
  active.value = Math.max(0, Math.min(props.startIndex, props.images.length - 1));
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  await nextTick();
  if (props.open) dialog.value?.showModal();
}, { immediate: true, flush: 'post' });
onBeforeUnmount(restore);
</script>

<template>
  <Teleport to="#image-lightboxes">
    <dialog
      v-if="open && image"
      ref="dialog"
      class="image-lightbox"
      :aria-label="label"
      @cancel.prevent="close"
      @click.self="close"
      @keydown="keyboard"
    >
      <div class="image-lightbox__toolbar">
        <button type="button" class="image-lightbox__close" aria-label="Затвори галерију" autofocus @click="close">
          <IconSymbol name="close" />
        </button>
      </div>
      <div
        class="image-lightbox__canvas"
        @touchstart.passive="startX = $event.touches[0].clientX"
        @touchend.passive="swipe"
        @touchcancel="startX = null"
      >
        <ResponsiveImage :key="image.src" :source="image.src" :alt="image.alt" eager priority="high" sizes="100vw" draggable="false" />
      </div>
      <template v-if="images.length > 1">
        <button type="button" class="image-lightbox__arrow image-lightbox__arrow--previous" aria-label="Претходна фотографија" @click="move(-1)"><IconSymbol name="arrow-left" /></button>
        <button type="button" class="image-lightbox__arrow image-lightbox__arrow--next" aria-label="Следећа фотографија" @click="move(1)"><IconSymbol name="arrow-right" /></button>
      </template>
      <p class="image-lightbox__caption" aria-live="polite">{{ image.label || image.alt }}</p>
    </dialog>
  </Teleport>
</template>
