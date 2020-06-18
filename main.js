'use strict';

let calculateButton = document.getElementById('start'),
    incomeAddButton = document.getElementsByTagName('button')[0],
    expensesAddButton = document.getElementsByTagName('button')[1],
    depositCheckbox = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    valueItems = document.querySelectorAll('[class$="-value"]'),
    salaryAmountInput = document.querySelector('.salary-amount'),
    incomeTitleInput = document.querySelector('.income-title'),
    //incomeAmountInput = document.querySelector('.income-amount'),
    expensesTitleInput = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalExpensesTitleInput = document.querySelector('.additional_expenses-title'),
    additionalExpensesAmountInput = document.querySelector('.additional_expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmountInput = document.querySelector('.target-amount'),
    periodInput = document.querySelector('.period-select');

let isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

let isString = (objectToCheck) => {
  const regex = new RegExp('[a-zA-Zа-яА-Я]+');
  return regex.test(objectToCheck);
}

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  incomeMonth: 0,
  //mission: 10000,
  //period: 5,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: () => {
    // do {
    //   money = +prompt('Ваш месячный доход?');
    // } 
    // while(!isNumber(money));

    if (salaryAmountInput.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;    
    }

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
    valueItems[1].value = appData.budgetDay;
    valueItems[2].value = appData.expensesMonth;
    valueItems[4].value = appData.addExpenses.join(', ');
    valueItems[3].value = appData.addIncome.join(', ');
    valueItems[6].value = Math.ceil(appData.getTargetMonth());
    valueItems[5].value = appData.calcSavedMoney();
  },
  getIncome: () => {
    if (confirm('Есть ли у вас дополнительный источник заработка?')) {

      let itemIncome;

      do {
        itemIncome = prompt('Какой у вас дополнительный заработок', "Таксую");
      } while (!isString(itemIncome));

      let cashIncome;
      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', "10000");
      } while (!isNumber(cashIncome));

      // let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', "10000");

      appData.income[itemIncome] = cashIncome;

      for (let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
      }
    }
  },
  addExpensesBlock: () => {
    let newExpensesItem = expensesItems[0].cloneNode(true);
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

//console.log('Расходы за месяц: ' + appData.expensesMonth);

// let targetMonth = appData.getTargetMonth(appData.budgetMonth);

// if (targetMonth < 0) {
//   console.log('Цель не будет достигнута');
// }
// else {
//   console.log("Цель будет достигнута через " + targetMonth + " месяцев");
// }

// console.log(appData.getStatusIncome());

// console.log('Программа включает в себя данные:');

// for (let item in appData) {
//   console.log("Свойство: " + item + ", его значение - " + appData[item]);
// }

// let arrayResult = "";

// for (let item of appData.addExpenses) {
//   item = item.toLowerCase();
//   arrayResult += item.charAt(0).toUpperCase() + item.slice(1) + ', ';
// }

// arrayResult = arrayResult.slice(0, -2);

//console.log(arrayResult);