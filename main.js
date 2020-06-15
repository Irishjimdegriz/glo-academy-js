'use strict';

let isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

let isString = (objectToCheck) => {
  const regex = new RegExp('[a-zA-Zа-яА-Я]+');
  return regex.test(objectToCheck);
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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 10000,
  period: 5,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking: () => {
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
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let propertyName,
          amount = 0;

      do {
          propertyName = prompt('Введите обязательную статью расходов?');
      } while (!isString(propertyName));

      do {
        amount = +prompt('Во сколько это обойдется?');
      } while (!isNumber(amount));
  
      appData.expenses[propertyName] = amount;
    }
  },
  getExpensesMonth: () => {
    let sum = 0;
    
    for(var item in appData.expenses) {
      sum += appData.expenses[item];
    }

    appData.expensesMonth = sum;
    //return sum;
  },
  getBudget: () =>  {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: (accumulated) => {
    return Math.ceil(appData.mission / accumulated);
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
    return appData.budgetMonth * appData.period;
  }
};

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

let arrayResult = "";

for (let item of appData.addExpenses) {
  item = item.toLowerCase();
  arrayResult += item.charAt(0).toUpperCase() + item.slice(1) + ', ';
}

arrayResult = arrayResult.slice(0, -2);

console.log(arrayResult);