document.body.innerHTML = '<button>๐ง</button>';
document.querySelector('button').addEventListener('click', function () {
  console.log(this);
});

/* 19 ํ๋กํ ํ์ */
// ์๋ฐ์คํฌ๋ฆฝํธ๋ ๋ช๋ นํ imperative, ํจ์ํ funcional, ํ๋กํ ํ์ ๊ธฐ๋ฐ prototype-based
// ๊ฐ์ฒด์งํฅ ํ๋ก๊ทธ๋๋ฐ OOP; Object Oriented Programming์ ์ง์ํ๋ ๋ฉํฐ ํจ๋ฌ๋ค์ ํ๋ก๊ทธ๋๋ฐ ์ธ์ด
// ์๋ฐ์คํฌ๋ฆฝํธ๋ฅผ ์ด๋ฃจ๊ณ  ์๋ ๊ฑฐ์ "๋ชจ๋  ๊ฒ"์ด ๊ฐ์ฒด. (์์ ํ์์ ๊ฐ์ ์ ์ธํ ๋๋จธ์ง ๊ฐ๋ค)

/* 19.1 ๊ฐ์ฒด์งํฅ ํ๋ก๊ทธ๋๋ฐ */
// ์ํ state๋ฅผ ๋ํ๋ด๋ ๋ฐ์ดํฐ, ์ํ ๋ฐ์ดํฐ๋ฅผ ์กฐ์ํ  ์ ์๋ ๋์ behavior์ ํ๋์ ๋ผ๋ฆฌ์ ์ธ ๋จ์๋ก ๋ฌถ์
// -> ๋ฐ๋ผ์ ๊ฐ์ฒด๋ ์ํ ๋ฐ์ดํฐ์ ๋์์ ํ๋์ ๋ผ๋ฆฌ์ ์ธ ๋จ์๋ก ๋ฌถ์ ๋ณตํฉ์ ์ธ ์๋ฃ๊ตฌ์กฐ

/* 19.2 ์์๊ณผ ํ๋กํ ํ์ inheritance */
// ์์์ ํตํด ๋ถํ์ํ ์ค๋ณต์ ์ ๊ฑฐ. ์๋ฐ์คํฌ๋ฆฝํธ๋ ํ๋กํ ํ์ prototype์ ๊ธฐ๋ฐ์ผ๋ก ์์์ ๊ตฌํํจ.
function Circle(radius) {
  this.radius = radius;
}
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};
const circle1 = new Circle(1);
const circle2 = new Circle(2);
console.log(circle1.getArea === circle2.getArea); // true
console.log(circle1.getArea(), circle2.getArea());

/* 19.3 ํ๋กํ ํ์ ๊ฐ์ฒด(ํ๋กํ ํ์) */
// OOP์ ๊ทผ๊ฐ์ ์ด๋ฃจ๋ ๊ฐ์ฒด ์์ inheritance์ ๊ตฌํํ๊ธฐ ์ํด ์ฌ์ฉ๋๋ค. ํ๋กํ ํ์์
// ์ด๋ค ๊ฐ์ฒด์ ์์(๋ถ๋ชจ) ๊ฐ์ฒด์ ์ญํ ์ ํ๋ ๊ฐ์ฒด๋ก ๋ค๋ฅธ ๊ฐ์ฒด์ ๊ณต์  ํ๋กํผํฐ(๋ฉ์๋ ํฌํจ)๋ฅผ ์ ๊ณต
// ๋ชจ๋  ๊ฐ์ฒด๋ [[Prototype]]์ด๋ผ๋ ๋ด๋ถ ์ฌ๋กฏ์ ๊ฐ์ง๋ฉฐ ์ด ๊ฐ์ ํ๋กํ ํ์์ ์ฐธ์กฐ(null์ธ ๊ฒฝ์ฐ๋ ์์)๋ค.

// 19.3.1 __proto__ ์ ๊ทผ์ ํ๋กํผํฐ
// ๋ชจ๋  ๊ฐ์ฒด๋ __proto__ ์ ๊ทผ์ ํ๋กํผํฐ๋ฅผ ํตํด ์์ ์ ํ๋กํ ํ์([[Prototype]] ๋ด๋ถ ์ฌ๋กฏ)์ ๊ฐ์ ์ ์ผ๋ก ์ ๊ทผ ๊ฐ๋ฅ
const p = { name: 'Lee' };
console.log(p);

// __proto__๋ ์ ๊ทผ์ ํ๋กํผํฐ๋ค. Object.prototype์ ์ ๊ทผ์ ํ๋กํผํฐ์ธ __proto__๋ getter/setter
// ํจ์๋ผ๊ณ  ๋ถ๋ฅด๋ ์ ๊ทผ์ ํจ์๋ฅผ ํตํด ๋ด๋ถ ์ฌ๋กฏ์ ๊ฐ, ์ฆ ํ๋กํ ํ์์ ์ทจ๋ํ๊ฑฐ๋ ํ ๋นํ๋ค.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
const obj = {};
const parent = { x: 1 };
obj.__proto__ = parent;
console.log(obj.x); // 1

// __proto__ ์ ๊ทผ์ ํ๋กํผํฐ๋ ์์์ ํตํด ์ฌ์ฉ๋๋ค
// ๊ฐ์ฒด๊ฐ ์ง์  ์์ ํ๋ ํ๋กํผํฐ๊ฐ ์๋๋ผ Object.prototype์ ํ๋กํผํฐ๋ค.
// ๋ชจ๋  ๊ฐ์ฒด๋ ์์์ ํตํด Object.prototype.__proto__ ์ ๊ทผ์ ํ๋กํผํฐ๋ฅผ ์ฌ์ฉํ  ์ ์๋ค.
const person = { name: 'Lee' };
console.log(person.hasOwnProperty('__proto__'));
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
console.log({}.__proto__ === Object.prototype); // ture

// Object.prototype
// ํ๋กํ ํ์ ์ฒด์ธ์ ์ข์ , ์ฆ ํ๋กํ ํ์ ์ฒด์ธ์ ์ต์์ ๊ฐ์ฒด๋ Object.prototype์ด๋ฉฐ,
// ์ด ๊ฐ์ฒด์ ํ๋กํผํฐ์ ๋ฉ์๋๋ ๋ชจ๋  ๊ฐ์ฒด์ ์์๋๋ค.

// __proto__ ์ ๊ทผ์ ํ๋กํผํฐ๋ฅผ ์ฝ๋ ๋ด์์ ์ง์  ์ฌ์ฉํ๋ ๊ฒ์ ๊ถ์ฅํ์ง ์๋๋ค.
// __proto__ ์ ๊ทผ์ ํ๋กํผํฐ ๋์  ํ๋กํ ํ์์ ์ฐธ์กฐ๋ฅผ ์ทจ๋ํ๊ณ  ์ถ์ ๊ฒฝ์ฐ์๋
// Object.getPrototypeOf ๋ฉ์๋๋ฅผ ์ฌ์ฉํ๊ณ , ํ๋กํ ํ์์ ๊ต์ฒดํ๊ณ  ์ถ์ ๊ฒฝ์ฐ์๋
// Object.setPrototypeOf ๋ฉ์๋ค๋ฅด ์ฌ์ฉํ  ๊ฒ์ ๊ถ์ฅ
// const obj = Object.create(null);
// console.log(obj.__proto__); // undefined
// console.log(Object.getPrototypeOf(obj)); // null

