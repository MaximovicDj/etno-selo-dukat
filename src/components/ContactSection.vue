<script setup>
import { venue, copy } from "../content";
import IconSymbol from "./IconSymbol.vue";
</script>
<template>
  <section
    id="kontakt"
    class="contact-section section-space"
    aria-labelledby="contact-heading"
  >
    <div class="wrap contact-grid">
      <div>
        <p class="eyebrow">{{ copy.practical.eyebrow }}</p>
        <h2 id="contact-heading">{{ copy.practical.title }}</h2>
        <p class="contact-intro">{{ copy.practical.description }}</p>
        <div class="contact-details">
          <div>
            <h3>{{ copy.practical.address }}</h3>
            <p>{{ venue.address }}<br />{{ venue.locality }}</p>
          </div>
          <div>
            <h3>{{ copy.practical.phone }}</h3>
            <a :href="venue.tel">{{ venue.phone }}</a>
          </div>
          <div class="hours">
            <h3>{{ copy.practical.hours }}</h3>
            <dl>
              <div>
                <dt>{{ venue.hours.days }}</dt>
                <dd>{{ venue.hours.time }}</dd>
              </div>
              <div>
                <dt>{{ venue.hours.closed }}</dt>
                <dd>{{ venue.hours.closedLabel }}</dd>
              </div>
            </dl>
            <p v-if="!venue.hours.verified" class="hours-notice">
              {{ venue.hours.notice }}
            </p>
          </div>
        </div>
      </div>
      <div class="location-panel">
        <div class="location-art" aria-hidden="true">
          <span class="map-ring ring-one"></span
          ><span class="map-ring ring-two"></span
          ><span class="map-road road-one"></span
          ><span class="map-road road-two"></span
          ><span class="map-road road-three"></span
          ><span class="map-marker">Д</span
          ><span class="map-town">МИСЛОЂИН</span>
        </div>
        <div class="location-card">
          <p class="eyebrow">{{ copy.practical.mapLabel }}</p>
          <h3>{{ copy.practical.map }}</h3>
          <p>{{ copy.practical.note }}</p>
          <a
            class="button button-dark"
            :href="venue.directions"
            target="_blank"
            rel="noopener noreferrer"
            >{{ copy.practical.mapLink }} <IconSymbol name="map-pin" /></a
          >
        </div>
      </div>
    </div>
  </section>
</template>
