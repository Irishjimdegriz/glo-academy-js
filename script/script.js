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

  countTimer('01 August 2020');

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

  //slider

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
          btn = document.querySelectorAll('.portfolio-btn'),
          //dot = document.querySelectorAll('.dot'),
          dotContainer = document.querySelector('.portfolio-dots'),
          slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
        interval;

    slide.forEach((item, i) => {
      let li = document.createElement('li');

      li.classList.add('dot');

      if (i === 0) {
        li.classList.add('dot-active');
      }

      dotContainer.appendChild(li);
    });

    const dot = document.querySelectorAll('.dot');

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
      //slide[currentSlide].classList.add('portfolio-item-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((item, i) => {
          if (item === target) {
            currentSlide = i;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      } else if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      let target = event.target;

      if (target.matches('.dot') || target.matches('.portfolio-btn')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      let target = event.target;

      if (target.matches('.dot') || target.matches('.portfolio-btn')) {
        startSlide();
      }
    });

    startSlide(1500);

  };

  slider();

  //photo change
  const changePhotos = () => {
    const teamBlock = document.getElementById('command'),
    updateLogo = (event) => {
      let target = event.target,
      oldLogo;

      if (target.matches('.command__photo')) {
        oldLogo = target.src;
        target.src = target.dataset.img;
        target.dataset.img = oldLogo;
      }
    };

    teamBlock.addEventListener('mouseover', (event) => {
      updateLogo(event);  
    });

    teamBlock.addEventListener('mouseout', (event) => {
      updateLogo(event);  
    });
  };

  changePhotos();

  //validation
  const addValidators = () => {
    const calcBlock = document.querySelector('.calc-block');

    calcBlock.addEventListener('input', (event) => {
      let target = event.target;

      if (target.matches('.calc-item') && !target.matches('.calc-type')) {
        target.value = target.value.replace(/\D/, '');
      }
    });

    const forms = document.querySelectorAll('form');

    forms.forEach(item => item.addEventListener('input', (event) => {
      const target = event.target;

      if (target.matches('[name="user_name"]') || target.matches('[name="user_message"]')) {
        target.value = target.value.replace(/[^а-я ]/ig, '');
      } else if (target.matches('[name="user_phone"]')) {
        target.value = target.value.replace(/^[^+\d]*(\+|\d)|\D$/ig, '$1');
      }
    }));
  };

  addValidators();

  //calculator

  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcDay = document.querySelector('.calc-day'),
          calcCount = document.querySelector('.calc-count'),
          calcTotal = document.getElementById('total');

    let interval;

    calcBlock.addEventListener('change', (event) => {
      let target = event.target;

      const countSum = () => {
        let total = 0,
            count = 0,
            countValue = 1,
            dayValue = 1;

        const typeValue = +calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
          countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
          dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
          dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
          total = price * typeValue * squareValue * countValue * dayValue;
        }

        interval = setInterval(() => {
          calcTotal.textContent = count;

          if (count >= total) {
            clearInterval(interval);
          } else {
            count++;
          }
        }, 2);

      };

      if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
        clearInterval(interval);
        countSum();
      }
    });
  };

  calc(100);

  //send-ajax-form

  const sendForm = (selector) => {
    const errorMessage = 'Что-то пошло не так',
          //loadMessage = 'Загрузка...',
          successMessage = 'Заявка была отправлена';

    const form = document.getElementById(selector);

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';
    //statusMessage.textContent = 'Тут будет сообщение';

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      form.appendChild(statusMessage);
      statusMessage.classList.add('sk-pulse');
      statusMessage.style.cssText = 'margin: auto';

      const formData = new FormData(form);
      let body = {};

      for (let value of formData.entries()) {
        body[value[0]] = value[1];
      }

      fetch('./server.php', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body)
      }).then((response) => {

        if (response.status !== 200) {
          throw new Error(`Что-то пошло не так, код ошибки - ${response.status}`);
        }

        statusMessage.textContent = successMessage;
        updatePage();
      })
      .catch((error) => {
        console.log(error);
        statusMessage.textContent = errorMessage;
        updatePage();
      })
    });

    const updatePage = () => {
      clearInputs(form);
      statusMessage.classList.remove('sk-pulse');
      
      statusMessage.style.cssText = '';

      setTimeout(() => {
        statusMessage.textContent = '';
      }, 5000);
    };

    const clearInputs = (form) => {
      const inputs = form.querySelectorAll('input');

      inputs.forEach(item => item.value = '');
    };

    const postData = (body) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
  
          if (request.readyState !== 4) {
            return;
          }
  
          if (request.status === 200) {
            resolve();            
          } else {
            reject(request.Status);  
          }
        });
  
        request.open('POST', './server.php');
        request.setRequestHeader('Content-type', 'application/json');
  
        request.send(JSON.stringify(body));
      });

    };

  };

  sendForm('form1');
  sendForm('form2');
  sendForm('form3');
})