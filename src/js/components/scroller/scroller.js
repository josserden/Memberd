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
  }

  static get observedAttributes() {
    return ['speed-value'];
  }

  connectedCallback() {
    if (!this.isConnected) return;

    this.startAnimation();
    this.addEventListener('mouseenter', this.pauseAnimation.bind(this));
    this.addEventListener('mouseleave', this.resumeAnimation.bind(this));
  }

  startAnimation() {
    this.isPlay = true;

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
  }

  resumeAnimation() {
    if (this.isPlay) return;

    this.isPlay = true;
    this.startTime += this.pauseTime ? performance.now() - this.pauseTime : 0;
    this.pauseTime = null;
    requestAnimationFrame(this.startAnimation.bind(this));
  }
}
