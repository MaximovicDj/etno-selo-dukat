import { mountPage } from './mount';
import AccommodationPage from "./AccommodationPage.vue";
import "./style.css";
import "./ethno.css";
import "./enhancements.css";
mountPage(AccommodationPage, { depth: location.pathname.endsWith('/magaze.html') ? 0 : 1 });
