import { getVariables } from './variables.js';

const { burgerBtn, menu, body, prevBtn, nextBtn, carousel, carouselItems } =
  getVariables();

let currentSlideIndex = 0;
const lastSlideIndex = carouselItems.length - 1;

const toggleMenu = () => {
  const isMenuOpen = burgerBtn.getAttribute('aria-expanded') === 'true';
  burgerBtn.setAttribute('aria-expanded', !isMenuOpen);
  menu.classList.toggle('is-open');

  if (isMenuOpen) {
    body.classList.remove('no-scroll');
  } else {
    body.classList.add('no-scroll');
  }
};

const goToSlide = index => {
  if (index < 0 || index > lastSlideIndex) return;

  const scrollAmount = carouselItems[index].offsetLeft;

  carousel.scrollTo({
    left: scrollAmount,
    behavior: 'smooth',
  });
};

const handlePrevBtnClick = () => {
  if (currentSlideIndex === 0) return;

  currentSlideIndex -= 1;
  goToSlide(currentSlideIndex);
};

const handleNextBtnClick = () => {
  if (currentSlideIndex === lastSlideIndex) {
    currentSlideIndex = 0;
    goToSlide(currentSlideIndex);
    return;
  }

  currentSlideIndex += 1;
  goToSlide(currentSlideIndex);
};

burgerBtn.addEventListener('click', toggleMenu);
prevBtn.addEventListener('click', handlePrevBtnClick);
nextBtn.addEventListener('click', handleNextBtnClick);

document.addEventListener('DOMContentLoaded', () => {
  goToSlide(currentSlideIndex);
});
