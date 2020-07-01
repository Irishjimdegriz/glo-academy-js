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
    const menu = document.querySelector('menu');

    document.addEventListener('click', (event) => {
      let target = event.target;

      const handlerMenu = () => {
        menu.classList.toggle('active-menu');
      };  

      if (target.closest('.menu') || target.closest('.close-btn') || target.matches('ul>li>a')) {
        handlerMenu();
        return;
      }

      target = target.closest('menu');

      if (!target) {
        menu.classList.remove('active-menu');
      }
    });
  };

  toggleMenu();

  //popup

  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
          popupContent = document.querySelector('.popup-content'),
          popupBtns = document.querySelectorAll('.popup-btn');

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

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
        window.cancelAnimationFrame(popupAnimationFrame);
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popup.style.display = 'none';
          window.cancelAnimationFrame(popupAnimationFrame);
        }
      }
    });
  };

  togglePopup();

  // Smooth scrolling

  const links = document.querySelectorAll('[href^="#"]');

  function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
  
    scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });
  }
   
  for (const link of links) {
    if (!link.classList.contains('close-btn')) {
      link.addEventListener("click", clickHandler);
    }
  }
  

  //tabs

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
          target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();
})