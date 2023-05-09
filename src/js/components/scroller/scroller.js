export class Scroller extends HTMLElement {
  constructor() {
    super();
    this.baseSizeInPx = 100;
    this.baseTimeInMs = 1000;
    this.speedValue =
      parseInt(this.getAttribute('speed-value')) || this.baseSizeInPx;
    this.speed = this.speedValue / this.baseTimeInMs;
    this.position = 0;

    this.startTime = performance.now();
    this.pauseTime = null;
    this.isPlay = false;

    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    );
  }

  static get observedAttributes() {
    return ['speed-value'];
  }

  connectedCallback() {
    if (!this.isConnected) return;

    this.startAnimation();
    this.addEventListener('mouseenter', this.pauseAnimation.bind(this));
    this.addEventListener('mouseleave', this.resumeAnimation.bind(this));
    this.resizeObserver.observe(this);
    this.observer.observe(this.parentElement);
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }

  startAnimation() {
    this.isPlay = true;
    console.log('startAnimation');

    const init = () => {
      if (!this.isPlay) return;

      const timestamp = performance.now();
      const elapsedTime =
        (this.pauseTime ? this.pauseTime : timestamp) - this.startTime;
      this.position = this.speed * elapsedTime;

      this.style.transform = `translateY(${this.position}px)`;
      requestAnimationFrame(init);
    };

    requestAnimationFrame(init);
  }

  pauseAnimation() {
    this.isPlay = false;
    this.pauseTime = performance.now();
    console.log('pauseAnimation');
  }

  resumeAnimation() {
    if (this.isPlay) return;
    console.log('resumeAnimation');

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
        this.pauseAnimation();
        this.startAnimation();
      }
    }
  }

  handleIntersection(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.resumeAnimation();
        return;
      }
      this.pauseAnimation();
    }
  }
}