// 19.3.2 ํจ์ ๊ฐ์ฒด์ prototype ํ๋กํผํฐ
// ํจ์ ๊ฐ์ฒด๋ง์ด ์์ ํ๋ prototype ํ๋กํผํฐ๋ ์์ฑ์ ํจ์๊ฐ ์์ฑํ  ์ธ์คํด์ค์ ํ๋กํ ํ์์ ๊ฐ๋ฆฌํจ๋ค.
console.log(function () {}.hasOwnProperty('prototype')); // true
console.log({}.hasOwnProperty('prototype')); // false

// ์์ฑ์ ํจ์๋ก์ ํธ์ถํ  ์ ์๋ ํจ์ non-constructor์ธ ํ์ดํ ํจ์, ES6 ๋ฉ์๋ ์ถ์ฝํํ์ผ๋ก
// ์ ์ํ ๋ฉ์๋๋ prototype ํ๋กํผํฐ๋ฅผ ์์ ํ์ง ์์ผ๋ฉฐ ํ๋กํ ํ์๋ ์์ฑํ์ง ์๋๋ค
// ๋ชจ๋  ๊ฐ์ฒด๊ฐ ๊ฐ์ง๊ณ  ์๋(์๋ฐํ ๋งํ๋ฉด Object.prototype์ผ๋ก๋ถํฐ ์์๋ฐ์)
// __proto__ ์ ๊ทผ์ ํ๋กํผํฐ์ ํจ์ ๊ฐ์ฒด๋ง์ด ๊ฐ์ง๊ณ  ์๋ prototype ํ๋กํผํฐ๋ ๊ฒฐ๊ตญ
// ๋์ผํ ํ๋กํ ํ์์ ๊ฐ๋ฆฌํจ๋ค. ํ์ง๋ง ์ด๋ค ํ๋กํผํฐ๋ฅผ ์ฌ์ฉํ๋ ์ฃผ์ฒด๊ฐ ๋ค๋ฅด๋ค.
function Person(name) {
  this.name = name;
}
const me = new Person('Lee');
console.log(Person.prototype === me.__proto__); // true

// 19.3.3 ํ๋กํ ํ์์ constructor ํ๋กํผํฐ์ ์์ฑ์ ํจ์
// ๋ชจ๋  ํ๋กํ ํ์์ constructor ํ๋กํผํฐ๋ฅผ ๊ฐ๊ณ  ์์ ์ ์ฐธ์กฐํ๊ณ  ์๋ ์์ฑ์ ํจ์๋ฅผ ๊ฐ๋ฆฌํจ๋ค.
// ์ด ์ฐ๊ฒฐ์ ์์ฑ์ ํจ์๊ฐ ์์ฑ๋  ๋, ์ฆ ํจ์ ๊ฐ์ฒด๊ฐ ์์ฑ๋  ๋ ์ด๋ค์ง๋ค.
function A(name) {
  this.name = name;
}
const a = new A('a');
console.log(a.constructor === A); // true

/* 19.4 ๋ฆฌํฐ๋ด ํ๊ธฐ๋ฒ์ ์ํด ์์ฑ๋ ๊ฐ์ฒด์ ์์ฑ์ ํจ์์ ํ๋กํ ํ์ */
const abj = new Object();
console.log(abj.constructor === Object); // true
const add = new Function('x', 'y', 'return x + y');
console.log(add.constructor === Function); // true

const bbj = {};
const bdd = function (a, b) {
  return a + b;
};
const brr = [1, 2, 3];
const begexp = /is/gi;
// ๋ฆฌํฐ๋ด ํ๊ธฐ๋ฒ์ ์ํด ์์ฑ๋ ๊ฐ์ฒด๋ ๋ฌผ๋ก  ํ๋กํ ํ์์ด ์กด์ฌํ๋ค. ํ์ง๋ง constructor ํ๋กํผํฐ๊ฐ
// ๊ฐ๋ฆฌํค๋ ์์ฑ์ ํจ์๊ฐ ๋ฐ๋์ ๊ฐ์ฒด๋ฅผ ์์ฑํ ์์ฑ์ ํจ์๋ผ๊ณ  ๋จ์ ํ  ์๋ ์๋ค

// Object ์์ฑ์ ํจ์์ ์ํ ๊ฐ์ฒด ์์ฑ/์ธ์๊ฐ ์ ๋ฌ๋์ง ์์์ ๋ ์ถ์ ์ฐ์ฐ์ ํธ์ถํด ๋น ๊ฐ์ฒด ์์ฑ
let cbj = new Object();
console.log(cbj); // {}

// new.target์ด undefined๋ Object๊ฐ ์๋ ๊ฒฝ์ฐ
class Foo extends Object {}
console.log(new Foo()); // Foo {}

// ์ธ์๊ฐ ์ ๋ฌ๋ ๊ฒฝ์ฐ์๋ ์ธ์๋ฅผ ๊ฐ์ฒด๋ก ๋ณํํ๋ค.
const dbj = new Object(123);
console.log(dbj); // Number {123}
const ebj = new Object('123');
console.log(ebj); // String {"123"}

// ๊ฐ์ฒด ๋ฆฌํฐ๋ด์ด ํ๊ฐ๋  ๋๋ ๋ค์๊ณผ ๊ฐ์ด ์ถ์ ์ฐ์ฐ OrdinaryObjectCreate๋ฅผ ํธ์ถํ์ฌ
// ๋น ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ  ํ๋กํผํฐ๋ฅผ ์ถ๊ฐํ๋๋ก ์ ์๋์ด ์๋ค.???
// ๋ฐ๋ผ์ ๊ฐ์ฒด ๋ฆฌํฐ๋ด์ ์ํด ์์ฑ๋ ๊ฐ์ฒด๋ Object ์์ฑ์ ํจ์๊ฐ ์์ฑํ ๊ฐ์ฒด๊ฐ ์๋๋ค..
function boo() {}
console.log(boo.constructor === Function); // true
// ๋ฆฌํฐ๋ด ํ๊ธฐ๋ฒ์ ์ํด ์์ฑ๋ ๊ฐ์ฒด๋ ์์์ ์ํด ํ๋กํ ํ์์ด ํ์ํ๋ค. ๋ฐ๋ผ์ ๊ฐ์์ ์ธ ์์ฑ์ ํจ์๋ฅผ ๊ฐ๋๋ค
// -> ํ๋กํ ํ์๊ณผ ์์ฑ์ ํจ์๋ ๋จ๋์ผ๋ก ์กด์ฌํ  ์ ์๊ณ  ์ธ์ ๋ ์ pair๋ก ์กด์ฌํ๋ค.
// ๋ฐ๋ผ์ ํ๋กํ ํ์์ constructor ํ๋กํผํฐ๋ฅผ ํตํด ์ฐ๊ฒฐ๋์ด ์๋ ์์ฑ์ ํจ์๋ฅผ ๋ฆฌํฐ๋ด ํ๊ธฐ๋ฒ์ผ๋ก
// ์์ฑํ ๊ฐ์ฒด๋ฅผ ์์ฑ์ ํจ์๋ก ์๊ฐํด๋ ํฌ๊ฒ ๋ฌด๋ฆฌ๋ ์๋ค.
// ๋ฆฌํฐ๋ด ํ๊ธฐ๋ฒ์ ์ํด ์์ฑ๋ ๊ฐ์ฒด์ ์์ฑ์ ํจ์์ ํ๋กํ ํ์
// ๊ฐ์ฒด๋ฆฌํฐ๋ด-object-Object.prototype / ํจ์๋ฆฌํฐ๋ด-Function-Function.prototype..

