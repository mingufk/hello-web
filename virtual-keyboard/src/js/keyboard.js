export class Keyboard {
  #switchEl;
  #fontSelectEl;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#switchEl = document.querySelector("#switch");
    this.#fontSelectEl = document.querySelector("#font");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", (e) => {
      document.documentElement.setAttribute(
        "theme",
        e.target.checked ? "dark-mode" : ""
      );
    });
    this.#fontSelectEl.addEventListener("change", (e) => {
      document.body.style.fontFamily = e.target.value;
    });
  }
}
