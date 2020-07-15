
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

  export default calc;