export const getVariables = () => {
  return {
    body: document.querySelector('body'),
    burgerBtnOpen: document.querySelector('.js-burger-btn'),
    carousel: document.querySelector('.js-carousel'),
    carouselItems: document.querySelectorAll('.js-carousel-item'),
    menuOverlay: document.querySelector('.js-menu-overlay'),
    nextBtn: document.querySelector('.js-btn-next'),
    prevBtn: document.querySelector('.js-btn-prev'),
  };
};
