'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let income = 'супергерой на полставки',
mission = 10000,
period = 5,
money,
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?'),
expenses = [],
targetMonth;

let showTypeOf = function(data) {
  console.log(typeof data);
}

let start = function() {
  do {
    money = +prompt('Ваш месячный доход?');
  } 
  while(!isNumber(money))
}

start();

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(', '));

const getExpensesMonth = function() {
  let sum = 0;
  let amount = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');

    do {
      amount = +prompt('Во сколько это обойдется?');
    } while (!isNumber(amount));

    sum += amount;
  }

  console.log(expenses);
  return sum;
}

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

const getAccumulatedMonth = function() {
  return money - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function(accumulated) {
  return Math.ceil(mission / accumulated);
}

targetMonth = getTargetMonth(accumulatedMonth);

if (targetMonth < 0) {
  console.log('Цель не будет достигнута');
}
else {
  console.log("Цель будет достигнута через " + Math.ceil(mission / targetMonth) + " месяцев");
}

let budgetDay = accumulatedMonth / 30;
console.log(Math.floor(budgetDay));

let getStatusIncome = function() {
  if (budgetDay >= 1200) {
    return "У вас высокий уровень дохода";
  } else if (budgetDay < 1200 && budgetDay >= 600) {
    return "У вас средний уровень дохода";
  } else if (budgetDay < 600 && budgetDay >= 0) {
    return "К сожалению, у вас уровень дохода ниже среднего";
  } else {
    return "Что-то пошло не так";
  }
}

console.log(getStatusIncome());