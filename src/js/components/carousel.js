import { getVariables } from '../utils/variables.js';

const { carousel, carouselItems } = getVariables();

let currentSlideIndex = 0;
const lastSlideIndex = carouselItems.length - 1;

const goToSlide = index => {
  if (index < 0 || index > lastSlideIndex) return;

  const scrollAmount = carouselItems[index].offsetLeft;

  carousel.scrollTo({
    left: scrollAmount,
    behavior: 'smooth',
  });
};

export const prevSlide = () => {
  if (currentSlideIndex === 0) return;

  currentSlideIndex -= 1;
  goToSlide(currentSlideIndex);
};

export const nextSlide = () => {
  if (currentSlideIndex === lastSlideIndex) {
    currentSlideIndex = 0;
    goToSlide(currentSlideIndex);
    return;
  }

  currentSlideIndex += 1;
  goToSlide(currentSlideIndex);
};

export const init = () => {
  goToSlide(currentSlideIndex);
};
