import { getVariables } from '../variables.js';

const { burgerBtn, menu, body } = getVariables();

export const toggleMenu = () => {
  const isMenuOpen = burgerBtn.getAttribute('aria-expanded') === 'true';
  burgerBtn.setAttribute('aria-expanded', !isMenuOpen);
  menu.classList.toggle('is-open');

  if (isMenuOpen) {
    body.classList.remove('no-scroll');
    return;
  }

  body.classList.add('no-scroll');
};
