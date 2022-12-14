'use strict';
/**
 * Arrayπ
 * μ€λΈμ νΈλ μλ‘ μ°κ΄λ νΉμ§ λλ νλλ€μ λ¬Άμ΄ λλ κ²(ν λΌ, μ¬λ, λΉκ·Ό, λ¬Όμ²΄, μλμ°¨..)
 * λΉμ·ν κ²μ λ¬Άλ κ²μ μλ£κ΅¬μ‘°λΌκ³  ν¨. λ³΄ν΅μ λμΌν νμμ λ°μ΄ν°λ§ λ΄μ μ μμ. νμ§λ§!
 * JavaScript === dynamically typed language JSλ νμμ΄ λμ μΌλ‘ μ μλ¨
 * νμμ΄ μμ΄μ ν λ°κ΅¬λμ λ€μν μ’λ₯μ λ°μ΄ν°λ₯Ό λ΄μ μ μμ§λ§ μ΄λ κ² νλ‘κ·Έλλ° x
 * μλ£κ΅¬μ‘°μ μκ³ λ¦¬μ¦ - κ²μ, μ½μ, μ λ ¬, μ­μ . array, map, list. list μ€μμλ single, double..
 */

// 1. Declaration
const arr1 = new Array();
const arr2 = [1, 2];

// 2. Index position
const fruits = ['π', 'π'];
console.log(fruits);
console.log(fruits.length);
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]); // undefined
console.log(fruits[fruits.length - 1]); // λ°°μ΄μ λ§μ§λ§ μμ΄νμ μ κ·Ό

// 3. Looping over an array
// print all fruits
// a. for
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// b. for of
for (let fruit of fruits) {
  console.log(fruit);
}

// c. forEach
/**
 * Performs the specified action for each element in an array.
 * μ ν΄μ§ μ΄λ€ actionμ μν. array λ€μ΄μλ κ°κ°μ element 
forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void
λ κ°μ§μ νλΌλ―Έν°κ° μ λ¬μ΄ λλλ°, μ²« λ²μ§Έλ‘ μ λ¬λλ μ½λ°±ν¨μλ value νλνλ μΆλ ₯νκ³  ?μ μ λ¬ν΄λ λκ³  μ ν΄λ λ¨
*/
// fruits.forEach(function (fruit, index, array) {
// console.log(fruit);
// });
fruits.forEach((fruit, index) => console.log(fruit, index));

// 4. Addtion, deletion, copy
// push: add an item to the end
fruits.push('π', 'π');
console.log(fruits);

// pop: remove an item from the end
const poped = fruits.pop();
fruits.pop();
console.log(fruits);

// unshift: add an item to the benigging
fruits.unshift('π', 'π');
console.log(fruits);

// shift: remove an item from the benigging
fruits.shift();
fruits.shift();
console.log(fruits);

// note!! shift, unshift are slower than pop, push
// shift, unshift μ¬μ© x. μΈλ±μ€λ₯Ό νμ©ν μ κ·Όμ΄ μλ λ°°μ΄μ μ μ²΄ λ°μ΄ν°λ€μ΄ μμ§μ¬μΌ ν¨
// splice: remove an item by index position
fruits.push('π', 'π', 'π');
console.log(fruits);
fruits.splice(1, 1); // μμνλ μΈλ±μ€ 1λΆν° 1κ°λ§ μ­μ 
console.log(fruits);
fruits.splice(1, 0, 'π', 'π'); // 0 μ¬μ© μ μ§μ°μ§ μκ³  μΆκ°
console.log(fruits);

// combine two arrays
const fruits2 = ['π', 'π₯₯'];
const newFruits = fruits.concat(fruits2);
console.log(newFruits);

// 5. Searching
// indexOf: find the index
console.log(fruits);
console.log(fruits.indexOf('π'));
console.log(fruits.indexOf('π'));
console.log(fruits.indexOf('π₯₯')); // -1

// includes
console.log(fruits.includes('π')); // t
console.log(fruits.includes('π₯₯')); // f

// lastIndexOf
fruits.push('π');
console.log(fruits);
console.log(fruits.indexOf('π'));
console.log(fruits.lastIndexOf('π₯₯'));
