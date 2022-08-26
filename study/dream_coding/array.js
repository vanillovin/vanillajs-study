'use strict';
/**
 * Array🎉
 * 오브젝트는 서로 연관된 특징 또는 행동들을 묶어 놓는 것(토끼, 사람, 당근, 물체, 자동차..)
 * 비슷한 것을 묶는 것을 자료구조라고 함. 보통은 동일한 타입의 데이터만 담을 수 있음. 하지만!
 * JavaScript === dynamically typed language JS는 타입이 동적으로 정의됨
 * 타입이 없어서 한 바구니에 다양한 종류의 데이터를 담을 수 있지만 이렇게 프로그래밍 x
 * 자료구조와 알고리즘 - 검색, 삽입, 정렬, 삭제. array, map, list. list 중에서도 single, double..
 */

// 1. Declaration
const arr1 = new Array();
const arr2 = [1, 2];

// 2. Index position
const fruits = ['🍎', '🍌'];
console.log(fruits);
console.log(fruits.length);
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]); // undefined
console.log(fruits[fruits.length - 1]); // 배열의 마지막 아이템에 접근

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
 * 정해진 어떤 action을 수행. array 들어있는 각각의 element 
forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void
두 가지의 파라미터가 전달이 되는데, 첫 번째로 전달되는 콜백함수는 value 하나하나 출력하고 ?은 전달해도 되고 안 해도 됨
*/
// fruits.forEach(function (fruit, index, array) {
// console.log(fruit);
// });
fruits.forEach((fruit, index) => console.log(fruit, index));

// 4. Addtion, deletion, copy
// push: add an item to the end
fruits.push('🍓', '🍑');
console.log(fruits);

// pop: remove an item from the end
const poped = fruits.pop();
fruits.pop();
console.log(fruits);

// unshift: add an item to the benigging
fruits.unshift('🍓', '🍋');
console.log(fruits);

// shift: remove an item from the benigging
fruits.shift();
fruits.shift();
console.log(fruits);

// note!! shift, unshift are slower than pop, push
// shift, unshift 사용 x. 인덱스를 활용한 접근이 아닌 배열의 전체 데이터들이 움직여야 함
// splice: remove an item by index position
fruits.push('🍓', '🍑', '🍋');
console.log(fruits);
fruits.splice(1, 1); // 시작하는 인덱스 1부터 1개만 삭제
console.log(fruits);
fruits.splice(1, 0, '🍏', '🍉'); // 0 사용 시 지우지 않고 추가
console.log(fruits);

// combine two arrays
const fruits2 = ['🍐', '🥥'];
const newFruits = fruits.concat(fruits2);
console.log(newFruits);

// 5. Searching
// indexOf: find the index
console.log(fruits);
console.log(fruits.indexOf('🍎'));
console.log(fruits.indexOf('🍉'));
console.log(fruits.indexOf('🥥')); // -1

// includes
console.log(fruits.includes('🍉')); // t
console.log(fruits.includes('🥥')); // f

// lastIndexOf
fruits.push('🍎');
console.log(fruits);
console.log(fruits.indexOf('🍎'));
console.log(fruits.lastIndexOf('🥥'));