/* 19.5 ํ๋กํ ํ์์ ์์ฑ ์์  */
// ๊ฐ์ฒด๋ ๋ฆฌํฐ๋ด ํ๊ธฐ๋ฒ ๋๋ ์์ฑ์ ํจ์์ ์ํด ์์ฑ๋๋ฏ๋ก ๊ฒฐ๊ตญ ๋ชจ๋  ๊ฐ์ฒด๋ ์์ฑ์ ํจ์์ ์ฐ๊ฒฐ๋์ด ์๋ค.
// +Object.create ๋ฉ์๋์ ํด๋์ค๋ก ๊ฐ์ฒด๋ฅผ ์์ฑํ๋ ๋ฐฉ๋ฒ๋ ์์
// -> ํ๋กํ ํ์์ ์์ฑ์ ํจ์๊ฐ ์์ฑ๋๋ ์์ ์ ๋๋ถ์ด ์์ฑ๋๋ค.
// ์์ฑ์ ํจ์๋ ์ฌ์ฉ์ ์ ์ ์์ฑ์ ํจ์์ ์๋ฐ์คํฌ๋ฆฝํธ๊ฐ ๊ธฐ๋ณธ ์ ๊ณตํ๋ ๋นํธ์ธ ์์ฑ์ ํจ์๋ก ๊ตฌ๋ถ

// 19.5.1 ์ฌ์ฉ์ ์ ์ ์์ฑ์ ํจ์์ ํ๋กํ ํ์ ์์ฑ ์์ 
// -> ์์ฑ์ ํจ์๋ก์ ํธ์ถํ  ์ ์๋ ํจ์, ์ฆ constructor๋ ํจ์ ์ ์๊ฐ ํ๊ฐ๋์ด
// ํจ์ ๊ฐ์ฒด๋ฅผ ์์ฑํ๋ ์์ ์ ํ๋กํ ํ์๋ ๋๋ถ์ด ์์ฑ๋๋ค. ์์ฑ๋ ํ๋กํ ํ์์
// ์ค์ง constructor ํ๋กํผํฐ๋ง ๊ฐ๋ ๊ฐ์ฒด๋ค.ํ๋กํ ํ์๋ ๊ฐ์ฒด์ด๊ณ  ๋ชจ๋  ๊ฐ์ฒด๋ ํ๋กํ ํ์์ ๊ฐ์ง๋ฏ๋ก
// ํ๋กํ ํ์๋ ์์ ์ ํ๋กํ ํ์์ ๊ฐ๋๋ค.์์ฑ๋ ํ๋กํ ํ์์ ํ๋กํ ํ์์ Object.prototype์ด๋ค.
console.log(B.prototype); // {constructor: f}
console.log(typeof B.prototype); // object
console.log(B.prototype.__proto__ === Object.prototype); // true
function B(name) {
  this.name = name;
}
const Berson = (name) => {
  this.name = name;
};
console.log(Berson.prototype); // undefined

// 19.5.2 ๋นํธ์ธ ์์ฑ์ ํจ์์ ํ๋กํ ํ์ ์์ฑ ์์ 
// Object, String, Number, Function, Array, RegExp, Date, Promise ๋ฑ๊ณผ ๊ฐ์ ๋นํธ์ธ ์์ฑ์ ํจ์๋
// ์ผ๋ฐ ํจ์์ ๋ง์ฐฌ๊ฐ์ง๋ก ๋นํธ์ธ ์์ฑ์ ํจ์๊ฐ ์์ฑ๋๋ ์์ ์ ํ๋กํ ํ์์ด ์์ฑ๋๋ค.
// ๋ชจ๋  ๋นํธ์ธ ์์ฑ์ ํจ์๋ ์ ์ญ ๊ฐ์ฒด๊ฐ ์์ฑ๋๋ ์์ ์ ์์ฑ๋๋ค.
// ์์ฑ๋ ํ๋กํ ํ์์ ๋นํธ์ธ ์์ฑ์ ํจ์์ prototype ํ๋กํผํฐ์ ๋ฐ์ธ๋ฉ๋๋ค.
console.log(window.Object === Object); // true
// console.log(global.Object === Object); Node.js
// ์ดํ ์์ฑ์ ํจ์ ๋๋ ๋ฆฌํฐ๋ด ํ๊ธฐ๋ฒ์ผ๋ก ๊ฐ์ฒด๋ฅผ ์์ฑํ๋ฉด ํ๋กํ ํ์์ ์์ฑ๋ ๊ฐ์ฒด์
// [[Prototype]] ๋ด๋ถ ์ฌ๋กฏ์ ํ ๋น๋๋ค. ์ด๋ก์จ ์์ฑ๋ ๊ฐ์ฒด๋ ํ๋กํ ํ์์ ์์๋ฐ๋๋ค.

/* 19.6 ๊ฐ์ฒด ์์ฑ ๋ฐฉ์๊ณผ ํ๋กํ ํ์์ ๊ฒฐ์  */
// ๊ฐ์ฒด์ ์์ฑ ๋ฐฉ๋ฒ: ๊ฐ์ฒด ๋ฆฌํฐ๋ด, Object ์์ฑ์ ํจ์, ์์ฑ์ ํจ์, Object.create ๋ฉ์๋, ํด๋์ค
// ์ด์ฒ๋ผ ๋ค์ํ ๋ฐฉ๋ฒ์ผ๋ก ์์ฑ๋ ๊ฐ์ฒด๋ ๊ฐ ๋ฐฉ์๋ง๋ค ์ธ๋ถ์ ์ธ ๊ฐ์ฒด ์์ฑ ๋ฐฉ์์ ์ฐจ์ด๋ ์์ผ๋
// ์ถ์ ์ฐ์ฐ OrdinaryObjectCreate์ ์ํด ์์ฑ๋๋ค๋ ๊ณตํต์ ์ด ์๋ค.

// 19.6.1 ๊ฐ์ฒด ๋ฆฌํฐ๋ด์ ์ํด ์์ฑ๋ ๊ฐ์ฒด์ ํ๋กํ ํ์
// ์์ค ์์ง์ ๊ฐ์ฒด ๋ฆฌํฐ๋ด์ ํ๊ฐํ์ฌ ๊ฐ์ฒด๋ฅผ ์์ฑํ  ๋ ์ถ์ ์ฐ์ฐ OOC๋ฅผ ํธ์ถํ๋ค.
// ์ด๋ ์ถ์ ์ฐ์ฐ์ ์ ๋ฌ๋๋ ํ๋กํ ํ์์ Object.prototype์ด๋ค.
// -> ์ฆ, ๊ฐ์ฒด ๋ฆฌํฐ๋ด์ ์ํด ์์ฑ๋๋ ๊ฐ์ฒด์ ํ๋กํ ํ์์ Object.prototype์ด๋ค
const testObj = { x: 1 };
console.log(testObj.constructor === Object); // true
console.log(testObj.hasOwnProperty('x')); // true

