export class Keyboard {
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;

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
    this.#keyboardEl.addEventListener(
      "mousedown",
      this.#handleMouseDown.bind(this)
    );
    document.addEventListener("mouseup", this.#handleMouseUp.bind(this));
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
    if (this.#mouseDown) return;
    this.#keyPress = true;
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
    if (this.#mouseDown) return;
    this.#keyPress = false;
    this.#keyboardEl
      .querySelector(`[data-code=${e.code}]`)
      ?.classList.remove("active");
  }

  #handleInput(e) {
    e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  }

  #handleMouseDown(e) {
    if (this.#keyPress) return;
    this.#mouseDown = true;
    e.target.closest("div.key")?.classList.add("active");
  }

  #handleMouseUp(e) {
    if (this.#keyPress) return;
    this.#mouseDown = false;
    const keyEl = e.target.closest("div.key");
    const isActive = !!keyEl?.classList.contains("active");
    const val = keyEl?.dataset?.val;
    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }
    if (isActive && val === "Space") {
      this.#inputEl.value += " ";
    }
    if (isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }
}
