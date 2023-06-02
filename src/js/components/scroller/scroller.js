export class Scroller extends HTMLElement {
  constructor() {
    super();
    this.originalItems = [...this.children];
    this.clonedItems = this.originalItems.map(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('cloned');
      return clone;
    });
    // Base variables for speed and position
    this.baseSizeInPx = 100;
    this.baseTimeInMs = 1000;
    this.speedValue =
      parseInt(this.getAttribute('speed-value')) || this.baseSizeInPx;
    this.speed = this.speedValue / this.baseTimeInMs;
    this.position = 0;
    // Time variables for animation
    this.startTime = performance.now();
    this.pauseTime = null;
    this.isPlay = false;
    // Observers options
    this.intersectionOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };
    // Observers
    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.intersectionOptions
    );
    this.mutationObserver = new MutationObserver(
      this.handleMutation.bind(this)
    );
  }

  static get observedAttributes() {
    return ['speed-value'];
  }

  connectedCallback() {
    if (!this.isConnected) return;

    this.generateItems();
    this.startAnimation();
    this.addEventListener('mouseenter', this.pauseAnimation.bind(this));
    this.addEventListener('mouseleave', this.resumeAnimation.bind(this));
    this.resizeObserver.observe(this);
    this.observer.observe(this.parentElement);
    this.mutationObserver.observe(this, {
      childList: true,
    });
  }

  generateItems() {
    this.updateItems();
    this.append(...this.clonedItems);
  }

  updateItems() {
    // create a recursive function to update the items

    // if the position is less than the height of the first item
    if (this.position < this.originalItems[0].offsetHeight) {
      // return the first item
      return;
    }

    // otherwise, remove the first item
    this.removeChild(this.originalItems[0]);

    // and add it to the end of the list

    this.appendChild(this.originalItems[0]);

    // then update the position by subtracting the height of the first item
    this.position -= this.originalItems[0].offsetHeight;

    // then call the function again

    this.updateItems();
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
    this.observer.disconnect();
    // this.mutationObserver.disconnect();
  }

  startAnimation() {
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
  }

  pauseAnimation() {
    console.log('pauseAnimation');
    this.isPlay = false;
    this.pauseTime = performance.now();

    this.mutationObserver.disconnect();
  }

  resumeAnimation() {
    console.log('resumeAnimation');
    if (this.isPlay) return;

    this.isPlay = true;
    this.startTime += this.pauseTime ? performance.now() - this.pauseTime : 0;
    this.pauseTime = null;
    requestAnimationFrame(this.startAnimation.bind(this));
  }

  handleResize(entries) {
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
  }

  handleIntersection(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.resumeAnimation();
        console.log('handleIntersection');
        return;
      }

      this.pauseAnimation();
    }
  }

  handleMutation(mutations) {
    console.log('handleMutation');
    this.pauseAnimation();
    this.resumeAnimation();
  }
}