// 19.6.2 Object ์์ฑ์ ํจ์์ ์ํด ์์ฑ๋ ๊ฐ์ฒด์ ํ๋กํ ํ์
// Object ์์ฑ์ ํจ์๋ฅผ ์ธ์ ์์ด ํธ์ถํ๋ฉด ๋น ๊ฐ์ฒด๊ฐ ์์ฑ๋๋ค. Object ์์ฑ์ ํจ์๋ฅผ ํธ์ถํ๋ฉด
// ๊ฐ์ฒด ๋ฆฌํฐ๋ด๊ณผ ๋ง์ฐฌ๊ฐ์ง๋ก ์ถ์ ์ฐ์ฐ OrdinaryObjectCreate๊ฐ ํธ์ถ๋๋ค. ์ด๋ ์ถ์ ์ฐ์ฐ์
// ์ ๋ฌ๋๋ ํ๋กํ ํ์์ Object.prototype์ด๋ค. ์ฆ, Object ์์ฑ์ ํจ์์ ์์ฑ๋๋
// ๊ฐ์ฒด์ ํ๋กํ ํ์์ Object.prototype์ด๋ค.
const fbj = new Object();
fbj.x = 1;
console.log(fbj.constructor === Object); // true
console.log(fbj.hasOwnProperty('x')); // true
// ๊ฐ์ฒด ๋ฆฌํฐ๋ด๊ณผ Object ์์ฑ์ ํจ์์ ์ํ ๊ฐ์ฒด ์์ฑ ๋ฐฉ์์ ์ฐจ์ด๋ ํ๋กํผํฐ๋ฅผ ์ถ๊ฐํ๋ ๋ฐฉ์์ ์๋ค.
// ๊ฐ์ฒด ๋ฆฌํฐ๋ด ๋ฐฉ์์ ๋ด๋ถ์ ์ถ๊ฐํ์ง๋ง, Object ์์ฑ์ ํจ์ ๋ฐฉ์์ ์ผ๋จ ๋น ๊ฐ์ฒด๋ฅผ ์์ฑ ํ ์ถ๊ฐํ๋ค

// 19.6.3 ์์ฑ์ ํจ์์ ์ํด ์์ฑ๋ ๊ฐ์ฒด์ ํ๋กํ ํ์
// new ์ฐ์ฐ์์ ํจ๊ป ์์ฑ์ ํจ์๋ฅผ ํธ์ถํ์ฌ ์ธ์คํด์ค๋ฅผ ์์ฑํ๋ฉด ๋ค๋ฅธ ๊ฐ์ฒด ์์ฑ ๋ฐฉ์๊ณผ ๋ง์ฐฌ๊ฐ์ง๋ก
// ์ถ์ ์ฐ์ฐ OOC์ด ํธ์ถ๋๋ค. ์ด๋ OOC์ ์ ๋ฌ๋๋ ํ๋กํ ํ์์ ์์ฑ์ ํจ์์ prototype ํ๋กํผํฐ์
// ๋ฐ์ธ๋ฉ๋์ด ์๋ ๊ฐ์ฒด๋ค. ์ฆ! ์ํจ์ ์ํด ์์ฑ๋๋ ๊ฐ์ฒด์ ํ๋กํ ํ์์ ์ํจ ํํํํฐ์ ๋ฐ์ธ๋ฉ๋ ๊ฐ์ฒด
function Ferson(name) {
  this.name = name;
}

// ํ๋กํ ํ์ ๋ฉ์๋
Ferson.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const f = new Ferson('fing');
const f1 = new Ferson('fong');

f.sayHello();
f1.sayHello();
console.log('!_!๐ฅ');

/* 19.7 ํ๋กํ ํ์ ์ฒด์ธ */
// ์๋ฐ์คํฌ๋ฆฝํธ๋ ๊ฐ์ฒด์ ํ๋กํผํฐ(๋ฉ์๋ ํฌํจ)์ ์ ๊ทผํ๋ ค๊ณ  ํ  ๋ ํด๋น ๊ฐ์ฒด์ ์ ๊ทผํ๋ ค๋ ํ๋กํผํฐ๊ฐ ์๋ค๋ฉด
// [[Prototype]] ๋ด๋ถ ์ฌ๋กฏ์ ์ฐธ์กฐ๋ฅผ ๋ฐ๋ผ ์์ ์ ๋ถ๋ชจ ์ญํ ์ ํ๋ ํ๋กํ ํ์์ ํ๋กํผํฐ๋ฅผ ์์ฐจ์ ์ผ๋ก ๊ฒ์ํ๋ค.
console.log(f.hasOwnProperty('name')); // true
console.log(Object.getPrototypeOf(f) === Ferson.prototype); // true
console.log(Object.getPrototypeOf(Ferson.prototype) === Object.prototype); // true
console.log(Object.prototype.hasOwnProperty.call(f, 'name')); // true
// ํ์ฒด์ ์ต์์์ ์์นํ๋ ๊ฐ์ฒด๋ ์ธ์ ๋ Object.prototype์ด๋ค. ๋ฐ๋ผ์ ๋ชจ๋  ๊ฐ์ฒด๋ Object.prototype์ ์์๋ฐ๋๋ค.
// -> Object.prototype์ ํ๋กํ ํ์ ์ฒด์ธ์ ์ข์ (end of prototype chain)์ด๋ผํ๋ค.
// Object.prototype์ ํ๋กํ ํ์, ์ฆ [[Prototype]] ๋ด๋ถ ์ฌ๋กฏ์ ๊ฐ์ null์ด๋ค. ํ์ฒด ์ข์ ์์๋
// ํ๋กํผํฐ๋ฅผ ๊ฒ์ํ  ์ ์๋ ๊ฒฝ์ฐ undefined๋ฅผ ๋ฐํํ๋ค.์ด๋ ์๋ฌ๊ฐ ๋ฐ์ํ์ง ์์์ ์ฃผ์
// -> ํ์ฒด๋ ์๋ฐ์คํฌ๋ฆฝํธ๊ฐ OOP ์์์ ๊ตฌํํ๋ ๋ฉ์ปค๋์ฆ, ์ค์ฒด๋ ์๋ณ์ ๊ฒ์์ ์ํ ๋ฉ์ปค๋์ฆ์ด๋ค.
// -> ์ค์ฒด์ ํ์ฒด๋ ์๋ก ์ฐ๊ด์์ด ๋ณ๋๋ก ๋์ํ๋ ๊ฒ์ด ์๋๋ผ ์๋ก ํ๋ ฅํ์ฌ ์๋ณ์์ ํ๋กํผํฐ๋ฅผ ๊ฒ์ํ๋ ๋ฐ ์ฌ์ฉ๋๋ค.

