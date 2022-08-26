/* 24 클로저 closure */
// const x = 1;
// function outerFunc() {
//   const x = 10;
//   function innerFunc() {
//     console.log(x); // 10
//   }
//   innerFunc();
// }
// outerFunc();

// 자바스크립트는 렉시컬 스코프를 따르는 프로그래밍 언어
// const x = 1;
// function outerFunc() {
//   const x = 10;
//   innerFunc();
// }
// function innerFunc() {
//   console.log(x); // 1
// }
// outerFunc();

/* 24.1 렉시컬 스코프 */
// 자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라
// 함수를 어디에 정의했는지에 따라 상위 스코프를 결정한다.
// 이를 렉시컬 스코프(정적 스코프)라 한다.
// "실행 컨텍스트"에서 살펴보았듯이 스코프의 실체는 execution context의 L.E이다.
// 이 L.E은 자신의 "외부 렉시컬 환경에 대한 참조 Outer Lexical Environment Reference"를
// 통해 상위 렉시컬 환경과 연결된다. 이것이 바로 스코프 체인 scope chain이다. 따라서
// "함수의 상위 스코프를 결정한다"는 것은 "OLER에 저장할 참조값을 결정한다"는 것과 같다.
// L.E의 "OLER"에 저장할 참조값이 바로 상위 L.E에 대한 참조이며, 이것이 상위 스코프이기 때문이다.
// => L.E의 OLER에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에
// 함수가 정의된 환경(위치)에 의해 결정된다. 이것이 바로 렉시컬 스코프다.

/* 24.2 함수 객체의 내부 슬롯 [[Environment]] */
// 함수가 정의된 환경(위치)와 호출되는 환경(위치)은 다를 수 있다. 따라서 렉시컬 스코프가
// 가능하려면 함수는 자신이 호출되는 환경과는 상관없이 자신이 정의된 환경,
// 즉 상위 스코프 (함수 정의가 위치하는 스코프가 바로 상위 스코프다)를 기억해야 한다.
// 이를 위해 "함수는 자신의 내부 슬롯에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다."
// => funciton object의 [[Envirionment]]에 저장된 running execution context의 L.E의 참조가
// 바로 상위 스코프다. 또한 자신이 호출되었을 때 생성될 함수 L.E의 OLER에 저장될 참조값이다.
// 함수 객체는 내부 슬롯에 저장한 렉시컬 환경의 참조, 즉 상위 스코프를 자신이 존재하는 한 기억한다.

/* 24.3 클로저와 렉시컬 환경 */
// 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한
// 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 클로저 closure라고 부른다.
// => 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

// function foo() {
//   const x = 1;
//   const y = 2;

//   function bar() {
//     // debugger;
//     console.log(x);
//   }
//   return bar;
// }

// const bar = foo();
// bar();

// 클로저에 의해 참조되는 상위 스코프의 변수를 자유 변수 free variable라고 부른다.
// 클로저 closure란 "함수가 자유 변수에 대해 닫혀있다 closed"라는 의미 = "자유 변수에 묶여있는 함수"

/* 24.4 클로저의 활용 */
// 클로저는 상태 state를 안전하게 변경하고 유지하기 위해 사용한다. 상태가 의도치 않게 변경되지 않도록
// 상태를 안전하게 은닉 information hiding하고 특정 함수에게만 상태 변경을 허용하기 위해 사용한다.

// let num = 0;

// const increase = function () {
//   return ++num;
// };

// console.log(increase()); // 1
// console.log(increase()); // 2
// console.log(increase()); // 3

// const increase = function () {
//   let num = 0;

//   return ++num;
// };

// console.log(increase()); // 1
// console.log(increase()); // 1
// console.log(increase()); // 1

// const increase = (function () {
//   let num = 0;

//   return function () {
//     return ++num;
//   };
// })();

// console.log(increase()); // 1
// console.log(increase()); // 2
// console.log(increase()); // 3

// const counter = (function () {
//   // 카운트 상태 변수
//   let num = 0;

//   // 클로저인 메서드를 갖는 객체를 반환한다.
//   // 객체 리터럴은 스코프를 만들지 않는다.
//   // 따라서 아래 메서드들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경이다.
//   return {
//     num: 0, // 프로퍼티는 public하므로 은닉되지 않는다.
//     increase() {
//       return ++num;
//     },
//     decrease() {
//       return num > 0 ? --num : 0;
//     },
//   };
// })();

// console.log(counter.increase()); // 1
// console.log(counter.increase()); // 2

// console.log(counter.decrease()); // 1
// console.log(counter.decrease()); // 0

// 생성자 함수로 표현
// const Counter = (function () {
//   let num = 0;

//   function Counter() {}

//   Counter.prototype.increase = function () {
//     return ++num;
//   };

//   Counter.prototype.decrease = function () {
//     return num > 0 ? --num : 0;
//   };

//   return Counter;
// })();

// const counter = new Counter();

// console.log(counter.increase()); // 1
// console.log(counter.increase()); // 2

// console.log(counter.decrease()); // 1
// console.log(counter.decrease()); // 0
// console.log(counter.decrease()); // 0
// console.log(counter.decrease()); // 0

// 변수 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본적 원인이 될 수 있다.
// 외부 상태 변경이나 가변(mutable) 데이터를 피하고 불변성(immutability)을 지향하는
// 함수형 프로그래밍에서 부수 효과를 최대한 억제하여 오류를 피하고
// 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용된다.
// 다음은 함수형 프로그래밍에서 클로저를 활용하는 간단한 예제다.

// 함수를 인자로 전달받고 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
function makeCounter(predicate) {
  // 카운터 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 클로저를 반환
  return function () {
    // 인수로 전달받은 보조 함수에 상태 변경을 위임한다.
    counter = predicate(counter);
    return counter;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다.
const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
