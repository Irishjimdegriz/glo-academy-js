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
    periodAmount = document.querySelector('.period-amount'),
    cancelButton = document.querySelector('#cancel'),
    textInputs = document.querySelectorAll('input[type=text]'),
    resultItems = document.querySelectorAll('.result-total'),
    calculatePressed = false;

let isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

let isString = (objectToCheck) => {
  const regex = new RegExp('[a-zA-Zа-яА-Я]+');
  return regex.test(objectToCheck);
}

calculateButton.disabled = true;

const AppData = function() {
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.incomeMonth = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.start = function() {
  this.budget = +salaryAmountInput.value;

  this.getIncome();
  this.getExpenses();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();

  this.showResult();

  calculateButton.style.display = 'none';
  cancelButton.style.display = 'block';
  textInputs.forEach((item) => {
    item.disabled = true;
  });
};
AppData.prototype.showResult = function() {
  let _this = this;
  calculatePressed = true;
  valueItems[0].value = this.budgetMonth;
  valueItems[1].value = Math.floor(this.budgetDay);
  valueItems[2].value = this.expensesMonth;
  valueItems[4].value = this.addExpenses.join(', ');
  valueItems[3].value = this.addIncome.join(', ');
  valueItems[6].value = Math.ceil(this.getTargetMonth());
  valueItems[5].value = this.calcSavedMoney();

  periodInput.addEventListener('input', function() {
    valueItems[5].value = _this.calcSavedMoney();
  }.bind(this));
};
AppData.prototype.getIncome = function() {
  incomeItems.forEach((item) => {
    //console.log(item);

    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;

    if (itemIncome !== '' && cashIncome !== '') {
      this.income[itemIncome] = cashIncome;
      this.incomeMonth += +cashIncome;
    }
  }, this);
};
AppData.prototype.addExpensesBlock = function() {
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

  if (calculatePressed === true) {
    title.disabled = true;
    amount.disabled = true;
  }

  expensesItems[0].parentNode.insertBefore(newExpensesItem, expensesAddButton);

  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    expensesAddButton.style.display = 'none';
  }
};
AppData.prototype.getExpenses = function() {
  expensesItems.forEach(function(item) {
    //console.log(item);

    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;

    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
    }
  }, this);
};
AppData.prototype.getAddExpenses = function() {
  this.addExpenses = [];
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  }, this);
};
AppData.prototype.getAddIncome = function() {
  this.addIncome = [];
  additionalIncomeItems.forEach((item) => {
    let itemValue = item.value.trim();

    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  }, this);
};
AppData.prototype.addIncomeBlock = function() {
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

  if (calculatePressed === true) {
    title.disabled = true;
    amount.disabled = true;
  }
  // newIncomeItem.querySelector('.income-title').value = '';
  // newIncomeItem.querySelector('.income-amount').value = '';
  incomeItems[0].parentNode.insertBefore(newIncomeItem, incomeAddButton);

  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    incomeAddButton.style.display = 'none';
  }    
};
AppData.prototype.getExpensesMonth = function() {
  let sum = 0;
  
  for(var item in this.expenses) {
    sum += +this.expenses[item];
  }

  this.expensesMonth = sum;
  //return sum;
};
AppData.prototype.getBudget = function()  {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = this.budgetMonth / 30;
};
AppData.prototype.getTargetMonth = function() {
  return Math.ceil(targetAmountInput.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function()  {
  if (this.budgetDay >= 1200) {
    return "У вас высокий уровень дохода";
  } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
    return "У вас средний уровень дохода";
  } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
    return "К сожалению, у вас уровень дохода ниже среднего";
  } else {
    return "Что-то пошло не так";
  }
};
AppData.prototype.getInfoDeposit = function() {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент?', 10);
    } while (!isNumber(this.percentDeposit));      

    do {
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    } while (!isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcSavedMoney = function() {
  return this.budgetMonth * periodInput.value;
};
AppData.prototype.eventListeners = function() {
  calculateButton.addEventListener('click', this.start.bind(this));
expensesAddButton.addEventListener('click', this.addExpensesBlock);
incomeAddButton.addEventListener('click', this.addIncomeBlock);

cancelButton.addEventListener('click', () => {
  calculateButton.style.display = 'block';
  cancelButton.style.display = 'none';

  textInputs.forEach((item) => {
    item.disabled = false;
    item.value = '';
  });

  resultItems.forEach((item) => {
    item.disabled = true;
    item.value = '';
  });

  for (let index in expensesItems) {
    if (index > 0) {
      expensesItems[index].remove();
    }
  }

  expensesItems = document.querySelectorAll('.expenses-items');

  for (let index in incomeItems) {
    if (index > 0) {
      incomeItems[index].remove();
    }
  }

  incomeItems = document.querySelectorAll('.income-items');

  periodInput.value = 1;
  periodAmount.textContent = periodInput.value;
  depositCheckbox.checked = false;
  calculatePressed = false;
  expensesAddButton.style.display = 'block';
  incomeAddButton.style.display = 'block';
});

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
};

const appData = new AppData();
appData.eventListeners();

console.log(appData);