/* 19.8 ์ค๋ฒ๋ผ์ด๋ฉ๊ณผ ํ๋กํผํฐ ์๋์ */
// ํ๋กํ ํ์์ด ์์ ํ ํ๋กํผํฐ(๋ฉ์๋ ํฌํจ)๋ฅผ ํ๋กํ ํ์ ํ๋กํผํฐ, ์ธ์คํด์ค๊ฐ ์์ ํ ํ๋กํผํฐ๋ฅผ ์ธ์คํด์ค ํ๋กํผํฐ๋ผ๊ณ  ๋ถ๋ฅธ๋ค.
// ํํํํฐ์ ๊ฐ์ ์ด๋ฆ์ ํ๋กํผํฐ๋ฅผ ์ธ์คํด์ค์ ์ถ๊ฐํ๋ฉด ๋ฎ์ด์ฐ์ง ์๊ณ  ์ธ์คํด์ค์ ํ๋กํผํฐ๋ก ์ถ๊ฐํ๋ค.
// ์ด๋ ์ธ์ค๋ฉ์๋๋ ํํ๋ฉ์๋๋ฅผ ์ค๋ฒ๋ผ์ด๋ฉํ๊ณ  ํํ๋ฉ์๋๋ ๊ฐ๋ ค์ง๋ค.
// ์ด์ฒ๋ผ ์์ ๊ด๊ณ์ ์ํด ํ๋กํผํฐ๊ฐ ๊ฐ๋ ค์ง๋ ํ์์ ํ๋กํผํฐ ์๋์property shadowing์ด๋ผ ํ๋ค.
// ์ค๋ฒ๋ผ์ด๋ฉoverriding: ์์ ํด๋์ค๊ฐ ๊ฐ์ง๊ณ  ์๋ ๋ฉ์๋๋ฅผ ํ์ ํด๋์ค๊ฐ ์ฌ์ ์ํ์ฌ ์ฌ์ฉํ๋ ๋ฐฉ์
// ์ค๋ฒ๋ก๋ฉoverloading: ํจ์์ ์ด๋ฆ์ ๋์ผํ์ง๋ง ๋งค๊ฐ๋ณ์์ ํ์ ๋๋ ๊ฐ์๊ฐ ๋ค๋ฅธ ๋ฉ์๋๋ฅผ ๊ตฌํํ๊ณ 
// ๋งค๊ฐ๋ณ์์ ์ํด ๋ฉ์๋๋ฅผ ๊ตฌ๋ณํ์ฌ ํธ์ถํ๋ ๋ฐฉ์์ด๋ค. ์์ค๋ ์ง์ํ์ง ์์ง๋ง arguments ๊ฐ์ฒด๋ฅผ ์ฌ์ฉํด ๊ตฌํ ๊ฐ๋ฅ
const Con = (function () {
  // ์์ฑ์ ํจ์
  function Con(name) {
    this.name = name;
  }

  // ํ๋กํ ํ์ ๋ฉ์๋
  Con.prototype.sayHi = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // ์์ฑ์ ํจ์๋ฅผ ๋ฐํ
  return Con;
})();

const coni = new Con('coni');

// ์ธ์คํด์ค ๋ฉ์๋
coni.sayHi = function () {
  console.log(`Hey! My name is ${this.name}`);
};

// ์ธ์คํด์ค ๋ฉ์๋๊ฐ ํธ์ถ๋จ. ํ๋กํ ํ์ ๋ฉ์๋๋ ์ธ์คํด์ค ๋ฉ์๋์ ์ํด ๊ฐ๋ ค์ง๋ค.
coni.sayHi(); // Hey! My name is coni

// ํ๋กํ ํ์ ํ๋กํผํฐ๋ฅผ ๋ณ๊ฒฝ ๋๋ ์ญ์ ํ๋ ค๋ฉด ํ์ ๊ฐ์ฒด๋ฅผ ํตํ์ง ์๊ณ  ํ๋กํ ํ์์ ์ง์  ์ ๊ทผํด์ผ ํ๋ค.
delete coni.sayHi;
coni.sayHi();
delete Con.prototype.sayHi;
// coni.sayHi();

/* 19.9 ํ๋กํ ํ์์ ๊ต์ฒด */
// 19.9.1 ์์ฑ์ ํจ์์ ์ํ ํ๋กํ ํ์์ ๊ต์ฒด
// ํ๋กํ ํ์์ผ๋ก ๊ต์ฒดํ ๊ฐ์ฒด ๋ฆฌํฐ๋ด์๋ constructor ํ๋กํผํฐ๊ฐ ์๋ค
const Bon = (function () {
  function Bon(name) {
    this.name = name;
  }

  // ์์ฑ์ ํจ์์ prototype ํ๋กํผํฐ๋ฅผ ํตํด ํ๋กํ ํ์์ ๊ต์ฒด
  Bon.prototype = {
    sayYo() {
      console.log(`Yo! My name is ${this.name}`);
    },
  };

  return Bon;
})();

const bon = new Bon('bon');

// constructor ํ๋กํผํฐ์ ์์ฑ์ ํจ์ ๊ฐ์ ์ฐ๊ฒฐ์ด ํ๊ดด๋๋ค.
console.log(bon.constructor === Bon); // false
// ํ๋กํ ํ์ ์ฒด์ธ์ ๋ฐ๋ผ Object.prorotype์ constructor ํ๋กํผํฐ๊ฐ ๊ฒ์๋๋ค.
console.log(bon.constructor === Object); // true

// ํ๊ดด๋ constructor ํ๋กํผํฐ์ ์์ฑ์ ํจ์ ๊ฐ์ ์ฐ๊ฒฐ ๋์ด๋ฆฌ๊ธฐ
// Bon.prototype = {
//   constructor: Bon, <- ๊ต์ฒดํ ๊ฐ์ฒด ๋ฆฌํฐ๋ด์ constructor ํ๋กํผํฐ๋ฅผ ์ถ๊ฐ
//   sayYo() {
//     console.log(`Yo! My name is ${this.name}`);
//   }
// }

// 19.2 ์ธ์คํด์ค์ ์ํ ํ๋กํ ํ์์ ๊ต์ฒด
// ํ๋กํ ํ์์ ์์ฑ์ ํจ์์ prototype ํ๋กํผ๋๋ฟ๋ง ์๋๋ผ ์ธ์คํด์ค์ __proto__ ์ ๊ทผ์ ํ๋กํผํฐ
// (๋๋ Object.getPrototypeOf ๋ฉ์๋)๋ฅผ ํตํด ์ ๊ทผํ  ์ ์๋ค. ๋ฐ๋ผ์ ํ๋กํ ํ์์ ๊ต์ฒด ๊ฐ๋ฅ
// __proto__ ์ ๊ทผ์ ํ๋กํผํฐ๋ฅผ ํตํด ๊ต์ฒดํ๋ค๋ ๊ฒ์ ์ด๋ฏธ ์์ฑ๋ ๊ฐ์ฒด์ ํ๋กํ ํ์์ ๊ต์ฒดํ๋ ๊ฒ์ด๋ค
function Cream(name) {
  this.name = name;
}
const vanilla = new Cream('vanilla');
// ํ๋กํ ํ์์ผ๋ก ๊ต์ฒดํ  ๊ฐ์ฒด
const original = {
  sayTaste() {
    console.log(`Ok! ${this.name}`);
  },
};
Object.setPrototypeOf(vanilla, original); // vanilla.__proto__์ ๋์ผํ๊ฒ ๋์
vanilla.sayTaste();
console.log(vanilla.constructor === Cream); // false ์ฐ๊ฒฐ ํ๊ดด
console.log(vanilla.constructor === Object); // true

// ์์ฑ์ ํจ์์ ์ธ์คํด์ค์ ์ํ ํ๋กํ ํ์ ๊ต์ฒด์ ์ฐจ์ด
// Bon ์์ฑ์ ํจ์์ prototype ํ๋กํผํฐ๊ฐ ๊ต์ฒด๋ ํ๋กํ ํ์์ ๊ฐ๋ฆฌํจ๋ค.
// Cream ์์ฑ์ ํจ์์ prototype ํ๋กํผํฐ๊ฐ ๊ต์ฒด๋ ํ๋กํ ํ์์ ๊ฐ๋ฆฌํค์ง ์๋๋ค.

