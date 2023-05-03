import { getVariables } from './js/variables.js';

const { burgerBtnOpen, menuOverlay, body, prevBtn, nextBtn } = getVariables();

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

burgerBtnOpen.addEventListener('click', toggleMenu);

prevBtn.addEventListener('click', () => {
  console.log('prev');
});
nextBtn.addEventListener('click', () => {
  console.log('next');
});
