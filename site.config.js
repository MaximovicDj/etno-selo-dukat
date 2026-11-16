// The confirmed public origin is the default; hosting can override SITE_URL.
export const defaultSiteUrl = 'https://etnoselodukat.rs';
export const pages = [
  {
    file: 'index.html', path: '/', component: 'home', label: 'Почетна',
    title: 'Етно село Дукат | Restoran, smeštaj i proslave Obrenovac (Mislođin)',
    description: 'Етно село Дукат у Мислођину код Обреновца, у близини Београда. Ресторан домаће кухиње, смештај у магазама и сала за прославе. Позовите за резервацију.',
    image: 'images/dukat-banner-optimized.webp',
  },
  {
    file: 'restoran/index.html', path: '/restoran/', component: 'restaurant', label: 'Ресторан',
    title: 'Restoran domaće kuhinje Obrenovac | Етно село Дукат',
    description: 'Ресторан Етно село Дукат у Мислођину код Обреновца, близу Београда. Домаћа кухиња, јеловник, башта и тераса. Средом домаћа јела по 400 динара.',
    image: 'images/celebration-hall-wide.jpg',
  },
  {
    file: 'smestaj/index.html', path: '/smestaj/', component: 'stay', label: 'Смештај',
    title: 'Smeštaj u prirodi blizu Beograda i Obrenovca | Етно село Дукат',
    description: 'Смештај у Етно селу Дукат у Мислођину код Обреновца, близу Београда. Три традиционалне магазе, ноћење са доручком. Погледајте фотографије и позовите.',
    image: 'images/stay-hero-blue-cottage.png',
  },
  {
    file: 'proslave/index.html', path: '/proslave/', component: 'celebrations', label: 'Прославе',
    title: 'Sala za proslave Obrenovac i okolina | Етно село Дукат',
    description: 'Сала за прославе до 70 гостију у Мислођину код Обреновца, близу Београда. Етно село Дукат: домаћа храна, пакети и договор о термину. Позовите нас.',
    image: 'images/celebration-hall-wide.jpg',
  },
  {
    file: 'kontakt/index.html', path: '/kontakt/', component: 'contact', label: 'Контакт',
    title: 'Kontakt i lokacija | Етно село Дукат (Mislođin, Obrenovac)',
    description: 'Етно село Дукат, Оскара Давича 24, Мислођин код Обреновца. Позовите +381 64 005 0106 за ресторан, смештај и прославе. Упутства за долазак из Београда.',
    image: 'images/dukat-banner-optimized.webp',
  },
  // Legacy address stays usable, but shares the accommodation canonical URL.
  {
    file: 'magaze.html', path: '/smestaj/', component: 'stay', label: 'Смештај', legacy: true,
    title: 'Smeštaj u prirodi blizu Beograda i Obrenovca | Етно село Дукат',
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
