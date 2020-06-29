window.addEventListener('DOMContentLoaded', () =>{
  'use strict';
  const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

  const countTimer = (deadline) => {

    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = dateStop > dateNow ? (dateStop - dateNow) / 1000 : 0;

      return {
        "timeRemaining": timeRemaining,
        'hours': Math.round(timeRemaining / 3600).toString().padStart(2, '0'),
        'minutes': Math.round((timeRemaining / 60) % 60).toString().padStart(2, '0'),
        'seconds': Math.round(timeRemaining % 60).toString().padStart(2, '0')
      };
    };

    const updateClock = () => {      
      const result = getTimeRemaining();

      timerHours.textContent = result.hours;
      timerMinutes.textContent = result.minutes;
      timerSeconds.textContent = result.seconds;
    };

    setInterval(updateClock, 1000);

    };

  countTimer('01 July 2020');
})