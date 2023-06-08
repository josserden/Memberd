import * as Carousel from './components/carousel.js';
import { getVariables } from './utils/variables.js';
import { initScroller } from './components/scroller.js';
import { toggleMenu } from './utils/toggleMenu.js';

const { burgerBtn, prevBtn, nextBtn } = getVariables();

// Menu
burgerBtn.addEventListener('click', toggleMenu);

// Carousel
prevBtn.addEventListener('click', Carousel.prevSlide);
nextBtn.addEventListener('click', Carousel.nextSlide);
Carousel.init();

// Scroller
initScroller();
