import { getVariables } from './js/variables.js';

const {
  burgerBtnOpen,
  menuOverlay,
  body,
  prevBtn,
  nextBtn,
  carousel,
  carouselItems,
} = getVariables();

let currentSlideIndex = 0;
const lastSlideIndex = carouselItems.length - 1;

const toggleMenu = () => {
  const isMenuOpen = burgerBtnOpen.getAttribute('aria-expanded') === 'true';
  burgerBtnOpen.setAttribute('aria-expanded', !isMenuOpen);
  menuOverlay.classList.toggle('is-open');

  if (isMenuOpen) {
    body.classList.remove('no-scroll');
  } else {
    body.classList.add('no-scroll');
  }
};

const goToSlide = index => {
  if (index < 0 || index > lastSlideIndex) return;

  const scrollAmount =
    carouselItems[index].offsetLeft - carouselItems[0].offsetLeft;

  carousel.scrollTo({
    left: scrollAmount,
    behavior: 'smooth',
  });
};

const handlePrevBtnClick = () => {
  currentSlideIndex -= 1;
  goToSlide(currentSlideIndex);
};

const handleNextBtnClick = () => {
  if (currentSlideIndex === lastSlideIndex) return;

  currentSlideIndex += 1;
  goToSlide(currentSlideIndex + 1);
};

burgerBtnOpen.addEventListener('click', toggleMenu);
prevBtn.addEventListener('click', handlePrevBtnClick);
nextBtn.addEventListener('click', handleNextBtnClick);
