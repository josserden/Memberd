export const getVariables = () => {
  return {
    body: document.querySelector('body'),
    burgerBtn: document.querySelector('[data-menu-button]'),
    carousel: document.querySelector('[data-carousel]'),
    carouselItems: document.querySelectorAll('[data-carousel-item]'),
    menu: document.querySelector('[data-menu]'),
    nextBtn: document.querySelector('[data-next-button]'),
    prevBtn: document.querySelector('[data-prev-button]'),
  };
};
