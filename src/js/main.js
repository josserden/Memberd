import * as Carousel from './components/carousel.js';
import { Scroller } from './components/scroller/scroller.js';
import { toggleMenu } from './utils/toggleMenu.js';
import { getVariables } from './utils/variables.js';

const { burgerBtn, prevBtn, nextBtn } = getVariables();

customElements.define('custom-scroller', Scroller);

// Menu
burgerBtn.addEventListener('click', toggleMenu);
// Carousel
prevBtn.addEventListener('click', Carousel.prevSlide);
nextBtn.addEventListener('click', Carousel.nextSlide);
document.addEventListener('DOMContentLoaded', Carousel.init);
