// 25장 클래스

// 25-1
// 기존 프로토타입 기반 패턴으로 문법적 설탕 syntatic sugar
// 1. new 연산자 없이 호출하면 에러 발생. 생성자 함수는 일반 함수로서 호출됨
// 2. 상속을 지원하는 extends와 super 키워드를 제공. 생성자 함수는 지원하지 않음
// 3. 호이스팅이 발생하지 않는 것처럼 동작하지만 함수 변수 호이스팅이 발생함
// 4. 클래스 내의 모든 코드에는 암묵적으로 strict mode가 지정되며 해제할 수 없음
// 5. 클래스의 constructor, 프로토타입 메서드, 정적 메서드는 [[Enumrable]] 값 false

// 25-2 클래스 정의
// 클래스는 함수 = 일급 객체

// 클래스 선언문
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public하다.
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }

  // 정적 메서드
  static sayHello() {
    console.log('Hello!');
  }
}

// 인스턴스 생성
const me = new Person('Lee');
// 인스턴스의 프로퍼티 참조
console.log(me.name);
// 프로토타입 메서드 호출
me.sayHi();
// 정적 메서드 호출
Person.sayHello();

// 25.3 클래스 호이스팅
// 클래스는 함수로 평가됨. 함수 선언문과 같이 소스코드 평가 과정, 즉 런타임 이전에 먼저 평가되어 함수 객체를 생성함
// 일시적 사각시대 Temporal Dead Zone; TDZ에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작한다.
// console.log(A);
class A {}
console.log(typeof A); // function
console.log(`
!_!

`);

// 25-4 인스턴스 생성
// 반드시 new 연산자와 함께 호출
const momo = new Person();
console.log(momo);
const B = class MyB {};
// console.log(MyB);

// 25-5 메서드
// 클래스의 constructor 메서드와 프로토타입의 constructor 프로퍼티는 직접적인 관련이 없다.
// 인스턴스를 초기화하려면 constructor을 생략해서는 안 됨. 명시적으로 원시값을 반환하면 암묵적으로 this가 반환됨

// 25-5-2 프로토타입 메서드
// 클래스는 생성자 함수와 마찬가지로 프로토타입 기반의 객체 생성 메커니즘이다
const mimi = new Person('mimi');
mimi.sayHi(); // Hi! My name is mimi
console.log(Object.getPrototypeOf(mimi) === Person.prototype); // t
console.log(mimi instanceof Person); // t
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // t
console.log(mimi instanceof Object); // t
console.log(mimi.constructor === Person); // t

// 25-5-3 정적 메서드
// 인스턴스를 생성하지 않아도 호출할 수 있는 메서드 정적 메서드는 클래스에 바인딩된 메서드가 된다.
// 클래스는 함수 객체로 평가되므로 자신의 프로퍼티/메서드를 소유할 수 있다.
// 정적 메서드가 바인딩된 클래스는 인스턴스의 프로토타입 체인상에 존재하지 않기 때문에 인스턴스로 호출할 수 없다
// 다시 말해, 프로토타입 체인 상에는 클래스가 존재하지 않기 때문에 인스턴스로 클래스의 메서드를 상속받을 수 없음
Person.sayHello(); // Hello!

// 25-5-4 정적 메서드와 프로토타입 메서드의 차이
// 1. 정적 메서드와 프로토타입 메서드는 자신이 속해있는 프로토타입 체인이 다르다.
// 2. 정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출한다.
// 3. 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있다.

class Square {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  pArea() {
    return this.width * this.height;
  }
  static sArea(width, height) {
    return width * height;
  }
}
console.log(Square.sArea(10, 10)); // 100

const square = new Square(20, 20);
console.log(square.pArea()); // 400
const square1 = new Square(21, 21);
console.log(square1.pArea()); // 441
console.log(Math.max(2, 10)); // 10
console.log(Number.isNaN(NaN)); // T
console.clear();

// 25-5-5 클래스에서 정의한 메서드의 특징
// 1. function 키워드를 생략한 메서드 축약 표현을 사용한다.
// 2. 콤마가 필요 없음
// 3. 암묵적으로 strict mode로 실행됨
// 4. for...in문이나 Object.keys 메서드 등으로 열거 불가. 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false
// 5. 내부 메서드 [[Construct]]를 갖지 않는 non-constructor로 new 연산자와 함께 호출할 수 없음

// 25-6 클래스의 인스턴스 생성

// 25-7 프로퍼티
// 25-7-1 인스턴스 프로퍼티
// 인스턴스 프로퍼티는 constructor 내부에서 정의.
// 클래스는 private, public, protected 키워드와 같은 접근 제한자를 지원하지 않음

