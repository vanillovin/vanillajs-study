console.log('Hello JavaScript');

// Expression
// 값을 만들어내는 간단한 코드를 표현식이라고 합니다.
// 값을 만들어내기 때문에 함수의 인자로 사용할 수 있습니다.

// Statement
// 하나 혹은 여러 개의 표현식이 모여 문장을 이룹니다.
// 모든 표현식은 문장이 될 수 있습니다.
// (보통) 문장의 끝에는 세미콜론을 붙입니다.
// 조건문, 반복문도 문장. 이 경우엔 마지막 } 뒤에 세미콜론을 붙이지 않습니다.
// =>표현식이 모여 문장이 되고 문장들이 모여 만들고자 하는 프로그램이 됩니다.

// 키워드와 예약어
// Keywords
// 자바스크립트에서 특정한 목적을 위해 사용하는 단어
// 예약어로 지정되어 있습니다.
var name = 'Mark'; // 변수를 선언하는 키워드

// Reserved Words
// 프로그램을 작성할 때, 변수명, 함수명 등 이름으로 사용할 수 없는 단어
// 이미 특정한 목적을 위해 사용하기 때문에 사용할 수 없는 예약어
// var return = '변수명';
// function for() {}

// Future reserved keywords
// 앞으로 특정한 목적을 위해 사용할 가능성이 있어서 사용할 수 없는 예약어

// 식별자 Identifier
// https://mothereff.in/js-variables
// 코드 내의 변수, 함수, 혹은 속성을 식별하는 문자열
var name = 'Mark';
function hello() {}
var person = { name: 'Mark', age: 22 };

// 대소문자를 구분합니다.
var myName = 'Mark';
var myname = 'Mark';

// '유니코드 문자', '$', '_', '숫자(0-9)'를 사용할 수 있지만, 숫자로 시작할 수는 없습니다.
// '예약어'는 사용할 수 없고, '공백 문자'도 사용할 수 없습니다.
// 프로그램에서 사용하는 변수나 함수의 이름을 짓는 것은 언제나 어려운 일입니다.
// =>의미없는 이름은 사용하지 않고, 역할에 맞는 적절한 이름을 짓도록 노력해야 합니다.

// 주석 Comments
// 소스코드에서 프로그램에 영향을 주지 않고, 무시되는 부분
// 보통은 소스코드를 이해할 수 있도록 돕는 역할로 사용
// 한 줄 주석
/*
여러
줄
주석
*/

// 변수와 상수 variable and constant

// 변수의 유효범위 scope of variables
// const, let의 유효범위 - 블록 스코프 {}
// 블럭, 밖에서 안으로, 중첩
let age = 22;
{
  {
    {
      console.log(age);
    }
  }
}

// var의 유효범위 - 함수 스코프
var a = 0;
(function () {
  a++;
  console.log(a);
})();
console.log(a);

// var와 호이스팅 var & hoisting
// 아래 있는 선언을(만) 끌어올리다

// 자료형 Data Types
// 변수가 가지는 고정 타입이 없다
let whatever = 'Macaron';
whatever = 36;
whatever = true;

// 기본 타입(Primitive values) - Boolean, Null, Undefined, Number, String, Symbol(ES6에 추가됨)
// 객체(Objects)

// 논리 연산자를 이용한 조건문 평가 &&, ||, !

// 논리 연산자를 이용한 조건부 실행
// 표현식 && 표현식
let n = 5;
n % 5 === 0 && console.log('5로 나누어 떨어질 때만 실행');

// 표현식 || 표현식
n = 5;
n % 6 === 0 || console.log('5로 나누어 떨어지지 않을 때만 실행');

// 삼항 연산자를 이용한 조건부 실행
let num = -4;
console.log(num < 0 ? -num : num);
const msg = n % 5 === 0 ? '5의 배수입니다' : '5의 배수가 아닙니다';
console.log(msg);

// switch를 이용한 조건문

// for 무한 루프
for (;;) {
  console.log('hello');
  if (Math.random() * 100 > 90) break;
}

// for of - iterable(배열)
for (const i of [1, 2, 3]) {
  console.log(i);
}

// for in - 모든 프로퍼티(객체)
Object.prototype.test = function () {};
for (const i in { a: 1, b: 2, c: 3 }) {
  console.log(i);
}

{
  const t = 1;
  const test = new Function('return t');
  // console.log(test()); t is not defined
}

// () => {} arrow function(es6)
const hello1 = () => {
  console.log('hello1');
};
const hello2 = (name) => {
  console.log('hello2', name);
};
const hello3 = (name, age) => {
  console.log('hello3', name, age);
};
const hello4 = (name) => {
  //
  return `hello4 ${name}`;
};
const hello5 = (name) => `hello5 ${name}`;

// new 함수(); 생성자 함수
function Person(name, age) {
  console.log(this);
  this.name = name;
  this.age = age;
}
const p = new Person('Mark', 36);
console.log(p, p.name, p.age);

const Cat = (name, age) => {
  this.name = name;
  this.age = age;
};
// const c = new Cat('냥이', 1);

// 함수 안에서 함수를 만들어 리턴
function plus(base) {
  return function (num) {
    return base + num;
  };
}
const plus5 = plus(5);
console.log(plus5(10)); // 15

// 함수를 호출할 때, 인자로 함수를 사용
function hello(cb) {
  console.log('hello');
  cb();
}
hello(function () {
  console.log('callback');
});

// 객체 object
// 함수, 클래스(틀) => 객체, 개체, object
// 생성자 함수
function A() {}
const a = new A();
console.log(a, typeof a); // A {} 'object'
console.log(A()); // undefined

// 생성하면서 데이터 넣기
function B(name, age) {
  console.log(name, age);
}
const b = new B(); // u u
const c = new B('Mark', 36);
console.log(B()); // u u u

// 표준 내장 객체 new Function
// new Object() 권장하지 않는 방법

// 프로토타입 체인 .prototype
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
//   this.hello = funciton() {
//     console.log('hello', this.name, this.age);
//   }
// }
// const p = new Person('Mark', 36)
// p.hello()
// p.toString();
