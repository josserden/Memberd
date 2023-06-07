const BASE_SIZE_IN_PX = 100;
const BASE_TIME_IN_MS = 1000;
const INITIAL_POSITION = 0;

class Scroller extends HTMLElement {
  constructor() {
    super();

    this.originalItems = [];
    this.clonedItems = [];
    this.speedValue =
      parseInt(this.getAttribute('speed-value')) || BASE_SIZE_IN_PX;
    this.speed = this.speedValue / BASE_TIME_IN_MS;
    this.position = INITIAL_POSITION;
    // Time variables for animation
    this.startTime = performance.now();
    this.pauseTime = null;
    this.isPlay = false;
    // Observers
    this.initObservers();
    // Items
    this.initItems();
  }

  static get observedAttributes() {
    return ['speed-value'];
  }

  connectedCallback() {
    if (!this.isConnected) return;

    this.generateItems();
    this.startAnimation();

    this.addEventListener('mouseenter', () => {
      this.pauseAnimation();
    });
    this.addEventListener('mouseleave', () => {
      this.resumeAnimation();
    });

    this.connectObservers();
  }

  disconnectedCallback() {
    this.disconnectObservers();
  }

  initObservers = () => {
    this.observer = new IntersectionObserver(this.handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: INITIAL_POSITION,
    });

    this.resizeObserver = new ResizeObserver(this.handleResize);
    // this.mutationObserver = new MutationObserver(this.handleMutation);
  };

  connectObservers = () => {
    this.resizeObserver.observe(this);
    this.observer.observe(this.parentElement);
    // this.mutationObserver.observe(this, {
    //   childList: true,
    // });
  };

  disconnectObservers = () => {
    this.resizeObserver.disconnect();
    this.observer.disconnect();
    // this.mutationObserver.disconnect();
  };

  initItems = () => {
    this.originalItems = [...this.children];

    // this.clonedItems = this.originalItems.map(item => {
    //   const clone = item.cloneNode(true);
    //   clone.classList.add('cloned');
    //
    //   return clone;
    // });
  };

  generateItems = () => {
    this.updateItems();
    this.append(...this.clonedItems);
  };

  updateItems = () => {
    // if the position is less than the height of the first item return the first item
    if (this.position < this.originalItems[0].offsetHeight) return;

    // otherwise, remove the first item
    this.removeChild(this.originalItems[0]);

    // and add it to the end of the list
    this.appendChild(this.originalItems[0]);

    // then update the position by subtracting the height of the first item
    this.position -= this.originalItems[0].offsetHeight;

    // then call the function again
    this.updateItems();
  };

  startAnimation = () => {
    console.log('startAnimation');

    this.isPlay = true;

    const init = () => {
      if (!this.isPlay) return;

      const timestamp = performance.now();
      const elapsedTime =
        (this.pauseTime ? this.pauseTime : timestamp) - this.startTime;
      this.position = this.speed * elapsedTime;

      this.updateItems();

      this.style.transform = `translateY(${-this.position}px)`;

      requestAnimationFrame(init);
    };

    requestAnimationFrame(init);
  };

  pauseAnimation = () => {
    console.log('pauseAnimation');
    this.isPlay = false;
    this.pauseTime = performance.now();
    //   create slow down effect
  };

  resumeAnimation = () => {
    console.log('resumeAnimation');
    if (this.isPlay) return;

    this.isPlay = true;
    this.startTime += this.pauseTime ? performance.now() - this.pauseTime : 0;
    this.pauseTime = null;

    requestAnimationFrame(this.startAnimation);
  };

  handleResize = entries => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      const { width: prevWidth, height: prevHeight } =
        entry.target.getBoundingClientRect();

      if (width !== prevWidth || height !== prevHeight) {
        console.log('handleResize');

        this.pauseAnimation();
        this.resumeAnimation();
      }
    }
  };

  handleIntersection = entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.resumeAnimation();
        console.log('handleIntersection');

        return;
      }

      this.pauseAnimation();
    }
  };

  handleMutation = mutations => {
    console.log('handleMutation');
  };
}

export const initScroller = () => {
  customElements.define('custom-scroller', Scroller);
};
