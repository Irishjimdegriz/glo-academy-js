window.addEventListener('DOMContentLoaded', () =>{
  'use strict'; 


  const greeting = document.querySelector('#greeting'),
        dayOfWeek = document.querySelector('#day-of-week'),
        currentTime = document.querySelector('#current-time'),
        countdown = document.querySelector('#countdown'),
        days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        greetings = ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Доброй ночи'],
        date = new Date(),
        day = date.getDay(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

  greeting.textContent = hours >= 4 && hours <= 11 ? greetings[0] : (hours >= 12 && hours <= 17 ? greetings[1] : (hours >= 18 && hours <= 23 ? greetings[2] : greetings[3]));
  dayOfWeek.textContent = days[day];
  currentTime.textContent = `${(hours % 12 ? hours % 12 : 0).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  countdown.textContent = Math.round((new Date('1 January 2021').getTime() - date.getTime()) / 1000 / 3600 / 24);

})