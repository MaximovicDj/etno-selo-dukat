<script setup>
import RestaurantMenu from "./RestaurantMenu.vue";
import PhotoGallery from "./PhotoGallery.vue";

const foodImages = [
  {
    src: "images/food/charcuterie-platter.png",
    alt: "Мезе постављено на карираном столњаку.",
    width: 1920,
    height: 1080,
    label: "Мезе за заједнички сто",
  },
  {
    src: "images/food/lamb-ribs.png",
    alt: "Јагњећа ребарца са прилогом.",
    width: 1920,
    height: 1080,
    label: "Јагњећа ребарца са прилогом",
  },
  {
    src: "images/food/glazed-ribs-pickles.png",
    alt: "Ребарца са киселим краставчићима.",
    width: 1920,
    height: 1080,
    label: "Домаћа ребарца",
  },
  {
    src: "images/food/tomato-risotto.png",
    alt: "Пиринач са поврћем у земљаној посуди.",
    width: 1920,
    height: 1080,
    label: "Пиринач са поврћем",
  },
  {
    src: "images/food/breakfast-platter.png",
    alt: "Домаћи доручак на земљаном тањиру.",
    width: 1920,
    height: 1080,
    label: "Домаћи доручак",
  },
  {
    src: "images/food/burger-plates.png",
    alt: "Пљескавице са кромпиром.",
    width: 1920,
    height: 1080,
    label: "Пљескавица са кромпиром",
  },
  {
    src: "images/food/creamy-rice.png",
    alt: "Кремасти пиринач у земљаном тањиру.",
    width: 1920,
    height: 1080,
    label: "Кремасти пиринач",
  },
  {
    src: "images/food/croquette-platter.png",
    alt: "Поховани специјалитет са кромпиром.",
    width: 1920,
    height: 1080,
    label: "Поховани специјалитет",
  },
  {
    src: "images/food/garden-salads.png",
    alt: "Баштенске салате у земљаним посудама.",
    width: 1920,
    height: 1080,
    label: "Баштенске салате",
  },
  {
    src: "images/food/cevapi-garden.png",
    alt: "Ћевапи послужени у башти.",
    width: 1080,
    height: 1920,
    label: "Ћевапи у башти",
  },
  {
    src: "images/food/glazed-ribs-slaw.png",
    alt: "Ребарца са свежом салатом.",
    width: 1920,
    height: 1080,
    label: "Ребарца са свежом салатом",
  },
  {
    src: "images/food/grilled-fish.png",
    alt: "Риба на жару са прилогом.",
    width: 1920,
    height: 1080,
    label: "Риба на жару",
  },
  {
    src: "images/food/grilled-sandwich.png",
    alt: "Топли сендвич са ћевапима.",
    width: 1920,
    height: 1080,
    label: "Топли сендвич са ћевапима",
  },
  {
    src: "images/food/lettuce-salad.png",
    alt: "Свежа зелена салата.",
    width: 1920,
    height: 1080,
    label: "Свежа зелена салата",
  },
];
</script>

<template>
  <section id="restoran" class="restaurant-experience section-space" aria-labelledby="restaurant-page-title">
    <div class="wrap">
      <header class="restaurant-experience-heading">
        <p class="eyebrow">РЕСТОРАН · ЕТНО СЕЛО ДУКАТ</p>
        <h1 id="restaurant-page-title">Домаћа трпеза, време за разговор.</h1>
        <p>Уживајте у домаћим специјалитетима, припремљеним по традиционалним рецептима,<br />од свежих и квалитетних намирница.</p>
      </header>

      <RestaurantMenu />

    </div>
      <div class="restaurant-food">
        <PhotoGallery
          :images="foodImages"
          heading="Специјалитети наше кухиње"
          description="Уживајте у аутентичним јелима домаће кухиње, припремљеним по традиционалним рецептима нашег краја."
          label="Фотографије хране и амбијента ресторана"
        />
      </div>
  </section>
</template>
