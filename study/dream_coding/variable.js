// 1. Use strict
// added in ES 5
// use this for Vanila Javascript.
'use strict';

// 2. Variable, rw(read/write)
// let (added in ES6)
let globalName = 'global name';
/*
전역 변수는 어플리케이션이 실행되는 시작되는 순간부터 끝날 때까지 메모리에 탑재되어있기 때문에
최소한으로 쓰는 것이 좋고 가능하면 class, fucntion, if, float 등 필요한 부분에만 정의하여 사용

var (don't ever use this!)
var hoisting (move declaration from bottom to top)
has no bloock scope - block scope를 철저히 무시함
어디에 선언했냐에 상관없이 항상 제일 위로 선언을 끌어올림
자바스크립트에서 변수를 선언할 수 있는 키원드는 let 하나 (var 절대 쓰지 않기!)
*/
{
  let name = 'vanilla';
  console.log(name);
  name = 'hello';
  console.log(name);
}
console.log(name);
console.log(globalName);

// 3. Constant, r(read/only)
// use const whenever possible.
// only use let if variable needs to change.

const daysInWeek = 7;
const maxNumber = 5;

// Note!
// DATA TYPE - IMMUTABLE / MUTABLE
// Immutable data types: preimitive types, frozen objects (i.e. object.freeze())
// Mutable data types: all objects by default are mutable in JS
// JS에서 기본적으로 모든 오브젝트는 변경이 가능
// favor immutable data type always for a few reasons:
// - security
// - thread safety
// - reduce human mistakes
// 변수의 값이 바뀌어야할 이유가 없다면 웬만하면 const로 작성하는 것이 바람직함
// Immutable type 절대 값을 변경할 수 없음 <-> Mutable type (let 키워드)

// 4. Variable types
// - Primitive(더이상 작은 단위로 나눠질 수 없는 한 가지 아이템), single item: number, string, boolean, null, undefined
// > 값 자체가 메모리에 저장됨
// - Object(싱글 아이템들을 여러 개 묶어서 한 박스로 관리할 수 있음), box container
// > 너무 커서 한 번에 메모리에 올라갈 수 없음.
// - function, first-class function(다른 데이터 타입처럼 변수에 할당이 가능하고 함수의 파라미터(인자) 전달, 리턴 가능)

// C data types for number - C언어는 로우 레벨 언어라 불리는데 그 이유는 개발자들이 세세하게 메모리를 관리 가능
// 정수: short, int, long, 실수: flat, double 할당 ex) 한 반의 학생수 short, int가 적합
// JS는 number 타입 하나이며 다이나믹 타입으로 let 하나만 작성해도 됨

const count = 17; // integer
const size = 17.1; // deciaml number
console.log(`value: ${count}, type: ${typeof count}`);
console.log(`value: ${size}, type: ${typeof size}`);
// 값에 상관없이 타입은 number

// number - special numeric values:
const infinity = 1 / 0;
const negativeInfinity = -1 / 0;
const nAn = 'not a number' / 2;
console.log(infinity); // Infinity
console.log(negativeInfinity); // -Infinity
console.log(nAn); // NaN
// JS로 DOM 요소를 포지션을 바꾸거나 계산을 할 때 에러가 날 수 있으므로 확인

// bigInt (fairly new, dont't use it yet)
const bigInt = 1234567890123456789012345678901234567890n; // over (-2**53) ~ (2**53)
console.log(`value: ${bigInt}, type: ${typeof bigInt}`);
Number.MAX_SAFE_INTEGER;

// String
const char = 'c';
const brendan = 'brendan';
const greeting = 'hello ' + brendan;
console.log(`value: ${greeting}, type: ${typeof greeting}`);
const helloBob = `hi ${brendan}!`; // template literals (string) - `${변수}`
console.log(`value: ${helloBob}, type: ${typeof helloBob}`);
// =
console.log('value: ' + helloBob + ' type: ' + typeof helloBob); // 번거로움

// boolean
// false: 0, null, undefined, NaN, ''
// true: any other value (1, string)
const canRead = true;
const test = 3 < 1; // false

// null
let nothing = null; // 명확하게 텅텅 비어있는 empty 값임을 할당(지정)

// undefined
let x; // 선언은 되었지만 값이 지정되어있지 않음
let x = undefined;

// symbol, create unique identifiers for objects
const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log(symbol1 === symbol2); // false
const gSymbol1 = Symbol.for('id');
const gSymbol2 = Symbol.for('id');
console.log(gSymbol1 === gSymbol2); // true
console.log(`value: ${symbol1.description}, type: ${typeof symbol1}`);
// 출력하려면 .description 붙여 스트링으로 변환해서 출력

// object, real-life object, data structure
// object는 일상생활에서 보는 물건과 물체들을 대표할 수 있는 박스 형태
const ellie = { name: 'ellie', age: 0 }; // const로 지정
ellie.age = 21;

// 5. Dynamic typing: dynamically typed language
// 선언할 때 어떤 타입인지 선언하지 않고 런타임(프로그램이 동작)할 때 할당된 값에 따라 타입이 변경됨
// 좋은 아이디어가 있을 때 빠르게 프로토타입을 하고싶을 땐 유용하지만 규모가 있는 프로젝트는 위험
let text = 'hello';
console.log(text.charAt(0)); // h
console.log(`value: ${text}, type: ${typeof text}`); // hello, string
text = 1;
console.log(`value: ${text}, type: ${typeof text}`); // 1, number
text = '7' + 5; // 타입 강제
console.log(`value: ${text}, type: ${typeof text}`); // 75, string
text = '8' / '2'; // 나누기 연산자와 스트링 안 값은 숫자
console.log(`value: ${text}, type: ${typeof text}`); // 4, number
console.log(text.charAt(0)); // Uncaught TypeError: text.charAt is not a function at :
// 자바스크립트는 런타임에서 타입이 정해지는 다이나믹 타입때문에 Typescript가 나옴!
// 타입스크립트 - 자바스크립트 위에 타입이 올려진 언어
// 자바스크립트를 충분히 배우고 타입스크립트 배우기. (BABEL) 실시간으로 보기가 어려움
