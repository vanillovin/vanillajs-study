/**
 * 26장 ES6 함수의 추가 기능
 * */

// 26.1 함수의 구분
// 자바스크립트의 함수는 일반적인 함수로서 호출, new 연산자와 함께 호출해 인스턴스를 생성할 수 있는 생성자 함수로서 호출,
// 객체에 바인딩되어 메서드로서 호출할 수도 있다. 이는 편리한 것 같지만 실수를 유발시킬 수 있으며 성능 면에서도 손해다.

// ES6 이전의 모든 함수는 callable이면서 constructor다.
var foo = function () {
  return 1;
};
console.log('일반적인 함수로서 호출: ', foo()); // 1
console.log('생성자 함수로서 호출: ', new foo()); // foo {}
var obj = { foo: foo };
console.log('메서드로서 호출: ', obj.foo()); // 1

// 26.2 메서드
// "ES6 사양에서 메서드는 메서드 축약 표현으로 정의된 함수만을 의미한다"
const oobj = {
  x: 1,
  // 메서드
  foo() {
    return this.x;
  },
  // 일반 함수
  bar: function () {
    return this.x;
  },
};

// 인스턴스를 생성할 수 없는 non-constructor다. 따라서 생성자 함수로서 호출할 수 없다.
// console.log(new oobj.foo());
console.log(new oobj.bar());

// 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다
console.log(oobj.foo.hasOwnProperty('prototype')); // f
console.log(oobj.bar.hasOwnProperty('prototype')); // t

// 표준 빌트인 객체가 제공하는 프로토타입 메서드와 정적 메서드는 모두 non-constructor다
console.log(String.prototype.toUpperCase.prototype); // undefined
console.log(Number.prototype.toFixed.prototype); // undefined
console.log(Array.prototype.map.prototype); // undefined

// 459p ES6의 메서드 축약 표현으로 정의된 함수만이 [[HomeObject]]를 갖고 super 참조를 할 수 있다.
// ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]]를 갖는다.
const base = {
  name: 'Lee',
  sayHi() {
    return `Hi! ${this.name}`;
  },
};
const derived = {
  __proto__: base,
  sayHi() {
    return `${super.sayHi()}. yo`;
  },
};
console.log(derived.sayHi()); // Hi! Lee. yo

// 26.3 arrow function
// 화살표 함수는 표현만 간략한 것이 아니라 내부 동작도 간략하다.
// 특히 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.

// 26.3.1 화살표 함수 정의
const multiply = (x, y) => x * y;
console.log(multiply(2, 3)); // 6

// 매개변수 선언
const arrow = (x) => x;
console.log(arrow('Hello Javascript'));
const arrow1 = (x, y) => `${x} ${y}`;
console.log(arrow1('hello!', 'arrow function'));
const arrow2 = () => '매개변수 없으면 소괄호 생략불가';
console.log(arrow2());

// 객체 리터럴 반환시 소괄호로 감싸기
const create = (id, content) => ({
  id,
  content,
});
console.log(create(1, 'js'));

// 함수 몸체가 여러 개의 문으로 구성된다면 {}를 생략할 수 없다. 이때 반환값이 있다면 명시적으로 반환.

// 화살표 함수도 즉시 실행 함수 IIFE로 사용할 수 있음
const person = ((name) => ({
  sayHi() {
    return `My name is ${name}`;
  },
}))('noname');
console.log(person.sayHi());

console.log(
  (function () {
    return 'iife1';
  })(),
); // iife1
var foo = (function () {
  return 'iife2';
})();
console.log(foo); // iife2

// 화살표 함수도 일급 객체이므로 고차 함수 Higher-Order Function, HOF에 인수로 전달할 수 있다.
// ES5
[1, 2, 3].map(function (v) {
  return v * 2;
});
// ES6 - so 간결
[1, 2, 3].map((v) => v * 2);

// 26.3.2 화살표 함수와 일반 함수의 차이
// 1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor
const Foo = () => {};
// new Foo();
console.log(Foo.hasOwnProperty('prototype')); // f

// 2. 중복된 매개변수 이름을 선언할 수 없다
// 'use strict';
function normal(a, a) {
  return a + a;
}
// const arrow = (a, a) => a + a;

// 3. 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.
//  따라서 화살표 함수 내부에서 this 등 참조시 스코프 체인을 통해 상위 스코프를 참조한다

