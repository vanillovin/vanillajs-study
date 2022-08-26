document.body.innerHTML = '<button>🧁</button>';
document.querySelector('button').addEventListener('click', function () {
  console.log(this);
});

/* 19 프로토타입 */
// 자바스크립트는 명령형 imperative, 함수형 funcional, 프로토타입 기반 prototype-based
// 객체지향 프로그래밍 OOP; Object Oriented Programming을 지원하는 멀티 패러다임 프로그래밍 언어
// 자바스크립트를 이루고 있는 거의 "모든 것"이 객체. (원시 타입의 값을 제외한 나머지 값들)

/* 19.1 객체지향 프로그래밍 */
// 상태 state를 나타내는 데이터, 상태 데이터를 조작할 수 있는 동작 behavior을 하나의 논리적인 단위로 묶음
// -> 따라서 객체는 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조

/* 19.2 상속과 프로토타입 inheritance */
// 상속을 통해 불필요한 중복을 제거. 자바스크립트는 프로토타입 prototype을 기반으로 상속을 구현함.
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

/* 19.3 프로토타입 객체(프로토타입) */
// OOP의 근간을 이루는 객체 상속 inheritance을 구현하기 위해 사용된다. 프로토타입은
// 어떤 객체의 상위(부모) 객체의 역할을 하는 객체로 다른 객체에 공유 프로퍼티(메서드 포함)를 제공
// 모든 객체는 [[Prototype]]이라는 내부 슬롯을 가지며 이 값은 프로토타입의 참조(null인 경우도 있음)다.

// 19.3.1 __proto__ 접근자 프로퍼티
// 모든 객체는 __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입([[Prototype]] 내부 슬롯)에 간접적으로 접근 가능
const p = { name: 'Lee' };
console.log(p);

// __proto__는 접근자 프로퍼티다. Object.prototype의 접근자 프로퍼티인 __proto__는 getter/setter
// 함수라고 부르는 접근자 함수를 통해 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당한다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
const obj = {};
const parent = { x: 1 };
obj.__proto__ = parent;
console.log(obj.x); // 1

// __proto__ 접근자 프로퍼티는 상속을 통해 사용된다
// 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티다.
// 모든 객체는 상속을 통해 Object.prototype.__proto__ 접근자 프로퍼티를 사용할 수 있다.
const person = { name: 'Lee' };
console.log(person.hasOwnProperty('__proto__'));
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
console.log({}.__proto__ === Object.prototype); // ture

// Object.prototype
// 프로토타입 체인의 종점, 즉 프로토타입 체인의 최상위 객체는 Object.prototype이며,
// 이 객체의 프로퍼티와 메서드는 모든 객체에 상속된다.

// __proto__ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.
// __proto__ 접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우에는
// Object.getPrototypeOf 메서드를 사용하고, 프로토타입을 교체하고 싶은 경우에는
// Object.setPrototypeOf 메서들르 사용할 것을 권장
// const obj = Object.create(null);
// console.log(obj.__proto__); // undefined
// console.log(Object.getPrototypeOf(obj)); // null

// 19.3.2 함수 객체의 prototype 프로퍼티
// 함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.
console.log(function () {}.hasOwnProperty('prototype')); // true
console.log({}.hasOwnProperty('prototype')); // false

// 생성자 함수로서 호출할 수 없는 함수 non-constructor인 화살표 함수, ES6 메서드 축약표현으로
// 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다
// 모든 객체가 가지고 있는(엄밀히 말하면 Object.prototype으로부터 상속받은)
// __proto__ 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국
// 동일한 프로토타입을 가리킨다. 하지만 이들 프로퍼티를 사용하는 주체가 다르다.
function Person(name) {
  this.name = name;
}
const me = new Person('Lee');
console.log(Person.prototype === me.__proto__); // true

// 19.3.3 프로토타입의 constructor 프로퍼티와 생성자 함수
// 모든 프로토타입은 constructor 프로퍼티를 갖고 자신을 참조하고 있는 생성자 함수를 가리킨다.
// 이 연결은 생성자 함수가 생성될 때, 즉 함수 객체가 생성될 때 이뤄진다.
function A(name) {
  this.name = name;
}
const a = new A('a');
console.log(a.constructor === A); // true

