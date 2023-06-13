import { getVariables } from './utils/variables.js';
import { infiniteScrollerInit } from './components/infinite-scroller.js';

import { toggleMenu } from './utils/toggleMenu.js';

const { burgerBtn } = getVariables();

// Menu
burgerBtn.addEventListener('click', toggleMenu);

// Scroller
infiniteScrollerInit();