function D(name) {
  this.name = name;
}
const dd = new D('dd');
const change = {
  constructor: D,
  sayHey() {
    console.log('Hey!');
  },
};
D.prototype = change;
Object.setPrototypeOf(dd, change);
dd.sayHey(); // Hey!
console.log(dd.constructor === D); // true
console.log(dd.constructor === Object); // false
// ์์ฑ์ ํจ์์ prototype ํ๋กํผํฐ๊ฐ ๊ต์ฒด๋ ํ๋กํ ํ์์ ๊ฐ๋ฆฌํจ๋ค.
console.log(D.prototype === Object.getPrototypeOf(dd)); // true
// -> ํ๋กํ ํ์์ ์ง์  ๊ต์ฒดํ์ง ์๋ ๊ฒ์ด ์ข๋ค. ์ง์  ์์์ด ๋ ํธ๋ฆฌํ๊ณ  ์์ 

/* 19.10 instanceof ์ฐ์ฐ์ */
// ๊ฐ์ฒด instanceof ์์ฑ์ ํจ์
// ์ฐ๋ณ์ ์์ฑ์ ํจ์์ prototype์ ๋ฐ์ธ๋ฉ๋ ๊ฐ์ฒด๊ฐ ์ข๋ณ์ ๊ฐ์ฒด์ ํ๋กํ ํ์ ์ฒด์ธ ์์
// ์กด์ฌํ๋ฉด true๋ก ํ๊ฐ๋๊ณ , ๊ทธ๋ ์ง ์์ ๊ฒฝ์ฐ์๋ false๋ก ํ๊ฐ๋๋ค.
function Func(name) {
  this.name = name;
}
const foo = new Func('foo');
console.log(foo instanceof Func); // true
console.log(foo instanceof Object); // true

// ํ๋กํ ํ์ ๊ต์ฒด๋ก instanceof ์ฐ์ฐ์์ ๋์ ์ดํด
const paren = {};
Object.setPrototypeOf(foo, paren);
console.log(Func.prototype === paren); // false
console.log(paren.constructor === Func); // false
console.log(foo instanceof Func); // false
console.log(foo instanceof Object); // true

// ํ๋กํ ํ์์ผ๋ก ๊ต์ฒดํ paren ๊ฐ์ฒด๋ฅผ Func ์์ฑ์ ํจ์์ prototype ํ๋กํผํฐ์ ๋ฐ์ธ๋ฉ
Func.prototype = paren;
console.log(foo instanceof Func); // true
console.log(foo instanceof Object); // true

// instanceof ์ฐ์ฐ์๋ ํ๋กํ ํ์์ constructor ํ๋กํผํฐ๊ฐ ๊ฐ๋ฆฌํค๋ ์์ฑ์ ํจ์๋ฅผ ์ฐพ๋ ๊ฒ์ด ์๋๋ผ
// -> ์์ฑ์ ํจ์์ prototype์ ๋ฐ์ธ๋ฉ๋ ๊ฐ์ฒด๊ฐ ํ๋กํ ํ์ ์ฒด์ธ ์์ ์กด์ฌํ๋์ง ํ์ธํ๋ค.
// Object ์์ฑ์ ํจ์ <-> Object.prototype, prototype ํ๋กํผํฐ, ํ๋กํ ํ์([[Prototype]])

// instanceof ์ฐ์ฐ์๋ฅผ ํจ์๋ก ํํ
function isInstanceof(instance, constructor) {
  // ํ๋กํ ํ์ ์ทจ๋
  const prototype = Object.getPrototypeOf(instance);

  // ์ฌ๊ท ํ์ถ ์กฐ๊ฑด - prototype์ด null์ด๋ฉด ํ๋กํ ํ์ ์ฒด์ธ์ ์ข์ ์ ๋ค๋ค๋ฅธ ๊ฒ์ด๋ค
  if (prototype === null) return false;

  // ํ๋กํ ํ์์ด ์์ฑ์ ํจ์์ prototype ํ๋กํผํฐ์ ๋ฐ์ธ๋ฉ๋ ๊ฐ์ฒด๋ผ๋ฉด true๋ฅผ ๋ฐํํ๋ค.
  // ๊ทธ๋ ์ง ์๋ค๋ฉด ์ฌ๊ท ํธ์ถ๋ก ํ๋กํ ํ์ ์ฒด์ธ ์์ ์์ ํ๋กํ ํ์์ผ๋ก ์ด๋ํ์ฌ ํ์ธํ๋ค.
  return (
    prototype === constructor.prototype || isInstanceof(prototype, constructor)
  );
}

console.log(isInstanceof(foo, Func)); // true
console.log(isInstanceof(foo, Object)); // true
console.log(isInstanceof(foo, Array)); // false

/* 19.11 ์ง์  ์์ */
// 19.11.1 Object.create์ ์ํ ์ง์  ์์
// Object.create ๋ฉ์๋๋ ๋ช์์ ์ผ๋ก ํ๋กํ ํ์์ ์ง์ ํ์ฌ ์๋ก์ด ๊ฐ์ฒด๋ฅผ ์์ฑํ๋ค.
// ๋ค๋ฅธ ๊ฐ์ฒด ์์ฑ ๋ฐฉ์๊ณผ ๋ง์ฐฌ๊ฐ์ง๋ก ์ถ์ ์ฐ์ฐ OrdinaryObjectCreate๋ฅผ ํธ์ถํ๋ค.
// ์ฒซ ๋ฒ์งธ ๋งค๊ฐ๋ณ์์๋ ์์ฑํ  ๊ฐ์ฒด์ ํ๋กํ ํ์์ผ๋ก ์ง์ ํ  ๊ฐ์ฒด๋ฅผ, ๋ ๋ฒ์งธ ๋งค๊ฐ๋ณ์์๋
// ์์ฑํ  ๊ฐ์ฒด์ ํ๋กํผํฐ ํค์ ํ๋กํผํฐ ๋์คํฌ๋ฆฝํฐ ๊ฐ์ฒด๋ก ์ด๋ค์ง ๊ฐ์ฒด๋ฅผ ์ ๋ฌํ๋ค. ์ด ๊ฐ์ฒด์ ํ์์
// Object.defineProperties ๋ฉ์๋ ๋ ๋ฒ์งธ ์ธ์์ ๋์ผ.๋ ๋ฒ์งธ ์ธ์๋ ์ต์์ด๋ฏ๋ก ์๋ต ๊ฐ๋ฅํ๋ค.

// ํ๋กํ ํ์์ด null์ธ ๊ฐ์ฒด๋ฅผ ์์ฑ. ์์ฑ๋ ๊ฐ์ฒด๋ ํ๋กํ ํ์์ ์ข์ ์ ์์น. obj -> null
let obj1 = Object.create(null);
console.log(Object.getPrototypeOf(obj1)); // null
// console.log(obj1.toString()); Object.prototype์ ์์๋ฐ์ง ๋ชปํ๋ค.

// obj -> Object.prototype -> null / obj = {};์ ๋์ผํ๋ค.
obj1 = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj1) === Object.prototype); // true

