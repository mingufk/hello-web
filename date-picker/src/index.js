class DatePicker {
  monthData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  #calendarDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };

  selectedDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };

  datePickerEl;
  dateInputEl;
  calendarEl;
  calendarMonthEl;
  prevBtnEl;
  monthContentEl;
  nextBtnEl;
  calendarDatesEl;

  constructor() {
    this.initCalendarDate();
    this.initSelectedDate();
    this.assignElement();
    this.setDateInput();
    this.addEvent();
  }

  initSelectedDate() {
    this.selectedDate = {
      ...this.#calendarDate,
    };
  }

  setDateInput() {
    this.dateInputEl.textContent = this.formatDate(this.selectedDate.data);
    this.dateInputEl.dataset.value = this.selectedDate.data;
  }

  initCalendarDate() {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();
    this.#calendarDate = {
      data,
      date,
      month,
      year,
    };
  }

  assignElement() {
    this.datePickerEl = document.querySelector('#date-picker');
    this.dateInputEl = this.datePickerEl.querySelector('#date-input');
    this.calendarEl = this.datePickerEl.querySelector('#calendar');
    this.calendarMonthEl = this.calendarEl.querySelector('#month');
    this.prevBtnEl = this.calendarMonthEl.querySelector('#prev');
    this.monthContentEl = this.calendarMonthEl.querySelector('#content');
    this.nextBtnEl = this.calendarMonthEl.querySelector('#next');
    this.calendarDatesEl = this.calendarEl.querySelector('#dates');
  }

  addEvent() {
    this.dateInputEl.addEventListener('click', this.toggleCalendar.bind(this));
    this.prevBtnEl.addEventListener('click', this.prevMonth.bind(this));
    this.nextBtnEl.addEventListener('click', this.nextMonth.bind(this));
    this.calendarDatesEl.addEventListener('click', this.selectDate.bind(this));
  }

  selectDate(e) {
    const target = e.target;
    if (target.dataset.date) {
      this.calendarDatesEl
        .querySelector('.selected')
        ?.classList.remove('selected');
      target.classList.add('selected');
      this.selectedDate = {
        data: new Date(
          this.#calendarDate.year,
          this.#calendarDate.month,
          target.dataset.date,
        ),
        year: this.#calendarDate.year,
        month: this.#calendarDate.month,
        date: target.dataset.date,
      };
      this.setDateInput();
      this.calendarEl.classList.remove('active');
    }
  }

  formatDate(dateData) {
    let date = dateData.getDate();
    if (date < 10) {
      date = `0${date}`;
    }
    let month = dateData.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let year = dateData.getFullYear();
    return `${month}/${date}/${year}`;
  }

  prevMonth() {
    this.#calendarDate.month--;
    if (this.#calendarDate.month < 0) {
      this.#calendarDate.month = 11;
      this.#calendarDate.year--;
    }
    this.updateMonth();
    this.updateDates();
  }

  nextMonth() {
    this.#calendarDate.month++;
    if (this.#calendarDate.month > 11) {
      this.#calendarDate.month = 0;
      this.#calendarDate.year++;
    }
    this.updateMonth();
    this.updateDates();
  }

  toggleCalendar() {
    if (this.calendarEl.classList.contains('active')) {
      this.#calendarDate = { ...this.selectedDate };
    }
    this.calendarEl.classList.toggle('active');
    this.updateMonth();
    this.updateDates();
  }

  updateMonth() {
    this.monthContentEl.textContent = `${
      this.monthData[this.#calendarDate.month]
    } ${this.#calendarDate.year}`;
  }

  updateDates() {
    this.calendarDatesEl.innerHTML = '';
    const numberOfDates = new Date(
      this.#calendarDate.year,
      this.#calendarDate.month + 1,
      0,
    ).getDate();
    const fragment = new DocumentFragment();
    for (let i = 0; i < numberOfDates; i++) {
      const dateEl = document.createElement('div');
      dateEl.classList.add('date');
      dateEl.textContent = i + 1;
      dateEl.dataset.date = i + 1;
      fragment.appendChild(dateEl);
    }
    fragment.firstChild.style.gridColumnStart =
      new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay() +
      1;
    this.calendarDatesEl.appendChild(fragment);
    this.colorSat();
    this.colorSun();
    this.markToday();
    this.markSelected();
  }

  markSelected() {
    if (
      this.selectedDate.year === this.#calendarDate.year &&
      this.selectedDate.month === this.#calendarDate.month
    ) {
      const selectedEl = this.calendarDatesEl.querySelector(
        `[data-date="${this.selectedDate.date}"]`,
      );
      selectedEl.classList.add('selected');
    }
  }

  markToday() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const today = currentDate.getDate();
    if (
      currentYear === this.#calendarDate.year &&
      currentMonth === this.#calendarDate.month
    ) {
      const todayEl = this.calendarDatesEl.querySelector(
        `[data-date="${today}"]`,
      );
      todayEl.classList.add('today');
    }
  }

  colorSat() {
    const satEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
        7 -
        new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay()
      })`,
    );
    for (let i = 0; i < satEls.length; i++) {
      satEls[i].style.color = '#0f4c81';
    }
  }

  colorSun() {
    const sunEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
        8 -
        new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay()
      })`,
    );
    for (let i = 0; i < sunEls.length; i++) {
      sunEls[i].style.color = '#bf1932';
    }
  }
}

new DatePicker();
