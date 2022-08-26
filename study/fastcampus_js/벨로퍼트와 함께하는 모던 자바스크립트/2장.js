// 2장 
// 1. 삼항 연산자
// condition ? true : false
const arr = [];
const text = arr.length === 0 ? '배열이 비어있음' : '배열이 비어있지 않음';

// Truthy and Falsy
// Truthy: Falsy를 제외한 모든 값
// Falsy: 0, '', undefined, null, NaN

function print(person) {
  // if (person === undefined || person === null) null checking
  if (!person) return;
  console.log(person.name);
}

const value = '';
const truthy = !!value; // value ? true : false;

// 2. 단축 평가 논리 계산법 (Short=circuit evaluation)
true && true; // true
true && false; // false
true || false; // true
false || true; // true
!3; // false

// && 연산자
// -앞이 truthy한 값이면 결과는 오른쪽, 앞이 falsy면 결과는 앞에있는 값
// -주로 특정 값이 유효할 때만 어떤 값을 조회해햐 하는 상황에 사용
function getNmae(animal) {
  //if (animal) {
  //  return animal.name;
  //}
  //return undefined;
  return animal && animal.name;
}

console.log('hello' && 'bye'); // bye
console.log(undefined && 'bye'); // undefined

const obj = {};
const name = obj && obj.name;

// || 연산자
// -앞이 truthy한 값이면 뒤는 평가하지 않음
// -어떤 값이 없을 때, 대신 사용할 값이있으면 유용함
const namelessDog = { name: '' };
function getName(animal) {
  const name = animal || animal.name;
  //if (!name) return '이름이 없는 동물입니다.';
  //return name;
  return name || '이름이 없는 동물입니다.';
}

// 3. 함수의 기본 파라미터
function calculateCircleArea(r) {
  return Math.PI * r * r;
}

function calculateCircleArea(r) {
  const radius = r || 1;
  return Math.PI * radius * radius;
}

function calculateCircleArea(r = 1) {
  return Math.PI * r * r;
}

// arrow function
const calculate = (r = 1) => Math.PI * r * r;

// 4. 조건문 더 스마트하게 쓰기
// >코드가 짧다고 무조건 좋은 게 아니라 읽었을 때 어떤 역할을 하는지 알 수 있어야 함

// -특정 값이 여러 값들 중에 하나인지 확인
function isAnimal(text) {
  return text === 'cat' || text === 'dog' || text === 'turtle';
}
console.log(isAnimal('cotton')); // flase

function isAnimal(text) {
  const animals = ['cat', 'dog', 'turtle'];
  return animals.includes(text);
}

const isAnimal = (text) => ['cat'].includes(text);

// -우리에 주어진 값에 따라 다른 결과물을 반환
function getSound(animal) {
  if (animal === '개') return '멍멍';
  if (animal === '고양이') return '야옹';
  return '크아아아';
}

function getSound(animal) {
  const sounds = {
    dog: 'mong',
    cat: 'meow',
    lion: 'hong',
    bird: 'jack',
  };
  return sounds[animal] || 'aang';
}

// -특정 값이 무엇으로 주어지느냐에 따라 다른 코드를 실행
function makeSound(animal) {
  const tasks = {
    dog: () => {
      console.log('mong');
    },
    cat: function () {
      console.log('meow');
    },
    lion() {
      console.log('hong');
    },
  };
  if (!tasks[animal]) {
    console.log('aang');
    return;
  }
  tasks[animal]();
}

// 5. 비구조화 할당 (구조 분해)
const object = { a: 1, b: 2 };

const { a, b } = object;
console.log(a);
console.log(b);

// -함수의 파라미터에서도 사용 가능
function print({ a, b }) {
  console.log(a);
  console.log(b);
}
print(object);

// -만약 b의 값이 주어지지 않았을 때 (기본값 설정)
function print({ a, b = 2 }) {
  console.log(a);
  console.log(b);
  // console.log(b || 2);
}

const { a, b = 2 } = object;

// -이름 바꾸는 방법
const fairy = {
  name: 'cocoa',
  type: 'sweet',
};
// const nickname = fairy.name;
const { name: nickname } = fairy;

// -배열 비구조화 할당
const array = [1, 2];

// const one = array[0];
const [one, two] = array;

// -객체의 깊숙한 곳에 들어있는 값을 꺼내기
const deepObject = {
  state: {
    information: {
      name: 'velopert',
      languages: ['korean', 'english'],
    },
  },
  value: 4,
};
// 비구조화 문법 두 번 사용하기
const { name, languages } = deepObject.state.information;
const { value } = deepObject;
const extracted = {
  name,
  languages,
  value,
};
console.log(extracted);

//
const {
  state: {
    information: { name, languages: },
  },
  value,
} = deepObject;
const extracted = {
  name,
  firstLang, secondLang,
  value,
};
console.log(extracted);

// 6. spread, rest (es6)
// spread - 특정 객체나 배열을 퍼트림. 복사하고 거기에 추가적인 값을 넣음
const slime = {
  name: 'slemon'
}

// const cuteSlime = slime;
// cuteSlime.attribute = 'cute';

// const purpleCuteSlime = cuteSlime;
// purpleCuteSlime.color = 'purple';

// console.log(slime === cuteSlime); // true

const cuteSlime = {
  ...slime,
  attribute: 'cute'
}

const purpleCuteSlime = {
  ...cuteSlime,
  color: 'purple'
}

const greenCuteSlime = {
  ...purpleCuteSlime,
  color: 'green'
}

console.log(slime);
console.log(cuteSlime);
console.log(purpleCuteSlime);
console.log(greenCuteSlime); // color: 'purple'

console.log(slime === cuteSlime); // false

const goddess = ['Vesta', 'Flora', 'Luna', 'Demeter'];
const anotherGoddess = [...spirits, 'Aphrodite'];
// const anotherGoddess = goddess.concat('Aphrodite');

const numbers = [1, 2, 3, 4];
const spreadNumbers = [...numbers, 6, ...numbers]; 
console.log(spreadNumbers); // [1, 2, 3, 4, 6, 1, 2, 3, 4]

// rest - 퍼져있는 것들을 다시 모아오는 기능
const rainbowShineSlime = {
  name: 'Star',
  attribute: 'shine',
  color: 'rainbow'
}
const { color, ...rest } = rainbowShineSlime;
console.log(rest); // Object {name: 'Star', attribute: 'Shine'}

const numbers = [0, 1, 2, 3, 4, 5];
const [one, ...rest] = numbers;
console.log(one); // 0

// 함수 파라미터에서의 rest
function sum(a, b, c, d, e, f, g) {
  return a + b + c + d + e + f + g;
}
console.log(sum(1, 2, 3, 4)); // NaN

function sum(...rest) { // ...params
  return rest.reduce((acc, current) => acc + current, 0);
}

// 함수 인자에서의 spread
function subtract(x, y) {
  return x - y;
}
//const result = subtract(1, 2);
const numbers = [1, 2];
const result = subtract(...numbers);
console.log(result);

// 7. Scope (변수, 함수 유효범위)
// Global, Function, Block

// 8. Hoisting
// 함수 안에 있는 선언들을 모두 끌어올려서 해당 함수 유효 범위의 최상단에 선언하는 것
// 함수 선언 후 나중에 호출하기 'eslint' 도구 사용시 호이스팅 코드는 경고 확인 가능
myFunc();
function myFunc() {
  console.log('hello world');
}

//var number;
//console.log(number);
//number = 4;
console.log(number); // undefined
var number = 4;

// let, const는 hoisting 발생하지 않음
function func() {
  console.log(a); // 'a' before initialization
  let a = 2;
}