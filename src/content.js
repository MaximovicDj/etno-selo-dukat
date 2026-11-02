// Owner-editable content. Only set hours.verified after confirming the schedule.
// Set an image's illustrative flag to false only after replacing it with a real photo.
const destination = "Etno selo DUKAT, Oskara Daviča 24, Mislođin 11500, Serbia";
export const venue = {
  name: "Етно село ДУКАТ",
  phone: "+381 64 005 0106",
  tel: "tel:+381640050106",
  // Confirmed contact email, displayed in the contact bar.
  email: "karatedubica@gmail.com",
  emailIsPlaceholder: false,
  address: "Оскара Давича 24",
  locality: "Мислођин 11500, Србија",
  location: "Мислођин · Обреновац · Србија",
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`,
  instagram: "https://www.instagram.com/etnoselodukat/",
  tiktok: "https://www.tiktok.com/@etno.selo.dukat",
  rating: {
    score: "4,8",
    count: 286,
    label: "Гугл оцена",
    source:
      "https://www.google.com/travel/hotels/entity/CgoIzNHHrP30wqQqEAE?gsas=1",
  },
  hours: {
    verified: false,
    days: "Уторак — недеља",
    time: "09:00–21:00",
    closed: "Понедељак",
    closedLabel: "Затворено",
    notice:
      "Радно време није потврђено. Молимо проверите телефоном пре доласка.",
  },
};
export const navigation = [
  { href: "#restoran", label: "Ресторан" },
  { href: "./magaze.html", label: "Смештај" },
  { href: "#proslave", label: "Прославе" },
  { href: "#dozivljaji", label: "Доживљаји" },
  { href: "#galerija", label: "Галерија" },
];
export const copy = {
  skip: "Пређи на садржај",
  call: "Позовите нас",
  directions: "Како до нас",
  contact: "Посетите нас",
  menu: "Мени",
  menuClose: "Затвори мени",
  hero: {
    eyebrow: "ДОБРО ДОШЛИ У ЕТНО СЕЛО ДУКАТ",
    title: ["Домаћи укуси.", "Мир природе."],
    description:
      "Место за дуг ручак, породични предах и мале радости. У Мислођину, близу Обреновца и Београда.",
    scroll: "Откријте наш кутак",
  },
  offer: {
    short: "Сваке среде — свако домаће јело 400 динара",
    eyebrow: "СРЕДА ИМА СВОЈ УКУС",
    title: "Средом се окупљамо за столом.",
    lead: "Сваке среде — свако домаће јело",
    price: "400",
    currency: "динара",
    description:
      "Омиљени дан за домаћи ручак и добро друштво. Свратите и уживајте у укусима домаће кухиње.",
    link: "Позовите за више информација",
  },
  restaurant: {
    eyebrow: "01 / ЗА НАШИМ СТОЛОМ",
    title: "Домаће је увек\nнајлепше.",
    description:
      "Добра храна не тражи много речи. У нашем ресторану чекају вас домаћа јела и пиће, уз опуштену атмосферу и време за разговор.",
    detail: "Заузмите своје место у башти, на тераси или у нашој сали. Останите још мало.",
    tags: ["Домаћа кухиња", "Башта и тераса"],
    link: "Чујемо се за ручак",
    icon: "phone",
  },
  accommodation: {
    eyebrow: "02 / ОСТАНИТЕ ЈОШ МАЛО",
    title: "Ноћ у магази.\nЈутро у свом ритму.",
    description:
      "Три магазе, један домаћински дочек. Продужите предах и преноћите у традиционалном магаза смештају, далеко од свакодневне журбе.",
    detail:
      "Упознајте наше три магазе и јавите нам се да заједно испланирамо ваш боравак.",
    link: "Погледајте све три магазе",
    href: "./magaze.html",
  },
  activities: {
    eyebrow: "03 / МАЛИ ТРЕНУЦИ, ЛЕПЕ УСПОМЕНЕ",
    title: "За мале истраживаче.\nИ велике предахе.",
    description:
      "Дан који је лепши напољу. Простор за игру, сусрети са животињама и заједничко време у природи.",
    items: [
      {
        number: "01",
        title: "Упознајте наше животиње",
        text: "Пони Срећко, муфлони, зечеви и голубови — мали сусрети који обрадују целу породицу.",
      },
      {
        number: "02",
        title: "Време за игру",
        text: "Дечје игралиште за мале авантуре, башта и тераса за породични предах.",
      },
      {
        number: "03",
        title: "Мир уз воду",
        text: "За љубитеље пецања, у близини постоји могућност за риболов.",
      },
    ],
  },
  gallery: {
    eyebrow: "ИНСПИРАЦИЈА ЗА ВАШ ПРЕДАХ",
    title: "Дух сеоског одмора",
    description:
      "Наш кутак у Мислођину и детаљи сеоског одмора. Откријте мир, природу и аутентичну атмосферу нашег имања.",
  },
  practical: {
    eyebrow: "СВРАТИТЕ У МИСЛОЂИН",
    title: "Лепо је кад\nнам дођете.",
    description:
      "Домаћи ручак, породични излет или ноћ у магази — ваш предах почиње овде.",
    address: "Где смо",
    phone: "Чујемо се",
    hours: "Радно време",
    note: "Близу Обреновца и Београда",
    map: "Пут води до доброг друштва.",
    mapLabel: "Мислођин, Србија",
    mapLink: "Отворите Гугл мапе",
  },
  footer: {
    tagline: "Домаћински, од срца.",
    instagram: "Пратите нас на Инстаграму",
    tiktok: "Пратите нас на ТикТоку",
    copyright: "Етно село ДУКАТ",
    bottom: "Мислођин · Србија",
  },
  imageNotice: "Илустрација — није фотографија објекта",
};
export const images = {
  venue: {
    src: "images/dukat-venue-cleaned.png",
    alt: "Дрвена табла Етно село Дукат, традиционални предмети и зеленило у дворишту.",
    illustrative: false,
    width: 1536,
    height: 1536,
    label: "Добро дошли у ДУКАТ",
  },
  poster: {
    src: "images/wednesday-poster.webp",
    alt: "Плакат Етно села ДУКАТ: среда је дан за домаћу кухињу, домаћа кувана јела по 400 динара. За данашњи избор јела позовите 064 005 0106.",
    illustrative: false,
    width: 456,
    height: 647,
    label: "Среда је дан за домаћу кухињу",
  },
  garden: {
    src: "images/rural-garden.webp",
    alt: "Илустрација замишљене сеоске баште са дрвеном кућом и столовима под крошњама.",
    illustrative: true,
    label: "Предах у зеленилу",
  },
  food: {
    src: "images/homemade-table.webp",
    alt: "Илустрација домаћег ручка у земљаним посудама на рустичном столу.",
    illustrative: true,
    label: "Укуси домаће кухиње",
  },
  restaurantCard: {
    src: "images/restaurant-highlight-card.png",
    alt: "Домаћа пита на столу у башти Етно села ДУКАТ.",
    illustrative: false,
    width: 1086,
    height: 1448,
    label: "Домаћа трпеза",
  },
  cottage: {
    src: "images/magaza-cottage.webp",
    alt: "Илустрација замишљене традиционалне дрвене магазе у зеленој башти.",
    illustrative: true,
    label: "Дух традиционалног дома",
  },
  stayCard: {
    src: "images/magaza-2.png",
    alt: "Плава традиционална кућица Магазе 2 у зеленом дворишту.",
    illustrative: false,
    width: 1024,
    height: 1536,
    label: "Плава Магаза 2",
  },
  animals: {
    src: "images/family-animals.webp",
    alt: "Илустрација понија и зечева поред дрвене ограде у сеоској башти.",
    illustrative: true,
    label: "Радост малих сусрета",
  },
};

// AI-restored version of the supplied venue photo. Keep the original for the gallery.
export const bannerImage = {
  ...images.venue,
  src: "images/dukat-banner-optimized.webp",
  width: 1536,
  height: 1536,
};

// These images are illustrative, never a representation of specific dishes or units.
const illustration = (file, alt, label) => ({
  src: `images/${file}.webp`,
  alt,
  label,
  illustrative: true,
});
export const restaurantImages = [
  {
    src: "images/menu-domacinski-uranak.png",
    alt: "Јеловник „Домаћински уранак“ са понудом доручка Етно села ДУКАТ.",
    illustrative: false,
    width: 1536,
    height: 1024,
    label: "Домаћински уранак — јеловник",
  },
  {
    src: "images/menu-megdan-na-zaru.png",
    alt: "Јеловник „Мегдан на жару“ са понудом јела са роштиља и из воде Етно села ДУКАТ.",
    illustrative: false,
    width: 1536,
    height: 1024,
    label: "Мегдан на жару — јеловник",
  },
  {
    src: "images/menu-hajducka-trpeza.png",
    alt: "Јеловник „Хајдучка трпеза“ са понудом јела са жара, из воде и пилетине Етно села ДУКАТ.",
    illustrative: false,
    width: 1536,
    height: 1024,
    label: "Хајдучка трпеза — јеловник",
  },
  images.food,illustration(
    "rustic-bread",
    "Илустрација домаћег хлеба и земљаног посуђа на везеном столњаку.",
    "За домаћом трпезом",
  ),
  illustration(
    "garden-table",
    "Илустрација постављеног стола у башти, са шољама, бокалом и пецивом.",
    "Још мало за столом",
  ),
];
export const animalGallery = [
  {
    name: "Пони Срећко",
    description: "Мали сусрет за велике осмехе — пони Срећко је увек занимљив малим истраживачима.",
    icon: "horse",
    theme: "ochre",
    image: {
      src: "images/animal-pony-reference-crop.png",
      alt: "Пони Срећко поред дрвене ограде у сеоском амбијенту.",
      width: 355,
      height: 250,
      label: "Пони Срећко",
    },
  },
  {
    name: "Козице",
    description: "Радознале козице су део нашег малог сеоског друштва.",
    icon: "goat",
    theme: "olive",
    image: {
      src: "images/animal-goats-real.jpg",
      alt: "Две козице у ограђеном делу Етно села ДУКАТ.",
      width: 959,
      height: 1440,
      label: "Козице",
    },
  },
  {
    name: "Мачке",
    description: "Нежни становници нашег села који лако освоје пажњу гостију.",
    icon: "cat",
    theme: "gold",
    image: {
      src: "images/animal-cats-real.jpg",
      alt: "Мачка са мачићима у дрвеној клупици са знаком Етно села ДУКАТ.",
      width: 1448,
      height: 1086,
      label: "Мачке",
    },
  },
  {
    name: "Голубови",
    description: "Застаните на тренутак и упознајте наше пернате комшије.",
    icon: "bird",
    theme: "terracotta",
    image: {
      src: "images/animal-pigeon-real-1.jpg",
      alt: "Бели голуб у голубарнику Етно села ДУКАТ.",
      width: 852,
      height: 1280,
      label: "Голубови",
    },
  },
  {
    name: "Голубови — још један сусрет",
    description: "Још један поглед на голубове који употпуњују сеоски амбијент.",
    icon: "bird",
    theme: "terracotta",
    image: {
      src: "images/animal-pigeon-real-2.jpg",
      alt: "Бело-црни голуб у голубарнику Етно села ДУКАТ.",
      width: 959,
      height: 1440,
      label: "Голубови",
    },
  },
];
export const playgroundImages = [
  {
    src: "images/playground-1.jpg",
    alt: "Деца на трамполини и дрвена љуљашка на игралишту Етно села ДУКАТ.",
    width: 852,
    height: 1280,
    label: "Игра, смех и природа",
  },
  {
    src: "images/playground-2.jpg",
    alt: "Дрвено дечје игралиште са љуљашком у дворишту Етно села ДУКАТ.",
    width: 852,
    height: 1280,
    label: "Кутак за мале авантуре",
  },
  {
    src: "images/playground-3.jpg",
    alt: "Тобоган и дрвене играчке у делу игралишта Етно села ДУКАТ.",
    width: 1279,
    height: 853,
    label: "Време за игру",
  },
  {
    src: "images/playground-chair-drawing.jpg",
    alt: "Дечји кутак са малим дрвеним столом, столицама и прибором за цртање у Етно селу ДУКАТ.",
    width: 1536,
    height: 2048,
    label: "Кутак за цртање",
  },
];

// Фотографије за галерију на почетној страници. Одвојене су од галерије
// смештаја како би се обе целине могле уређивати независно.
export const homeGalleryImages = [
  {
    src: "images/stay-gallery-courtyard-sign.png",
    alt: "Двориште Етно села ДУКАТ са дрвеним знаком и каменом стазом.",
    width: 1080,
    height: 1440,
    label: "Добро дошли у ДУКАТ",
  },
  {
    src: "images/magaza-1.png",
    alt: "Спољашњост Магазе 1 са црвеним дрвеним детаљима и цвећем.",
    width: 1024,
    height: 1536,
    label: "Шарена Магаза 1",
  },
  {
    src: "images/stay-gallery-yard-tools.png",
    alt: "Зелено двориште са старинским пољопривредним алатима и дрвеним бурадима.",
    width: 1080,
    height: 1440,
    label: "Детаљи сеоског дворишта",
  },
  {
    src: "images/magaza-2.png",
    alt: "Плава традиционална кућица Магазе 2 у зеленом дворишту.",
    width: 1024,
    height: 1536,
    label: "Плава Магаза 2",
  },
  {
    src: "images/dukat-fotografija-01.jpg",
    alt: "Традиционална кола у зеленом дворишту Етно села ДУКАТ.",
    width: 1536,
    height: 2048,
    label: "Традиционална кола",
  },
  {
    src: "images/dukat-fotografija-02.jpg",
    alt: "Башта са дрвеном надстрешницом и старинским колима у Етно селу ДУКАТ.",
    width: 1536,
    height: 2048,
    label: "Башта за дружење",
  },
  {
    src: "images/dukat-fotografija-05.jpg",
    alt: "Етно кутак са дрвеним знаком и традиционалним детаљима у Етно селу ДУКАТ.",
    width: 1536,
    height: 2048,
    label: "Етно кутак ДУКАТА",
  },
  {
    src: "images/dukat-fotografija-07.jpg",
    alt: "Зелено двориште Етно села ДУКАТ са старинским колима и баштом.",
    width: 1536,
    height: 2048,
    label: "Двориште у зеленилу",
  },
  {
    src: "images/dukat-fotografija-08.jpg",
    alt: "Старински плави алат и традиционалне магазе у дворишту Етно села ДУКАТ.",
    width: 1536,
    height: 2048,
    label: "Старински алати и магазе",
  },
];

export const galleryImages = [
  {
    src: "images/stay-gallery-garden-retreat.png",
    alt: "Поглед на зелено двориште Етно села ДУКАТ са стазама и дрвеним кутцима.",
    width: 1080,
    height: 1440,
    label: "Двориште Етно села ДУКАТ",
  },
  {
    src: "images/magaza-1-interior-1.png",
    alt: "Унутрашњост Магазе 1 са народним детаљима, гитаром и цветним прекривачем.",
    width: 1080,
    height: 1440,
    label: "Магаза 1 — унутрашњост",
  },
  {
    src: "images/stay-gallery-courtyard-sign.png",
    alt: "Двориште Етно села ДУКАТ са дрвеним знаком и каменом стазом.",
    width: 1080,
    height: 1440,
    label: "Добро дошли у ДУКАТ",
  },
  {
    src: "images/magaza-1.png",
    alt: "Спољашњост Магазе 1 са црвеним дрвеним детаљима и цвећем.",
    width: 1024,
    height: 1536,
    label: "Магаза 1 — споља",
  },
  {
    src: "images/magaza-1-interior-2.png",
    alt: "Кревет у Магази 1 са цветним прекривачем и традиционалним ћилимом.",
    width: 1440,
    height: 1080,
    label: "Магаза 1 — соба",
  },
  {
    src: "images/stay-gallery-yard-tools.png",
    alt: "Зелено двориште са старинским пољопривредним алатима и дрвеним бурадима.",
    width: 1080,
    height: 1440,
    label: "Детаљи сеоског дворишта",
  },
  {
    src: "images/magaza-2.png",
    alt: "Плава традиционална кућица Магазе 2 у зеленом дворишту.",
    width: 1024,
    height: 1536,
    label: "Магаза 2 — споља",
  },
  {
    src: "images/magaza-2-interior-1.jpg",
    alt: "Кревет и народни ћилим у унутрашњости Магазе 2.",
    width: 1080,
    height: 1440,
    label: "Магаза 2 — соба",
  },
  {
    src: "images/magaza-3.png",
    alt: "Спољашњост Магазе 3 са дрвеним степеништем и зеленим детаљима.",
    width: 1024,
    height: 1536,
    label: "Магаза 3",
  },
  {
    src: "images/magaza-1-interior-3.png",
    alt: "Кревет у Магази 1 са цветним прекривачем и каменим зидом.",
    width: 1080,
    height: 1440,
    label: "Магаза 1 — детаљи собе",
  },
  {
    src: "images/magaza-2-interior-2.jpg",
    alt: "Унутрашњи детаљ Магазе 2 са старинским огледалом и ћилимом.",
    width: 1080,
    height: 1440,
    label: "Магаза 2 — детаљи",
  },
  {
    src: "images/magaza-2-interior-3.jpg",
    alt: "Кревет, прозор и традиционални детаљи у Магази 2.",
    width: 1080,
    height: 1440,
    label: "Магаза 2 — унутрашњост",
  },
  {
    src: "images/magaza-2-interior-4.jpg",
    alt: "Дрвене греде и кревет у Магази 2.",
    width: 1080,
    height: 1440,
    label: "Магаза 2 — соба за одмор",
  },
];
// Owner-supplied photograph used only in the accommodation hero.
export const accommodationHeroImage = {
  src: "images/stay-hero-blue-cottage.png",
  alt: "Плава традиционална кућица са дрвеним колима и зеленилом у дворишту.",
  width: 1024,
  height: 1536,
  label: "Традиционални кутак за предах",
};

// Owner-supplied horizontal photograph used in the accommodation inquiry block.
// It is intentionally separate from the gallery so this call-to-action always keeps a calm, wide composition.
export const accommodationInquiryImage = {
  src: "images/magaza-1-interior-2.png",
  alt: "Традиционално уређена соба Магазе 1 са дрвеним креветом, ћилимом и цветним прекривачем.",
  width: 1448,
  height: 1086,
  label: "Предах у Магази 1",
};
export const accommodationPage = {
  eyebrow: "ТРИ МАГАЗЕ · ЈЕДАН ДОМАЋИНСКИ ДОЧЕК",
  title: "Останите још мало.\nОсећајте се као код куће.",
  description:
    "После домаћег ручка и дана у природи, нека се предах настави. У Етно селу ДУКАТ чекају вас три традиционалне магазе за ноћење — 35 € са доручком.",
  imageNote:
    "",
  inquiry: "Распитајте се о боравку",
  price: "35 € са доручком",
  back: "Назад на почетну",
  units: [
    {
      name: "Магаза 1",
      number: "01",
      description:
        "Успорите, удахните и останите још једну ноћ. Магаза 1 је један од наша три кутка за предах уз дух традиционалног дома.",
      image: {
        src: "images/magaza-1.png",
        alt: "Спољашњост Магазе 1 са црвеним дрвеним детаљима и цвећем.",
        label: "Магаза 1",
        width: 1024,
        height: 1536,
      },
      gallery: [
        {
          src: "images/magaza-1.png",
          alt: "Спољашњост Магазе 1 са црвеним дрвеним детаљима и цвећем.",
          label: "Магаза 1",
          width: 1024,
          height: 1536,
        },
        {
          src: "images/magaza-1-interior-1.png",
          alt: "Ентеријер Магазе 1 са дрвеним гредама, гитаром и традиционалним текстилом.",
          label: "Магаза 1 — ентеријер",
          width: 1086,
          height: 1536,
        },
        {
          src: "images/magaza-1-interior-2.png",
          alt: "Лежај у Магази 1 са цветним прекривачем и традиционалним детаљима.",
          label: "Магаза 1 — ентеријер",
          width: 1536,
          height: 1152,
        },
        {
          src: "images/magaza-1-interior-3.png",
          alt: "Ентеријер Магазе 1 са каменим зидом, лежајем и цветним прекривачем.",
          label: "Магаза 1 — ентеријер",
          width: 1086,
          height: 1536,
        },
      ],
    },
    {
      name: "Магаза 2",
      number: "02",
      description:
        "Нека дружење потраје до јутра. За ваш следећи боравак у сеоском амбијенту, распитајте се о магази 2 — радо ћемо вам помоћи да испланирате долазак.",
      image: {
        src: "images/magaza-2.png",
        alt: "Спољашњост Магазе 2, плаве традиционалне кућице у зеленом дворишту.",
        label: "Магаза 2",
        width: 1024,
        height: 1536,
      },
      gallery: [
        {
          src: "images/magaza-2.png",
          alt: "Спољашњост Магазе 2, плаве традиционалне кућице у зеленом дворишту.",
          label: "Магаза 2 — споља",
          width: 1024,
          height: 1536,
        },
        {
          src: "images/magaza-2-interior-1.jpg",
          alt: "Ентеријер Магазе 2 са дрвеним гредама и лежајем.",
          label: "Магаза 2 — ентеријер",
          width: 1536,
          height: 2048,
        },
        {
          src: "images/magaza-2-interior-2.jpg",
          alt: "Ентеријер Магазе 2 са лежајем и традиционалним текстилом.",
          label: "Магаза 2 — ентеријер",
          width: 1536,
          height: 2048,
        },
        {
          src: "images/magaza-2-interior-3.jpg",
          alt: "Ентеријер Магазе 2 са традиционалним ћилимом и лежајем.",
          label: "Магаза 2 — ентеријер",
          width: 1536,
          height: 2048,
        },
        {
          src: "images/magaza-2-interior-4.jpg",
          alt: "Ентеријер Магазе 2 са огледалом, столицом и традиционалним ћилимом.",
          label: "Магаза 2 — ентеријер",
          width: 1536,
          height: 2048,
        },
      ],
    },
    {
      name: "Магаза 3",
      number: "03",
      description:
        "Магаза 3 је тренутно у припреми. За информације о доступности, позовите нас.",
      status: "У припреми",
      image: {
        src: "images/magaza-3.png",
        alt: "Спољашњост Магазе 3 са зеленим дрвеним детаљима и степеништем.",
        label: "Магаза 3",
        width: 1024,
        height: 1536,
      },
      gallery: [
        {
          src: "images/magaza-3.png",
          alt: "Спољашњост Магазе 3 са зеленим дрвеним детаљима и степеништем.",
          label: "Магаза 3 — у припреми",
          width: 1024,
          height: 1536,
        },
      ],
    },
  ],
};

export const magazaImages = accommodationPage.units.flatMap((unit) => unit.gallery);

// Transcribed from the owner's supplied cenovnikzastolice.png. Prices are EUR per chair.
export const celebration = {
  eyebrow: "ЗА ВАШЕ НАЈЛЕПШЕ ТРЕНУТКЕ",
  title: "Прославите заједно.\nДомаћински, од срца.",
  description:
    "Окупите драге људе у нашој сали за прославе и догађаје. Топлина дрвета, традиционални детаљи и домаћа трпеза дају посебан печат вашем заједничком дану. Сала прима до 70 гостију.",
  organization:
    "За организацију прославе позовите нас: проверићемо слободан термин, број гостију — до 70 људи — и изабрани пакет, па договорити детаље вашег доласка. Мени можемо прилагодити вашим жељама.",
  cta: "Договорите своју прославу",
  image: {
    src: "images/celebration-hall-wide.jpg",
    width: 1086,
    height: 1448,
    illustrative: false,
    label: "Наша сала за прославе",
    alt: "Сала за прославе Етно села ДУКАТ са свечано постављеним столовима и традиционалним украсима.",
  },
  pricingTitle: "Понуда за прославе",
  pricingLead: "Изаберите мени за своју прославу.",
  menuIncluded: "Храна + домаће пиће укључено у цену",
  agreementTitle: "Договор око менија",
  agreementText: "Отворени смо за сваки договор и прилагођавање менија вашим жељама. Заједно можемо договорити избор хране и пића, као и састав менија према вашим потребама и врсти прославе.",
  agreementClosing: "Ваше је да славите — за храну, пиће и добру атмосферу препустите се нама!",  priceUnit: "/ по столици",
  booking: "Договорите термин",
  drinksTitle: "Домаћа пића",
  drinksLead: "У понуди домаћих и осталих пића:",
  drinkGroups: [
    { title: "Кафа", items: ["Домаћа кафа", "Еспресо", "Нес кафа"] },
    { title: "Жестока пића", items: ["Домаћа ракија — шљивовица и дуња", "Горки лист", "Вињак", "Вотка", "Џин", "Вермут"] },
    { title: "Пиво", items: ["Зајечарско", "Туборг"] },
    { title: "Вино", items: ["Винарија Алексић — бело, црвено и розе вино"] },
    { title: "Безалкохолна пића", items: ["Књаз Милош", "Аква Вива", "Пепси", "Миринда", "Кокта", "Сок од јабуке"] },
  ],
  packages: [
    {
      name: "Мени 1",
      price: 28,
      color: "#d9ae6c",
      items: [
        { title: "Башта салата", description: "Парадајз, краставац, купус, зелена салата и љута паприка." },
        { title: "Бели мрс", description: "Стари сир, качкаваљ, кајмак и урнебес." },
        { title: "Мешани роштиљ", description: "Ћевапи, кобасица, свињски врат, пилећи филе, димљена крилца, похована пилетина и пилећи батак, све сервирано са помфритом." },
        { title: "Хлеб", description: "" },
      ],
    },
    {
      name: "Мени 2",
      price: 35,
      color: "#e99a23",
      items: [
        { title: "Предјело", description: "Домаћа пршута, димљени врат, две врсте слане торте, кулен, будимска, руска салата, уштипци од теста и гიბаница." },
        { title: "Башта салата", description: "Парадајз, краставац, купус, зелена салата и љута паприка." },
        { title: "Бели мрс", description: "Стари сир, качкаваљ, кајмак и урнебес." },
        { title: "Мешани роштиљ", description: "Ћевапи, кобасица, свињски врат, пилећи филе, димљена крилца, похована пилетина и пилећи батак, све сервирано са помфритом." },
        { title: "Хлеб", description: "" },
      ],
    },
    {
      name: "Мени 3",
      price: 40,
      color: "#ff8b25",
      items: [
        { title: "Предјело", description: "Домаћа пршута, димљени врат, две врсте слане торте, кулен, будимска, руска салата, уштипци од теста и гибаница." },
        { title: "Мешана чорба", description: "" },
        { title: "Башта салата", description: "Парадајз, краставац, купус, зелена салата и љута паприка." },
        { title: "Бели мрс", description: "Стари сир, качкаваљ, кајмак и урнебес." },
        { title: "Мешани роштиљ", description: "Ћевапи, кобасица, свињски врат, пилећи филе, димљена крилца, похована пилетина и пилећи батак, све сервирано са помфритом." },
        { title: "Хлеб", description: "" },
      ],
    },
  ],
};















