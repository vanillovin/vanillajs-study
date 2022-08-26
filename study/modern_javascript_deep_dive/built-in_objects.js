/* 21 빌트인 객체 */
/* 21.1 자바스크립트 객체의 분류 */
// -표준 빌트인 객체 standard built-in objects/native objects/global objects
// -호스트 객체 host objects
// -사용자 정의 객체 user-defined objects

/* 21.2 표준 빌트인 객체 */
// 자스는 Object, String, Number, Symbol, Math, Error, Map/Set, Function 등 40여 개의 표준 빌트인 객체를 제공한다.
// Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 인스턴스를 생성할 수 있는 생성자 함수 객체다.
// 생성자 함수 객체인 표준 빌트인 객체는 프로토타입 메서드와 정적 메서드를 제공하고 아닌 표준 빌트인 객체는 정적 메서드만 제공한다.

// 표준 빌트인 객체인 생성자 함수에 의한 객체 생성
const strObj = new String('string'); // String {"string"}
console.log(typeof strObj); // object
console.log(Object.getPrototypeOf(strObj) === String.prototype); // true
const func = new Function('x', 'return x + x');
console.log(typeof func); // function
const arr = new Array(1, 2, 3);
console.log(typeof arr); // object
const date = new Date();
console.log(typeof date); // object

// 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체는 다양한 기능의 빌트인 프로토타입 메서드를 제공한다.
// 그리고 표준 빌트인 객체는 인스턴스 없이도 호출 가능한 빌트인 정적 메서드를 제공한다.
const numObj = new Number(1.5);
console.log(numObj.toFixed()); // 2
console.log(Number.isInteger(0.5)); // true
console.log(numObj.constructor.isInteger(4)); // true

/* 21.3 원시값과 래퍼 객체 */
// 문자열이나 숫자, 불리언 등의 원시값이 있는데도 문자열, 숫자 등 객체를 생성하는 String.. 표준 빌트인 생성자 함수
let str = 'hello';
console.log(str.length); // 5
console.log(str.toUpperCase()); // HELLO
// 원시값을 객체처럼 사용하면 자스 엔진은 암묵적으로 연관된 객체를 생성하여 생성된 객체로 프로퍼티에 접근하거나
// 메서드를 호출하고 다시 원시값으로 되돌린다.
// -> 이처럼 문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시 객체를 래퍼 객체wrapper object라 한다.

// 예를 들어, 문자열에 대해 마침표 표기법으로 접근하면 그 순간 래퍼 객체인 String 생성자 함수의 인스턴스가
// 생성되고 문자열은 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된다.
str = 'hi';
console.log(str.length); // 2
console.log(str.toUpperCase()); // HI
console.log(typeof str); // string
console.log(str.constructor === String); // t
console.log(str.__proto__ === String.prototype); // t
console.log(String.__proto__ === Function.prototype); // t
console.log(Function.prototype.__proto__ === Object.prototype); // t
// 그 후 래퍼 객체의 처리가 종료되면 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값으로
// 원래의 상태, 즉 식별자가 원시값을 갖도록 되돌리고 래퍼 객체는 가비지 컬렉션의 대상이 된다.
// 이처럼 문자열, 숫자, 불리언, 심벌은 암묵적으로 생성되는 래퍼 객체에 의해 마치 객체처럼 사용할 수 있으며
// 표준 빌트인 객체 프로토타입 메서드 또는 프로퍼티를 참조할 수 있다.
// 문자열, 숫자, 불리언, 심벌 이외의 원시값, 즉 null과 undefined는 래퍼 객체를 생성하지 않는다.
// -> 따라서 new 연산자와 함꼐 호출해 인스턴스를 생성할 필요가 없으며 권장하지도 않는다.

/* 21.4 전역 객체 */
// 전역 객체 global object는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해
// 어떤 객체보다도 먼저 생성되는 특수한 객체이며, 어떤 객체에도 속하지 않은 최상위 객체다.
// globalThis = ES11도입. 브라우저 환경과 Node.js 환경에서 전역 객체를 가릴키던 다양한 식별자를 통일한 식별자
console.log(globalThis === this); // t
console.log(globalThis === window); // t
console.log(globalThis === self); // t
console.log(globalThis === frames); // t

