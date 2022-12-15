export default class ImgSlider {
  #currentPosition = 0;

  #slideNumber = 0;

  #slideWidth = 0;

  sliderWrapEl;

  sliderListEl;

  nextBtnEl;

  prevBtnEl;

  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSliderWidth();
    this.initSliderListWidth();
    this.addEvent();
  }

  assignElement() {
    this.sliderWrapEl = document.querySelector('#slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.prevBtnEl = this.sliderWrapEl.querySelector('#previous');
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
  }

  nextSlide() {
    this.#currentPosition += 1;
    if (this.#currentPosition === this.#slideNumber) {
      this.#currentPosition = 0;
    }
    this.sliderListEl.style.left = `-${
      this.#currentPosition * this.#slideWidth
    }px`;
  }

  prevSlide() {
    this.#currentPosition -= 1;
    if (this.#currentPosition < 0) {
      this.#currentPosition = this.#slideNumber - 1;
    }
    this.sliderListEl.style.left = `-${
      this.#currentPosition * this.#slideWidth
    }px`;
  }
}
