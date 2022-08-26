/* 객체 */

const ironMan = {
  name: '토니 스타크',
  actor: '로버트 다우니 주니어',
  alias: '아이언맨',
};

const { name } = ironMan;
console.log(name);

const captainAmerica = {
  name: '스티븐 로저스',
  actor: '크리스 에반스',
  alias: '캡틴 아메리카',
};

// 비구조화 할당
function print1(hero) {
  const { alias, name, actor } = hero;
  const text = `${alias}, ${name}, ${actor}`;
  console.log(text);
}

function print2({ alias, name, actor }) {
  const text = `${alias}(${name}) 역할을 맡은 배우는 ${actor} 입니다.`;
  console.log(text);
}

print2(captainAmerica);

let dog = {
  name: '멍멍이',
  sound: '멍멍!',
  say1: function () {
    console.log(this);
    console.log(this.sound);
  },
  say2() {
    console.log(this);
    console.log(this.sound);
  },
  say3: () => {
    console.log(this);
    console.log(this.sound);
  },
};

dog.say1();
dog.say2();
dog.say3(); // window undefined

let cat = {
  name: '야옹이',
  sound: '야옹~',
};

cat.say = dog.say1;
cat.say();

const catSay = cat.say;
catSay(); // window undefined

// Getter 와 Setter 함수
// 객체의 getter, setter 함수로 특정 값을 바꾸거나 조회할 수 있음
let numbers = {
  a: 1,
  b: 2,
  get sum() {
    console.log('sum 함수가 실행됩니다');
    return this.a + this.b; // 꼭 반환
  },
};

numbers.a = 5;
console.log(numbers); // {a: 5, b: 2}

// 실행하지 않았는데 조회됨
console.log(numbers.sum); // 7
numbers.b = 5;
console.log(numbers.sum); // 10

const bear = {
  _name: '곰곰',

  get name() {
    console.log('_name을 조회합니다..');
    return this._name;
  },

  // 파라미터 설정
  set name(value) {
    console.log('이름이 바뀝니다.. ' + value);
    this._name = value;
  },
};

console.log(bear._name);
bear.name = '햇쨘';
console.log(bear._name);
console.log(bear.name);

numbers = {
  _a: 1,
  _b: 2,
  sum: 3,
  calculate() {
    console.log('calculate');
    this.sum = this._a + this._b;
  },
  get a() {
    return this._a;
  },
  get b() {
    return this._b;
  },
  set a(value) {
    this._a = value;
    // 업데이트
    this.calculate();
  },
  set b(value) {
    this._b = value;
    this.calculate();
  },
};

console.log(numbers.sum); // 3
numbers.a = 5;
numbers.b = 7;
numbers.a = 9;
console.log(numbers.sum);

numbers = {
  a: 1,
  b: 2,
  get sum() {
    console.log('sum');
    return this.a + this.b;
  },
};

console.log(numbers.sum);
numbers.a = 5;
numbers.b = 7;
numbers.a = 9;
console.log(numbers.sum);
console.log(numbers.sum);
console.log(numbers.sum);
console.log(numbers.sum);
console.log(numbers.sum);
console.log(numbers.sum);

// getter 함수는 조회할 때마다
// setter 함수는 설정할 때마다

// for..of
numbers = [1, 2, 3, 4, 5, 6];

for (let number of numbers) {
  console.log(number);
}

const js = {
  name: 'Javascript',
  taste: 'Vanilla',
  age: 100,
};

console.log(Object.keys(js));
console.log(Object.values(js));
console.log(Object.entries(js));

// for..in
for (let key in js) {
  console.log(`${key}: ${js[key]}`);
}

// 배열 내장함수
// -forEach
let superheroes = ['아이언맨', '캡틴 아케리카', '토르', '닥터 스트레인지'];

superheroes.forEach(function (hero) {
  console.log(hero);
});

superheroes.forEach((hero) => console.log(hero));

// -map
let array = [1, 2, 3, 4, 5, 6, 7, 8];
let squared = [];
for (let i = 0; i < array.length; i++) {
  squared.push(array[i] * array[i]);
}

console.log(squared);

const square = (n) => n * n;
squared = array.map(square);
console.log(squared);

console.log(array.map((n) => n * n));

let items = [
  {
    id: 1,
    text: 'hello',
  },
  {
    id: 2,
    text: 'bye',
  },
];

let texts = items.map((item) => item.text);
console.log(texts);

superheroes = ['아이언맨', '캡틴 아메리카', '토르', '닥터 스트레인지'];

// 토르가 몇 번째에 있는지
let index = superheroes.indexOf('토르');
console.log(index); // 2

let todos = [
  {
    id: 1,
    text: 'HTML',
    done: true,
  },
  {
    id: 2,
    text: 'CSS',
    done: true,
  },
  {
    id: 3,
    text: 'Javascript',
    done: false,
  },
  {
    id: 4,
    text: 'Typescript',
    done: false,
  },
];

