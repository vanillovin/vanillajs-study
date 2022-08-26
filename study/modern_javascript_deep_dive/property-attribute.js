/* 16 프로퍼티 어트리뷰트 */
/* 16.1 내부 슬롯과 내부 메서드 */
// 내부 슬롯 internal slot과 내부 메서드 internal method의 개념
// 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는
// 의사 프로퍼티 pseudo property와 의사 메서드 pseudo method다.
// 자스 엔진에서 실제로 동작하지만 직접 접근할 수 있게 외부로 공개된 객체의 프로퍼티는 아니다.
// 예를 들어, 모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖으며 __proto__로 간접적 접근 가능
const o = {};
// console.log(o[[Prototype]]);
console.log(o.__proto__); // -> Object.prototype

/* 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체 */
// 자스 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.
// 프로퍼티의 상태란 프로퍼티의 값 value, 값의 갱신 가능 여부 writable, 열거 가능 여부 enumerable,
// 재정의 가능 여부 configurable을 말한다.
// 프로퍼티 어트리뷰트는 자스 엔진이 관리하는 내부 상태 값 meta-property인 내부 슬롯
// [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]으로 직접 접근할 수는 없지만
// Object.getOwnPropertyDescriptor 메서드를 사용하여 간접적으로 확인할 수 있다.
const personA = {
  name: 'chocola',
};
// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
console.log(Object.getOwnPropertyDescriptor(personA, 'name'));
// {value: "chocola", writable: true, enumerable: true, configurable: true}

// Object.getOwnPropertyDescriptor 메서드를 호출할 때
// 첫 번째 매개변수에는 객체의 참조를 전달하고, 두 번째 매개변수에는 프로퍼티 키를 문자열로 전달한다.
// 메서드는 프로퍼티 어트리뷰트 정보를 제공하는 "프로퍼티 디스크립트 PropertyDescriptr" 객체를 반환한다.
// 만약 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 프로퍼티 디스크립터를 요구하면 undefined가 반환

// Object.getOwnPropertyDescriptor 메서드는 하나의 프로퍼티에 대해 프로퍼티 디스크립터 객체를 반환하지만
// ES8에 도입된 Object.getOwnPropertyDescriptors 메서드는 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.
const personB = {
  name: 'vanilla',
};
personB.age = 20;
console.log(Object.getOwnPropertyDescriptors(personB));
// {
//   name: {value: "vanilla", writable: true, enumerable: true, configurable: true},
//   age: {value: 20, writable: true, enumerable: true, configurable: true}
// }

/* 16.3 데이터 프로퍼티와 접근자 프로퍼티 */
// -데이터 프로퍼티 data property
//  키와 값으로 구성된 일반적인 프로퍼티다. 지금까지 살펴본 모든 프로퍼티는 데이터 프로퍼티다.
// -접근자 프로퍼티 accessor property
//  자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수 accessor function로 구성된 프로퍼티다.

// 16.3.1 데이터 프로퍼티
// 이 프로퍼티 어트리뷰트는 자바스크립트 엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의된다.
const personC = {
  name: 'cinamon',
};
console.log(Object.getOwnPropertyDescriptor(personC, 'name'));
// {value: "cinamon", writable: true, enumerable: true, configurable: true}

// 이처럼 프로퍼티가 생성될 때 [[Value]]]의 값은 프로퍼티 값으로 초기화되며
// [[Writable]], [[Enumerable]], [[Configurable]]의 값은 true로 초기화된다.
// 이것은 프로퍼티를 동적 추가해도 마찬가지다.
personC.age = 20;
console.log(Object.getOwnPropertyDescriptors(personC));
// {
//   name: {value: "cinamon", writable: true, enumerable: true, configurable: true},
//   age: {value: 20, writable: true, enumerable: true, configurable: true}
// }

// 16.3.2 접근자 프로퍼티
// 접근자 프로퍼티 accessor property는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때
// 사용하는 접근자 함수 accessor function으로 구성된 프로퍼티다.
const personD = {
  // 데이터 프로퍼티
  firstName: 'Chocola',
  lastName: 'Coco',

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set fullName(name) {
    // 배열 디스트럭처링 할당(31.1)
    [this.firstName, this.lastName] = name.split(' ');
  },
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(personD.firstName + ' ' + personD.lastName); // Chocola Coco

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
personD.fullName = 'Vanilla Ice';
console.log(personD); // {firstName: "Vanilla", lastName: "Ice"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(personD.fullName); // Vanilla Ice

// firstName은 데이터 프로퍼티다. [[Value]], [[Writable]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다.
let descriptor = Object.getOwnPropertyDescriptor(personD, 'firstName');
console.log(descriptor); // {value: "Vanilla", writable: true, enumerable: true, configurable: true}

// fullName은 접근자 프로퍼티다. [[Get]], [[Set]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다.
descriptor = Object.getOwnPropertyDescriptor(personD, 'fullName');
console.log(descriptor); // {get: ƒ, set: ƒ, enumerable: true, configurable: true}

// 접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법
// 일반 객체의 __proto__는 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {enumerable: false, configurable: true, get: ƒ, set: ƒ}
// 함수 객체의 prototype은 데이터 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(function () {}, 'prototype'));
// {value: {…}, writable: true, enumerable: false, configurable: false}

/* 16.4 프로퍼티 정의 */
const personE = {};

// 데이터 프로퍼티 정의
Object.defineProperty(personE, 'firstName', {
  value: 'rose',
  writable: true,
  enumerable: true,
  configurable: true,
});

Object.defineProperty(personE, 'lastName', {
  value: 'mary',
});

let descriptorE = Object.getOwnPropertyDescriptor(personE, 'firstName');
console.log(descriptorE); // {value: "rose", writable: true, enumerable: true, configurable: true}

// 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
descriptorE = Object.getOwnPropertyDescriptor(personE, 'lastName');
console.log(descriptorE); // {value: "mary", writable: false, enumerable: false, configurable: false}

// [[Enumerable]]의 값이 false인 경우. 해당 프로퍼티는 for...in 문이나 Object.keys 등으로 열거할 수 없다.
console.log(Object.keys(personE)); // ["firstName"]

// [[Writable]]의 값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경하거나 삭제할 수 없다.
// 이때 값을 변경하거나 프로퍼티를 삭제하면 에러는 발생하지 않고 무시된다.
personE.lastName = 'Berry';
delete personE.lastName;

// 이어서
