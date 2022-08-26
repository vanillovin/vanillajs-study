/**
 * 2장 알고있으면 유용한 자바스크립트 문법
 * 모든 것을 공부하지 말고 만들어가면서 필요한 것을 배우기
 * 개발해가면서 배우기...
 **/

// 01. 삼항연산자
// condition ? true : false
let array = [];
let text =
  array.length === 0 ? '배열이 비어있습니다.' : '배열이 비어있지 않습니다.';
console.log(text);

// 가독성이 떨어짐. 긴 조건문은 가급적 if문을 사용하기
// let condition1 = false;
// let condition2 = false;
// let value = condition1 ? 'wow' : condition2 ? 'blabla' : 'foo';
// console.log(value); // foo

// 02. Truthy and Falsy
// Falsy: undefined, null, 0, '', NaN
function print(person) {
  // null checking
  // if (person === undefined || person === 'null') return;
  if (!person) return;
  console.log(person.name);
}

let person = {
  name: 'John',
};

print(person);

// const value = null;
// const truthy = !!value;
// truthy = value ? true : false;
// console.log(truthy);

// 03. 단축 평가 논리 계산법
// 특정 값이 유효할 때만 어떤 값을 조회해야 되는 상황
// or 주로 어떤 값이 없을 때 그거 대신 이거 사용할래
let dog = {
  name: '멍멍이',
};

function getName(animal) {
  // if (animal) return animal.name;
  // return undefined;
  const name = animal && animal.name;
  return name || '이름이 없는 동물입니다.';
}

// const name = getName(dog);
// console.log(name);

// 04. 함수의 기본 파라미터
function calculateCircleArea(r = 1) {
  const radius = r || 1;
  return Math.PI * radius * radius;
}
calculateCircleArea = (r = 1) => Math.PI * r * r;

// 05. 조건문 더 스마트하게 쓰기
// 코드가 짧다고 무조건 좋은 건 아님. 짧으면서도 어떤 역할을 하는지 알 수 있게 작성하기
function isAnimal(text) {
  // return (text === '고양이' || text === '개', ...)
  const animals = ['고양이', '개', '거북이', '너구리'];
  return animals.includes(text);
}
isAnimal = (text) => ['고양이', '개', '거북이', '너구리'].includes(text);

// 어떤 값을 넣어주는 것에 따라서 반환값이 달라질 경우 객체 사용
function getSound(animal) {
  // if (animal === '개') return '멍멍!';
  // if (animal === '고양이') return '야옹!';
  // if (animal === '참새') return '짹짹!';
  // return '...?';
  const sounds = {
    개: '멍멍!',
    고양이: '야옹!',
    참새: '짹짹!',
  };
  return sounds[animal] || '...?';
}
console.log(getSound('개'));

// 특정값을 반환하지 않고 무엇으로 주어지느냐에 따라 다른 코드 실행
function makeSound(animal) {
  const tasks = {
    개: () => console.log('멍멍!'),
    고양이() {
      console.log('야옹!');
    },
    비둘기: function () {
      console.log('구구');
    },
  };
  const task = tasks[animal];
  if (!task) {
    console.log('...?');
    return;
  }
  task();
}
makeSound('고양이');

// 06. 비구조화 할당 (구조 분해)
const object = { a: 1, b: 2 };
const { a, b } = object;
console.log(a); // 1
console.log(b); // 2

// 만약 b의 값이 주어지지 않았는데 기본값을 쓰고싶을 때
// console.log(b || 2)
function print({ a, b = 2 }) {
  console.log(a); // 1
  console.log(b); // 2
}
print(object);

// const object = { a: 1 }
// const { a, b = 2 } = object;

// 비구조화 할당시 이름 바꾸기
let animal = {
  name: '티라미수',
  type: '케이크',
};
// const nickname = animal.name;
// let { name: nickname } = animal;
// console.log(nickname);

// 배열 비구조화 할당
array = [1, 2];
// const one = array[0]
// const two= array[1]
const [one, two = 2] = array;

// 객체의 깊숙한 곳에 들어있는 값 꺼내기
const deepObject = {
  state: {
    information: {
      name: 'velopert',
      languages: ['korean', 'english'],
    },
  },
  value: 5,
};

// -비구조화 문법 두 번 사용
// const { name, languages } = deepObject.state.information;
// const { value } = deepObject;
// const extracted = {
//   name,
//   languages,
//   value,
// };
// console.log(extracted);

// const { name, languages[first, second]} = deepObject.state.information;
// const extracted = {
//   name,
//   first,
//   second
// }