// 25-7-2 접근자 프로퍼티
const person = {
  // 데이터 프로퍼티
  firstName: 'Chocola',
  lastName: 'Coco',
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(`${person.firstName} ${person.lastName}`);

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장과 값의 참조
// setter 함수 호출
person.fullName = 'Vanilla Ice';
console.log(person);
// getter 함수 호출
console.log(person.fullName);

// fullName은 접근자 프로퍼티. get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다
console.log(Object.getOwnPropertyDescriptor(person, 'fullName'));

class NewPerson {
  constructor(fName, lName) {
    this.fName = fName;
    this.lName = lName;
  }
  get fullName() {
    return `${this.fName} ${this.lName}`;
  }
  set fullName(name) {
    [this.fName, this.lName] = name.split(' ');
  }
}

const luna = new NewPerson('Luna', 'Lee');
// 데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(`${luna.fName} ${luna.lName}`);
// 접근자 프로퍼티를 통한 프로퍼티 값의 저장. setter 함수 호출
luna.fullName = 'Lona Lee';
console.log(luna);
// 접근자 프로퍼티를 통한 프로퍼티 값의 참조. getter 함수 호출
console.log(luna.fullName);
// fullName은 접근자 프로퍼티
console.log(Object.getOwnPropertyDescriptor(NewPerson.prototype, 'fullName'));

// 클래스의 메서드는 기본적으로 프로토타입 메서드가 된다. 따라서 클래스의 접근자 프로퍼티 또한
// 인스턴스 프로퍼티가 아닌 프로토타입의 프로퍼티가 된다.
console.log(Object.getOwnPropertyNames(luna)); // ["fName", "lName"]
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(luna))); // ["constructor", "fullName"]
console.dir(luna);

// 25-7-3 클래스 필드 정의 제안 class field
// 클래스 필드(또는 멤버)는 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어

class Berson {
  // 클래스 필드에 문자열을 할당
  name = 'Lee'; // this.name X
  test; // 초기화하지 않으면 undefined

  // 클래스 필드에 함수를 할당
  getName = function () {
    return this.name;
  }; // getName = () => this.name;

  getAge() {
    return this.age;
  }

  constructor(age) {
    // 클래스 필드 초기화
    this.age = age;
  }
}
const mi = new Berson();
console.log(mi); // Berson {name: "Lee", test: undefined, age: undefined}
console.log(mi.getName());
console.dir(Berson);

// 클래스 필드에 함수를 할당하는 경우 인스턴스 메서드가 된다. 권장하지 않음.
// 클래스 필드 정의 제안으로 인해 인스턴스 프로퍼티를 정의하는 방식은 두 가지가 되었다.
// 인스턴스를 생성할 때 외부 초기값으로 클래스 필드를 초기화할 필요가 있다면 constructor 방식을
// "" 없다면 contructor에서 인스턴스 프로퍼티를 정의하는 방식과 클래스 필드 정의 제안 모두 사용

// 25-7-4 private 필드 정의 제안
// 자바스크립트는 캡슐화를 완전하게 지원하지 않는다.
// 인스턴스 프로퍼티는 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있다. 즉, 언제나 public이다.
// private 필드는 반드시 몸체에 정의해야 한다. constructor에 정의하면 에러가 발생함

class Derson {
  // private 필드 정의
  #heart = '🤍';

  cake = 'cake'; // 클래스 필드도 기본적으로 public

  constructor(o, name) {
    // private 필드 참조
    this.#heart = o;
    this.name = name; // 인스턴스 프로퍼티는 기본적으로 public
  }
}

const dd = new Derson('dd');
console.log(dd.name); // dd
console.log(dd.cake); // cake

const soi = new Derson('o', 'soi');
console.log(soi); // Derson {cake: "cake", name: "soi", #heart: "o"}
// console.log(soi.#heart); Private field '#heart' must be declared in an enclosing class

class Ferson {
  // private 필드 정의
  #name = '';

  constructor(name) {
    this.#name = name;
  }

  // name은 접근자 프로퍼티다.
  get name() {
    // private 필드를 참조하여 trim한 다음 반환하다.
    return this.#name.trim();
  }
}

const lulu = new Ferson(' lulu ');
console.log(lulu.name);

// 25-7-5 static 필드 정의 제안
class MyMath {
  // static public 필드 정의
  static PI = 22 / 7;

  // static private 필드 정의
  static #num = 10;

  // static 메서드
  static increment() {
    return ++MyMath.#num;
  }
}

console.log(MyMath.PI); // 3.142857142857143
console.log(MyMath.increment()); // 11

// 25-8 상속에 의한 클래스 확장

