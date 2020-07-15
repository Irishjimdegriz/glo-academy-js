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

  export default togglePopup;