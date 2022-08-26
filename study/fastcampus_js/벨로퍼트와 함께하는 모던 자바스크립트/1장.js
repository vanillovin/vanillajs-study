// JavaScript!
// 주로 웹브라우저 상에서 유저 인터페이스를 동적으로 보여주기 위해 사용
// 이제는 웹페이지에 국한되지 않고 nodejs로 서버에서도 사용
// 데스크톱 어플리케이션(ELECTRON), 모바일 앱(ReactNative, NativeScript)
// 두 프레임워크들의 특징은, 단순히 웹뷰를 모바일에 띄어서 웹을 앱처럼 보이게 하는 것이 아니라
// 진짜 네이티브 ui를 자바스크립트로 구현할 수 있게 해줌

'use strict';

// 1장
// 1. 변수와 상수
// let, const (var XXXX)
let value = 1;
value = 2;
console.log(value);
let value = 3; // 'value' has already been declared

const a = 1;
a = 2; // "a" is read-only

// 2. 데이터 타입
let value = 1;
let text = '문자열';
let isTrue = true;
let friend = null; // 난 친구같은 거 없다
let criminal;
console.log(criminal); // 값이 아직 정해지지 않았다

// 3. 연산자
// 산술연산자
let value = 1 + 2 - (3 * 4) / 4;
let a = 1;
console.log(a++); // 1
console.log(a); // 2
console.log(++a); // 3

// 대입연산자
let b = 1;
b += 3;
b -= 3;
b *= 3;
b /= 3;

// 논리연산자
// NOT !, AND &&, OR || (우선순위)
const a = false;
console.log(!a);
const b = true && true;
console.log(b);
const c = false || true;
console.log(c);
const value = !((true && false) || (true && false) || !false); // false

// 비교연산자
// ===, !== 사용 (==는 타입 비교 x)
const a = null,
  b = undefined;
const equals = a !== b;
console.log(equals); // true

const a = 10,
  b = 15,
  c = 15;
console.log(a < b);
console.log(b >= a && a <= c);

const a = 'Hello',
  b = 'JavaScript';
console.log(a + b);

// 4. 조건문
// if, elif, else, switch case
const a = 1;
if (a + 1 === 2) {
  const a = 2;
  console.log('특정 조건에 만족하면 실행되는 코드');
  console.log('if문 안의 a 값은 ' + a); // 2
}
console.log('if문 밖의 a 값은 ' + a); // 1

const device = 'iphone';
switch (device) {
  case 'iphone':
    console.log('iphone!');
    break;
  case 'ipad':
    console.log('ipad!');
    break;
  case 'galaxy note':
    console.log('galaxy note!');
    break;
  default:
    console.log('모르겠네요..');
}

// 5. 함수 Function
// ES6 = ECMAScript6 = ES2015 (자바스크립트 버전)
const a = 1;
const b = 2;
const sum = a + b;

function add(num1, num2) {
  return num1 + num2;
}
const sum = add(1, 2);
console.log(sum);

function hello(name) {
  return `Hello ${name}!`;
}
const result = hello('Vanilla');
console.log(result);

function getGrade(score) {
  if (score === 100) {
    return `A+`;
  } else if (score >= 90) {
    return `A`;
  } else if (score >= 80) {
    return `B`;
  } else if (score >= 70) {
    return `C`;
  } else {
    return `D`;
  }
}
const grade = getGrade(100);
console.log(grade);

// arrow function (es6)
const add = (a, b) => a + b;
const sum = add(1, 2);

const hello = (name) => {
  console.log(`hello, ${name}`);
};

// 6. 객체 Object
const dogName = 'aang';
const dogAge = 2;

const ironMan = {
  name: '토니 스타크',
  actor: '로버트 다우니 주니어',
  alias: '아이언맨',
};

// 비구조화 할당 (객체구조분해) 문법
// -객체에서 특정 값들을 객체에서 추출하는 방식
const object = { a: 1, b: 2 };
const { a, b } = object;
console.log(a); // 1
console.log(b); // 2

function print(hero) {
  const text = `${hero.alias}(${hero.name}) 역할을 맡은 배우는 ${hero.actor}`;
  console.log(text);
}
function print(hero) {
  const { alias, name, actor } = hero;
  const text = `${alias}(${name}) 역할을 맡은 배우는 ${actor}`;
  console.log(text);
}
function print({ alias, name, actor }) {
  const text = `${alias}(${name}) 역할을 맡은 배우는 ${actor}`;
  console.log(text);
}

const { name } = ironMan;
console.log(name);

// getter, setter 함수
// -특정 값을 조회하거나 바꾸려고 할 때
const dog = {
  _name: 'Mong',
  get name() {
    console.log(`_name을 조회합니다..`);
    return this._name;
  },
  set name(value) {
    console.log(`이름이 바뀜니다.. ${value}`);
    this._name = value;
  },
};
console.log(dog.name);
dog.name = 'Mung';
console.log(dog.name);