/* 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입 */
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
// 리터럴 표기법에 의해 생성된 객체도 물론 프로토타입이 존재한다. 하지만 constructor 프로퍼티가
// 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수는 없다

// Object 생성자 함수에 의한 객체 생성/인수가 전달되지 않았을 때 추상 연산을 호출해 빈 객체 생성
let cbj = new Object();
console.log(cbj); // {}

// new.target이 undefined나 Object가 아닌 경우
class Foo extends Object {}
console.log(new Foo()); // Foo {}

// 인수가 전달된 경우에는 인수를 객체로 변환한다.
const dbj = new Object(123);
console.log(dbj); // Number {123}
const ebj = new Object('123');
console.log(ebj); // String {"123"}

// 객체 리터럴이 평가될 때는 다음과 같이 추상 연산 OrdinaryObjectCreate를 호출하여
// 빈 객체를 생성하고 프로퍼티를 추가하도록 정의되어 있다.???
// 따라서 객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아니다..
function boo() {}
console.log(boo.constructor === Function); // true
// 리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다. 따라서 가상적인 생성자 함수를 갖는다
// -> 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍 pair로 존재한다.
// 따라서 프로토타입의 constructor 프로퍼티를 통해 연결되어 있는 생성자 함수를 리터럴 표기법으로
// 생성한 객체를 생성자 함수로 생각해도 크게 무리는 없다.
// 리터럴 표기법에 의해 생성되 객체의 생성자 함수와 프로토타입
// 객체리터럴-object-Object.prototype / 함수리터럴-Function-Function.prototype..

/* 19.5 프로토타입의 생성 시점 */
// 객체는 리터럴 표기법 또는 생성자 함수에 의해 생성되므로 결국 모든 객체는 생성자 함수와 연결되어 있다.
// +Object.create 메서드와 클래스로 객체를 생성하는 방법도 있음
// -> 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.
// 생성자 함수는 사용자 정의 생성자 함수와 자바스크립트가 기본 제공하는 빌트인 생성자 함수로 구분

// 19.5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점
// -> 생성자 함수로서 호출할 수 있는 함수, 즉 constructor는 함수 정의가 평가되어
// 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다. 생성된 프로토타입은
// 오직 constructor 프로퍼티만 갖는 객체다.프로토타입도 객체이고 모든 객체는 프로토타입을 가지므로
// 프로토타입도 자신의 프로토타입을 갖는다.생성된 프로토타입의 프로토타입은 Object.prototype이다.
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

// 19.5.2 빌트인 생성자 함수와 프로토타입 생성 시점
// Object, String, Number, Function, Array, RegExp, Date, Promise 등과 같은 빌트인 생성자 함수도
// 일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다.
// 모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다.
// 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩된다.
console.log(window.Object === Object); // true
// console.log(global.Object === Object); Node.js
// 이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의
// [[Prototype]] 내부 슬롯에 할당된다. 이로써 생성된 객체는 프로토타입을 상속받는다.

/* 19.6 객체 생성 방식과 프로토타입의 결정 */
// 객체의 생성 방법: 객체 리터럴, Object 생성자 함수, 생성자 함수, Object.create 메서드, 클래스
// 이처럼 다양한 방법으로 생성된 객체는 각 방식마다 세부적인 객체 생성 방식의 차이는 있으나
// 추상 연산 OrdinaryObjectCreate에 의해 생성된다는 공통점이 있다.

// 19.6.1 객체 리터럴에 의해 생성된 객체의 프로토타입
// 자스 엔진은 객체 리터럴을 평가하여 객체를 생성할 때 추상 연산 OOC를 호출한다.
// 이때 추상 연산에 전달되는 프로토타입은 Object.prototype이다.
// -> 즉, 객체 리터럴에 의해 생성되는 객체의 프로토타입은 Object.prototype이다
const testObj = { x: 1 };
console.log(testObj.constructor === Object); // true
console.log(testObj.hasOwnProperty('x')); // true

