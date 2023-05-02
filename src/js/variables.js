export const getVariables = () => {
  return {
    body: document.querySelector('body'),
    burgerBtnOpen: document.querySelector('.js-burger-btn'),
    burgerBtnClose: document.querySelector('.js-burger-btn-close'),
    menuOverlay: document.querySelector('.js-menu-overlay'),
  };
};