const numbers = {
  _a: 1,
  _b: 2,
  sum: 3,
  calculate() {
    console.log('calculate');
    this.sum = this._a + this._b;
  },
  get a() {
    return this._a;
  },
  get b() {
    return this._b;
  },
  set a(value) {
    this._a = value;
    this.calculate();
  },
  set b(value) {
    this._b = value;
    this.calculate();
  },
};
console.log(numbers.sum);
numbers.a = 4;
numbers.b = 12;
console.log(numbers.sum);

// 7. 배열 Array
const arr = [1, 'cocoa', true, { a: 0 }];
console.log(arr[1]); // 'cocoa'
arr.push('vanilla');
console.log(arr.length); // 5

// 8. 반복문
// for
for (let i = 10; i >= 0; i -= 2) {
  console.log(i);
}
const names = ['Anna', 'Beta', 'Cora', 'Dall'];
for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}

// while
// -숫자보다는 특정 값이 true가 됐을 때
let i = 0;
let isFun = false;
while (!isFun) {
  console.log(i);
  i++;
  if (i === 20) {
    isFun = true;
  }
}

// for of(array)
const numbers = [10, 20, 30, 40, 50];
for (let number of numbers) {
  console.log(number);
}

const doggy = {
  name: 'Dodo',
  sound: 'dooo',
  age: 2,
};

console.log(Object.entries(doggy));
console.log(Object.keys(doggy));
console.log(Object.values(doggy));

// for in(object)
for (let key in doggy) {
  console.log(key);
}
for (let key in doggy) {
  console.log(`${key}: ${doggy[key]}`);
}

// continue, break
for (let i = 0; i < 10; i++) {
  if (i === 2) continue;
  console.log(i);
  if (i === 5) break;
}

// Quiz🌷
function biggerThanThree1(numbers) {
  let new_list = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 3) {
      new_list.push(numbers[i]);
    }
  }
  return new_list;
}
const numbers = [1, 2, 3, 4, 5, 6, 7];
console.log(biggerThanThree(numbers));

function biggerThanThree2(numbers) {
  k = [];
  for (let number of numbers) {
    if (number > 3) {
      k.push(number);
    }
  }

  return k;
}
const numbers = [1, 2, 3, 4, 5, 6, 7];
console.log(biggerThanThree(numbers));

// 9. 배열 내장함수
// forEach
const avatars = ['Aang', 'Katara', 'Zuko', 'Toph'];
function print(avatars) {
  console.log(avatars);
}
avatars.forEach(print);

avatars.forEach(function (avatars) {
  console.log(avatars);
});

avatars.forEach((avatars) => {
  console.log(avatars);
});

// map
const arr = [1, 2, 3, 4, 5, 6, 7, 8];

//const squared = [];
//for (let i = 0; i < arr.length; i++) {
//  squared.push(arr[i] * arr[i]);
//}
//arr.forEach((n) => {
//  squared.push(n * n);
//});

const square = (n) => n * n;
const squared = arr.map(square);
//const squared = arr.map((n) => n * n);
console.log(squared);

const items = [
  { id: 1, text: 'hello' },
  { id: 2, text: 'bye' },
];

const texts = items.map((item) => item.text);
console.log(texts); // ["hello", "bye"]

const ssr = [
  'Chocola Meilleure',
  'Vanilla Mieux',
  'Duke',
  'Blanca',
  'Pierre',
  "Rock'n Lovin",
  'Cinnamon Meilleure',
  'Candy Mieux',
  'Gracier',
  'Waffle',
  'Houx',
  'Saule',
];
const index = ssr.indexOf('Waffle');
console.log(index);

const todos = [
  {
    id: 1,
    text: '자바스크립트 입문',
    done: true,
  },
  {
    id: 2,
    text: '슈가슈가룬 보기',
    done: true,
  },
  {
    id: 3,
    text: '저녁메뉴 정하기',
    done: false,
  },
  {
    id: 4,
    text: '자바스크립트 완벽가이드',
    done: false,
  },
];
console.log(todos.find((todo) => todo.id === 3));
console.log(todos.findIndex((todo) => todo.id === 3));

// filter
const tasksNotDone = todos.filter((todo) => !todo.done);
console.log(tasksNotDone);

// splice, slice
// shift, pop, unshift, push

// 10. 프로토타입과 클래스
function Animal(type, name, sound) {
  this.type = type;
  this.name = name;
  this.sound = sound;
}
Animal.prototype.say = function () {
  console.log(this.sound);
};

const cat = new Animal('Cotton', 'meow', 'berry meow');
cat.say();
