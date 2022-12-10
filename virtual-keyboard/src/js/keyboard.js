export class Keyboard {
  #switchEl;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#switchEl = document.querySelector("#switch");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", () => {
      document.documentElement.setAttribute(
        "theme",
        event.target.checked ? "dark-mode" : ""
      );
    });
  }
}
