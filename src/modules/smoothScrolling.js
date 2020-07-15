  const addSmoothScrolling = () => {
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
  };

  export default addSmoothScrolling;