/**
 * 22장 this
 * 342p
 */

/* 22.1 this 키워드 */
// 객체는 상태 state를 나타내는 프로퍼티와 동작 behavior을 나타내는 메서드를 하나의 논리적인 단위로 묶은
// 복합적인 자료구조다. 동작을 나타내는 메서드는 자신이 속한 객체의 상태, 즉 프로퍼티를 참조하고 변경할 수 있어야 한다.
// 이때 메서드가 자신이 속한 객체의 프로퍼티를 참조하려면 '자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.'
//
// -> this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수 self-referencing variable다.
//   this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.

// -> this가 가리키는 값, 즉 this 바인딩은 "함수 호출 방식"에 의해 동적으로 결정된다.
const circle = {
  // 프로퍼티: 객체 고유의 상태 데이터
  radius: 5,
  // 메서드: 상태 데이터를 참조하고 조작하는 동작
  getDiameter() {
    return 2 * circle.radius;
  },
};
console.log(circle.getDiameter()); // 10

// ▪this 바인딩
// https://ko.wikipedia.org/wiki/네임_바인딩
// 바인딩이란 식별자와 값을 연결하는 과정을 의미한다. 예를 들어, 변수 선언은 변수 이름(식별자)와 확보된 메모리 공간의
// 주소를 바인딩하는 것이다.this 바인딩은 this(키워드로 분류되지만 식별자 역할)와 this가 가리킬 객체를 바인딩하는 것이다.

/* 22.2 함수 호출 방식과 this 바인딩 */
// this 바인딩(this에 바인딩될 값)은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.
//
// ▪렉시컬 스코프와 this 바인딩은 결정 시기가 다르다.
//  함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프 lexical scope는 함수 정의가 평가되어
//  함수 객체가 생성되는 시점에 상위 스코프를 결정한다. 하지만 this 바인딩은 함수 호출 시점에 결정된다.
//  다양한 함수 호출 방식: 일반 함수, 메서드, 생성자 함수, Function.prototype.apply/call/bind

const room = function () {
  console.dir(this);
};

// 1. 일반 함수 호출 => 전역 객체 window
room(); // Window

// 2. 메서드 호출 => 호출한 객체
const obj = { room };
obj.room(); // obj

// 3. 생성자 함수 호출 => 생성자 함수가 생성한 인스턴스
new room(); // room {}

// 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
const mush = { name: 'pyogo' };
room.call(mush); // mush
room.apply(mush); // mush
room.bind(mush)(); // mush

// 22.2.1 일반 함수 호출
// -> 기본적으로 this는 "전역 객체 global-object"가 바인딩된다.
// this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 객체를 생성하지 않는 일반 함수에서는
// 의미가 없다. 따라서 strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩된다.
function foo() {
  console.log("foo's this: ", this); // window
  function bar() {
    console.log("bar's this: ", this); // window
  }
  bar();
}
foo();

// -> 일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 this에는 전역 객체가 바인딩된다.
var value = 1; // var 전역 객체의 프로퍼티

const ocj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // {value: 100, foo: f}
    console.log("foo's this.value: ", this.value); // 100
    setTimeout(function () {
      console.log("callback's this: ", this); // window
      console.log("callback's this.value: ", this.value); // 1
    }, 100);
  },
};

ocj.foo();

// 메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기
var value = 1;
const odj = {
  value: 200,
  foo() {
    const that = this;
    setTimeout(function () {
      console.log(that.value); // 200
    }, 100);
  },
};
odj.foo();

// this를 명시적으로 바인딩할 수 있는 Function.prototype.apply, call, bind 메서드
var value = 1;
const oej = {
  value: 300,
  foo() {
    setTimeout(
      function () {
        console.log(this.value); // 300
      }.bind(this),
      100,
    );
  },
};
oej.foo();

// 화살표 함수를 사용해 this 바인딩 일치시키기 가능
var value = 1;
const ofj = {
  value: 400,
  foo() {
    setTimeout(() => {
      console.log(this.value); // 400
    }, 100);
  },
};
ofj.foo();

// 22.2.2 메서드 호출
// 메서드 내부의 this에는 메서드를 호출한 객체, 즉 메서드를 호출할 때 메서드 이름 앞의 마침표(.) 연산자 앞에 기술한
// 객체가 바인딩된다. 주위할 것은 메서드 내부의 this는 메서드를 소유한 객체가 아닌 메서드를 호출한 객체에 바인딩된다.

