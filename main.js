'use strict';

let income = 'супергерой на полставки';
let mission = 10000;
let period = 5;
let money = +prompt('Ваш месячный доход?');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - amount1 - amount2;

console.log("Цель будет достигнута через " + Math.ceil(mission / budgetMonth) + " месяцев");

let budgetDay = budgetMonth / 30;
console.log(Math.floor(budgetDay));

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLowerCase().split(', '));

if (budgetDay >= 1200) {
  console.log("У вас высокий уровень дохода");
} else if (budgetDay < 1200 && budgetDay >= 600) {
  console.log("У вас средний уровень дохода");
} else if (budgetDay < 600 && budgetDay >= 0) {
  console.log("К сожалению, у вас уровень дохода ниже среднего");
} else {
  console.log("Что-то пошло не так");
}
