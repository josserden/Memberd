class Scroller extends HTMLElement {
  #BASE_SIZE_IN_PX = 100;
  #BASE_TIME_IN_MS = 1000;
  #INITIAL_POSITION = 0;

  constructor() {
    super();

    this.originalItems = [];
    this.clonedItems = [];
    this.parentHeight = 0;
    this.speedValue =
      parseInt(this.getAttribute('speed-value')) || this.#BASE_SIZE_IN_PX;
    this.speed = this.speedValue / this.#BASE_TIME_IN_MS;
    this.position = this.#INITIAL_POSITION;
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
      threshold: this.#INITIAL_POSITION,
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
    const parent = this.children[0];
    this.parentHeight = parent.offsetHeight;
    const childHeight = parent.children[0].offsetHeight;
    const childCloneCount = Math.ceil(this.parentHeight / childHeight);

    for (let i = 0; i < childCloneCount; i++) {
      const item = parent.children[i] ?? parent.children[0];
      const clone = item.cloneNode(true);

      clone.classList.add('cloned');
      this.clonedItems.push(clone);
    }
  };

  generateItems = () => {
    // this.updateItems();
    this.children[0].append(...this.clonedItems);
  };

  updateItems = () => {
    // if the position is less than the height of the first item return the first item
    if (this.position < this.parentHeight) return;

    // if the position is greater than the height of the original items
    this.position -= this.parentHeight;
    this.clonedItems.push(this.clonedItems.shift());

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
