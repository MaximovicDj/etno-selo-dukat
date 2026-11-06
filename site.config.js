// Set SITE_URL in .env.production (or the hosting build environment) before publishing.
export const pages = [
  {
    file: 'index.html', path: '/', component: 'home', label: 'Почетна',
    title: 'Етно село Дукат | Ресторан и смештај код Обреновца',
    description: 'Етно село Дукат у Мислођину код Обреновца, у близини Београда. Ресторан домаће кухиње, смештај у магазама и сала за прославе. Позовите за резервацију.',
    image: 'images/dukat-banner-optimized.webp',
  },
  {
    file: 'restoran/index.html', path: '/restoran/', component: 'restaurant', label: 'Ресторан',
    title: 'Ресторан код Обреновца, Мислођин | Етно село Дукат',
    description: 'Ресторан Етно село Дукат у Мислођину код Обреновца, близу Београда. Домаћа кухиња, јеловник, башта и тераса. Средом домаћа јела по 400 динара.',
    image: 'images/celebration-hall-wide.jpg',
  },
  {
    file: 'smestaj/index.html', path: '/smestaj/', component: 'stay', label: 'Смештај',
    title: 'Смештај код Обреновца — ноћење у магазама | Дукат',
    description: 'Смештај у Етно селу Дукат у Мислођину код Обреновца, близу Београда. Три традиционалне магазе, ноћење са доручком. Погледајте фотографије и позовите.',
    image: 'images/stay-hero-blue-cottage.png',
  },
  {
    file: 'proslave/index.html', path: '/proslave/', component: 'celebrations', label: 'Прославе',
    title: 'Сала за прославе код Обреновца | Етно село Дукат',
    description: 'Сала за прославе до 70 гостију у Мислођину код Обреновца, близу Београда. Етно село Дукат: домаћа храна, пакети и договор о термину. Позовите нас.',
    image: 'images/celebration-hall-wide.jpg',
  },
  {
    file: 'kontakt/index.html', path: '/kontakt/', component: 'contact', label: 'Контакт',
    title: 'Контакт и локација — Мислођин, Обреновац | Дукат',
    description: 'Етно село Дукат, Оскара Давича 24, Мислођин код Обреновца. Позовите +381 64 005 0106 за ресторан, смештај и прославе. Упутства за долазак из Београда.',
    image: 'images/dukat-banner-optimized.webp',
  },
  // Legacy address stays usable, but shares the accommodation canonical URL.
  {
    file: 'magaze.html', path: '/smestaj/', component: 'stay', label: 'Смештај', legacy: true,
    title: 'Смештај код Обреновца — ноћење у магазама | Дукат',
    description: 'Три традиционалне магазе за ноћење са доручком у Етно селу Дукат, Мислођин код Обреновца, у близини Београда. Позовите за доступност и резервацију.',
    image: 'images/stay-hero-blue-cottage.png',
  },
];

export function normalizeSiteUrl(value = '') {
  if (!value.trim()) return '';
  const url = new URL(value.trim());
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error('SITE_URL must be the public site origin, e.g. https://your-domain.rs (without a path, query or credentials).');
  }
  return url.origin;
}
