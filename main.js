'use strict';

let income = 'супергерой на полставки',
mission = 10000,
period = 5,
money = +prompt('Ваш месячный доход?'),
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?'),
expenses1 = prompt('Введите обязательную статью расходов?'),
amount1 = +prompt('Во сколько это обойдется?'),
expenses2 = prompt('Введите обязательную статью расходов?'),
amount2 = +prompt('Во сколько это обойдется?');

let showTypeOf = function(data) {
  console.log(typeof data);
}


showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(', '));

const getExpensesMonth = function() {
  return amount1 + amount2;
}

console.log('Расходы за месяц: ' + getExpensesMonth());

const getAccumulatedMonth = function() {
  return money - getExpensesMonth();
}

let accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function(accumulated) {
  return Math.ceil(mission / accumulated);
}

console.log("Цель будет достигнута через " + Math.ceil(mission / getTargetMonth(accumulatedMonth)) + " месяцев");

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