export default class ImgSlider {
  #currentPosition = 0;

  #slideNumber = 0;

  #slideWidth = 0;

  #intervalId;

  #autoSlide = true;

  sliderWrapEl;

  sliderListEl;

  nextBtnEl;

  prevBtnEl;

  indicatorWrapEl;

  controlWrapEl;

  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSliderWidth();
    this.initSliderListWidth();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
    this.initAutoSlide();
  }

  assignElement() {
    this.sliderWrapEl = document.querySelector('#slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.prevBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
    this.controlWrapEl = this.sliderWrapEl.querySelector('#control-wrap');
  }

  initAutoSlide() {
    this.#intervalId = setInterval(this.nextSlide.bind(this), 3000);
  }

  initSliderNumber() {
    this.#slideNumber = this.sliderListEl.querySelectorAll('li').length;
  }

  initSliderWidth() {
    this.#slideWidth = this.sliderListEl.clientWidth;
  }

  initSliderListWidth() {
    this.sliderListEl.style.width = `${this.#slideWidth * this.#slideNumber}px`;
  }

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.nextSlide.bind(this));
    this.prevBtnEl.addEventListener('click', this.prevSlide.bind(this));
    this.indicatorWrapEl.addEventListener(
      'click',
      this.clickIndicator.bind(this),
    );
    this.controlWrapEl.addEventListener('click', this.stopAutoSlide.bind(this));
  }

  stopAutoSlide(e) {
    if (e.target.dataset.status === 'play') {
      this.#autoSlide = true;
      this.controlWrapEl.classList.add('play');
      this.controlWrapEl.classList.remove('pause');
      this.initAutoSlide();
    } else if (e.target.dataset.status === 'pause') {
      this.#autoSlide = false;
      this.controlWrapEl.classList.add('pause');
      this.controlWrapEl.classList.remove('play');
      clearInterval(this.#intervalId);
    }
  }

  clickIndicator(e) {
    const indexPosition = parseInt(e.target.dataset.index, 10);
    if (Number.isInteger(indexPosition)) {
      this.#currentPosition = indexPosition;
      this.sliderListEl.style.left = `-${
        this.#currentPosition * this.#slideWidth
      }px`;
      this.setIndicator();
    }
  }

  nextSlide() {
    this.#currentPosition += 1;
    if (this.#currentPosition === this.#slideNumber) {
      this.#currentPosition = 0;
    }
    this.sliderListEl.style.left = `-${
      this.#currentPosition * this.#slideWidth
    }px`;
    if (this.#autoSlide) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.nextSlide.bind(this), 3000);
    }
    this.setIndicator();
  }

  prevSlide() {
    this.#currentPosition -= 1;
    if (this.#currentPosition < 0) {
      this.#currentPosition = this.#slideNumber - 1;
    }
    this.sliderListEl.style.left = `-${
      this.#currentPosition * this.#slideWidth
    }px`;
    if (this.#autoSlide) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.nextSlide.bind(this), 3000);
    }
    this.setIndicator();
  }

  createIndicator() {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#slideNumber; i += 1) {
      const indicator = document.createElement('li');
      indicator.dataset.index = i;
      docFragment.appendChild(indicator);
    }
    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
  }

  setIndicator() {
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicatorWrapEl
      .querySelector(`ul li:nth-child(${this.#currentPosition + 1})`)
      .classList.add('active');
  }
}
