import { getVariables } from './js/variables.js';

const { burgerBtnOpen, menuOverlay, body } = getVariables();

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
