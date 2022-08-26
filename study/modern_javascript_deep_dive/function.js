/* 18 함수와 일급 객체 */

/* 18.1 일급 객체 */
// 1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
// 2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
// 3. 함수의 매개변수에 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.

/* 18.2 함수 객체의 프로퍼티 */
function foo() {
  return 'foo';
}
console.dir(foo);
console.log(Object.getOwnPropertyDescriptors(foo));

// __proto__는 foo 함수의 프로퍼티가 아니다.
console.log(Object.getOwnPropertyDescriptor(foo, '__proto__')); // undefined
// __proto__는 Object.prototype 객체의 접근자 프로퍼티다. 상속
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
