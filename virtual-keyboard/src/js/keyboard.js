export class Keyboard {
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.querySelector("#container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#containerEl.querySelector("#input");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", this.#changeTheme);
    this.#fontSelectEl.addEventListener("change", this.#changeFont);
    document.addEventListener("keydown", this.#handleKeyDown.bind(this));
    document.addEventListener("keyup", this.#handleKeyUp.bind(this));
    this.#inputEl.addEventListener("input", this.#handleInput);
  }

  #changeTheme(e) {
    document.documentElement.setAttribute(
      "theme",
      e.target.checked ? "dark-mode" : ""
    );
  }

  #changeFont(e) {
    document.body.style.fontFamily = e.target.value;
  }

  #handleKeyDown(e) {
    this.#inputGroupEl.classList.toggle(
      "error-message",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)
    );
    if (this.#keyboardEl.querySelector(`[data-code=${e.code}]`)) {
      this.#keyboardEl
        .querySelector(`[data-code=${e.code}]`)
        .classList.add("active");
    }
  }

  #handleKeyUp(e) {
    this.#keyboardEl
      .querySelector(`[data-code=${e.code}]`)
      ?.classList.remove("active");
  }

  #handleInput(e) {
    e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  }
}