// 26.3.3 this
// 화살표 함수가 일반 함수와 구별되는 가장 큰 특징은 바로 this다.
// 그리고 화살표 함수는 다른 함수의 인수로 전달되어 콜백 함수로 사용되는 경우가 많다.
// this 바인딩은 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다

// 1. this 회피 우회?
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }
  add(arr) {
    const that = this;
    return arr.map(function (item) {
      return that.prefix + item;
    });
  }
}
const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
// ["-webkit-transition", "-webkit-user-select"]

// 일반 함수로서 호출된 모든 함수 내부의 this에는 전역 객체가 아니라 undefined가 바인딩 됨
// 이때 발생하는 문제가 바로 "콜백 함수 내부의 this 문제"다.

// 2. map 두 번째 인수로 prefixer 객체를 가리키는 this 전달
class PrefixerA {
  constructor(prefix) {
    this.prefix = prefix;
  }
  add(arr) {
    return arr.map(function (item) {
      return this.prefix + item;
    }, this);
  }
}
const prefixerA = new PrefixerA('-moz-');
console.log(prefixerA.add(['transition', 'user-select']));
// ["-moz-transition", "-moz-user-select"]

// 3. Function.prototype.bind 메서드 사용
class PrefixerB {
  constructor(prefix) {
    this.prefix = prefix;
  }
  add(arr) {
    return arr.map(
      function (item) {
        return this.prefix + item;
      }.bind(this),
    );
  }
}
const prefixerB = new PrefixerB('-vanilla-');
console.log(prefixerB.add(['transition', 'user-select']));
// ["-vanilla-transition", "-vanilla-user-select"]

// * ES6 - arrow function
class PrefixerS {
  constructor(prefix) {
    this.prefix = prefix;
  }
  add(arr) {
    return arr.map((item) => this.prefix + item);
  }
}
const prefixerE = new PrefixerS('-kiki-');
console.log(prefixerE.add(['transition', 'user-select']));
// ["-kiki-transition", "-kiki-user-select"]

// => 화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다.
// 따라서 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.
// 이를 lexical this라 한다. 이는 마치 렉시컬 스코프와 같이 화살표 함수의 this가 어찌구 480p

// 중첩 함수 foo의 상위 스코프는 즉시 실행 함수.
// 따라서 화살표 함수 foo의 this는 상위 스코프인 즉시 실행 함수의 this를 가리킨다.
(function () {
  const foo = () => console.log(this);
  foo();
}.call({ a: 1 })); // {a: 1}

// 481p 참고
(function () {
  const bar = () => () => console.log(this);
  bar()();
}.call({ a: 1 })); // {a: 1}
// (function () {
//   const bar = () => {
//     return () => console.log(this);
//   };
//   bar()();
// }.call({ a: 1 })); // {a: 1}

// 482p
// 프로퍼티에 할당한 화살표 함수도 스코프 체인 상에서 가장 가까운 상위 함수 중에서
// 화살표 함수가 아닌 함수의 this를 참조한다.

const counter = {
  num: 1,
  increase: () => ++this.num,
};
console.log(counter.increase()); // NaN

// 뭐라는지 모르겠고.. 메서드를 정의할 때는 ES6 메서드 축약 표현으로 사용하기.
// Good
const per = {
  name: 'Lee',
  sayHi() {
    console.log(`Hi ${this.name}`);
  },
};
per.sayHi();

// 프로토타입 객체와 화살표 함수
// Bad
function Alien(name) {
  this.name = name;
}
Alien.prototype.sayHi = () => console.log(`Hi ${this.name}`);
const alien = new Alien('alien');
alien.sayHi(); // Hi

// 프로퍼티 동적 추가시 ES6 메서드 정의대신 일반 함수 할당
// Good
Alien.prototype.asap = function () {
  console.log(`asap! ${this.name}`);
};
alien.asap(); // asap! alien

// 일반 함수가 아닌 ES6 메서드를 동적 추가하고 싶다면 다음과 같이 객체 리터럴을 바인딩하고
// 프로토타입 constructor 프로퍼티와 생성자 함수 간의 연결을 재설정한다.
Alien.prototype = {
  // constructor 프로퍼티와 생성자 함수 간의 연결을 재설정
  constructor: Alien,
  sayHello() {
    console.log(`Hello ${this.name}`);
  },
};
// 아마 프로토타입 체인 끊겨서 그런것같음. 다시 공부
// alien.sayHello(); alien.sayHello is not a function
const alien1 = new Alien('alien1');
alien1.sayHello(); // Hello alien1