// 25-8-1 클래스 상속과 생성자 함수 상속
// 프로토타입 기반 상속은 프로토타입 체인을 통해 다른 객체의 자산을 상속받는 개념이지만
// 상속에 의한 클래스 확장은 기존 클래스를 상속받아 새로운 클래스를 확장 extends하여 정의하는 것이다.
// 450p 상속에 의해 확장된 클래스의 프로토타입 체인

// 상속을 통해 Animal 클래스를 확장한 Bird 클래스 구현
class Animal {
  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }
  eat() {
    return 'eat';
  }
  move() {
    return 'move';
  }
}

// 상속을 통해 Animal 클래스를 확장한 Bird 클래스
class Bird extends Animal {
  fly() {
    return 'fly';
  }
}

const bird = new Bird(1, 5);
console.log(bird); // Bird {age: 1, weight: 5}
console.log(bird instanceof Bird); // t
console.log(bird instanceof Animal); // t
console.log(bird.eat()); // eat
console.log(bird.move()); // move
console.log(bird.fly()); // fly

// 25-8-2 extends 키워드
// 상속을 통해 확장된 클래스를 subclass라 부르고, 서브클래스에게 상속된 클래스를 superclass라 부른다
// extends 키워드의 역할은 수퍼클래스와 서브클래스 간의 상속 관계를 설정하는 것이다.
// superclass와 subclass는 instance의 prototype chain뿐 아니라 class 간의 prototype chain도 생성한다.
// 이를 통해 prototype method, static method 모두 상속이 가능하다.

// 수퍼(베이스/부모)클래스
class Base {}
// 서브(파생/자식)클래스
class Derived extends Base {}

// 25-8-3 동적 상속
// extends 키워드는 클래스뿐만 아니라 생성자 함수를 상속받아 클래스를 확장할 수도 있다. 단, extends 키워드 앞에는 반드시 클래스가 와야 한다.

// 생성자함수
function BaseA(a) {
  this.a = a;
}
// 생성자 함수를 상속받는 서브 클래스
class DerivedA extends BaseA {}

const derivedA = new DerivedA(1);
console.log(derivedA);

function Base1() {}
class Base2 {}
let condition = true;

// 조건에 따라 동적으로 상속 대상을 결정하는 서브클래스
class Derived1 extends (condition ? Base1 : Base2) {}

const derived1 = new Derived1();
console.log(derived1); // Derived1 {}

console.log(derived1 instanceof Base1); // t
console.log(derived1 instanceof Base2); // f

// 25-8-4 서브클래스의 constructor

// superclass
class BaseB {}
// subclass
class DerivedB extends BaseB {}
const derivedB = new DerivedB();
console.log(derivedB); // DerivedB {}

// 25-8-5 super 키워드
// super 키워드는 함수처럼 호출할 수도 있고 this와 같이 식별자처럼 참조할 수 있는 특수한 키워드
//  ▫ super를 호출하면 superclass의 constructor(super-constructor)을 호출한다.
//  ▪ super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.

// -super 호출
// superclass
class BaseC {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}
// subclass
class DerivedC extends BaseC {
  constructor(a, b, c) {
    super(a, b);
    this.c = c;
  }
}
const derivedC = new DerivedC(1, 2, 3);
console.log(derivedC); // DerivedC {a: 1, b: 2, c: 3}

// -super 참조
class BaseD {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `Hi! ${this.name}`;
  }
}
class DerivedD extends BaseD {
  sayHi() {
    return `${super.sayHi()}. how are you doing?`;
  }
}
const derivedD = new DerivedD('Lee');
console.log(derivedD.sayHi()); // Hi! Lee. how are you doing?

// [[HomeObject]]를 가지는 함수만이 super 참조를 할 수 있다.
const obj = {
  foo() {}, // [[HomeObject]]를 갖음
  bar: function () {}, // [[HomeObject]]를 갖지않음
};
const base = {
  name: 'Lee',
  sayHi() {
    return `Hi! ${this.name}`;
  },
};
const drvd = {
  __proto__: base,
  sayHi() {
    return `${super.sayHi()}. yoyo`;
  },
};
console.log(drvd.sayHi());

// 25-8-6 상속 클래스의 인스턴스 생성 과정
// superclass
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
  toString() {
    return `width=${this.width}, height=${this.height}`;
  }
}
// subclass
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);
    this.color = color;
  }
  // 메서드 오버라이딩
  toString() {
    return super.toString() + `, color=${this.color}`;
  }
}
const colorRectangle = new ColorRectangle(2, 4, 'blue');
console.log(colorRectangle); // ColorRectangle {width: 2, height: 4, color: "blue"}

// 상속을 통해 getArea 메서드를 호출
console.log(colorRectangle.getArea()); // 8
// 오버라이딩된 toString 메서드를 호출
console.log(colorRectangle.toString()); // width=2, height=4, color=blue
