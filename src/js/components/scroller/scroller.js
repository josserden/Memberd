import { scrollerStyles } from './scroller.styles.js';

export class Scroller extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.columns = parseInt(this.getAttribute('cols')) || 1;
    this.startOffset = parseInt(this.getAttribute('start-offset')) || 0;

    const counts = this.getAttribute('counts')?.split(',') || [];
    this.galleryItems = counts.map(count => {
      const normalizedCount = Number(count);
      const galleryItemsInColumn = [];

      for (let i = 1; i <= normalizedCount; i += 1) {
        const galleryItem = `
        <li class="gallery-item gallery-item-row-1">
          <img src="./img/hero/gallery/row-1/${i}.webp" alt="image of gallery" width="260" height="424" loading="lazy"/>
        </li>
      `;

        galleryItemsInColumn.push(galleryItem);
      }

      return {
        count: normalizedCount,
        items: galleryItemsInColumn.join(''),
      };
    });

    this.galleryHeight = 0;
    this.cloneHeight = 0;
    this.clonesPerColumn = 0;

    this.baseSizeInPx = 50;
    this.baseTimeInMs = 1000;
    this.speed = this.baseSizeInPx / this.baseTimeInMs;
  }

  static get observedAttributes() {
    return ['cols', 'counts', 'start-offset'];
  }

  connectedCallback() {
    if (!this.shadowRoot.isConnected) return;

    const style = document.createElement('style');
    style.textContent = scrollerStyles;
    this.shadowRoot.appendChild(style);

    let offset = this.startOffset;
    const columns = [];

    for (let i = 0; i < this.columns; i++) {
      const column = document.createElement('ul');
      column.classList.add('gallery-column');
      column.style.transform = `translateY(${offset}px)`;

      const galleryItemsInColumn = this.galleryItems[i]?.items || '';
      column.innerHTML = galleryItemsInColumn;

      this.shadowRoot.appendChild(column);
      columns.push(column);

      offset += Math.floor(Math.random() * 100 - 50);
    }

    this.cloneHeight =
      columns[0]?.querySelector('.gallery-item')?.offsetHeight || 0;
    this.galleryHeight = this.offsetHeight;
    this.clonesPerColumn = Math.ceil(this.galleryHeight / this.cloneHeight) + 1;

    columns.forEach(column => {
      for (let i = 0; i < this.clonesPerColumn; i += 1) {
        const galleryItem = column.querySelector('.gallery-item');

        if (!galleryItem) continue;

        const clone = galleryItem.cloneNode(true);
        clone.classList.add('clone');
        column.appendChild(clone);
      }
    });

    this.animate();
  }

  animate() {
    const columns = this.shadowRoot.querySelectorAll('.gallery-column');
    const startTime = performance.now();
    let newPosition = 0;

    const start = () => {
      const timestamp = performance.now();
      const elapsedTime = timestamp - startTime;
      newPosition = this.speed * elapsedTime;

      columns.forEach(column => {
        column.style.transform = `translateY(${newPosition}px)`;
      });

      requestAnimationFrame(start);
    };

    requestAnimationFrame(start);
  }
}
//redraw
//resize Observer - слудікування за зміною розміру елемента слідкує за всім деревом
//intersection Observer - спостерігає за тим чи елемент в зоні видимості і виконує певні дії або поуза
//manual pause
//додати метод play та pause
//при ресайзі рахувати клони - відокремити оригінал від клонів. мати два масиви
//mutation observer - спостерігає за зміною дерева але треба шоб не реагував на мої зміни  слідкує за оригіналом

//сцена
//камера
//інтерфейс

//обєкт
//світло
