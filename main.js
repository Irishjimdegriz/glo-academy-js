'use strict';

const calculateButton = document.getElementById('start'),
    incomeAddButton = document.getElementsByTagName('button')[0],
    expensesAddButton = document.getElementsByTagName('button')[1],
    depositCheckbox = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    valueItems = document.querySelectorAll('[class$="-value"]'),
    salaryAmountInput = document.querySelector('.salary-amount'),
    incomeTitleInput = document.querySelector('.income-title'),
    expensesTitleInput = document.querySelector('.expenses-title'),
    additionalExpensesTitleInput = document.querySelector('.additional_expenses-title'),
    additionalExpensesAmountInput = document.querySelector('.additional_expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmountInput = document.querySelector('.target-amount'),
    periodInput = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    cancelButton = document.querySelector('#cancel'),
    resultItems = document.querySelectorAll('.result-total');
    
let calculatePressed = false,
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const isString = (objectToCheck) => {
  const regex = new RegExp('[a-zA-Zа-яА-Я]+');
  return regex.test(objectToCheck);
}

calculateButton.disabled = true;

class AppData {
  constructor() {
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
  }

  start() {
    this.budget = +salaryAmountInput.value;
  
    this.getIncExp();
    // this.getIncome();
    // this.getExpenses();
    this.getExpensesMonth();
    this.getAddIncExp();
    // this.getAddExpenses();
    // this.getAddIncome();
    this.getBudget();
  
    this.showResult();
  
    calculateButton.style.display = 'none';
    cancelButton.style.display = 'block';
    let inputs = document.querySelectorAll('input[type=text]');
    inputs.forEach((item) => {
      item.disabled = true;
    });
  }

  showResult() {
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
  }

  // getIncome() {
  //   incomeItems.forEach((item) => {

  //     let itemIncome = item.querySelector('.income-title').value;
  //     let cashIncome = item.querySelector('.income-amount').value;
  
  //     if (itemIncome !== '' && cashIncome !== '') {
  //       this.income[itemIncome] = cashIncome;
  //       this.incomeMonth += +cashIncome;
  //     }
  //   }, this);
  // }


  // getExpenses() {
  //   expensesItems.forEach(function(item) {
  //     //console.log(item);
  
  //     let itemExpenses = item.querySelector('.expenses-title').value;
  //     let cashExpenses = item.querySelector('.expenses-amount').value;
  
  //     if (itemExpenses !== '' && cashExpenses !== '') {
  //       this.expenses[itemExpenses] = cashExpenses;
  //     }
  //   }, this);
  // }

  getIncExp() {
    const count = item => {
      const startStr = item.className.split('-')[0];

      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = itemAmount;
      }
    };

    incomeItems.forEach(count);
    expensesItems.forEach(count);

    for (const key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  // getAddExpenses() {
  //   this.addExpenses = [];
  //   let addExpenses = additionalExpensesItem.value.split(',');
  //   addExpenses.forEach((item) => {
  //     item = item.trim();
  //     if (item !== '') {
  //       this.addExpenses.push(item);
  //     }
  //   }, this);
  // }

  // getAddIncome() {
  //   this.addIncome = [];
  //   additionalIncomeItems.forEach((item) => {
  //     let itemValue = item.value.trim();
  
  //     if (itemValue !== '') {
  //       this.addIncome.push(itemValue);
  //     }
  //   }, this);
  // }

  getAddIncExp(mode) {
    this.addExpenses = [];
    this.addIncome = [];

    let addExpenses = additionalExpensesItem.value.split(',');

    const count = (mode, item) => {
      const startStr = mode === 0 ? 'Income' : 'Expenses';//item.className.split('-')[0];
      let text = mode === 0 ? item.value  : item;
      if (item !== '') {
        this[`add${startStr}`].push(text.trim());
      }
    };

    additionalIncomeItems.forEach(count.bind(null, 0));
    addExpenses.forEach(count.bind(null, 1));
  }

  addIncExpBlock(mode) {
    const startString = mode === 0 ? 'income' : 'expenses',
          newItem = (mode === 0 ? incomeItems[0] : expensesItems[0]).cloneNode(true),
          title = newItem.querySelector(`.${startString}-title`),
          amount = newItem.querySelector(`.${startString}-amount`);
    
    const keyPressHander = (regexString, event) => {
      const key = event.key,
            regex = new RegExp(regexString);

      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    };

    title.value = '';
    title.addEventListener('keypress', keyPressHander.bind(null, '[а-яА-Я,.!?\\-]'));// (event) => {
    amount.value = '';
    amount.addEventListener('keypress', keyPressHander.bind(null, '[0-9]'));// (event) => {
    //   const key = event.key,
    //         regex = new RegExp('[а-яА-Я,.!?\\-]');

    //   if (!regex.test(key)) {
    //     event.preventDefault();
    //     return false;
    //   }
    // });
        
    // amount.value = '';
    // amount.addEventListener('keypress', (event) => {
    //   const key = event.key,
    //         regex = new RegExp('[0-9]');

    //   if (!regex.test(key)) {
    //     event.preventDefault();
    //     return false;
    //   }
    // });
    
    if (calculatePressed === true) {
      title.disabled = true;
      amount.disabled = true;
    }
  
    let items = document.querySelectorAll(`.${startString}-items`);
    const button = document.getElementsByTagName('button')[mode];
    items[0].parentNode.insertBefore(newItem, button);

    items = document.querySelectorAll(`.${startString}-items`);

    if (items.length === 3) {
      button.style.display = 'none';
    }
  }

  // addExpensesBlock() {
  //   let newExpensesItem = expensesItems[0].cloneNode(true);
  //   let title = newExpensesItem.querySelector('.expenses-title');
  //   let amount = newExpensesItem.querySelector('.expenses-amount');
  
  //   title.value = '';
  //   title.addEventListener('keypress', (event) => {
  //     let key = event.key;
  //     const regex = new RegExp('[а-яА-Я,.!?\\-]');
  //     if (!regex.test(key)) {
  //       event.preventDefault();
  //       return false;
  //     }
  //   });
  
  //   amount.value = '';
  //   amount.addEventListener('keypress', (event) => {
  //     let key = event.key;
  //     const regex = new RegExp('[0-9]');
  //     if (!regex.test(key)) {
  //       event.preventDefault();
  //       return false;
  //     }
  //   });
  
  //   if (calculatePressed === true) {
  //     title.disabled = true;
  //     amount.disabled = true;
  //   }
  
  //   expensesItems[0].parentNode.insertBefore(newExpensesItem, expensesAddButton);
  
  //   expensesItems = document.querySelectorAll('.expenses-items');
  //   if (expensesItems.length === 3) {
  //     expensesAddButton.style.display = 'none';
  //   }
  // }

  // addIncomeBlock() {
  //   let newIncomeItem = incomeItems[0].cloneNode(true);
  
  //   let title = newIncomeItem.querySelector('.income-title');
  //   let amount = newIncomeItem.querySelector('.income-amount');
  
  //   title.value = '';
  //   title.addEventListener('keypress', (event) => {
  //     let key = event.key;
  //     const regex = new RegExp('[а-яА-Я,.!?\\- ]');
  //     if (!regex.test(key)) {
  //       event.preventDefault();
  //       return false;
  //     }
  //   });
  
  //   amount.value = '';
  //   amount.addEventListener('keypress', (event) => {
  //     let key = event.key;
  //     const regex = new RegExp('[0-9]');
  //     if (!regex.test(key)) {
  //       event.preventDefault();
  //       return false;
  //     }
  //   });
  
  //   if (calculatePressed === true) {
  //     title.disabled = true;
  //     amount.disabled = true;
  //   }
  //   // newIncomeItem.querySelector('.income-title').value = '';
  //   // newIncomeItem.querySelector('.income-amount').value = '';
  //   incomeItems[0].parentNode.insertBefore(newIncomeItem, incomeAddButton);
  
  //   incomeItems = document.querySelectorAll('.income-items');
  //   if (incomeItems.length === 3) {
  //     incomeAddButton.style.display = 'none';
  //   }    
  // }

  getExpensesMonth() {
    let sum = 0;
    
    for(var item in this.expenses) {
      sum += +this.expenses[item];
    }
  
    this.expensesMonth = sum;
  }

  getBudget()  {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  }

  getTargetMonth() {
    return Math.ceil(targetAmountInput.value / this.budgetMonth);
  }

  getStatusIncome()  {
    if (this.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
      return "У вас средний уровень дохода";
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
      return "К сожалению, у вас уровень дохода ниже среднего";
    } else {
      return "Что-то пошло не так";
    }
  }

  getInfoDeposit() {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', 10);
      } while (!isNumber(this.percentDeposit));      
  
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  }

  calcSavedMoney() {
    return this.budgetMonth * periodInput.value;
  }

  eventListeners() {
    calculateButton.addEventListener('click', this.start.bind(this));
    incomeAddButton.addEventListener('click', this.addIncExpBlock.bind(null, 0));
    expensesAddButton.addEventListener('click', this.addIncExpBlock.bind(null, 1));
    //incomeAddButton.addEventListener('click', this.addIncomeBlock);
    
    cancelButton.addEventListener('click', () => {
      calculateButton.style.display = 'block';
      cancelButton.style.display = 'none';
      let inputs = document.querySelectorAll('input[type=text]');
      inputs.forEach((item) => {
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
}
}

const appData = new AppData();
appData.eventListeners();

console.log(appData);



