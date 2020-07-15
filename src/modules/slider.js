
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

  export default slider;