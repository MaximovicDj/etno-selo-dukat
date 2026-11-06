import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import Home from './App.vue';
import Restaurant from './RestaurantPage.vue';
import Stay from './AccommodationPage.vue';
import Celebrations from './CelebrationsPage.vue';
import Contact from './ContactPage.vue';

const components = { home: Home, restaurant: Restaurant, stay: Stay, celebrations: Celebrations, contact: Contact };
export async function render(page, props = {}) {
  const component = components[page];
  if (!component) throw new Error(`Unknown page: ${page}`);
  const context = {};
  const html = await renderToString(createSSRApp(component, props), context);
  return { html, lightboxes: context.teleports?.['#image-lightboxes'] || '' };
}
