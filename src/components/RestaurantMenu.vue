<script setup>
import { computed, nextTick, ref } from 'vue';
import { restaurantMenu } from '../restaurantMenu';
import { venue } from '../content';
import IconSymbol from './IconSymbol.vue';

const activeIndex = ref(0);
const active = computed(() => restaurantMenu[activeIndex.value]);
const tabs = ref([]);
const price = value => new Intl.NumberFormat('sr-RS', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
async function navigate(event, index) {
  let target;
  if (event.key === 'ArrowRight') target = (index + 1) % restaurantMenu.length;
  if (event.key === 'ArrowLeft') target = (index + restaurantMenu.length - 1) % restaurantMenu.length;
  if (event.key === 'Home') target = 0;
  if (event.key === 'End') target = restaurantMenu.length - 1;
  if (target === undefined) return;
  event.preventDefault();
  activeIndex.value = target;
  await nextTick();
  tabs.value[target]?.focus();
}
</script>

<template>
  <div id="menu-prikaz" class="readable-menu">
    <div class="readable-menu__intro">
      <h2>Наш јеловник</h2>
      <p>Од првог залогаја до дугог ручка.</p>
    </div>
    <div class="readable-menu__tabs" role="tablist" aria-label="Изаберите јеловник">
      <button v-for="(menu, index) in restaurantMenu" :id="`menu-tab-${menu.id}`" :key="menu.id"
        :ref="el => tabs[index] = el" type="button" role="tab" :aria-selected="index === activeIndex"
        :aria-controls="`menu-panel-${menu.id}`" :tabindex="index === activeIndex ? 0 : -1"
        @click="activeIndex = index" @keydown="navigate($event, index)">
        <span>{{ menu.title }}</span><small>{{ menu.subtitle }}</small>
      </button>
    </div>
    <section v-for="(menu, index) in restaurantMenu" v-show="index === activeIndex" :id="`menu-panel-${menu.id}`"
      :key="menu.id" class="readable-menu__panel" role="tabpanel" :aria-labelledby="`menu-tab-${menu.id}`" tabindex="0">
      <p class="readable-menu__currency">Цене су у динарима · РСД</p>
      <div class="readable-menu__columns">
        <section v-for="group in menu.groups" :key="group.title" class="readable-menu__group">
          <h3>{{ group.title }}</h3>
          <ul>
            <li v-for="(item, itemIndex) in group.items" :key="itemIndex" class="readable-menu__dish">
              <div class="readable-menu__dish-copy">
                <h4>{{ item.name }} <span v-if="item.portion">{{ item.portion }}</span></h4>
                <p v-if="item.description">{{ item.description }}</p>
              </div>
              <span class="readable-menu__price">{{ price(item.price) }}</span>
            </li>
          </ul>
        </section>
      </div>
    </section>
    <div class="readable-menu__footer">
      <a class="readable-menu__original" :href="`/${active.source}`" target="_blank" rel="noopener"
        :aria-label="`Погледајте оригинални јеловник: ${active.title} (отвара се у новом прозору)`">
        <IconSymbol name="zoom-in" /> Погледајте оригинални јеловник
      </a>
      <a class="readable-menu__call" :href="venue.tel"><IconSymbol name="phone" /> Позовите за резервацију</a>
    </div>
  </div>
</template>

<style scoped>
.readable-menu { max-width: 1020px; margin: 20px auto 0; color: #263c2b; }
.readable-menu__intro { text-align: center; margin-bottom: 14px; }
.readable-menu__intro h2 { margin: 0 0 6px; font-size: clamp(30px, 3vw, 38px); }
.readable-menu__intro p { margin: 0; color: #675f50; font-size: 16px; }
.readable-menu__tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.readable-menu__tabs button { display: grid; gap: 5px; align-content: center; min-height: 68px; padding: 10px 12px; border: 1px solid #b9ab8e; border-radius: 14px 14px 0 0; background: #f4eddf; color: #344332; cursor: pointer; font: inherit; text-align: center; transition: background .18s, color .18s; }
.readable-menu__tabs button[aria-selected="true"] { background: #294333; color: #fffaf0; border-color: #294333; }
.readable-menu__tabs button:hover { background: #e9dfca; }
.readable-menu__tabs button[aria-selected="true"]:hover { background: #34523f; }
.readable-menu__tabs span { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(22px, 2.2vw, 29px); font-weight: 700; line-height: 1.12; }
.readable-menu__tabs small { font-size: 12px; line-height: 1.4; }
.readable-menu__panel { padding: 14px 26px 18px; background: #fffaf0; border: 1px solid #d6c7a8; border-top: 3px solid #b59a60; border-radius: 0 0 18px 18px; box-shadow: 0 12px 30px #3c29100a; }
.readable-menu__currency { margin: 0 0 8px; color: #706754; font-size: 12px; text-align: right; }
.readable-menu__columns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 30px; }
.readable-menu__group { min-width: 0; }
.readable-menu__panel::before, .readable-menu__panel::after,
.readable-menu__group::before, .readable-menu__group::after { content: none; }
.readable-menu__group h3 { margin: 0 0 4px; padding-bottom: 8px; border-bottom: 1px solid #bea571; font-size: 30px; line-height: 1.15; }
.readable-menu__group ul { list-style: none; padding: 0; margin: 0; }
.readable-menu__dish { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: baseline; gap: 14px; padding: 8px 0; border-bottom: 1px solid #ded4bf; }
.readable-menu__dish:last-child { border-bottom: 0; }
.readable-menu__dish h4 { margin: 0; font-family: 'Noto Sans', sans-serif; font-size: 16px; font-weight: 600; line-height: 1.55; }
.readable-menu__dish h4 span { display: inline-block; color: #766b56; font-size: 13px; font-weight: 400; white-space: nowrap; margin-left: 5px; }
.readable-menu__dish p { margin: 3px 0 0; color: #6a6255; font-size: 14px; line-height: 1.5; }
.readable-menu__price { color: #294333; font-size: 16px; font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }
.readable-menu__footer { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 18px; padding: 12px 0 0; }
.readable-menu__footer a { display: inline-flex; align-items: center; justify-content: center; gap: 9px; font-size: 14px; line-height: 1.5; min-height: 44px; }
.readable-menu__footer svg { width: 18px; height: 18px; flex-shrink: 0; }
.readable-menu__original { color: #435438; text-underline-offset: 5px; }
.readable-menu__call { padding: 11px 20px; border-radius: 24px; background: #294333; color: #fffaf0; text-decoration: none; }
.readable-menu :is(button, a, [role="tabpanel"]):focus-visible { outline: 3px solid #b18a3c; outline-offset: 4px; }
@media (max-width: 699px) {
  .readable-menu { margin-top: 18px; }
  .readable-menu__tabs { gap: 5px; }
  .readable-menu__tabs button { padding: 8px 5px; min-height: 82px; border-radius: 10px 10px 0 0; }
  .readable-menu__tabs span { font-size: clamp(16px, 4.6vw, 19px); overflow-wrap: anywhere; }
  .readable-menu__tabs small { font-size: 10px; }
  .readable-menu__panel { padding: 12px 16px 14px; }
  .readable-menu__columns { grid-template-columns: minmax(0, 1fr); gap: 20px; }
  .readable-menu__group h3 { font-size: 28px; }
  .readable-menu__dish { gap: 10px; padding: 9px 0; }
  .readable-menu__dish h4, .readable-menu__price { font-size: 15px; }
  .readable-menu__footer { justify-content: center; gap: 10px; }
  .readable-menu__call { width: 100%; }
}
</style>