// obj -> Object.prototype -> null / obj = { x: 1 };์ ๋์ผํ๋ค.
obj1 = Object.create(Object.prototype, {
  x: { value: 1, writable: true, enumerable: true, configurable: true },
});
// ์ ์ฝ๋๋ ์๋์ ๋์ผ. obj = Object.create(Object.prototype) / obj.x = 1
console.log(obj1.x); // 1
console.log(Object.getPrototypeOf(obj1) === Object.prototype); // true

const myProto = { x: 10 };
// ์์์ ๊ฐ์ฒด๋ฅผ ์ง์  ์์๋ฐ๋๋ค. obj -> myProto -> Object.prototype -> null
obj1 = Object.create(myProto);
console.log(obj1.x); // 10
console.log(Object.getPrototypeOf(obj1) === myProto); // true

// ์์ฑ์ ํจ์
function Macaron(name) {
  this.name = name;
}
// obj -> Person.prototype -> Object.prototype -> null / obj = new Person('choco')์ ๋์ผ
obj1 = Object.create(Macaron.prototype);
obj1.name = 'choco';
console.log(obj1.name); // choco
console.log(Object.getPrototypeOf(obj1) === Macaron.prototype); // true

// ์ด์ฒ๋ผ Object.create ๋ฉ์๋๋ ์ฒซ ๋ฒ์ฌ ๋งค๊ฐ๋ณ์์ ์ ๋ฌํ ๊ฐ์ฒด์ ํ๋กํ ํ์ ์ฒด์ธ์ ์ํ๋ ๊ฐ์ฒด๋ฅผ
// ์์ฑํ๋ค. ์ฆ, ๊ฐ์ฒด๋ฅผ ์์ฑํ๋ฉด์ ์ง์ ์ ์ผ๋ก ์์์ ๊ตฌํํ๋ ๊ฒ์ด๋ค. ์ฅ์ ์!
// new ์ฐ์ฐ์ ์์ด, ํ๋กํ ํ์์ ์ง์ ํ๋ฉด์ ๊ฐ์ฒด ์์ฑ, ๊ฐ์ฒด ๋ฆฌํฐ๋ด์ ์ํด ์์ฑ๋ ๊ฐ์ฒด๋ ์์๋ฐ๊ธฐ ๊ฐ๋ฅ

// 19.11.2 ๊ฐ์ฒด ๋ฆฌํฐ๋ด ๋ด๋ถ์์ __proto__์ ์ํ ์ง์  ์์
// ๋ ๋ฒ์งธ ์ธ์๋ก ํ๋กํผํฐ๋ฅผ ์ ์ํ๋ ๊ฒ์ด ๋ฒ๊ฑฐ๋ก์ ์ผ๋จ ๊ฐ์ฒด ์์ฑ ํ ํ๋กํผํฐ๋ฅผ ์ถ๊ฐํ๋ ๋ฐฉ๋ฒ๋ ์๋ค
const myProto2 = { x: 100 };
const obj2 = {
  y: 200,
  __proto__: myProto2,
};
console.log(obj2.x, obj2.y); // 100 200
console.log(Object.getPrototypeOf(obj2) === myProto2); // true

/* 19.12 ์ ์  ํ๋กํผํฐ/๋ฉ์๋ */
// ์ ์ static ํ/๋ฉ๋ ์์ฑ์ ํจ์๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํ์ง ์์๋ ์ฐธ์กฐ/ํธ์ถํ  ์ ์๋ ํ/๋ฉ
function Ice(name) {
  this.name = name;
}
Ice.prototype.soSweet = function () {
  console.log(`${this.name} icecream so sweet ๐`);
};
Ice.staticProp = 'static prop';
Ice.staticMethod = function () {
  console.log('staticMethod');
};
const strawberry = new Ice('strawberry');
strawberry.soSweet();
Ice.prototype.soSweet();
Ice.staticMethod(); // staticMethod
// ์ ์  ํ๋กํผํฐ/๋ฉ์๋๋ ์์ฑ์ ํจ์๊ฐ ์์ฑํ ์ธ์คํด์ค๋ก ์ฐธ์กฐ/ํธ์ถํ  ์ ์๋ค.
// ์ธ์คํด์ค๋ก ์ฐธ์กฐ/ํธ์ถํ  ์ ์๋ ํ/๋ฉ๋ ํ๋กํ ํ์ ์ฒด์ธ ์์ ์กด์ฌํด์ผ ํ๋ค.
// strawberry.staticMethod();
// Ice ์์ฑ์ ํจ์๋ ๊ฐ์ฒด์ด๋ฏ๋ก ์์ ์ ํ๋กํผํฐ/๋ฉ์๋๋ฅผ ์์ ํ  ์ ์๋ค. Ice ์์ฑ์ ํจ์ ๊ฐ์ฒด๊ฐ
// ์์ ํ ํ/๋ฉ๋ฅผ ์ ์  ํ/๋ฉ๋ผ๊ณ  ํ๋ค. ์ ์  ํ/๋ฉ๋ ์ํจ์ด ์์ฑํ ์ธ์คํด์ค๋ก ์ฐธ์กฐ/ํธ์ถ ๋ถ๊ฐ๋ฅ

// Object.create๋ ์ ์  ๋ฉ์๋๋ค.
const obj3 = Object.create({ name: 'Cva' });
// Object.prototype.hasOwnProperty๋ ํ๋กํ ํ์ ๋ฉ์๋๋ค.
console.log(obj3.hasOwnProperty('name')); // false

function Boo() {}
// ํ๋กํ ํ์ ๋ฉ์๋
// this๋ฅผ ์ฐธ์กฐํ์ง ์๋ ํ๋กํ ํ์ ๋ฉ์๋๋ ์ ์  ๋ฉ์๋๋ก ๋ณ๊ฒฝํ์ฌ๋ ๋์ผํ ํจ๊ณผ๋ฅผ ์ป์ ์ ์๋ค.
Boo.prototype.x = function () {
  console.log('x');
};
const bo = new Boo();
// ํ๋กํ ํ์ ๋ฉ์๋ค๋ฅด ํธ์ถํ๋ ค๋ฉด ์ธ์คํด์ค๋ฅผ ์์ฑํด์ผ ํ๋ค.
bo.x();
// ์ ์  ๋ฉ์๋
Boo.x = function () {
  console.log('x');
};
// ์ ์  ๋ฉ์๋๋ ์ธ์คํด์ค๋ฅผ ์์ฑํ์ง ์์๋ ํธ์ถํ  ์ ์๋ค.
Boo.x();
// ์ฐธ๊ณ ๋ก ํ๋กํ ํ์ ํ๋กํผํฐ/๋ฉ์๋๋ฅผ ํ๊ธฐํ  ๋ prototype์ #์ผ๋ก ํ๊ธฐ(์๋ฅผ ๋ค์ด, Object.prototype.
// isPrototypeOf๋ฅผ Object#isPrototypeOf์ผ๋ก ํฌ๊ธฐ)ํ๋ ๊ฒฝ์ฐ๋ ์์ผ๋ ์์๋๋๋ก ํ์.

