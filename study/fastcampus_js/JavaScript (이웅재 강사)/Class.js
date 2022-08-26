/* 클래스 class (es6) */
// 객체를 만들 수 있는 새로운 방법

// -선언적 방식
class A {}
console.log(new A()); // A {}

// -class 표현식을 변수에 할당
const B = class {};
console.log(new B()); // B {}

// -선언적 방식이지만 호이스팅은 일어나지 않는다
// new C();
class C {}

/* constructor 생성자 */
class D {
  constructor(name, age) {
    console.log(name, age);
  }
}
console.log(new D('chocola', 20)); // chocola 20
console.log(new D()); // undefined undefined

// 멤버 변수 - 객체의 프로퍼티
class E {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
console.log(new E('vanilla', 20)); // E { name: 'vanilla', age: 20 }

// class field 는 런타임 확인
class F {
  name; // this.name
  age; // this.age
}
console.log(new F()); // F { name: undefined, age: undefined }

class G {
  name = 'no name';
  age = 0;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
console.log(new G('cinamon', 20));

// 멤버 함수
class H {
  hello1() {
    console.log('hello1', this);
  }

  hello2 = () => {
    console.log('hello2', this);
  };
}
new H().hello1(); // hello1 H { hello2: [Function: hello2] }
new H().hello2(); // hello2 H { hello2: [Function: hello2] }

class I {
  name = 'js';

  hello() {
    console.log('hello', this.name);
  }
}
new I().hello(); // hello js

/* get, set */
class J {
  // 멤버변수
  // 보통 내부적으로만 쓸경우 _표시
  _name = 'no name';

  // 외부 퍼블릭한접근제어자
  get name() {
    return this._name + '@@@';
  }

  set name(value) {
    this._name = value + '!!!';
  }
}

const j = new J();
console.log(j); // J { _name: 'no name' }
j.name = 'jay'; // set함수가불림
console.log(j); // J { _name: 'jay!!!' }
console.log(j.name); // jay!!!@@@ get함수호출

/* readonly */
class K {
  // 외부에서 값을 바꾸지말자
  _name = 'no name';

  get name() {
    return this._name + '@@@';
  }
}

const k = new K();
console.log(k); // K { _name: 'no name' }
k.name = 'kim';
console.log(k); // K { _name: 'no name' }

/* static 변수, 함수 */
// 객체가 아니고, 클래스의 변수와 함수
class L {
  static age = 36;
  static hello() {
    // new L로 만든 객체가 아니라 클래스
    console.log(L.age);
  }
}
console.log(L, L.age); // [class L] { age: 36 } 36
L.hello(); // 36

class N {
  age = 24;
  // 클래스 함수
  static hello() {
    console.log(this.age);
  }
}
console.log(N, N.age); // [class N] undefined
N.hello(); // undefined
// new N().hello(); // hello is not a function

class M {
  static name = '이 클래스의 이름은 M이 아님';
}
console.log(M);
// [class 이 클래스의 이름은 M이 아님] { name: '이 클래스의 이름은 M이 아님' }

/* extends 클래스의 상속 기본 */
class Parent {
  name = 'Lee';

  hello() {
    console.log('hello', this.name);
  }
}

class Child extends Parent {}

const p = new Parent();
const c = new Child();
console.log(p, c);
// Parent { name: 'Lee' } Child { name: 'Lee' }

c.hello(); // hello Lee
c.name = 'Anna';
c.hello(); // hello Anna

/* override */
// 클래스의 상속 멤버 변수 및 함수 오버라이딩, 추가
// 부모에서 구현된 함수나 변수가 자식에서 똑같이 같은 이름으로 구현시키면 오버라이드

class ParentA {
  name = 'Lee';

  hello() {
    console.log('hello', this.name);
  }
}

class ChildA extends ParentA {
  age = 20;

  hello() {
    console.log('hello', this.name, this.age);
  }
}

const pa = new ParentA();
const ca = new ChildA();
console.log(pa, ca);
// ParentA { name: 'Lee' } ChildA { name: 'Lee', age: 20 }

ca.hello(); // hello Lee 20
ca.name = 'Anna';
ca.hello(); // hello Anna 20

/* super */
// 클래스의 상속 생성자 함수 변경
class ParentB {
  name;

  constructor(name) {
    this.name = name;
  }

  hello() {
    console.log('hello', this.name);
  }
}

class ChildB extends ParentB {
  age;

  constructor(name, age) {
    super(name);
    this.age = age;
  }

  hello() {
    console.log('hello', this.name, this.age);
  }
}

const pb = new ParentB('Mark');
const cb = new ChildB('Mary', 20);

console.log(pb, cb);
// ParentB { name: 'Mark' } ChildB { name: 'Mary', age: 20 }
pb.hello(); // hello Mark
cb.hello(); // hello Mary 20

/* static */
// 클래스의 상속 static 상속
class ParentC {
  static age = 36;
}
class ChildC extends ParentC {}
console.log(ParentC.age, ChildC.age); // 36 36
