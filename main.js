'use strict';

let calculateButton = document.getElementById('start'),
    incomeAddButton = document.getElementsByTagName('button')[0],
    expensesAddButton = document.getElementsByTagName('button')[1],
    depositCheckbox = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    valueItems = document.querySelectorAll('[class$="-value"]'),
    salaryAmountInput = document.querySelector('.salary-amount'),
    incomeTitleInput = document.querySelector('.income-title'),
    expensesTitleInput = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalExpensesTitleInput = document.querySelector('.additional_expenses-title'),
    additionalExpensesAmountInput = document.querySelector('.additional_expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmountInput = document.querySelector('.target-amount'),
    periodInput = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

let isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

let isString = (objectToCheck) => {
  const regex = new RegExp('[a-zA-Zа-яА-Я]+');
  return regex.test(objectToCheck);
}

calculateButton.disabled = true;

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  incomeMonth: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: () => {
    // do {
    //   money = +prompt('Ваш месячный доход?');
    // } 
    // while(!isNumber(money));

    // if (salaryAmountInput.value === '') {
    //   alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
    //   return;    
    // }

    appData.budget = +salaryAmountInput.value;
    //console.log('salaryAmountInput.value: ' + salaryAmountInput.value);

    appData.getIncome();
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: () => {
    valueItems[0].value = appData.budgetMonth;
    valueItems[1].value = Math.floor(appData.budgetDay);
    valueItems[2].value = appData.expensesMonth;
    valueItems[4].value = appData.addExpenses.join(', ');
    valueItems[3].value = appData.addIncome.join(', ');
    valueItems[6].value = Math.ceil(appData.getTargetMonth());
    valueItems[5].value = appData.calcSavedMoney();

    periodInput.addEventListener('input', () => {
      valueItems[5].value = appData.calcSavedMoney();
    })
  },
  getIncome: () => {
    incomeItems.forEach((item) => {
      //console.log(item);

      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.expenses[itemIncome] = cashIncome;
      }
    });
  },
  addExpensesBlock: () => {
    let newExpensesItem = expensesItems[0].cloneNode(true);
    let title = newExpensesItem.querySelector('.expenses-title');
    let amount = newExpensesItem.querySelector('.expenses-amount');

    title.value = '';
    title.addEventListener('keypress', (event) => {
      let key = event.key;
      const regex = new RegExp('[а-яА-Я,.!?\\-]');
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });

    amount.value = '';
    amount.addEventListener('keypress', (event) => {
      let key = event.key;
      const regex = new RegExp('[0-9]');
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });

    expensesItems[0].parentNode.insertBefore(newExpensesItem, expensesAddButton);

    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesAddButton.style.display = 'none';
    }
  },
  getExpenses: () => {
    expensesItems.forEach(function(item) {
      //console.log(item);

      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getAddExpenses: () => {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: () => {
    additionalIncomeItems.forEach((item) => {
      let itemValue = item.value.trim();

      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  addIncomeBlock: () => {
    let newIncomeItem = incomeItems[0].cloneNode(true);

    let title = newIncomeItem.querySelector('.income-title');
    let amount = newIncomeItem.querySelector('.income-amount');

    title.value = '';
    title.addEventListener('keypress', (event) => {
      let key = event.key;
      const regex = new RegExp('[а-яА-Я,.!?\\- ]');
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });

    amount.value = '';
    amount.addEventListener('keypress', (event) => {
      let key = event.key;
      const regex = new RegExp('[0-9]');
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });


    // newIncomeItem.querySelector('.income-title').value = '';
    // newIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(newIncomeItem, incomeAddButton);

    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomeAddButton.style.display = 'none';
    }    
  },
  getExpensesMonth: () => {
    let sum = 0;
    
    for(var item in appData.expenses) {
      sum += +appData.expenses[item];
    }

    appData.expensesMonth = sum;
    //return sum;
  },
  getBudget: () =>  {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: () => {
    return Math.ceil(targetAmountInput.value / appData.budgetMonth);
  },
  getStatusIncome: () =>  {
    if (appData.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
      return "К сожалению, у вас уровень дохода ниже среднего";
    } else {
      return "Что-то пошло не так";
    }
  },
  getInfoDeposit: () => {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      } while (!isNumber(appData.percentDeposit));      

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit));
      //appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    }
  },
  calcSavedMoney: () => {
    return appData.budgetMonth * periodInput.value;
  }
};

calculateButton.addEventListener('click', appData.start);
expensesAddButton.addEventListener('click', appData.addExpensesBlock);
incomeAddButton.addEventListener('click', appData.addIncomeBlock);
periodInput.addEventListener('input', () => {
  periodAmount.textContent = periodInput.value;
})
salaryAmountInput.addEventListener('input', () => {
  if (salaryAmountInput.value === '') {
    calculateButton.disabled = true;
  } else {
    calculateButton.disabled = false;
  }

});

let totalInputs = document.querySelectorAll('[placeholder="Сумма"]');
let nameInputs = document.querySelectorAll('[placeholder="Наименование"]');

totalInputs.forEach((item) => {
  item.addEventListener('keypress', (event) => {
    let key = event.key;
    const regex = new RegExp('[0-9]');
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
});
});

nameInputs.forEach((item) => {
  item.addEventListener('keypress', (event) => {
    let key = event.key;
    const regex = new RegExp('[а-яА-Я,.!?\\- ]');
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
});
});

