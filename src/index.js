// new CountdownTimer({
//     selector: '#timer-1',
//     targetDate: new Date('Jul 17, 2019'),
//   });

  /*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
// const secs = Math.floor((time % (1000 * 60)) / 1000);



class CountdownTimer {
    constructor(selector, date, onTick) {
      this.selector = selector;
      this.targetDate = new Date(date);
      this.onTick = onTick;
      this.clockIdx = 0;
    }
  
    getTimeLeft() {
      this.intervalId = setInterval(() => {
        const currentTime = Date.now();
  
        const deltaTime = this.targetDate - currentTime;
        const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);
  
        this.onTick({ days, hours, mins, secs });
  
        this.addClockAnimation(clockEls, doNext.bind(this));
      }, 1000);
    }
  
    pad(value) {
      return String(value).padStart(2, '0');
    }
  
    getTimeComponents(time) {
      const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
      const hours = this.pad(
        Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      );
      const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
      const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
  
      return { days, hours, mins, secs };
    }
  
    addClockAnimation(arr, cb) {
      cb(arr);
    }
  }
  
  const tripTimer = new CountdownTimer(
    '#timer-1',
    'Nov 22, 2021',
    updateClockFace,
  );
  
  const bdRefs = {
    timer: document.querySelector(tripTimer.selector),
  
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]'),
  };
  const timeValues = bdRefs.timer.querySelectorAll('span[data-value]');
  
  function updateClockFace({ days, hours, mins, secs }) {
    bdRefs.days.textContent = days;
    bdRefs.hours.textContent = hours;
    bdRefs.mins.textContent = mins;
    bdRefs.secs.textContent = secs;
  }
  
  tripTimer.getTimeLeft();
  
  // Decorative clock
  const clockEls = document.querySelectorAll('.clock-el');
  
  function doNext(arr) {
    arr[this.clockIdx].classList.toggle('animate');
    this.clockIdx += 1;
  
    if (this.clockIdx < arr.length) {
    } else {
      this.clockIdx = 0;
    }
  }