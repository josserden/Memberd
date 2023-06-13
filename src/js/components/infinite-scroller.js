const ORIENTATION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};
const DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
};
const DEFAULT_VALUES = {
  SIZE_IN_PX: 100,
  TIME_IN_MS: 1000,
  POSITION: 0,
};

class InfiniteScroller extends HTMLElement {
  constructor() {
    super();
    this.speedValue =
      parseInt(this.getAttribute('speed')) || DEFAULT_VALUES.SIZE_IN_PX;
    this.direction = this.getAttribute('direction') || DIRECTION.LEFT;
    this.orientation =
      this.getAttribute('orientation') || ORIENTATION.HORIZONTAL;
    this.speed = this.speedValue / DEFAULT_VALUES.TIME_IN_MS;
    this.position = DEFAULT_VALUES.POSITION;
    this.startTime = performance.now();
    this.isRunning = false;
    this.galleryItems = [];
    this.cloneItems = [];
  }

  static get observedAttributes() {
    return ['orientation', 'speed', 'direction'];
  }

  connectedCallback() {
    this.runScroller();
    this.moveItems();

    console.log(document.querySelector('.hero').offsetHeight);
  }

  runScroller() {
    this.isRunning = true;

    const startRunning = () => {
      if (!this.isRunning) return;

      const timestamp = performance.now();
      const elapsedTime = timestamp - this.startTime;
      this.position = this.speed * elapsedTime;

      const verticalGap = 45;
      const itemSize =
        this.orientation === ORIENTATION.HORIZONTAL
          ? this.children[0].offsetWidth
          : this.children[0].offsetHeight;
      const currentPosition =
        this.orientation === ORIENTATION.HORIZONTAL
          ? Math.round(this.position - itemSize)
          : Math.round(this.position - verticalGap / 2);
      const viewportSize =
        this.orientation === ORIENTATION.HORIZONTAL
          ? this.offsetWidth
          : this.offsetHeight / 2;

      if (currentPosition >= viewportSize) {
        this.position = DEFAULT_VALUES.POSITION;
        this.startTime = timestamp;
      }

      this.startDirection();

      requestAnimationFrame(startRunning);
    };

    requestAnimationFrame(startRunning);
  }

  moveItems() {
    this.galleryItems = this.querySelectorAll('[data-scroller-item]');
    this.cloneItems = [...this.galleryItems].map(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('clone');
      return clone;
    });

    if (this.direction === DIRECTION.LEFT || this.direction === DIRECTION.UP) {
      this.cloneItems.forEach(cloneItem => {
        this.appendChild(cloneItem);
      });
    }

    if (
      this.direction === DIRECTION.RIGHT ||
      this.direction === DIRECTION.DOWN
    ) {
      this.cloneItems.forEach(cloneItem => {
        this.galleryItems.push(cloneItem);
        this.appendChild(cloneItem);
      });
    }
  }

  startDirection() {
    if (this.orientation === ORIENTATION.HORIZONTAL) {
      switch (this.direction) {
        case DIRECTION.LEFT:
          this.style.transform = `translateX(${-this.position}px)`;
          break;

        case DIRECTION.RIGHT:
          this.style.transform = `translateX(${this.position}px)`;
          break;

        default:
          break;
      }
    }

    if (this.orientation === ORIENTATION.VERTICAL) {
      switch (this.direction) {
        case DIRECTION.UP:
          this.style.transform = `translateY(${-this.position}px)`;
          break;

        case DIRECTION.DOWN:
          this.style.transform = `translateY(${this.position}px)`;
          break;

        default:
          break;
      }
    }
  }
}

export const infiniteScrollerInit = () => {
  customElements.define('infinite-scroller', InfiniteScroller);
};
