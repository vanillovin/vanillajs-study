/**
 * Execution Context
 * 함수를 실행할 때 필요한 환경 정보를 담은 모아놓은 객체
 * 실행 컨텍스트 객체는 활성화되는 시점에 VE, LE, THIS 정보를 수집
 * - Variable Environment (선언 시점의 LE snapshot-변경 사항 반영하지 않음)
 *   - environmentRecord (snapshot)
 *   - outerEnvironmentReference (snapshot)
 * - Lexical Environment 변경되는 사항 즉시 반영 (VE-초기 상태 유지)
 *   - environmentRecord: 현재 문맥의 식별자 정보(hoisting)
 *   - outerEnvironmentReference: 외부 식별자 정보(scope chain)
 * - this (ThisBinding)
 */

// 원본 코드
// var a = 1;
// function outer() {
//   console.log(a);
//   function inner() {
//     console.log(a);
//     var a = 3;
//   }
//   inner();
//   console.log(a);
// }
// outer();
// console.log(a);

// 스코프 체인
// 0. GLOBAL Execution Context 활성화 - LE, VE, thisBinding
var a = 1; // 1. 변수 a 선언, 3. 변수 a에 1 할당
function outer() {
  // 2. 함수 outer 선언 > 할당?
  console.log(a); // 6. oc에서 a 탐색 -> gc에서 a 탐색 -> 1 출력

  // 5. 함수 inner 선언
  function inner() {
    // 8. 변수 a 선언
    console.log('inner: ', a); // 9. ic에서 a 탐색 -> undefined 출력
    var a = 3; // 10. 변수 a에 3 할당
  }

  inner(); // 7. inner 함수 호출 -> INNER EC 활성화 (함수 종료 대기중 -2)
  // 11. inner context 종료

  console.log('outer: ', a); // 12. oc에서 a 탐색 -> gc에서 a 탐색 -> 1 출력
}
outer(); // 4. outer 함수 호출 -> OUTER EC 활성화 (함수 종료 대기중 - 1)
// 13. outer context 종료
console.log('global: ', a); // 14. gc에서 a 탐색 -> 1 출력
// 15. global context 종료

// 전역변수와 지역변수
// 전역 공간에서 선언한 변수는 전역변수, 함수 내부에서 선언한 변수는 무조건 지역변수

// HOISTING 식별자 정보를 끌어올리다.
// console.log(a());
// console.log(b());
// console.log(c());
// function a() {
//   return 'a';
// }
// var b = function bb() {
//   return 'bb';
// };
// var c = function () {
//   return 'c';
// };

// environmentRecord
// function a() {
//   return 'a';
// }
// var b;
// var c;
// //
// console.log(a());
// console.log(b());
// console.log(c());
// b = function bb() {
//   return 'bb';
// };
// c = function () {
//   return 'c';
// };

/**
 * LexicalEnvironment - outerEnvironmentReference
 * -스코프, 스코프 체인, outerEnvironmentReference
 * -현재 문맥에 관련되어 있는 외부 식별자 정보(SCOPE CHAIN)
 * -스코프 체인 '선언될 당시'. 무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근 가능
 */
// 현재 inner가 실행중인 상태, outer와 전역엔 모두 LE가 있음
// inner에게 있어서 oer는 outer의 LE, outer의 oer는 전역컨텍스트의 LE
// => SCOPE(실행컨텍스트에 의해 결정되는 변수의 유효범위) CHAIN
// 외부는 접근 가능하지만 자기보다 안은 접근 불가능. 가까운 곳 자기자신부터 찾고 다음 다음

console.log('매개변수와 변수에 대한 호이스팅');
function foo(x) {
  // var x = 1;
  console.log(x); // 1
  var x;
  console.log(x); // 1
  var x = 2;
  console.log(x); // 2
}
foo(1);

console.log('함수 선언의 호이스팅');
function boo() {
  // var b;
  // var b = function b() {}

  console.log(b);
  var b = 'bbb';
  console.log(b);
  function b() {}
  console.log(b);
}
boo();

console.log('함수 선언문과 함수 표현식');
// var sum = function sum(a, b) {
//   return a +b
// }
// var multiply;
console.log(sum(1, 2));
// console.log(multiply(3, 4));

// 함수 선언문 sum
function sum(a, b) {
  return a + b;
}

// 함수 표현식 multiply
var multiply = function (a, b) {
  return a * b;
};

// 전역공간에 동명 함수를 중복 선언
var sumA = function sumA(x, y) {
  return x + y;
};
console.log(sumA(1, 2));

var sumA = function sumA(x, y) {
  return `x + y = ${x + y}`;
};
console.log(sumA(1, 2));

var a = 1;
var outer = function () {
  var b = 2;
  var inner = function () {
    console.log(b);
    console.dir(inner);
  };
  inner();
};
outer();