const person = {
  name: 'vanilla',
  getName() {
    return this.name;
  },
};
console.log(person.getName()); // vanilla

// person 객체의 getName 프로퍼티가 가리키는 함수 객체는 person 객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체다.
// getName 프로퍼티가 함수 객체를 가리키고 있을 뿐이다.
// 따라서 getName이 가리키는 함수 객체, 즉 getName 메서드는 다른 객체의 프로퍼티에 할당하는 것으로
// 다른 객체의 메서드가 될 수도 있고 일반 변수에 할당하여 일반 함수로 호출 될 수도 있다.
// => 따라서 메서드 내부의 this는 프로퍼티로 메서드를 가리키고 있는 객체와는 관계가 없고 "메서드를 호출한 객체"에 바인딩된다.
// *코어자바스크립트 참고*
const anotherPerson = {
  name: 'chocola',
};
anotherPerson.getName = person.getName;
console.log(anotherPerson.getName()); // chocola

const getName = person.getName;
console.log(getName()); // '' => window.name

// ❔원시, 참조, 일반 함수, 프로토타입, 메서드 내부의 함수
let a = 1;
let b = a;
console.log(a === b); // t
b = 3;
console.log(a === b); // f

let obj1 = { x: 10 };
let obj2 = obj1;
console.log(obj1 === obj2); // t
obj2.x = 20;
console.log(obj1 === obj2); // t

function Person(name) {
  this.name = name;
}
Person.prototype.getName = function () {
  return this.name;
};
const me = new Person('Lee');
console.log(me.getName()); // Lee
Person.prototype.name = 'Kim';
console.log(Person.prototype.getName()); // Kim

// 22.2.3 생성자 함수 호출
// 생성자 함수 내부의 this에는 생성자 함수가 (미래에) 생성할 인스턴스가 바인딩된다.

function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);
console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20

// 354p
const circle3 = Circle(15);
console.log(circle3); // undefined
console.log(radius); // 15

// 22.2.4 Function.protype.apply/call/bind 메서드에 의한 간접 호출
// apply, call, bind는 Function.prototype의 메서드다.
// 즉, 이들 메서드는 모든 함수가 상속받아 사용할 수 있다.
// 본질적인 기능은 함수를 호출하는 것으로 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this에 바인딩한다.
// apply와 call 메서드는 호출한 함수에 인수를 전달하는 방식만 다를 뿐 동일하게 동작한다.

function getThisBinding() {
  console.log(arguments);
  return this;
}

const thisArg = { a: 1 };
console.log(getThisBinding()); // window
console.log(getThisBinding.apply(thisArg)); // {a: 1}
console.log(getThisBinding.call(thisArg)); // {a: 1}

// apply와 call 메서드를 통해 getThisBinding 함수를 호출하면서 인수를 전달
// apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달, call은 쉼표로 구분한 리스트 형식으로 전달함
console.log(getThisBinding.apply(thisArg, [1, 2, 3])); // {a: 1}
console.log(getThisBinding.call(thisArg, 1, 2, 3)); // {a: 1}

// 대표적인 용도는 arguments 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우다.
function convertArgsToArray() {
  console.log(arguments);
  const arr = Array.prototype.slice.call(arguments);
  console.log(arr);
  return arr;
}
convertArgsToArray(1, 2, 3); // [1, 2, 3]

// bind 메서드는 apply와 call 메서드와 달리 함수를 호출하지 않고 this로 사용할 객체만 전달한다.
// 함수를 호출하지 않으므로 명시적으로 호출해야 한다.
function methodBind() {
  return this;
}
// const thisArg = { a: 1 }
console.log(methodBind.bind(thisArg)); // methodBind
console.log(methodBind.bind(thisArg)()); // {a: 1}

// bind 메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.
const person1 = {
  name: 'Lee',
  foo1(callback) {
    setTimeout(callback, 100);
  },
  foo2(callback) {
    setTimeout(callback.bind(this), 100);
  },
};
person1.foo1(function () {
  console.log(`Hi! my name is ${this.name}`); // '' = window.name
});
person1.foo2(function () {
  console.log(`Hi! my name is ${this.name}`); // Lee
});

// 정리!
// 일반 함수 호출 => 전역 객체
// 메서드 호출 => 메서드를 호출한 객체
// 생성자 함수 호출 => 생성자 함수가 (미래에) 생성할 인스턴스
// Function.prototype.apply/call/bind 메서드에 의한 간접 호출 => 메서드에 첫 번째 인수로 전달한 객체
