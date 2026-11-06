import { createApp, createSSRApp } from 'vue';

export function mountPage(component, props = {}) {
  const target = document.getElementById('app');
  const app = target?.hasAttribute('data-prerendered') ? createSSRApp(component, props) : createApp(component, props);
  app.mount(target);
}