// 전역 객체의 특징
// -전역 객체는 개발자가 의도적으로 생성할 수 없다. 즉, 전역 객체를 생성할 수 있는 생성자 함수가 제공되지 않는다.
// -전역 객체의 프로퍼티를 참조할 때 window(또는 global)를 생략할 수 있다.
// -전역 객체는 Object, String, Number, Boolean, Function, Array, RegExp, Date, Math, Promise 같은
//  모든 표준 빌트인 객체를 프로퍼티로 가지고 있다.
// -자바스크립트 실행 환경(브라우저 환경 또는 Node.js 환경)에 따라 추가적으로 프로퍼티와 메서드를 갖는다.
//  브라우저 환겨에서는 DOM, BOM, Canvas, XMLHttpRequest, fetch, requestAnimationFrame, SVG, Web Stroage,
//  Web Component, Web Worker 같은 클라이언트 사이드 Web API를 호스트 객체로 제공하고 Node.js 환경은 생략
// -var 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당한 암묵적 전역, 그리고 전역 함수는 전역 객체의 프로퍼티가 된다.

var foo = 1;
console.log(window.foo); // 1
bar = 2;
console.log(window.bar); // 2
function baz() {
  return 3;
}
console.log(window.baz()); // 3

// let과 const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. 즉 window.foo와 같이 접근할 수 없다.
// "는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드)내에 존재하게 된다.
let boo = 123;
console.log(window.boo); // undefined

// 브라우저 환경의 모든 자바스크립트 코드는 하나의 전역 객체 window를 공유한다. 여러 개의 script 태그를 통해
// 자바스크립트 코드를 분리해도 하나의 전역 객체 window를 공유하는 것은 변함이 없다. 이는 분리되어 있는
// 자바스크립트 코드가 하나의 전역을 공유한다는 의미다.
// 전역 객체에는 몇 가지 프로퍼티와 메서드를 가지고있다. window, global을 생략해 참조/호출이 가능

// 21.4.1 빌트인 전역 프로퍼티
// 빌트인 전역 프로퍼티 built-in global property는 전역 객체의 프로퍼티를 의미한다. 주로 애플리케이션 전역에서 사용하는 값을 제공한다.
// -Infinity
console.log(window.Infinity === Infinity); // t
console.log(3 / 0, -3 / 0, typeof Infinity); // +Infinity -Infinity "number"
// -NaN
console.log(window.NaN); // NaN
console.log(Number('xyz'), 1 * 'string', typeof NaN); // NaN NaN "number"
// -undefined
console.log(window.undefined); // undefined
var coo;
console.log(coo, typeof undefined); // undefined "undefined"

// 21.4.2 빌트인 전역 함수
// 빌트인 전역 함수 built-in global funciton는 애플리케이션 전역에서 호출할 수 있는 빌트인 함수로서 전역 객체의 메서드다.
// -eval -> 사용 금지. 보기도 귀찮음
// -isFinite
// 전달받은 인수가 정상적인 유한수인지 검사. 인수가 숫자가 아니면 타입 변환 후 검사, NaN으로 평가되는 값은 false
console.log(isFinite(0)); // t
console.log(isFinite(null)); // true: null -> 0
console.log(isFinite(NaN)); // f
console.log(isFinite('hello')); // f
console.log(+null); // 0 -> null을 숫자 타입으로 변환
// -isNaN 전달받은 인수의 타입이 숫자가 아닌 경우 숫자로 타입 변환 후 검사를 수행
console.log(isNaN(NaN), isNaN(10)); // t f
console.log(isNaN('blabla'), isNaN('10')); // t f
console.log(isNaN(true), isNaN(null)); // f: true -> 1, f: null -> 0
console.log(isNaN(new Date())); // f: new Date() => Number
// -parseFloat 전달받은 문자열 인수를 부동 소수점 숫자 floating point number, 즉 실수로 해석 parsing하여 반환
console.log(parseFloat('10.00')); // 10
console.log(parseFloat('34 45 56')); // 34 공백 구분 문자열은 첫 번째 문자열만 변환
console.log(parseFloat('He was 40')); // NaN 첫 번째 문자열을 숫자로 변환할 수 없음
console.log(parseFloat(' 60 ')); // 60 앞뒤 공백 무시
// -parseInt 전달받은 문자열 인수를 정수integer로 해석parsing하여 변환한다.
console.log(parseInt('12.34')); // 12
console.log(parseInt(1111.11)); // 1111
// -encodeURI/decodeURI
// -encodeURIComponent/decodeURIComponent

// 21.4.3 암묵적 전역
var cocoa = 10; // 전역 변수
function chocolatCake() {
  // 선언하지 않은 식별자에 값을 할당
  cream = 20; // window.cream = 20;
  console.log(cocoa + cream);
}
chocolatCake(); // 30
console.log(window.cocoa); // 10
console.log(window.cream); // 20
console.log(cocoa + cream); // 30
delete cocoa; // 전역 변수는 삭제되지 않는다
delete cream; // 프로퍼티는 삭제된다
console.log(window.cocoa); // 10
console.log(window.cream); // undefined