// 19.6.2 Object 생성자 함수에 의해 생성된 객체의 프로토타입
// Object 생성자 함수를 인수 없이 호출하면 빈 객체가 생성된다. Object 생성자 함수를 호출하면
// 객체 리터럴과 마찬가지로 추상 연산 OrdinaryObjectCreate가 호출된다. 이때 추상 연산에
// 전달되는 프로토타입은 Object.prototype이다. 즉, Object 생성자 함수에 생성되는
// 객체의 프로토타입은 Object.prototype이다.
const fbj = new Object();
fbj.x = 1;
console.log(fbj.constructor === Object); // true
console.log(fbj.hasOwnProperty('x')); // true
// 객체 리터럴과 Object 생성자 함수에 의한 객체 생성 방식의 차이는 프로퍼티를 추가하는 방식에 있다.
// 객체 리터럴 방식은 내부에 추가하지만, Object 생성자 함수 방식은 일단 빈 객체를 생성 후 추가한다

// 19.6.3 생성자 함수에 의해 생성된 객체의 프로토타입
// new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면 다른 객체 생성 방식과 마찬가지로
// 추상 연산 OOC이 호출된다. 이때 OOC에 전달되는 프로토타입은 생성자 함수의 prototype 프로퍼티에
// 바인딩되어 있는 객체다. 즉! 생함에 의해 생성되는 객체의 프로토타입은 생함 프타프티에 바인딩된 객체
function Ferson(name) {
  this.name = name;
}

// 프로토타입 메서드
Ferson.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const f = new Ferson('fing');
const f1 = new Ferson('fong');

f.sayHello();
f1.sayHello();
console.log('!_!🥕');

/* 19.7 프로토타입 체인 */
// 자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면
// [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다.
console.log(f.hasOwnProperty('name')); // true
console.log(Object.getPrototypeOf(f) === Ferson.prototype); // true
console.log(Object.getPrototypeOf(Ferson.prototype) === Object.prototype); // true
console.log(Object.prototype.hasOwnProperty.call(f, 'name')); // true
// 프체의 최상위에 위치하는 객체는 언제나 Object.prototype이다. 따라서 모든 객체는 Object.prototype을 상속받는다.
// -> Object.prototype을 프로토타입 체인의 종점(end of prototype chain)이라한다.
// Object.prototype의 프로토타입, 즉 [[Prototype]] 내부 슬롯의 값은 null이다. 프체 종점에서도
// 프로퍼티를 검색할 수 없는 경우 undefined를 반환한다.이때 에러가 발생하지 않음을 주의
// -> 프체는 자바스크립트가 OOP 상속을 구현하는 메커니즘, 스체는 식별자 검색을 위한 메커니즘이다.
// -> 스체와 프체는 서로 연관없이 별도로 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용된다.

/* 19.8 오버라이딩과 프로퍼티 섀도잉 */
// 프로토타입이 소유한 프로퍼티(메서드 포함)를 프로토타입 프로퍼티, 인스턴스가 소유한 프로퍼티를 인스턴스 프로퍼티라고 부른다.
// 프타프티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 덮어쓰지 않고 인스턴스의 프로퍼티로 추가한다.
// 이때 인스메서드는 프타메서드를 오버라이딩했고 프타메서드는 가려진다.
// 이처럼 상속 관계에 의해 프로퍼티가 가려지는 현상을 프로퍼티 섀도잉property shadowing이라 한다.
// 오버라이딩overriding: 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식
// 오버로딩overloading: 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고
// 매개변수에 의해 메서드를 구별하여 호출하는 방식이다. 자스는 지원하지 않지만 arguments 객체를 사용해 구현 가능
const Con = (function () {
  // 생성자 함수
  function Con(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Con.prototype.sayHi = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 생성자 함수를 반환
  return Con;
})();

const coni = new Con('coni');

// 인스턴스 메서드
coni.sayHi = function () {
  console.log(`Hey! My name is ${this.name}`);
};

// 인스턴스 메서드가 호출됨. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
coni.sayHi(); // Hey! My name is coni

// 프로토타입 프로퍼티를 변경 또는 삭제하려면 하위 객체를 통하지 않고 프로토타입에 직접 접근해야 한다.
delete coni.sayHi;
coni.sayHi();
delete Con.prototype.sayHi;
// coni.sayHi();

/* 19.9 프로토타입의 교체 */
// 19.9.1 생성자 함수에 의한 프로토타입의 교체
// 프로토타입으로 교체한 객체 리터럴에는 constructor 프로퍼티가 없다
const Bon = (function () {
  function Bon(name) {
    this.name = name;
  }

  // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Bon.prototype = {
    sayYo() {
      console.log(`Yo! My name is ${this.name}`);
    },
  };

  return Bon;
})();

