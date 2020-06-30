window.addEventListener('DOMContentLoaded', () =>{
  'use strict';
  const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

  //таймер
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

  //Меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);

    menuItems.forEach((item) => item.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  //popup

  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
          popupContent = document.querySelector('.popup-content'),
          popupBtns = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close');

    let popupCount = -20,
        popupAnimationFrame;

    const animatePopup = () => {      
      popupContent.style.left = `${popupCount}%`;
      popupCount++;
      if (popupCount <= 38) {
        popupAnimationFrame = requestAnimationFrame(animatePopup);
      }
    };

    popupBtns.forEach((item) => {
      item.addEventListener('click', () => {
        if (document.documentElement.clientWidth >= 768) {
          popupCount = -20;
          popupContent.style.left = `${popupCount}%`;   
              
          popupAnimationFrame = requestAnimationFrame(animatePopup);
        }

        popup.style.display = 'block';   
      });
    });

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
      window.cancelAnimationFrame(popupAnimationFrame);
    });
  };

  togglePopup();

  // Smooth scrolling

  const links = document.querySelectorAll('[href^="#"]');
 
  for (const link of links) {
    link.addEventListener("click", clickHandler);
  }
  
  function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
  
    scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });
  }
})