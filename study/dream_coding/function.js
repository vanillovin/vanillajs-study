/**
 * Function
 * fundamental building block in the program (프로그램을 구성하는 굉장히 기본적인 빌딩 블록)
 * subprogram can be used multiple times (여러 번 재사용 가능)
 * performs a task or calculates a value (한 가지 테스크나 값을 개선하기 위해 사용)
 */

// 1. Function declaration
// function name(param1, param2) { body... return; }
// one function === one thing - 하나의 함수는 한 가지의 일만 하도록 만들기
// naming : doSomething, command, verb - 함수는 무언가를 동작하는 것이기 때문에 이름을 명령, 동사 형태로 정하기
// e.g. createCardAndPoint -> createCard, createPoint (세분화. 깨끗)
// function is object in JS - 함수는 오브젝트. 변수에 할당, 파라미터로 전달, 리턴이 가능
function printHello() {
  console.log('Hello');
}
printHello(); // 무쓸모ㅜㅜ Hello만 출력

// 유용하게 작성
// function log(message) {
//   console.log(message);
// }
// log('Hello@');
// log(1234); // 타입이 정해져있지 않음
// Lovely Typescript - 우리가 작성한 것을 라이브러리 형태로 api를 제공해야할 때
// 함수가 무엇을 하는지, 전달되야하는 파라미터와 데이터타입, 어떤 값이 리턴되는지 확실하게 확인

// 2. Parameters
// primitive parameters: passed by value (값을 전달)
// object parameters: passed by reference (참조)
function changeName(obj) {
  obj.name = 'coder';
}
const vanilla = { name: 'vanilla' };
changeName(vanilla);
console.log(vanilla); // { name: 'coder' }

// 3. Default parameters (added in ES6)
// function showMessage(message, from) {
//   if (from === undefined) {
//     from = 'unknown';
//   }
//   console.log(`${message} by ${from}`);
// }
// showMessage('Hi!'); // Hi! undefined
// 파라미터 옆에 원하는 기본값을 지정. 대체되어 사용
function showMessage(message, from = 'unknown') {
  console.log(`${message} by ${from}`);
}

// 4. Rest parameters (aeede in ES6)
function printAll(...args) {
  for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
  }

  for (const arg of args) {
    console.log(arg);
  }

  args.forEach((arg) => console.log(arg)); // for each문
}
printAll('dream', 'coding', 'ellie');

// 5. Local scope
// 밖에서는 안이 보이지 않고 안에서만 밖을 볼 수 있음 (유리창 틴트 처리 된 것)
// 블록 밖에 선언된 변수는 전역, 안에 선언된 변수는 지역 변수
let globalMessage = 'global'; // global variable
function printMessage() {
  let message = 'hello';
  console.log(message); // local variable
  console.log(globalMessage);

  function printAnother() {
    console.log(message);
    let childMessage = 'hello';
  }
  // console.log(childMessage); // error
  // return 타입이 없는 함수는 return undefined와 같음
}
printMessage();
// 클로저
// 중첩된 함수에서 자식의 함수가 부모 함수에 정의된 변수들에 접근이 가능한 것

// 6. Return a value
function sum(a, b) {
  return a + b;
}
const result = sum(1, 2); // 3
console.log(`sum: ${sum(1, 2)}`); // sum: 3

// 7. Early return, early exit
// bad
function upgradeUser(user) {
  if (user.point > 10) {
    // long upgrade logic...
  }
}
// 블록 안에서 로직을 많이 작성하면 가독성이 떨어짐 (if, else 번갈아가며 씀)

// good
// 조건이 맞지 않는 경우, 값이 -1, undefined, null인 경우 빨리 return으로 함수 종료
// 조건이 맞을때만 필요한 로직들을 뒤에 실행하기
function upgradeUser(user) {
  if (user.point >= 10) {
    return;
  }
  // long upgrade logic...
}

/**
 * First-class function
 * function are treated like any other variable
 * can be assigned as a value to variable (변수 할당)
 * can be passed as an argument to other functions. (파라미터 전달 가능)
 * can be returned by another function (리턴 값으로도 리턴 가능)
 */

// 1. Function expression
// a function declaration can be called earlier than it is defiend. (hoisted)
// a function expression is created when the execution reaches it.
const print = function () {
  console.log('print');
};
print();
const printAgain = print;
printAgain();
const sumAgain = sum;
console.log(sumAgain(1, 3));

// 2. Callback function using function expression
function randomQuiz(answer, printYes, printNo) {
  if (answer === 'love you') {
    printYes(); // 정답이면 printYes 콜백 함수 호출
  } else {
    printNo();
  }
}

// anonymous function (익명 함수)
const printYes = function () {
  console.log('yes!');
};

// named function (기명 함수)
// better debugging in debugger's stack traces
// - 함수 표현식에 이름을 쓰는 이유는 디버깅을 할 때 stack traces에 함수 이름이 나오기 위해
// - 함수 안에서 자신 스스로 또 다른 함수를 호출할 때 (recursion, 프로그램이 죽으므로 필요할 때)
// recursions 피보나치수 반복되는 평균값 계산...ㄴ
const printNo = function print() {
  console.log('no!');
};

randomQuiz('wrong', printYes, printNo);
randomQuiz('love you', printYes, printNo);

/**
 * Arrow function
 * always anonymous function
 */
// const simplePrint = function () {
//   console.log('simplePrint!');
// };
const simplePrint = () => console.log('simplePrint!');

const add = (a, b) => a + b;

const simpleMultiply = (a, b) => {
  // do something more
  return a * b; // 블록을 쓸 때는 return 작성
};

// IIFE: Immediately Invoked Function Expression
// 즉시 실행 함수 (function () {})();
(function hello() {
  console.log('IIFE');
})();

// Fun quiz time ❤
// function calculate(command, a, b)
// command: add, substract, divide, multiply, remainder

function calculate(command, a, b) {
  switch (command) {
    case 'add':
      return a + b;
    case 'substract':
      return a - b;
    case 'divide':
      return a / b;
    case 'multiply':
      return a * b;
    case 'remainder':
      return a % b;
    default:
      throw Error('unkonwn command');
  }
}
console.log(calculate('add', 2, 4));
