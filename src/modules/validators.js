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
      target.value = target.value.replace(/^[^+\d]*(\+|\d)|\D$/ig, '$1').substring(0, 20);
    }
  }));
};

export default addValidators;