'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money, 
    start = function() {
    do {
      money = +prompt('Ваш месячный доход?');
    } 
    while(!isNumber(money))
  }

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 10000,
  period: 5,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let propertyName = prompt('Введите обязательную статью расходов?'),
          amount = 0;

      do {
        amount = +prompt('Во сколько это обойдется?');
      } while (!isNumber(amount));
  
      appData.expenses[propertyName] = amount;
    }
  },
  getExpensesMonth: function() {
    let sum = 0;
    
    for(var item in appData.expenses) {
      sum += appData.expenses[item];
    }

    appData.expensesMonth = sum;
    //return sum;
  },
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function(accumulated) {
    return Math.ceil(appData.mission / accumulated);
  },
  getStatusIncome: function() {
    if (appData.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
      return "К сожалению, у вас уровень дохода ниже среднего";
    } else {
      return "Что-то пошло не так";
    }
  }
}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);

let targetMonth = appData.getTargetMonth(appData.budgetMonth);

if (targetMonth < 0) {
  console.log('Цель не будет достигнута');
}
else {
  console.log("Цель будет достигнута через " + targetMonth + " месяцев");
}

console.log(appData.getStatusIncome());

console.log('Программа включает в себя данные:');

for (let item in appData) {
  console.log("Свойство: " + item + ", его значение - " + appData[item]);
}