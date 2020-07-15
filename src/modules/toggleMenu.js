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

export default toggleMenu;