// -find, findeIndex
// 배열 안의 값이 객체이거나 특정 조건 확인
index = todos.findIndex((todo) => todo.id === 3);
console.log(index); // 2
index = todos.find((todo) => todo.id === 3);
console.log(index); // {id: 3, text: "Javascript", done: false}

// -filter
// done 값이 false
const tasksNotDone = todos.filter((todo) => todo.done === false);
console.log(tasksNotDone);
/*
0: {id: 3, text: "Javascript", done: false}
1: {id: 4, text: "Typescript", done: false}
*/

// -splice, slice
// -shift, unshift, concat, join..
// slice는 기존 배열에 영향을 주지 않음

// -reduce*
// 유용. 모든값을사용해연산
numbers = [1, 2, 3, 4, 5];

let sum = 0;
numbers.forEach((n) => {
  sum += n;
});
console.log(sum); // 15

// (누적된값, 각원소, 인덱스, 자기자신) => {}, 초깃값
// 0 1 = 1
// 1 2 = 3
// 3 3 = 6
// 6 4 = 10
// 10 5 = 15
sum = numbers.reduce(
  (accumulator, current, index, array) => accumulator + current,
  0,
);
console.log(sum); // 15

let avg = numbers.reduce((acc, cur, idx, arr) => {
  // 현재 처리하는 원소가 맨 마지막 거라면
  if (idx === arr.length - 1) {
    return (acc + cur) / arr.length;
  }
  return acc + cur;
}, 0);
console.log(avg); // 3
// 0 1 0 = 1
// 1 2 1 = 3
// 3 3 2 = 6
// 6 4 3 = 10
// index = 4 만족
// (10 + 5) / 5

// return accumulator!

// 숫자 계산 외
const alphabets = ['a', 'a', 'a', 'b', 'c', 'c', 'd', 'e'];
const counts = alphabets.reduce((acc, cur) => {
  if (acc[cur]) {
    acc[cur] += 1;
  } else {
    acc[cur] = 1;
  }
  return acc;
}, {}); // <- {}

console.log(counts);
// {a: 3, b: 1, c: 2, d: 1, e: 1}

// 퀴즈
// 숫자 배열이 주어졌을 때 10보다 큰 숫자의 갯수를 반환하는 함수
function countBiggerThanTen(numbers) {
  return numbers.filter((n) => n > 10).length;
}

function countBiggerThanTen1(numbers) {
  return numbers.reduce((acc, cur) => {
    if (cur > 10) return acc + 1;
    else return acc;
  }, 0);
}

let count = countBiggerThanTen([1, 2, 3, 5, 10, 20, 30, 40, 50, 60]);
console.log(count); // 5
count = countBiggerThanTen1([1, 2, 3, 5, 10, 20, 30, 40, 50, 60]);
console.log(count); // 5

// => 외우지말고 어떤 용도로 사용되는지 이해하기

/* 프로토타입과 클래스 */
// -객체 생성자
function Animal(type, name, sound) {
  this.type = type;
  this.name = name;
  this.sound = sound;
  // this.say = function () {
  //   console.log(this.sound);
  // };
}

Animal.prototype.say = function () {
  console.log(this.sound);
};

// function say() {
//   console.log(this.sound);
// }

// dog.say = say;
// cat.say = say;

dog = new Animal('개', '멍멍이', '멍멍');
cat = new Animal('고양이', '루루', '야옹');
dog.say();
cat.say();

// 새로운 애니멀 객체(인스턴스)가 만들어질 때마다 새로운 함수도 만들어짐
// 비효율적. say 함수는 똑같은 내용, 기능을 하므로 프로토타입으로 변경
// 재사용하려면 프로토타입으로 지정

// -객체 생성자 상속하기
function Dog(name, sound) {
  Animal.call(this, '개', name, sound);
}
function Cat(name, sound) {
  Animal.call(this, '고양이', name, sound);
}

Dog.prototype = Animal.prototype;
Cat.prototype = Animal.prototype;

dog = new Dog('멍멍이', '멍멍');
cat = new Cat('야옹이', '야옹');

// -ES6 Class
class Fairy {
  constructor(name, spirit, skill) {
    this.name = name;
    this.spirit = spirit;
    this.skill = skill;
  }
  power() {
    console.log(tihs.skill);
  }
}

const luna = new Fairy('luna', 'moon', 'moonlight');
const windy = new Fairy('windy', 'wind', 'tornado');

class Wizard extends Fairy {
  constructor(name, skill) {
    super(name, skill);
  }
}

// -연습 Food class 만들기
class Food {
  constructor(name) {
    this.name = name;
    this.brands = [];
  }
  addBrand(brand) {
    this.brands.push(brand);
  }
  print() {
    console.log(`${this.name}을(를) 파는 음식점들`);
    console.log(this.brands.join(', '));
  }
}

const pizza = new Food('피자');
pizza.addBrand('피자헛');
pizza.addBrand('도미노 피자');

const bread = new Food('빵');
bread.addBrand('망넛이네');
bread.addBrand('야미요밀');

pizza.print();
bread.print();