const bon = new Bon('bon');

// constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
console.log(bon.constructor === Bon); // false
// 프로토타입 체인을 따라 Object.prorotype의 constructor 프로퍼티가 검색된다.
console.log(bon.constructor === Object); // true

// 파괴된 constructor 프로퍼티와 생성자 함수 간의 연결 되살리기
// Bon.prototype = {
//   constructor: Bon, <- 교체한 객체 리터럴에 constructor 프로퍼티를 추가
//   sayYo() {
//     console.log(`Yo! My name is ${this.name}`);
//   }
// }

// 19.2 인스턴스에 의한 프로토타입의 교체
// 프로토타입은 생성자 함수의 prototype 프로퍼니뿐만 아니라 인스턴스의 __proto__ 접근자 프로퍼티
// (또는 Object.getPrototypeOf 메서드)를 통해 접근할 수 있다. 따라서 프로토타입을 교체 가능
// __proto__ 접근자 프로퍼티를 통해 교체한다는 것은 이미 생성된 객체의 프로토타입을 교체하는 것이다
function Cream(name) {
  this.name = name;
}
const vanilla = new Cream('vanilla');
// 프로토타입으로 교체할 객체
const original = {
  sayTaste() {
    console.log(`Ok! ${this.name}`);
  },
};
Object.setPrototypeOf(vanilla, original); // vanilla.__proto__와 동일하게 동작
vanilla.sayTaste();
console.log(vanilla.constructor === Cream); // false 연결 파괴
console.log(vanilla.constructor === Object); // true

// 생성자 함수와 인스턴스에 의한 프로토타입 교체의 차이
// Bon 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다.
// Cream 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리키지 않는다.

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
// 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다.
console.log(D.prototype === Object.getPrototypeOf(dd)); // true
// -> 프로토타입은 직접 교체하지 않는 것이 좋다. 직접 상속이 더 편리하고 안전

/* 19.10 instanceof 연산자 */
// 객체 instanceof 생성자 함수
// 우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에
// 존재하면 true로 평가되고, 그렇지 않은 경우에는 false로 평가된다.
function Func(name) {
  this.name = name;
}
const foo = new Func('foo');
console.log(foo instanceof Func); // true
console.log(foo instanceof Object); // true

// 프로토타입 교체로 instanceof 연산자의 동작 이해
const paren = {};
Object.setPrototypeOf(foo, paren);
console.log(Func.prototype === paren); // false
console.log(paren.constructor === Func); // false
console.log(foo instanceof Func); // false
console.log(foo instanceof Object); // true

// 프로토타입으로 교체한 paren 객체를 Func 생성자 함수의 prototype 프로퍼티에 바인딩
Func.prototype = paren;
console.log(foo instanceof Func); // true
console.log(foo instanceof Object); // true

// instanceof 연산자는 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니라
// -> 생성자 함수의 prototype에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인한다.
// Object 생성자 함수 <-> Object.prototype, prototype 프로퍼티, 프로토타입([[Prototype]])

// instanceof 연산자를 함수로 표현
function isInstanceof(instance, constructor) {
  // 프로토타입 취득
  const prototype = Object.getPrototypeOf(instance);

  // 재귀 탈출 조건 - prototype이 null이면 프로토타입 체인의 종점에 다다른 것이다
  if (prototype === null) return false;

  // 프로토타입이 생성자 함수의 prototype 프로퍼티에 바인딩된 객체라면 true를 반환한다.
  // 그렇지 않다면 재귀 호출로 프로토타입 체인 상의 상위 프로토타입으로 이동하여 확인한다.
  return (
    prototype === constructor.prototype || isInstanceof(prototype, constructor)
  );
}

console.log(isInstanceof(foo, Func)); // true
console.log(isInstanceof(foo, Object)); // true
console.log(isInstanceof(foo, Array)); // false

/* 19.11 직접 상속 */
// 19.11.1 Object.create에 의한 직접 상속
// Object.create 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다.
// 다른 객체 생성 방식과 마찬가지로 추상 연산 OrdinaryObjectCreate를 호출한다.
// 첫 번째 매개변수에는 생성할 객체의 프로토타입으로 지정할 객체를, 두 번째 매개변수에는
// 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이뤄진 객체를 전달한다. 이 객체의 형식은
// Object.defineProperties 메서드 두 번째 인수와 동일.두 번째 인수는 옵션이므로 생략 가능하다.

