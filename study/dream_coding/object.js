'use strict';

/**
 * Objects
 * one of the JavaScript's data types.
 * a collection of related data and/or functionality.
 * Nearly all objects in JavaScript are instances of Object
 * object = { key : value }; - 오브젝트는 key와 value의 집합체
 */

const name = 'cocoa';
const age = 4;
function print(name, age) {
  console.log(name);
  console.log(age);
}
print(name, age);

// 1. Literals and properties
const obj1 = {}; // 'object literal' syntax
const obj2 = new Object(); // 'object constructor' syntax

function print(person) {
  console.log(person.name);
  console.log(person.age);
}

const cocoa = { name: 'cocoa', age: 4 };
print(cocoa);

// with JavaScript magic (dynamically typed language)
// can add properties later
ellie.hasJob = true;
console.log(ellie.hasJob);

// can delete properties later
delete ellie.hasJob;
console.log(ellie.hasJob);

// 2. Computed properties
// key should be always string
console.log(cocoa.name);
console.log(cocoa['name']);
cocoa['hasJob'] = true;
console.log(cocoa.hasJob);

function printValue(obj, key) {
  console.log(obj[key]);
}
printValue(cocoa, 'name');

// 3. Property value shorthand
const person1 = { name: 'bob', age: 2 };
const person2 = { name: 'steve', age: 3 };
const person3 = { name: 'dave', age: 4 };
const person4 = makePerson('ellie', 30);
console.log(person4);
function makePerson(name, age) {
  return {
    name, // name: name
    age, // age: age
  };
}

// 4. Constructor Function
// new를 붙이지 않고 생성자 함수 호출시 this는 window 객체로 바인딩 됨
// 일반적으로 생성자 함수로 사용할 함수는 첫 글자를 대문자로 표기하는 네이밍 규칙 권장
function Person(name, age) {
  // this = {}; 함수 코드 실행되기 전 빈 객체 생성 < this 바인딩
  this.name = name;
  this.age = age;
  // return this; this로 바인딩된 새로 생성한 객체가 리턴됨
}
const person5 = new Person('ellie', 30);
console.log(person5); // Person {name: "ellie", age: 30}

// 5. in operator: property existence check (key in obj)
// 해당하는 오브젝트 안에 키가 있는지 없는지 확인
console.log('name' in ellie); // t
console.log('age' in ellie); // t
console.log('random' in ellie); // f
console.log(ellie.random); // 정의되지 않은 key 접근 undefined

// 6. for..in vs for..of
// for (key in obj)
console.clear(); // 이전 log 지우기
for (let key in ellie) {
  console.log(key);
}

// for (value of iterable)
const array = [1, 2, 4, 5];
//for (let i = 0; i < array.length; i++) {
//  console.log(array[i]);
//}
for (let value of array) {
  console.log(value);
}

// 7. Fun cloning
// Object.assign(dest, [obj1, obj2, obj3...])
const user = { name: 'ellie', age: '20' };
const user2 = user;
user2.name = 'coder';
console.log(user); // {name: "coder", age: "20"}

// old way
// 빈 객체 생성 후 수동적 할당
const user3 = {};
for (let key in user) {
  user3[key] = user[key];
}
console.log(user3);

// Object.assign(dest, [obj1, obj2, obj3...])
// 새로운 함수나 api를 쓸 때는 어떤 파라미터를 전달하고 리턴되는지 확인 (mdn, ctrl+함수)
// assign<T, U>(target: T, source: U): T & U;
// 복사하고자 하는 target과 복사하려는 source를 같이 전달하고
// 리턴 값은 타겟과 복사하고자 하는 값이 통합된 아이가 리턴됨

// const user4 = {};
// Object.assign(user4, user);
const user4 = Object.assign({}, user);
console.log(user4);

// another example
const fruit1 = { color: 'red' };
const fruit2 = { color: 'blue', size: 'big' };
const mixed = Object.assign({}, fruit1, fruit2);
console.log(mixed.color); // blue
console.log(mixed.size); // big
// 뒤에 나오는 아이일수록 값을 계속 덮어씌움을 유의
