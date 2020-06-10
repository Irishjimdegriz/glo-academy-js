'use strict';

let money = 3000;
let income = 'супергерой на полставки';
let addExpenses = 'Электричество, интернеТ, праЧЕЧная';
let deposit = true;
let mission = 10000;
let period = 5;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;

console.log(budgetDay);

//  alert("Привет, мир!");
//  console.log("Hello world!");

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - amount1 - amount2;
console.log("Цель будет достигнута через " + Math.ceil(mission / budgetMonth) + " месяцев");

console.log("Бюджет на день - " + Math.floor(budgetMonth / 30));

if (budgetDay >= 1200) {
  console.log("У вас высокий уровень дохода");
} else if (budgetDay < 1200 && budgetDay >= 600) {
  console.log("У вас средний уровень дохода");
} else if (budgetDay < 600 && budgetDay >= 0) {
  console.log("К сожалению, у вас уровень дохода ниже среднего");
} else {
  console.log("Что-то пошло не так");
}