// 프로토타입이 null인 객체를 생성. 생성된 객체는 프로토타입의 종점에 위치. obj -> null
let obj1 = Object.create(null);
console.log(Object.getPrototypeOf(obj1)); // null
// console.log(obj1.toString()); Object.prototype을 상속받지 못한다.

// obj -> Object.prototype -> null / obj = {};와 동일하다.
obj1 = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj1) === Object.prototype); // true

// obj -> Object.prototype -> null / obj = { x: 1 };와 동일하다.
obj1 = Object.create(Object.prototype, {
  x: { value: 1, writable: true, enumerable: true, configurable: true },
});
// 위 코드는 아래와 동일. obj = Object.create(Object.prototype) / obj.x = 1
console.log(obj1.x); // 1
console.log(Object.getPrototypeOf(obj1) === Object.prototype); // true

const myProto = { x: 10 };
// 임의의 객체를 직접 상속받는다. obj -> myProto -> Object.prototype -> null
obj1 = Object.create(myProto);
console.log(obj1.x); // 10
console.log(Object.getPrototypeOf(obj1) === myProto); // true

// 생성자 함수
function Macaron(name) {
  this.name = name;
}
// obj -> Person.prototype -> Object.prototype -> null / obj = new Person('choco')와 동일
obj1 = Object.create(Macaron.prototype);
obj1.name = 'choco';
console.log(obj1.name); // choco
console.log(Object.getPrototypeOf(obj1) === Macaron.prototype); // true

// 이처럼 Object.create 메서드는 첫 번재 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를
// 생성한다. 즉, 객체를 생성하면서 직접적으로 상속을 구현하는 것이다. 장점은!
// new 연산자 없이, 프로토타입을 지정하면서 객체 생성, 객체 리터럴에 의해 생성된 객체도 상속받기 가능

// 19.11.2 객체 리터럴 내부에서 __proto__에 의한 직접 상속
// 두 번째 인자로 프로퍼티를 정의하는 것이 번거로워 일단 객체 생성 후 프로퍼티를 추가하는 방법도 있다
const myProto2 = { x: 100 };
const obj2 = {
  y: 200,
  __proto__: myProto2,
};
console.log(obj2.x, obj2.y); // 100 200
console.log(Object.getPrototypeOf(obj2) === myProto2); // true

/* 19.12 정적 프로퍼티/메서드 */
// 정적static 프/메는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프/메
function Ice(name) {
  this.name = name;
}
Ice.prototype.soSweet = function () {
  console.log(`${this.name} icecream so sweet 💖`);
};
Ice.staticProp = 'static prop';
Ice.staticMethod = function () {
  console.log('staticMethod');
};
const strawberry = new Ice('strawberry');
strawberry.soSweet();
Ice.prototype.soSweet();
Ice.staticMethod(); // staticMethod
// 정적 프로퍼티/메소드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
// 인스턴스로 참조/호출할 수 있는 프/메는 프로토타입 체인 상에 존재해야 한다.
// strawberry.staticMethod();
// Ice 생성자 함수는 객체이므로 자신의 프로퍼티/메소드를 소유할 수 있다. Ice 생성자 함수 객체가
// 소유한 프/메를 정적 프/메라고 한다. 정적 프/메는 생함이 생성한 인스턴스로 참조/호출 불가능

// Object.create는 정적 메서드다.
const obj3 = Object.create({ name: 'Cva' });
// Object.prototype.hasOwnProperty는 프로토타입 메서드다.
console.log(obj3.hasOwnProperty('name')); // false

function Boo() {}
// 프로토타입 메서드
// this를 참조하지 않는 프로토타입 메서드는 정적 메서드로 변경하여도 동일한 효과를 얻을 수 있다.
Boo.prototype.x = function () {
  console.log('x');
};
const bo = new Boo();
// 프로토타입 메서들르 호출하려면 인스턴스를 생성해야 한다.
bo.x();
// 정적 메서드
Boo.x = function () {
  console.log('x');
};
// 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다.
Boo.x();
// 참고로 프로토타입 프로퍼티/메서드를 표기할 때 prototype을 #으로 표기(예를 들어, Object.prototype.
// isPrototypeOf를 Object#isPrototypeOf으로 포기)하는 경우도 있으니 알아두도록 하자.

