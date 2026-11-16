<script setup>
import BrandMark from './components/BrandMark.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <div class="not-found-page">
    <a class="skip-link" href="#main">Пређи на садржај</a>
    <header class="not-found-header">
      <div class="wrap">
        <a href="/" aria-label="Етно село Дукат — почетна страница"><BrandMark /></a>
      </div>
    </header>
    <main id="main" class="wrap not-found-main">
      <div class="not-found-content">
        <p class="not-found-code" aria-hidden="true">404</p>
        <div class="not-found-ornament" aria-hidden="true">◇</div>
        <p class="eyebrow">Мало сте скренули са стазе</p>
        <h1>Страница није пронађена</h1>
        <p class="not-found-description">Страница коју тражите је премештена или не постоји. Вратите се на почетну и пронађите свој кутак у Етно селу Дукат.</p>
        <div class="not-found-actions">
          <a class="button button-dark" href="/">Назад на почетну</a>
          <a class="button not-found-secondary" href="/kontakt/">Контакт и локација</a>
        </div>
        <nav class="not-found-nav" aria-label="Истражите Етно село Дукат">
          <a href="/restoran/">Ресторан</a>
          <a href="/smestaj/">Смештај</a>
          <a href="/proslave/">Прославе</a>
        </nav>
      </div>
    </main>
    <SiteFooter home-href="/" />
  </div>
</template>

<style scoped>
.not-found-page { min-height: 100svh; display: flex; flex-direction: column; }
.not-found-header { padding-block: 16px; border-bottom: 1px solid var(--line); }
.not-found-header a { display: inline-flex; text-decoration: none; }
.not-found-main { flex: 1; display: grid; place-items: center; padding-block: 64px 80px; text-align: center; }
.not-found-content { max-width: 680px; }
.not-found-code { margin: 0; font: 400 clamp(100px, 20vw, 180px)/1 var(--serif); color: var(--gold); }
.not-found-ornament { display: flex; align-items: center; justify-content: center; gap: 18px; margin: 22px 0; color: var(--gold); }
.not-found-ornament::before, .not-found-ornament::after { content: ""; width: 64px; height: 1px; background: currentColor; }
.eyebrow { margin: 0 0 18px; }
h1 { margin: 0; font: 400 clamp(32px, 6vw, 52px)/1.2 var(--serif); color: var(--green); }
.not-found-description { max-width: 465px; margin: 24px auto 32px; line-height: 1.8; }
.not-found-actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 14px; }
.not-found-secondary { border: 1px solid var(--green); color: var(--green); }
.not-found-secondary:hover { background: #eaeadd; }
.not-found-nav { display: flex; justify-content: center; flex-wrap: wrap; gap: 16px 24px; margin-top: 32px; font-size: 14px; }
.not-found-nav a { text-underline-offset: 5px; }
@media (max-width: 480px) {
  .not-found-header { padding-block: 12px; }
  .not-found-main { padding-block: 40px 56px; }
  .not-found-actions { flex-direction: column; }
  .not-found-description { font-size: 15px; }
}
</style>
