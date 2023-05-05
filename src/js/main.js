import { getVariables } from './variables.js';
import { toggleMenu } from './utils/toogleMenu.js';
import * as Carousel from './components/carousel.js';

const { burgerBtn, prevBtn, nextBtn } = getVariables();

// Menu
burgerBtn.addEventListener('click', toggleMenu);
// Carousel
prevBtn.addEventListener('click', Carousel.prevSlide);
nextBtn.addEventListener('click', Carousel.nextSlide);
document.addEventListener('DOMContentLoaded', Carousel.init);
