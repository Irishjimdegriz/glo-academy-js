
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
      });
    });

    const updatePage = () => {
      clearInputs(form);
      statusMessage.classList.remove('sk-pulse');
      
      if (form.id === 'form3') {
        statusMessage.style.cssText = 'color: white;';
      } else {
        statusMessage.style.cssText = '';
      }

      setTimeout(() => {
        statusMessage.textContent = '';
        statusMessage.style.cssText = '';
      }, 5000);
    };

    const clearInputs = (form) => {
      const inputs = form.querySelectorAll('input');

      inputs.forEach(item => item.value = '');
    };
  };

  export default sendForm;