/* 19.13 ํ๋กํผํฐ ์กด์ฌ ํ์ธ */
// 19.13.1 in ์ฐ์ฐ์
// in ์ฐ์ฐ์๋ ๊ฐ์ฑ ๋ด์ ํน์  ํ๋กํผํฐ๊ฐ ์กด์ฌํ๋์ง ์ฌ๋ถ๋ฅผ ํ์ธํ๋ค.
const yogurt = {
  name: 'yogurt',
  address: 'Icecream',
};
console.log('name' in yogurt); // true
console.log('address' in yogurt); // true
console.log('age' in yogurt); // false
// ํ์ธ ๋์ ๊ฐ์ฒด์ ํ๋กํผํฐ๋ฟ๋ง ์๋๋ผ ์์ํ๋ ๋ชจ๋  ํ๋กํ ํ์์ ํ๋กํผํฐ๋ฅผ ํ์ธํ๋ฏ๋ก ์ฃผ์
console.log('toString' in yogurt); // true

// in ์ฐ์ฐ์ ๋์  ES6์ ๋์๋ Reflect.has ๋ฉ์๋๋ฅผ ์ฌ์ฉํ  ์ ์์
const bluberry = { name: 'bb' };
console.log(Reflect.has(bluberry, 'name')); // true
console.log(Reflect.has(bluberry, 'toString')); // true

// 19.13.2 Object.prototype.hasOwnProperty ๋ฉ์๋
console.log(bluberry.hasOwnProperty('name')); // true
console.log(bluberry.hasOwnProperty('age')); // false
// ์ด๋ฆ์์ ์ ์ ์๋ฏ์ด ์ธ์๋ก ์ ๋ฌ๋ฐ์ ํ๋กํผํฐ ํค๊ฐ ๊ฐ์ฒด ๊ณ ์ ์ ํ๋กํผํฐ ํค์ธ ๊ฒฝ์ฐ์๋ง
// true๋ฅผ ๋ฐํํ๊ณ  ์์๋ฐ์ ํ๋กํ ํ์์ ํ๋กํผํฐ ํค์ธ ๊ฒฝ์ฐ false๋ฅผ ๋ฐํํ๋ค.
console.log(bluberry.hasOwnProperty('toString')); // false

/* 19.14 ํ๋กํผํฐ ์ด๊ฑฐ */
// 19.14.1 for...in ๋ฌธ
const apple = {
  name: 'apple',
  age: 12,
};
for (const key in apple) {
  console.log(`${key}: ${apple[key]}`);
}
// name: apple
// age: 12
console.log('toString' in apple); // true
// for...in๋ฌธ์ in ์ฐ์ฐ์ ์ฒ๋ผ ์ํ ๋์ ๊ฐ์ฒด์ ํ๋กํผํฐ๋ฟ๋ง ์๋๋ผ ์์๋ฐ์ ํ๋กํ ํ์์
// ํ๋กํผํฐ๊น์ง ์ด๊ฑฐํ๋ค. toString์ ์ด๊ฑฐํ  ์ ์๋๋ก ์ ์๋ ํ๋กํผํฐ [[Enumerable]]: false

// -> for...in ๋ฌธ์ ๊ฐ์ฒด์ ํ๋กํ ํ์ ์ฒด์ธ ์์ ์กด์ฌํ๋ ๋ชจ๋  ํ๋กํ ํ์์ ํ๋กํผํฐ ์ค์์
// ํ๋กํผํฐ ์ดํธ๋ฆฌ๋ทฐํฐ [[Enumerable]]์ ๊ฐ์ด true์ธ ํ๋กํผํฐ๋ฅผ ์ํํ๋ฉฐ ์ด๊ฑฐenumerationํ๋ค.
const banana = {
  name: 'banana',
  address: 'Fruits World',
  __proto__: { age: 10 },
};
for (const key in banana) {
  console.log(`${key}: ${banana[key]}`);
}

// ์ฌ๋ฒ์ธ ํ๋กํผํฐ๋ ์ด๊ฑฐํ์ง ์๋๋ค
const sym = Symbol();
const obj4 = { a: 1, [sym]: 10 };
for (const key in obj4) {
  console.log(`${key}: ${obj4[key]}`);
}
// a: 1

// ๋ฐฐ์ด์๋ for๋ฌธ์ด๋ for...of๋ฌธ ๋๋ Array.prototype.forEach ๋ฉ์๋๋ฅผ ์ฌ์ฉํ๊ธฐ๋ฅผ ๊ถ์ฅ
// ์ฌ์ค ๋ฐฐ์ด๋ ๊ฐ์ฒด์ด๋ฏ๋ก ํ๋กํผํฐ์ ์์๋ฐ์ ํ๋กํผํฐ๊ฐ ํฌํจ๋  ์ ์๋ค.
const arr = [1, 2, 3, 4];
arr.x = 10;
for (const i in arr) {
  // ํ๋กํผํฐ x๋ ์ถ๋ ฅ๋๋ค.
  console.log(arr[i]); // 1 2 3 4 10
}
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1 2 3 4
}
arr.forEach((v) => console.log(v)); // 1 2 3 4
for (const value of arr) {
  console.log(value); // 1 2 3 4
}

// 19.14.2 Object.keys/values/entries ๋ฉ์๋
// for...in ๋ฌธ์ ๊ฐ์ฒด ์์ ์ ๊ณ ์  ํ๋กํผํฐ๋ฟ ์๋๋ผ ์์๋ฐ์ ํ๋กํผํฐ๋ ์ด๊ฑฐํ๋ค. ๋ฐ๋ผ์
// Object.prototype.hasOwnProperty ๋ฉ์๋๋ฅผ ์ฌ์ฉํ์ฌ ๊ฐ์ฒด ์์ ์ ํ๋กํผํฐ์ธ์ง ํ์ธํ๋ ์ถ๊ฐ ์ฒ๋ฆฌ๊ฐ
// ํ์ํ๋ค.๊ฐ์ฒด ์์ ์ ๊ณ ์  ํ๋กํผํฐ๋ง ์ด๊ฑฐํ๊ธฐ ์ํด์๋ Object.keys / values / entries ์ฌ์ฉ ๊ถ์ฅ
// Object.keys ๋ฉ์๋๋ ๊ฐ์ฒด ์์ ์ ์ด๊ฑฐ ๊ฐ๋ฅํenumerable ํ๋กํผํฐ ํค๋ฅผ ๋ฐฐ์ด๋ก ๋ฐํํ๋ค.
const bread = {
  name: 'bread',
  address: 'Busan',
  __proto__: { age: 20 },
};
console.log(Object.keys(bread)); // ["name", "address"]

// ES8์ ๋์
// Object.values ๋ฉ์๋๋ ๊ฐ์ฒด ์์ ์ ์ด๊ฑฐ ๊ฐ๋ฅํ ํ๋กํผํฐ ๊ฐ์ ๋ฐฐ์ด๋ก ๋ฐํ
console.log(Object.values(bread)); // ["bread", "Busan"]

// Object.entries ๋ฉ์๋๋ ๊ฐ์ฒด ์์ ์ ์ด๊ฑฐ ๊ฐ๋ฅํ ํ๋กํผํฐ ํค์ ๊ฐ์ ์์ ๋ฐฐ์ด์ ๋ฐฐ์ด์ ๋ด์ ๋ฐํ
console.log(Object.entries(bread)); // [["name", "bread"],["address", "Busan"]]
Object.entries(bread).forEach(([key, value]) => console.log(key, value));
/*
name bread
address Busan
*/
