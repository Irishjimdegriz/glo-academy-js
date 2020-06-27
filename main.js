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
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    resultItems = document.querySelectorAll('.result-total');
    
let calculatePressed = false,
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');
    //calculateDisabled = true;

const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const isString = (objectToCheck) => {
  const regex = new RegExp('[a-zA-Zа-яА-Я]+');
  return regex.test(objectToCheck);
}

calculateButton.disabled = true;

class CookieManager {
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  deleteCookie(name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

}

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
    this.cookieManager = new CookieManager();
    this.storageNames = new Set (['budgetMonth', 'budgetDay', 'expenses', 'addIncome', 'addExpenses', 'incomeMonth', 'targetMonth', 'isLoad']);
  }

  start() {
    this.budget = +salaryAmountInput.value;
  
    this.getIncExp();
    this.getExpensesMonth();
    this.getAddIncExp();
    this.getInfoDeposit();
    this.getBudget();
    this.getTargetMonth();
  
    this.showResult();
    this.saveData();
    this.lockInputs();
  }

  lockInputs() {
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
    valueItems[6].value = Math.ceil(this.targetMonth);
    valueItems[5].value = this.calcSavedMoney();
  
    periodInput.addEventListener('input', function() {
      valueItems[5].value = _this.calcSavedMoney();
    }.bind(this));
  }

  checkMemory() {
    let loaded = true;

    for (let item of this.storageNames) {
      const cookieValue = this.cookieManager.getCookie(item);
      if (cookieValue === undefined) {
        loaded = false;
        break;
      }

      if (localStorage[item] !== undefined) {
        if (localStorage[item] !== cookieValue) {
          loaded = false;
          break;
        }

        if (item === 'addExpenses' || item === 'addIncome') {
          for (let memoryItem of JSON.parse(localStorage[item])) {
            this[item].push(memoryItem);
          }
        } else if (item === 'expenses') {
          this[item] = JSON.parse(localStorage[item]);
        } else {
            this[item] = +localStorage[item];
        }
      } else {
        loaded = false;
        break;
      }
    }

    if (loaded) {
      this.lockInputs();
      this.showResult();
    } else {
      this.clearData();
      this.clearCookies();
    }
  }

  clearData() {
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
    this.targetMonth = 0;
    this.clearLocalStorage();
  }

  clearLocalStorage() {
    for (let item of this.storageNames) {
      if (localStorage[item] !== undefined) {
        localStorage.removeItem(item);
      }
    }
  }

  clearCookies() {
    for (let item of this.storageNames) {
      this.cookieManager.deleteCookie(item);
    }
  }

  saveData() {
    for (let item of this.storageNames) {
      let value;

      if (item === 'addExpenses' || item === 'addIncome' || item === 'expenses') {
        value = JSON.stringify(this[item]);
      } else if (item === 'isLoad') {
        value = true;
      } else {
        value = this[item];
      }

      localStorage[item] = value;

      this.cookieManager.setCookie(item, value, 1000);
    }
  }

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

  getExpensesMonth() {
    let sum = 0;
    
    for(var item in this.expenses) {
      sum += +this.expenses[item];
    }
  
    this.expensesMonth = sum;
  }

  getBudget()  {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = this.budgetMonth / 30;
  }

  getTargetMonth() {
    this.targetMonth = Math.ceil(targetAmountInput.value / this.budgetMonth);
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

  calcSavedMoney() {
    return this.budgetMonth * periodInput.value;
  }

  getInfoDeposit() {
    if (this.deposit === true) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  changePercent() {
    const valueSelect = this.value;

    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }

  }

  depositHandler() {
    if (depositCheckbox.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  eventListeners() {
    depositBank.addEventListener('change', () => {
      if (depositBank.value === 'other') {
        depositPercent.style.display = 'inline-block';
      } else {
        depositPercent.value = '';
        depositPercent.style.display = 'none';
      }
    });

    depositPercent.addEventListener('keypress', (event) => {
      let key = event.key;
      const regex = new RegExp('[0-9]');
      if (!regex.test(key) || +depositPercent.value < 0 || +depositPercent.value > 100) {
        //event.preventDefault();
        alert ("Введите корректное значение в поле проценты");
        calculateButton.disabled = true;
        return false;
      } else {
        calculateButton.disabled = false;
      }
    });

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

      expensesItems = document.querySelectorAll('.expenses-items');
    
      for (let index in expensesItems) {
        if (index > 0) {
          expensesItems[index].remove();
        }
      }

      incomeItems = document.querySelectorAll('.income-items');
      
      for (let index in incomeItems) {
        if (index > 0) {
          incomeItems[index].remove();
        }
      }
    
      periodInput.value = 1;
      periodAmount.textContent = periodInput.value;
      depositCheckbox.checked = false;
      calculatePressed = false;
      expensesAddButton.style.display = 'block';
      incomeAddButton.style.display = 'block';
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      this.clearData();
    });
    
    periodInput.addEventListener('input', () => {
      periodAmount.textContent = periodInput.value;
    })
    
    salaryAmountInput.addEventListener('input', () => {
      if (salaryAmountInput.value === '') {
        calculateButton.disabled = true;
      } else {
        if (!isNaN(+depositPercent.value) && +depositPercent.value >= 0 && +depositPercent.value <= 100) {
          calculateButton.disabled = false; 
        }
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

  depositCheckbox.addEventListener('change', this.depositHandler.bind(this));
}
}

const appData = new AppData();
appData.eventListeners();
appData.checkMemory();



