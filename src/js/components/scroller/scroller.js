import { scrollerStyles } from './scroller.styles.js';

export class Scroller extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.columns = this.getAttribute('cols') || 1;
    this.galleryHeight = 0;
    this.cloneHeight = 0;
    this.clonesPerColumn = 0;
  }

  static get observedAttributes() {
    return ['cols'];
  }

  connectedCallback() {
    const style = document.createElement('style');
    style.textContent = scrollerStyles;
    this.shadowRoot.appendChild(style);

    for (let i = 0; i < this.columns; i += 1) {
      const column = document.createElement('ul');
      column.classList.add('gallery-column');
      column.innerHTML = `
            <li class='gallery-item gallery-item-row-1'>
              <img
                src='./img/hero/gallery/row-1/${i + 1}.webp'
                alt='image of gallery'
                width='260'
                height='424'
                loading='lazy'
              />
            </li>
      `;
      this.shadowRoot.appendChild(column);
    }

    const columns = this.shadowRoot.querySelectorAll('.gallery-column');
    this.cloneHeight = columns[0].querySelector('.gallery-item').offsetHeight;
    this.galleryHeight = this.offsetHeight;
    this.clonesPerColumn = Math.ceil(this.galleryHeight / this.cloneHeight) + 1;

    columns.forEach(column => {
      for (let i = 0; i < this.clonesPerColumn; i += 1) {
        const clone = column.querySelector('.gallery-item').cloneNode(true);
        clone.classList.add('clone');
        column.appendChild(clone);
      }
    });

    this.animate();
  }

  animate() {
    const columns = this.shadowRoot.querySelectorAll('.gallery-column');
    const baseSizeInPx = 250;
    const baseTimeInMs = 1000;
    const speed = baseSizeInPx / baseTimeInMs;
    const timeWithFrameRate = 16;
    let startTime = null;
    let newPosition = 0;

    const start = () => {
      const timestamp = Date.now();

      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;

      columns.forEach(column => {
        const currentPosition = column.offsetTop;
        newPosition = Math.round((speed * elapsed) / timeWithFrameRate);
        const isEnd = currentPosition + newPosition >= this.galleryHeight;

        if (isEnd) {
          column.style.transform = `translateY(0px)`;
          startTime = null;
          return;
        }

        column.style.transform = `translateY(${-newPosition}px)`;
      });

      requestAnimationFrame(start);
    };

    requestAnimationFrame(start);
  }
}