/* 19.13 프로퍼티 존재 확인 */
// 19.13.1 in 연산자
// in 연산자는 객채 내에 특정 프로퍼티가 존재하는지 여부를 확인한다.
const yogurt = {
  name: 'yogurt',
  address: 'Icecream',
};
console.log('name' in yogurt); // true
console.log('address' in yogurt); // true
console.log('age' in yogurt); // false
// 확인 대상 객체의 프로퍼티뿐만 아니라 상속하는 모든 프로토타입의 프로퍼티를 확인하므로 주의
console.log('toString' in yogurt); // true

// in 연산자 대신 ES6에 도입된 Reflect.has 메서드를 사용할 수 있음
const bluberry = { name: 'bb' };
console.log(Reflect.has(bluberry, 'name')); // true
console.log(Reflect.has(bluberry, 'toString')); // true

// 19.13.2 Object.prototype.hasOwnProperty 메서드
console.log(bluberry.hasOwnProperty('name')); // true
console.log(bluberry.hasOwnProperty('age')); // false
// 이름에서 알 수 있듯이 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만
// true를 반환하고 상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환한다.
console.log(bluberry.hasOwnProperty('toString')); // false

/* 19.14 프로퍼티 열거 */
// 19.14.1 for...in 문
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
// for...in문은 in 연산자 처럼 순회 대상 객체의 프로퍼티뿐만 아니라 상속받은 프로토타입의
// 프로퍼티까지 열거한다. toString은 열거할 수 없도록 정의된 프로퍼티 [[Enumerable]]: false

// -> for...in 문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서
// 프로퍼티 어트리뷰터 [[Enumerable]]의 값이 true인 프로퍼티를 순회하며 열거enumeration한다.
const banana = {
  name: 'banana',
  address: 'Fruits World',
  __proto__: { age: 10 },
};
for (const key in banana) {
  console.log(`${key}: ${banana[key]}`);
}

// 심벌인 프로퍼티는 열거하지 않는다
const sym = Symbol();
const obj4 = { a: 1, [sym]: 10 };
for (const key in obj4) {
  console.log(`${key}: ${obj4[key]}`);
}
// a: 1

// 배열엔는 for문이나 for...of문 또는 Array.prototype.forEach 메서드를 사용하기를 권장
// 사실 배열도 객체이므로 프로퍼티와 상속받은 프로퍼티가 포함될 수 있다.
const arr = [1, 2, 3, 4];
arr.x = 10;
for (const i in arr) {
  // 프로퍼티 x도 출력된다.
  console.log(arr[i]); // 1 2 3 4 10
}
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1 2 3 4
}
arr.forEach((v) => console.log(v)); // 1 2 3 4
for (const value of arr) {
  console.log(value); // 1 2 3 4
}

// 19.14.2 Object.keys/values/entries 메서드
// for...in 문은 객체 자신의 고유 프로퍼티뿐 아니라 상속받은 프로퍼티도 열거한다. 따라서
// Object.prototype.hasOwnProperty 메서드를 사용하여 객체 자신의 프로퍼티인지 확인하는 추가 처리가
// 필요하다.객체 자신의 고유 프로퍼티만 열거하기 위해서는 Object.keys / values / entries 사용 권장
// Object.keys 메서드는 객체 자신의 열거 가능한enumerable 프로퍼티 키를 배열로 반환한다.
const bread = {
  name: 'bread',
  address: 'Busan',
  __proto__: { age: 20 },
};
console.log(Object.keys(bread)); // ["name", "address"]

// ES8에 도입
// Object.values 메서드는 객체 자신의 열거 가능한 프로퍼티 값을 배열로 반환
console.log(Object.values(bread)); // ["bread", "Busan"]

// Object.entries 메서드는 객체 자신의 열거 가능한 프로퍼티 키와 값의 쌍의 배열을 배열에 담아 반환
console.log(Object.entries(bread)); // [["name", "bread"],["address", "Busan"]]
Object.entries(bread).forEach(([key, value]) => console.log(key, value));
/*
name bread
address Busan
*/