// -약간 난잡함. 너무 과하게 ㄴㄴ
// const {
//   state: {
//     information: {
//       name,
//       languages: [firstLang, secondLang],
//     },
//   },
//   value,
// } = deepObject;

// const extracted = {
//   name,
//   firstLang,
//   secondLang,
//   value,
// };
// console.log(extracted);

// 07. spread 와 rest - 연산자
// 기존의 객체를 참고하여 새로운 객체 생성
// 기존 객체를 복사해 추가적인 값을 넣을 때
const slime = {
  name: '슬라임',
};
// const cuteSlime = slime;
// cuteSlime.attribute = 'cute';
// 서로 같은 객체를 가리킴

const cuteSlime = {
  ...slime,
  attribute: 'cute',
};
const purpleCuteSlime = {
  ...cuteSlime,
  color: 'purple',
};
const brownCuteSlime = {
  // color: 'brown'
  ...purpleCuteSlime,
  color: 'brown', // 덮어씀
};
console.log(slime);
console.log(cuteSlime);
console.log(purpleCuteSlime);
console.log(brownCuteSlime);

// concat보다 보기 쉬움
const cakes = ['뉴욕치즈', '딸기생크림', '블루베리요거트', '화이트초코'];
const anotherCakes = [
  ...cakes,
  '티라미수',
  '초코생크림',
  '솔티드캬라멜',
  '레드벨벳',
  '갸또쇼콜라',
];
console.log(anotherCakes);

// 여러번사용가능. 배열에서도활용가능
let numbers = [1, 2, 3, 4, 5];
let spreadNumbers = [...numbers, 1000, ...numbers];
console.log(spreadNumbers);

// 08. spread 와 rest - rest
// 객체, 배열, 함수의 파라미터에서 사용
// 배열에서의 rest는 맨 마지막에!
const rainbowCuteSlime = {
  name: '슬라임',
  attribute: 'cute',
  color: 'rainbow',
};

// rest 문자열은 변경 가능
let { color, ...rest } = rainbowCuteSlime;
console.log(color); // rainbow
console.log(rest); // {name: "슬라임", attribute: "cute"}

numbers = [0, 1, 2, 3, 4, 5, 6];
const [onee, twoo, ...restt] = numbers;
console.log(onee); // 0
console.log(twoo); // 1
console.log(restt); // [2, 3, 4, 5, 6]

// 09. spread 와 rest - 함수 파라미터에서의 rest
// function sum(a, b, c, d, e, f, g) {
//   return a + b + c + d + e + f + g;
// }
// console.log(sum(1, 2, 3, 4, 5, 6)); // NaN

function sum(...rest) {
  return rest.reduce((acc, cur) => acc + cur, 0);
}
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8)); // 36

const result = max(1, 2, 3, 4, 10, 5, 6, 7);
console.log(result);

// 10. spread 와 rest - 함수 인자에서의 spread
numbers = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(sum(...numbers)); // 36

// 퀴즈
// 함수에 n 개의 숫자들이 파라미터로 주어졌을 때, 그 중 가장 큰 값을 알아내세요.
function max(...numbers) {
  return numbers.reduce(
    // acc 이 current 보다 크면 결과값을 current 로 하고
    // 그렇지 않으면 acc 가 결과값
    (acc, current) => (current > acc ? current : acc),
    numbers[0],
  );
}

// 11. scope의 이해 - scope 이해하기
// 자바스크립트의 동작 원리
// Global 전역, Function 특정함수내부, Block if,for문등{}
// var(function scope) -> let, value(block scope)
const value = 'hello!';
function myFunction() {
  const value = 'bye!';
  const anotherValue = 'world';
  function functionInside() {
    console.log('functionInside: ');
    console.log(value);
    console.log(anotherValue);
  }
  functionInside();
}
myFunction();
console.log(value);
console.log('global scope: ');
console.log(value);
// console.log(anotherValue);

console.log('--------');
const value1 = 'hello!';
function myFunction1() {
  const value1 = 'bye!';
  if (true) {
    const value1 = 'world!';
    console.log('block scope: ');
    console.log(value1);
  }
  console.log('function scope: ');
  console.log(value1);
}
myFunction1();
console.log('global scope: ');
console.log(value1);

// 12. scope의 이해 - hoisting
// 함수는 다, 변수는 선언부만 끌어올려지는 것처럼 작동
// -> hoisting 피하기. 유지보수 힘들고 의도치않은 결과가 발생함
myFunction2();

function myFunction2() {
  console.log('hello world');
}

// let, const (tdz)
// babel
// 함수는 특정변수에 담을 수 있지만 그냥 피하기
// eslint 도구 사용시 경고를 에디터상에서 사용할 수 있음