// 클래스 필드 정의 제안을 사용해 클래스 필드에 화살표 함수를 할당할 수도 있지만
// 클래스 필드에 할당한 화살표 함수는 프로토타입 메서드가 아니라 인스턴스 메서드가 된다.
// => 따라서 메서드를 정의할 때는 ES6 메서드 축약 표현으로 정의한 ES6 메서드를 사용하는 것이 좋다.
// Good
class Fairy {
  // 클래스 필드 정의
  name = 'fairy';

  fly() {
    console.log(`${this.name} fly`);
  }
}
const fairy = new Fairy();
fairy.fly(); // fairy fly

// 26.3.4 super
// 화살표 함수는 함수 자체의 super 바인딩을 갖지 않는다.
// 따라서 화살표 함수 내부에서 super를 참조하면 this와 마찬가지로 상위 스코프의 super를 참조한다.
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  sayHi = () => `${super.sayHi()} yoyo`;
}

const derived1 = new Derived('kiki');
console.log(derived1.sayHi()); // Hi! kiki yoyo

// 26.3.5 arguments
// arrow function은 함수 자체의 arguments 바인딩을 갖지 않는다. 따라서 arrow function 내부에서
// argmnets를 참조하면 this와 마찬가지로 상위 스코프의 arguments를 참조한다.
(function () {
  const foo = () => console.log(arguments);
  foo(3, 4);
})(1, 2);

const boo = () => console.log(arguments);
// boo(1, 2); // ReferenceError: arguments is not defined at boo (js:313) at js:314

/* 26.4 Rest 파라미터 */
// 26.4.1 기본 문법
// Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.
function poo(...rest) {
  console.log(rest);
}
poo(1, 2, 3, 4, 5, 6); // [1, 2, 3, 4, 5, 6]

function fooo(param, ...rest) {
  console.log(param); // 1
  console.log(rest); // [2, 3, 4, 5, 6]
}
fooo(1, 2, 3, 4, 5, 6);

function booo(param1, param2, ...rest) {
  console.log(param1); // 1
  console.log(param2); // 2
  console.log(rest); // [3, 4, 5, 6]
}
booo(1, 2, 3, 4, 5, 6);

// 이름 그대로 먼저 선언된 매개변수에 할당된 인수를 제외한 '나머지 인수들'로 구성된 배열이 할당된다.
// 따라서 Rest 파라미터는 반드시 마지막 파라미터이어야 한다.
// function foo(...rest, param1, param2) { }

// 단 하나만 선언할 수 있음
// function foo(...rest1, ...rest2) {}

// length 프로퍼티에 영향을 주지 않는다.
function foo1(...rest) {}
console.log(foo1.length); // 0
function foo2(x, ...rest) {}
console.log(foo2.length); // 1

// 26.4.2 Rest 파라미터와 arguments 객체
// ES5에서는 arguments 객체를 활용하여 인수를 전달받았다.
// arguments 객체는 함수 호출 시 전달된 인수 argument들의 정보를 담고 있는
// 순회 가능한 유사 배열 객체 array-like object이며, 함수 내부에서 지역 변수처럼 사용할 수 있다.
function sum() {
  console.log(arguments);
}
sum(1, 2);

// 하지만 배열이 아닌 유사 배열 객체므로 call, apply 메서드를 사용해 객체를 배열로 변환해야 하는 번거로움이 있었음
function sum1() {
  var array = Array.prototype.slice.call(arguments);

  return array.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}
console.log(sum1(1, 2, 3, 4, 5)); // 15

// ES6 - rest parameter
function sum2(...args) {
  return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum2(1, 2, 3, 4, 5)); // 15

/* 26.5 매개변수 기본값 */
function add1(x, y) {
  return x + y;
}
console.log(add1(1)); // NaN

function add2(x, y) {
  x = x || 0;
  y = y || 0;

  return x + y;
}
console.log(add2(1, 2)); // 3
console.log(add2(1)); // 1

// ES6
function add(x = 0, y = 0) {
  return x + y;
}
console.log(add(1, 2)); // 3
console.log(add(1)); // 1

// Rest 파라미터에는 기본값 지정 불가능
// function foo(...rest = []) {
//   console.log();
// }
