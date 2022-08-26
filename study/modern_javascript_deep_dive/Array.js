/**
 * 27장 배열
 */

/* 27.1 배열이란? */
// 배열array은 여러 개의 값을 순차적으로 나열한 자료구조다.
// 배열이 가지고 있는 값을 요소element라고 부르고, 인덱스index와 length 프로퍼티를 갖는다.
// 배열 타입은 존재하지 않으며 배열은 객체 타입이다.
let arr = ['apple', 'banana', 'orange'];
console.log(arr[0], arr[1], arr[2]);
console.log(arr.length); // 3
console.log(typeof arr); // object
console.log(arr.constructor === Array); // true
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true

// 일반 객체와 배열을 구분하는 가장 명확한 차이는 "값의 순서"와 "length 프로퍼티"다.
// 반복문으로 자료구조를 순서대로 순회하기 위해서는 자료구조의 요소에
// 순서대로 접근할 수 있어야 하며 자료구조의 길이를 알 수 있어야 한다.
const numArr = [1, 2, 3, 4];
for (let i = 0; i < numArr.length; i++) {
  console.log(numArr[i]); // 1 2 3 4
}

/* 27.2 자바스크립트 배열은 배열이 아니다 - 494p */
// 정렬되지 않은 배열에서 특정한 요소를 검색하는 경우 배열의 모든 요소를 처음부터
// 특정 요소를 발견할 때까지 차례대로 검색(선형 검색 linear search, 시간 복잡도O(n))
function linearSearch(array, target) {
  const length = array.length;

  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) return i;
  }

  return -1;
}
console.log(linearSearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(linearSearch([1, 2, 3, 4, 5, 6], 0)); // -1

// 자바스크립트의 배열은 지금까지 살펴본 자료구조에서 말하는 일반적인 의미의 배열과 다르다.
// 즉, 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며,
// 연속적으로 이어져 있지 않을 수도 있다.
// 배열의 요소가 연속적으로 이어져있지 않는 배열을 "희소 배열 sparse array"이라 한다.
// => Javascript의 배열은 일반적인 배열의 동작을 흉내 낸 특수한 Object다.

// 일반적인 배열과 자바스크립트 배열의 장단점 - 496p
// -일반적인 배열은 인덱스로 요소에 빠르게 접근할 수 있다. 하지만 특정 요소를 검색하거나
//  요소를 삽입 또는 삭제하는 경우에는 효율적이지 않다.
// -자바스크립트 배열은 해시 테이블로 구현된 객체이므로 인덱스의 요소에 접근하는 경우
//  일반적인 배열보다 성능적인 면에서 느릴 수밖에 없는 구조적인 단점이 있다.
//  하지만 특정 요소를 검색하거나 요소를 삽입 또는 삭제하는 경우에는
//  일반적인 배열보다 빠른 성능을 기대할 수 있다
// ⏩알고리즘, 자료구조, 해시테이블 등 공부하기

const array = [];
console.time('Array Performance Test');
for (let i = 0; i < 1000000; i++) {
  array[i] = i;
}
console.timeEnd('Array Performance Test'); // 20

const object = {};
console.time('Object Performance Test');
for (let i = 0; i < 1000000; i++) {
  object[i] = i;
}
console.timeEnd('Object Performance Test'); // 30

/* 27.3 length 프로퍼티와 희소 배열 */
// 배열에서 사용할 수 있는 가장 작은 인덱스는 0, 가장 큰 인덱스는 2**32 - 2(4,294,967,294)
// length 프로퍼티의 값은 배열에 요소를 추가하거나 삭제하면 자동 갱신된다.

// length 프로퍼티 값은 요소의 개수, 즉 배열의 길이를 바탕으로 결정되지만 임의의 숫자 값을
// 명시적으로 할당할 수도 있고, 현재 값보다 작은 숫자 값을 할당하면 길이가 줄어든다.
// const arr = ['apple', 'banana', 'orange']
arr.length = 2;
console.log(arr); // ['apple', 'banana']

// 주의할 것은 현재 length 프로퍼티 값보다 큰 숫자 값을 할당하는 경우
// length 값은 변경되지만 실제 배열의 길이가 늘어나지는 않는다.
arr.length = 6;
console.log(arr.length); // 6
console.log(arr); // ['apple', 'banana', empty × 4]

// 희소 배열 - 499p
const sparse = [, 2, , 4];
console.log(sparse.length); // 4
console.log(sparse); // [empty, 2, empty, 4]
console.log(Object.getOwnPropertyDescriptors(sparse));
/* {
  '1': { value: 2, writable: true, enumerable: true, configurable: true },
  '3': { value: 4, writable: true, enumerable: true, configurable: true },
  length: { value: 4, writable: true, enumerable: false }
} */

// 일반적인 배열의 length는 배열 요소의 개수, 즉 배열의 길이와 언제나 일치한다.
// 하지만 희소 배열은 length와 배열 요소의 개수가 일치하지 않는다.
// 희소 배열의 length는 희소 배열의 실제 요소 개수보다 언제나 크다.
// 문법적으로 희소 배열을 허용하지만 사용하지 않는 것이 좋다.
// => Array는 같은 타입의 요소를 연속적으로 위치시키는 것이 최선이다.

/* 27.4 배열 생성 */
// 27.4.1 배열 리터럴
// const arr = []

// 27.4.2 Array 생성자 함수 - 501p
// 전달된 인수의 개수에 따라 다르게 동작하므로 주의가 필요함

// 27.4.3 Array.of
// ES6에 도입된 메서드로 전달된 인수를 요소로 갖는 배열을 생성함
Array.of(1); // -> [1]
Array.of(1, 2, 3); // -> [1, 2, 3]
Array.of('string'); // -> ['string']

// 27.4.4 Array.from
// ES6에 도입된 메서드로 유사 배열 객체 array-like object또는
// 이터러블 객체 iterable object를 인수로 전달받아 배열로 변환하여 반환함
console.log(Array.from({ length: 2, 0: 'a', 1: 'b' })); // ['a', 'b']
// 문자열은 이터러블이다.
console.log(Array.from('Hello')); // ['H', 'e', 'l', 'l', 'o']

// ▪유사 배열 객체와 이터러블 객체
//  array-like object는 마치 배열처럼 인덱스 프로퍼티 값에 접근할 수 있고
//  length 프로퍼티를 갖는 객체를 말함. 마치 배열처럼 for 문으로 순회 가능
const arrayLike = {
  0: 'apple',
  1: 'banana',
  2: 'orange',
  length: 3,
};
for (let i = 0; i < arrayLike.length; i++) {
  console.log(arrayLike[i]); // apple banana orange
}

// iterable object는 Symbol.iterator 메서드를 구현하여 for...of 문으로 순회할 수 있으며,
// 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있는 객체를 말한다.
// ES6에서 제공하는 빌트인 이터러블은 Array, String, Map, Set,
// DOM 컬렉션(NodeList, HTMLCollection), arguments 등이 있다. (34장 '이터러블')

/* 27.5 배열 요소의 참조 */
// 배열 요소 참조시 대괄호([]) 표기법을 사용하고 안에는 인덱스가 와야 함
// 존재하지 않는 요소에 접근하면 undefined가 반환됨
// 희소 배열
const arr1 = [1, , 3];
console.log(arr1[1]); // undefined
console.log(arr1[3]); // undefined

/* 27.6 배열 요소의 추가와 갱신 */
// 객체처럼 배열에도 요소를 동적으로 추가할 수 있음
// 인덱스는 요소의 위치를 나타내므로 반드시 0 이상의 정수(또는 정수 형태의 문자열) 사용
const arr2 = [];

arr2[0] = 1;
arr2['1'] = 2;

arr2['foo'] = 3;
arr2.bar = 4;
arr2[1.1] = 5;
arr2[-1] = 6;

console.log(arr2); // [1, 2, foo: 3, bar: 4, 1.1: 5, -1: 6]
console.log(arr2.length); // 2

/* 27.7 배열 요소의 삭제 */
// 배열은 사실 객체이기 때문에 특정 요소 삭제시 delete 연산자를 사용할 수 있음
const arr3 = [1, 2, 3, 4];
delete arr3[2];
console.log(arr3); // [1, 2, empty, 4]
// length 프로퍼티에 영향을 주지 않는다. 즉, 희소 배열이 된다.
console.log(arr3.length); // 4

// 희소 배열을 만드는 delete 연산자는 사용하지 않는 것이 좋다.
// 희소 배열을 만들지 않으면서 배열의 특정 요소를 완전히 삭제하려면
// ⏩Array.prototype.splice 메서드를 사용
const arr4 = [1, 2, 3, 4];
// Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소 수)
arr4.splice(2, 1);
console.log(arr4); // [1, 2, 4]
console.log(arr4.length); // 3

/* 27.8 배열 메서드 */
// Array 생성자 함수는 정적 메서드를 제공하며, 배열 객체의 프로토타입인
// Array.prototype은 프로토타입 메서드를 제공한다.
// *배열은 사용 빈도가 높은 자료구조므로 배열 메서드 사용법 잘 알아두기

// 배열 메서드는 결과물을 반환하는 패턴이 두 가지이므로 주의가 필요하다.
// 원본 배열(배열 메서드를 호출한 배열, 즉 배열 메서드의 구현체 내부에서 this가 가리키는 객체)
// 을 직접 변경하는 메서드 mutator method와 원본 배열을 직접 변경하지 않고
// 새로운 배열을 생성하여 반환하는 메서드 accessor method가 있다.

const arr5 = [1];
// push 메서드는 원본 배열을 직접 변경함
arr5.push(2);
console.log(arr5); // [1, 2]

// concat 메서드는 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환함
let result = arr5.concat(3);
console.log(arr5); // [1, 2]
console.log(result); // [1, 2, 3]

// 원본 배열을 직접 변경하는 메서드는 외부 상태를 직접 변경하는 부수 효과가 있으므로 사용할 때 주의
// ⏩따라서 가급적 원본 배열을 직접 변경하지 않는 메서드 accessor method를 사용하는 편이 좋다

// 27.8.1 Array.isArray
// 전달된 인수가 배열이면 true, 아니면 false를 반환함
// true
console.log(Array.isArray([]));
console.log(Array.isArray([1, 2]));
console.log(Array.isArray(new Array()));

// false
console.log(Array.isArray());
console.log(Array.isArray({}));
console.log(Array.isArray(null));
console.log(Array.isArray(undefined));
console.log(Array.isArray(1));
console.log(Array.isArray('Array'));
console.log(Array.isArray(true));
console.log(Array.isArray(false));
console.log(Array.isArray({ 0: 1, length: 1 }));

// 27.8.2 Array.prototype.indexOf
// 원본 배열에서 인수로 전달된 요소를 검색하며 인덱스를 반환
// -원본 배열에 인수로 전달한 요소와 중복되는 요소가 여러 개 있다면 첫 번째로 검색된 요소의 인덱스를 반환함
// -원본 배열에 인수로 전달한 요소가 존재하지 않으면 -1을 반환함
const arr6 = [1, 2, 2, 3];
console.log(arr6.indexOf(2)); // 1
console.log(arr6.indexOf(4)); // -1
// 두 번째 인수는 검색을 시작할 인덱스. 두 번째 인수를 생략하면 처음부터 검색함
console.log(arr6.indexOf(2, 2)); // 2

// indexOf 메서드는 배열에 특정 요소가 존재하는지 확인할 때 유용함
const berries = ['blueberry', 'strawberry', 'raspberry'];
if (berries.indexOf('cranberry') === -1) {
  berries.push('cranberry');
}
console.log(berries);
// ["blueberry", "strawberry", "raspberry", "cranberry"]

// ⏩ES7에 도입된 Array.prototype.includes 메서드를 사용하면 가독성이 더 좋음
if (!berries.includes('blackberry')) {
  berries.push('blackberry');
}
console.log(berries);
// ["blueberry", "strawberry", "raspberry", "cranberry", "blackberry"]

// 27.8.3 Array.prototype.push
// push 메서드는 성능 면에서 좋지 않다. 마지막 요소로 추가할 요소가 하나뿐이라면
// ⏩length 프로퍼티를 사용하여 배열의 마지막에 요소를 직접 추가하는 것이 더 빠름
const arr7 = [1, 2];
arr7[arr7.length] = 3;
console.log(arr7); // [1, 2, 3]

// push 메서드는 원본 배열을 직접 변경하는 부수 효과가 있다.
// 따라서 ES6의 스프레드 문법을 사용하는 편이 좋음
// const newArr = [...arr7, 4];
// console.log(newArr); // [1, 2, 3, 4]

// 27.8.4 Array.prototype.pop
// 마지막 요소를 제거하고 제거한 요소를 반환함
// 원본 배열이 빈 배열이면 undefined를 반환. pop은 원본 배열을 직접 변경함
const arr8 = [1, 2];
let result1 = arr8.pop();
console.log(result1); // 2
console.log(arr8); // [1]

// 511p
// pop, push 메서드를 사용하면 스택을 쉽게 구현할 수 있다.
// 스택 stack은 데이터를 마지막에 밀어 넣고, 마지막에 밀어 넣은 데이터를 먼저 꺼내는
// 후입 선출(LIFO - Last In First Out) 방식의 자료구조다.
// 스택은 언제나 가장 마지막에 밀어 넣은 최신 데이터를 먼저 취득한다
// 스택에 데이터를 밀어 넣는 것을 push, 데이털르 꺼내는 것을 pop이라고 한다.

// 스택을 생성자 함수로 구현
const Stack = (function () {
  function Stack(array = []) {
    if (!Array.isArray(array)) {
      throw new TypeError(`${array} is not an array`);
    }
    this.array = array;
  }

  Stack.prototype = {
    constructor: Stack,
    push(value) {
      return this.array.push(value);
    },
    pop() {
      return this.array.pop();
    },
    entries() {
      return [...this.array];
    },
  };

  return Stack;
})();

const stack = new Stack([1, 2]);
console.log(stack.entries()); // [1, 2]

stack.push(3);
console.log(stack.entries()); // [1, 2, 3]

stack.pop();
console.log(stack.entries()); // [1, 2]

// 스택을 클래스로 구현
// # -> private?, entries로 private 내부 변수?를 외부에서 변경하거나 읽을수있는지
// (클래스, 프로퍼티 어트리뷰트)
class StackC {
  #array;

  constructor(array = []) {
    if (!Array.isArray(array)) {
      throw new TypeError(`${array} is not an array`);
    }
    this.#array = array;
  }
  push(value) {
    return this.#array.push(value);
  }
  pop() {
    return this.#array.pop();
  }
  entries() {
    return [...this.#array];
  }
}

const stackC = new StackC([3, 4]);
console.log(stackC.entries()); // [3, 4]

stackC.push(5);
console.log(stackC.entries()); // [3, 4, 5]

stackC.pop();
console.log(stackC.entries()); // [3, 4]

// 27.8.5 Array.prototype.unshift
// 인수로 전달받은 모든 값을 원본 배열의 선두에 추가하고 변경된 length 프로퍼티 값을 반환
// 원본 배열을 직접 변경하는 "부수 효과"가 있으므로 ES6의 스프레드 문법을 사용하는 편이 좋다

// 27.8.6 Array.prototype.shift
// 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환함
// 원본 배열이 빈 배열이면 undefined를 반환. 원본 배열을 직접 변경함

// 514p
// shift, push 메서드를 사용해 큐를 쉽게 구현할 수 있음
// 큐 queue는 데이터를 마지막에 밀어 넣고, 처음 데이터, 즉 가장 먼저 밀어 넣은 데이터를 먼저 꺼내는
// 선입 선출(FIFO - First In First Out) 방식의 자료구조.

// 큐를 생성자 함수로 구현
const Queue = (function () {
  function Queue(array = []) {
    if (!Array.isArray(array)) {
      // 47장 "에러 처리" 참고
      throw new TypeError(`${array} is not an array`);
    }
    this.array = array;
  }

  Queue.prototype = {
    // 19.9.1절 "생성자 함수에 의한 프로토타입 교체" 참고
    constructor: Queue,
    // 큐의 가장 마지막에 데이터를 밀어 넣는다.
    enqueue(value) {
      return this.array.push(value);
    },
    // 큐의 가장 처음 데이터, 즉 가장 먼저 밀어 넣은 데이터를 꺼낸다.
    dequeue() {
      return this.array.shift();
    },
    // 큐의 복사본 배열을 반환한다.
    entries() {
      return [...this.array];
    },
  };

  return Queue;
})();

const queue = new Queue([10, 20]);
console.log(queue.entries()); // [10, 20]

queue.enqueue(30);
console.log(queue.entries()); // [10, 20, 30]

queue.dequeue();
console.log(queue.entries()); // [20, 30]

// 큐를 클래스로 구현 - 515p

// 27.8.7 Array.prototype.concat
// 인수로 전달된 값들(배열 또는 원시값)을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환
// 인수로 전달한 값이 배열인 경우 배열을 해체하여 새로운 배열의 요소로 추가함(원본 배열은 변경되지 않음)
const arrA = [1, 2];
const arrB = [3, 4];

let result2 = arrA.concat(arrB);
console.log(result2); // [1, 2, 3, 4]

result2 = arrA.concat(3);
console.log(result2); // [1, 2, 3]

result2 = arrA.concat(arrB, 5);
console.log(result2); // [1, 2, 3, 4, 5]

// 원본 배열 변경되지 않음
console.log(arrA); // [1, 2]

// ⏩push와 unshift 메서드는 concat 메서드로 대체할 수 있다
// -push와 unshift 메서드는 원본 배열을 직접 변경, concat은 변경하지 않고 새로운 배열을 반환함.
const arrC = [3, 4];
arrC.unshift(1, 2);
console.log(arrC); // [1, 2, 3, 4]

arrC.push(5, 6);
console.log(arrC); // [1, 2, 3, 4, 5, 6]

const arrD = [3, 4];
let result3 = [1, 2].concat(arrD);
console.log(result3); // [1, 2, 3, 4]

// arrD.push(5, 6)을 대체
result3 = result3.concat(5, 6);
console.log(result3); // [1, 2, 3, 4, 5, 6]

// -인수로 전달받은 값이 배열인 경우 push, unshift 메서드는 배열을 그대로 원본 배열에 추가하지만
//  concat 메서드는 인수로 전달받은 배열을 해체하여 새로운 배열의 마지막 요소로 추가한다
const arrE = [3, 4];

arrE.unshift([1, 2]);
arrE.push([5, 6]);
console.log(arrE); // [[1, 2], 3, 4, [5, 6]]

let result4 = [1, 2].concat([3, 4]);
result4 = result4.concat([5, 6]);
console.log(result4); // [1, 2, 3, 4, 5, 6]

// concat 메서드는 ES6의 스프레드 문법으로 대체할 수 있음
// ⏩push/unshift/concat 메서드 대신 스프레드 문법을 일관성 있게 사용하느 것을 권장
let result5 = [1, 2].concat([3, 4]);
console.log(result5); // [1, 2, 3, 4]

result5 = [...[1, 2], ...[3, 4]];
console.log(result5); // [1, 2, 3, 4]

// 27.8.8 Array.prototype.splice
// push, pop, unshift, shift 메서드 모두 원본 배열을 직접 변경하는 메서드 mutator method
// 원본 배열의 중간에 요소를 추가하거나 중간에 있는 요소를 제거하는 경우 splice 메서드를 사용함
// 첫 번재 인수 start
// -원본 배열에서 요소를 제거하기 시작할 인덱스
// 두 번째 인수 deleteCount, 제거할 요소의 개수
// -0으로 지정하면 아무런 요소도 제거하지 않고 새로운 요소들을 삽입함
// -개수를 생략하면 첫 번째 인수로 전달된 시작 인덱스부터 모든 요소를 제거함
// 세 번째 인수 items, 제거한 위치에 추가할 요소들의 목록
// -전달하지 않으면 원본 배열에서 지정된 요소를 제거하기만 함
const arr9 = [1, 2, 3, 4];
const result6 = arr9.splice(1, 2, 20, 30);

// 제거한 요소가 배열로 반환됨
console.log(result6); // [2, 3]

// 원본 배열을 직접 변경
console.log(arr9); // [1, 20, 30, 4]

// 배열에서 특정 요소를 제거하려면 indexOf 메서드를 통해
// 특정 요소의 인덱스를 취득한 다음 splice 메서드를 사용함
const arrr = [1, 2, 3, 1, 2];

// 배열 array에서 item 요소를 제거. item 요소가 여러 개 존재하면 첫 번째 요소만 제거함
function remove(array, item) {
  // 제거할 item 요소의 인덱스를 취득
  const index = array.indexOf(item);

  // 제거할 item 요소가 있다면 제거함
  if (index !== -1) array.splice(index, 1);

  return array;
}

console.log(remove(arrr, 2)); // [1, 3, 1, 2]
console.log(remove(arrr, 10)); // [1, 3, 1, 2]

// filter 메서드를 사용하여 특정 요소를 제거할 수도 있음
// 하지만 특정 요소가 중복된 경우 모두 제거됨
const arrr1 = [1, 2, 3, 1, 2];

function removeAll(array, item) {
  return array.filter((v) => v !== item);
}

console.log(removeAll(arrr1, 2)); // [1, 3, 1]

// 27.8.9 Array.prototype.slice
// 인수로 전달된 범위의 요소들을 복사하여 배열로 반환. 원본 배열은 변경되지 않음
// 이름이 유사한 splice 메서드는 원본 배열을 변경하므로 주의
// slice 메서드는 두 개의 매개변수를 갖는다
// start: 복사를 시작할 인덱스. 음수인 경우 배열의 끝에서 인덱스를 나타냄
// end: 복사르 종료할 인덱스. 생략 가능하며 생략 시 기본값은 length 프로퍼티 값
const arrrA = [1, 2, 3];
console.log(arrrA.slice(0, 1)); // [1]
console.log(arrrA.slice(1, 2)); // [2]

// 원본은 변경되지 않는다
console.log(arrrA); // [1, 2, 3]

// end 생락히 start로 전달받은 인덱스부터 모든 요소를 복사하여 배열로 반환
console.log(arrrA.slice(1)); // [2, 3]

// start가 음수인 경우 배열의 끝에서부터 요소를 복사하여 배열로 반환
console.log(arrrA.slice(-1)); // [3]
console.log(arrrA.slice(-2)); // [2, 3]

// 인수를 모두 생략하면 원본 배열의 복사본을 생성하여 반환함
const copy = arrrA.slice();
console.log(copy); // [1, 2, 3]
console.log(copy === arrrA); // false

// 이때 생성된 복사본은 얕은 복사 shallow copy를 통해 생성됨
const todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: true },
];

// 얕은 복사(shallow copy)
const _todos = todos.slice();
// const _todos = [...todos]

// _todos와 todos는 참조값이 다른 별개의 객체다
console.log(_todos === todos); // false

// 배열 요소의 참조값이 같다. 즉, 얕은 복사되었다
console.log(_todos[0] === todos[0]); // true

// 📄얕은 복사와 깊은 복사 - 524p
// 11.2.1절 "변경 가능한 값"의 "얕은 복사 shallow copy와 깊은 복사 deep copy"
// 에서 언급한 바와 같이 객체를 프로퍼티 값으로 갖는 객체의 경우
// "얕은 복사"는 한 단계까지만 복사하는 것을 말하고
// "깊은 복사"는 객체에 중첩되어 있는 객체까지 모두 복사하는 것을 말함
// slice 메서드, 스프레드 문법, Object.assign 메서드는 모두 얕은 복사를 수행함
// 깊은 복사를 위해서는 Lodash 라이브러리의 cloneDeep 메서드를 사용하는 것을 추천
// ⏩https://lodash.com/docs/4.17.15#cloneDeep

// slice 메서드가 복사본을 생성하는 것을 이용하여 arguments, HTMLCollection, NodeList와 같은
// 유사 배열 객체를 배열로 변환할 수 있다
let sum = function () {
  // 유사 배열 객체를 배열로 변환(ES5)
  var arr = Array.prototype.slice.call(arguments);
  console.log(arr); // [1, 2, 3]

  return arr.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
};
console.log(sum(1, 2, 3)); // 6

// ⏩Array.from 메서드를 사용하면 더욱 간단하게 유사 배열 객체를 배열로 변환할 수 있음
// Array.from 메서드는 유사 배열 객체 또는 이터러블 객체를 배열로 변환함
function sum1() {
  const arr = Array.from(arguments);
  console.log(arr);
  [1, 2, 3, 4];

  return arr.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum1(1, 2, 3, 4)); // 10

// 34장 "이터러블"에서 봤지만 arguments 객체는 유사 배열 객체이면서 이터러블 객체임
// 이터러블 객체는 ES6의 스프레드 문법을 사용하여 간단하게 배열로 변환할 수 있음
function sum2() {
  const arr = [...arguments];
  console.log(arr); // [1, 2, 3, 4, 5]

  return arr.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum2(1, 2, 3, 4, 5)); // 15

// 27.8.10 Array.prototype.join
// 원본 배열의 모든 요소를 문자열로 변환한 후, 인수로 전달받은 문자열, 즉
// 구분자 separator로 연결한 문자열을 반환함.구분자는 생략 가능하며 기본 구분자는 콤마
const newArr = [1, 2, 3, 4];
console.log(newArr.join()); // '1,2,3,4'
console.log(newArr.join('')); // '1234'
console.log(newArr.join(':')); // '1:2:3:4'

// 27.8.11 Array.prototype.reverse
// 원본 배열의 순서를 반대로 뒤집음. 원본 배열이 변경됨. 반환값은 변경된 배열
const newResult = newArr.reverse();
console.log(newArr); // [4, 3, 2, 1]
console.log(newResult); // [4, 3, 2, 1]

// 27.8.12 Array.prototype.fill
// ES6에서 도입된 메서드로 인수로 전달받은 값을 배열의 처음부터 끝까지 요소로 채움
// 이때 원본 배열이 변경됨
newArr.reverse(); // [1, 2, 3, 4]
newArr.fill(0);
console.log(newArr); // [0, 0, 0, 0]

// 두 번째 인수로 요소 채우기를 시작할 인덱스를 전달할 수 있음
const newArr1 = [1, 2, 3];
newArr1.fill(0, 1);
console.log(newArr1); // [1, 0, 0]

// 세 번째 인수로 요소 채우기를 멈출 인덱스를 전달할 수 있음
const newArr2 = [1, 2, 3, 4, 5];
// 인수로 전달받은 값 0을 배열의 인덱스 1부터 3 이전(인덱스 3 미포함)까지 요소로 채움
newArr2.fill(0, 1, 3);
console.log(newArr2); // [1, 0, 0, 4, 5]

// 배열을 생성하면서 특정 값으로 요소를 채울 수 있다.
const newArr3 = new Array(3);
console.log(newArr3); // [empty × 3]

// 527p
// fill 메서드로 요소를 채울 경우 모든 요소를 하나의 값만으로 채울 수밖에 없다는 단점이 있다.
// 하지만 Array.from 메서드를 사용하면 두 번째 인수로 전달한 콜백 함수를 통해
// 요소 값을 만들면서 배열을 채울 수 있다. Array.from 메서드는 두 번째 인수로 전달한
// 콜백 함수에 첫 번째 인수에 의해 생성된 배열의 요소값과 인덱스를 순차적으로 전달하면서 호출하고,
// 콜백 함수의 반환값으로 구성된 배열을 반환한다.

// 27.8.13 Array.prototype.includes
// ES7에 도입된 includes 메서드는 배열 내에 특정 요소가 포함되어 있는지 확인하여
// true 또는 false를 반환. 첫 번째 인수로 검색할 대상을 지정함
const arr10 = [1, 2, 3];
console.log(arr10.includes(2)); // t
console.log(arr10.includes(100)); // f

// 두 번째 인수로 검색을 시작할 인덱스를 전달할 수 있음 (생략시 기본값 0)
// 음수를 전달하면 length 프로퍼티 값과 음수 인덱스를 합산하여(length + index)
// 검색 시작 인덱스를 설정함
console.log(arr10.includes(1, 1)); // f
// 배열에 요소 3이 포함되어 있는지 인덱스 2(arr.length - 1)부터 확인
console.log(arr10.includes(3, -1)); // t

// indexOf 메서드로도 확인할 수 있지만, 반환값이 -1인지 확인해 봐야 하고
// 배열에 NaN이 포함되어 있는지 확인할 수 없다는 문제가 있다.

// 27.8.14 Array.prototype.flat
// ES10(ECMAScript 2019)에서 도입된 flat 메서드는 인수로 전달한 깊이만큼 재귀적으로 배열을 평탄화함
// [1, [2, 3, 4, 5]].flat() -> [1, 2, 3, 4, 5]
// 중첩 배열을 평탄화할 깊이를 인수로 전달할 수 있음. 인수 생략시 기본값은 1
// 인수로 Infinity를 전달하면 배열 모두를 평탄화함

// 중첩 배열을 평탄화하기 위한 깊이 값의 기본값은 1이다.
console.log([1, [2, [3, [4]]]].flat()); // [1, 2, [3, [4]]]
console.log([1, [2, [3, [4]]]].flat(1)); // [1, 2, [3, [4]]]

// 2단계 깊이까지 평탄화
console.log([1, [2, [3, [4]]]].flat(2)); // [1, 2, 3, [4]]

// Infinity로 지정해 중첩 배열 모두를 평탄화
console.log([1, [2, [3, [4]]]].flat(Infinity)); // [1, 2, 3, 4]

/**
 * 27.9 배열 고차 함수 - 529p
 * "고차 함수 Higher-Order Function, HOF"는 함수를 인수로 전달받거나 함수를 반환하는 함수를 말함.
 * 자바스크립트의 함수는 "일급 객체"이므로 함수를 값처럼 인수로 전달할 수 있으며 반환할 수도 있다.
 * 고차 함수는 외부 상태의 변경이나 가변 mutable 데이터를 피하고 불변성 immutability을 지향하는
 * 함수형 프로그래밍에 기반을 두고 있음
 *
 * "함수형 프로그래밍"은 순수 함수 pure function와 보조 함수의 조합을 통해 로직 내에 존재하는
 * 조건문과 반복문을 제거하여 복잡성을 해결하고 변수의 사용을 억제하여 상태 변경을 피하려는
 * 프로그래밍 패러다임이다.
 * 조건문이나 반복문은 로직의 흐름을 이해하기 어렵개 하여 가독성을 해치고,
 * 변수는 누군가에 의해 언제든 변경될 수 있어 오류 발생의 근본적 원인이 될 수 있기 때문이다.
 * 함수형 프로그래밍은 결국 "순수 함수를 통해 부수 효과를 최대한 억제"하여 오류를 피하고
 * 프로그램의 안정성을 높이려는 노력의 일환이라고 할 수 있다.
 *
 * 자바스크립트는 고차 함수를 다수 지원한다. 특히 배열은 매우 유용한 고차 함수를 제공한다.
 * 배열 고차 함수는 활용도가 매우 높으므로 사용법을 잘 이해하기 바란다.
 */

// 27.9.1 Array.prototype.sort
// 배열의 요소를 정렬. 원본 배열을 직접 변경하며 정렬된 배열을 반환함
// 기본적으로 오름차순으로 요소를 정렬함
let fruits = ['grape', 'apple', 'lemon'];
// 오름차순(ascending) 정렬
fruits.sort();
// sort 메서드는 원본 배열을 직접 변경한다.
console.log(fruits); // ['apple', 'grape', 'lemon']

// 한글 문자열인 요소도 오름차순으로 정렬됨
fruits = ['사과', '레몬', '포도'];
// 오름차순(ascending) 정렬
fruits.sort();
// sort 메서드는 원본 배열을 직접 변경한다.
console.log(fruits); // ['레몬', '사과', '포도']

// 내림차순으로 요소를 정렬하려면 sort 메서드로 정렬 후 reverse 메서드 사용
fruits.reverse();
console.log(fruits); // ['포도', '사과', '레몬']

// 문자열 요소로 이루어진 배열의 정렬은 아무런 문제가 없다.
// 하지만 숫자 요소로 이루어진 배열을 정렬할 때는 주의가 필요
const points = [40, 100, 1, 5, 2, 25, 10];
points.sort();
// 의도한 대로 정렬되지 않는다.
console.log(points); // [1, 10, 100, 2, 25, 40, 5]

// 530p
// sort 메서드의 기본 정렬 순서는 유니코드 코드 포인트의 순서를 따른다. (https://d2.naver.com/helloworld/19187 참고)
// 배열의 요소가 숫자 타입이라 할지라도 배열의 요소를 일시적으로 문자열로 변환한 후
// 유니코드 코드 포인트의 순서를 기준으로 정렬한다.
// 예를 들어, 문자열 '1'의 유니코드 코드 포인트는 U+0031, 문자열 '2'는 U+0032다.
// 이처럼 문자열 '1'의 유니코드 코드 포인트 순서가 문자열 '2'보다 앞서므로...

// ⏩따라서 숫자 요소를 정렬할 때는 sort 메서드에 정렬 순서를 정의하는 비교 함수를 인수로 전달해야 한다
// 비교 함수는 양수나 음수 또는 0을 반환해야 한다. 비교 함수의 반환값이 0보다 작으면
// 비교 함수의 첫 번재 인수를 우선하여 정렬하고, 0이면 정렬하지 않으며, 0보다 크면 두 번째 인수를 우선하여 정렬함

// const points = [40, 100, 1, 5, 2, 25, 10];
// 숫자 배열의 오름차순 정렬. 비교 함수의 반환값이 0보다 작으면 a를 우선하여
points.sort((a, b) => a - b);
console.log(points); //  [1, 2, 5, 10, 25, 40, 100]

// 숫자 배열에서 최소/최대값 취득
console.log(points[0], points[points.length - 1]); // 1 100

// 숫자 배열의 내림차순 정렬. 비교 함수의 반환값이 0보다 작으면 b를 우선하여 정렬함
points.sort((a, b) => b - a);
console.log(points); // [100, 40, 25, 10, 5, 2, 1]

// 숫자 배열에서 최소/최대값 취득
console.log(points[points.length - 1], points[0]); // 1 100

// 객체를 요소로 갖는 배열을 정렬하는 예제는 다음과 같다
const toDos = [
  { id: 4, content: 'React' },
  { id: 1, content: 'Vue' },
  { id: 2, content: 'Typescript' },
];

// 비교 함수, 매개변수 key는 프로퍼티 키다.
function compare(key) {
  return (a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0);
}

// id를 기준으로 오름차순 정렬
toDos.sort(compare('id'));
console.log(toDos);
/*
[
  0: {id: 1, content: "Vue"},
  1: {id: 2, content: "Typescript"},
  2: {id: 4, content: "React"} 
]
*/

// content를 기준으로 오름차순 정렬
toDos.sort(compare('content'));
console.log(toDos);
/*
[
  0: {id: 4, content: "React"},
  1: {id: 2, content: "Typescript"},
  2: {id: 1, content: "Vue"}
]
*/

// 📄sort 메서드의 정렬 알고리즘
//

// 27.9.2 Array.prototype.forEach
// 조건문과 반복문을 제거, 변수의 사용을 억제해 상태 변경을 피하려는 프로그래밍 패러디임인 함수형 프로그래밍
// 특히 for 문은 반복을 위한 변수를 선언해야 하며, 조건식과 증감식으로 이루어져 있어서 추구하는 바와 맞지 않음
// forEach 메서드는 for 문을 대체할 수 있는 고차 함수다.
let numbers = [1, 2, 3, 4];
const pows = [];

// forEach 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출함
numbers.forEach((item) => pows.push(item ** 2));
console.log(pows); // [1, 4, 9, 16]

// forEach 메서드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달함
[1, 2, 3, 4].forEach((item, index, arr) => {
  console.log(
    `요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`,
  );
});
/*
요소값: 1, 인덱스: 0, this: [1, 2, 3, 4]
요소값: 2, 인덱스: 1, this: [1, 2, 3, 4]
요소값: 3, 인덱스: 2, this: [1, 2, 3, 4]
요소값: 4, 인덱스: 3, this: [1, 2, 3, 4]
*/

// forEach 메서드는 원본 배열(forEach 메서드를 호출한 배열, 즉 this)를 변경하지 않는다.
// 하지만 콜백 함수를 통해 원본 배열을 변경할 수는 있다.
console.clear();
// const numbers = [1, 2, 3, 4];

numbers.forEach((item, index, arr) => {
  arr[index] = item ** 2;
});
console.log(numbers); // [1, 4, 9, 16]

// forEach 메서드의 반환값은 언제나 undefined다.
// 이거 좀 이해안됨
const resultt = [1, 2, 3].forEach(console.log);
console.log(resultt); // undefined

// 두 번째 인수로 forEach 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달할 수 있음
class Numbers {
  numberArray = [];

  multiply1(arr) {
    arr.forEach(function (item) {
      this.numberArray.push(item * item);
    }, this);
  }

  multiply2(arr) {
    arr.forEach((item) => this.numberArray.push(item * item));
  }
}

const numbers1 = new Numbers();
numbers1.multiply1([1, 2, 3]);
console.log(numbers1.numberArray); // [1, 4, 9]

const numbers2 = new Numbers();
numbers2.multiply2([10, 20, 30]);
console.log(numbers2.numberArray); // [100, 400, 900]

// forEach 메서드의 폴리필
// polyfill-최신 사양의 기능을 지원하지 않는 브라우저를 위해 누락된 최신 사양의 기능을 구현하여 추가하는 것

// 만약 Array.prototype에 forEach 메서드가 존재하지 않으면 폴리필을 추가한다
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    // 첫 번째 인수가 함수가 아니면 TypeError를 발생시킨다
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
  };

  // this로 사용할 두 번째 인수를 전달받지 못하면 전역 객체를 this로 사용한다
  thisArg = thisArg || window;

  // for 문으로 배열을 순회하면서 콜백 함수를 호출한다
  for (var i = 0; i < this.length; i++) {
    // call 메서드를 통해 thisArg를 전달하면서 콜백 함수를 호출한다
    // 이때 콜백 함수의 인수로 배열 요소, 인덱스, 배열 자신을 전달한다
    callback.call(thisArg, this[i], i, this);
  }
}

// 이처럼 어찌구.. 536p
// forEach 메서드는 for문과 달리 break, continue 문을 사용할 수 없다.
// 다시 말해, 요소를 빠짐없이 모두 순회하며 중간에 순회를 중단할 수 없음
// 희소 배열의 경우 존재하지 않는 요소는 순회 대상에서 제외된다. map, filter, reduce 메서드 등에서도 마찬가지다

// 희소 배열
const arr11 = [1, , 3];

// for 문으로 희소 배열을 순회
for (let i = 0; i < arr11.length; i++) {
  console.log(arr11[i]); // 1, undefined, 3
}

// forEach 메서드는 희소 배열의 존재하지 않는 요소를 순회 대상에서 제외한다.
arr11.forEach((v) => console.log(v)); // 1, 3

// for 메서드는 for 문에 비해 성능이 좋지는 않지만 가독성은 더 좋다.
// 따라서 요소가 대단히 많은 배열을 순회하거나 시간이 많이 걸리는 복잡한 코드 또는
// 높은 성능이 필요한 경우가 아니라면 for 문 대신 forEach 메서드를 사용할 것을 권장한다.

// 27.9.3 Array.prototype.map
// 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출함
// 그리고 콜백 함수의 반환값들로 구성된 새로운 배열을 반환함 (원본 배열은 변경되지 않음)
// const numbers = [1, 4, 9, 16]
const roots = numbers.map((item) => Math.sqrt(item));
console.log(roots); // [1, 2, 3, 4]
console.log(numbers); // [1, 4, 9, 16]

// forEach, map 메서드의 공통점은 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출함
// 하지만 forEach는 언제나 undefined를, map은 콜백 함수의 반환값들로 구성된 새로운 배열을 반환하는 차이가 았음
// 즉, forEach는 단순히 반복문을 대체하기 위한, map은 요소값을 다른 값으로 매핑 mapping한 새로운 배열을 생성하기 위한 고차함수
// => map 메서드가 생성하여 반환하는 새로운 배열의 length 프로퍼티 값은 map 메서드를 호출한 배열의 length 프로퍼티 값과 반드시 일치함
//  즉, map 메서드를 호출한 배열과 map 메서드가 생성하여 반환한 배열은 1:1 매핑함

// 539p
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    return arr.map((item) => this.prefix + item);
  }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));

// 27.9.4 Array.prototype.filter
// 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출함
// 그리고 콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환 (원본 배열 변경되지 않음)
numbers = [1, 2, 3, 4, 5];
const odds = numbers.filter((item) => {
  // 홀수인 요소만 필터링 (1은 true로 평가됨)
  console.log(item % 2); // 1 0 1 0 1
  return item % 2;
});

console.log(odds); // [1, 3, 5]

// filter 메서드는 자신을 호출한 배열에서 특정 요소를 제거하기 위해 사용할 수도 있음
class Users {
  constructor() {
    this.users = [
      { id: 1, name: 'Lee' },
      { id: 2, name: 'Kim' },
    ];
  }

  // 요소 추출
  findById(id) {
    // id가 일치하는 사용자만 반환한다
    return this.users.filter((user) => user.id === id);
  }

  // 요소 제거
  remove(id) {
    // id가 일치하지 않는 사용자를 제거한다
    this.users = this.users.filter((user) => user.id !== id);
  }
}

const users = new Users();
console.log(users);

let user = users.findById(1);
console.log(user); // [{ id: 1, name: 'Lee' }]

// id가 1인 사용자를 제거한다
users.remove(1);

user = users.findById(1);
console.log(user); // []

// 27.9.5 Array.prototype.reduce
// 자신을 호출한 배열의 모든 요소를 순회하며 인수로 전달받은 콜백 함수를 반복 호출함
// 그리고 콜백 함수의 반환값을 다음 순회 시에 콜백 함수의 첫 번째 인수로 전달하면서 콜백 함수를 호출하여
// 하나의 결과값을 만들어 반환함. 이때 원본 배열은 변경되지 않음
//
// 첫 번째 인수로 콜백 함수, 두 번째 인수로 초기값을 전달받음. 콜백 함수에는 초기값 또는 콜백 함수의 이전 반환값,
// reduce 메서드를 호출한 배열의 요소값과 인덱스, reduce 메서드를 호출한 배열 자체, 즉 this가 전달됨

// 1부터 4까지 누적을 구함
sum = [10, 20, 30, 40].reduce((accumulator, currentValue, index, array) => {
  console.log(accumulator, currentValue, index);
  return accumulator + currentValue;
}, 0);
console.log(sum); // 100
// 0  10 0
// 10 20 1
// 30 30 2
// 60 40 3

// -평균 구하기
let values = [1, 2, 3, 4, 5, 6];

const average = values.reduce((acc, cur, i, { length }) => {
  // 마지막 순회가 아니면 누적값을 반환하고 마지막 순회면 누적값으로 평균을 구해 반환함
  // index === 5 ? 평균 : 누적값
  // return (acc + cur) / length -> 1.1600008573388203
  return i === length - 1 ? (acc + cur) / length : acc + cur;
}, 0);

console.log(average); // 3.5

// -최대값 구하기
values = [1, 4, 2, 3, 5];
const max = values.reduce((acc, cur) => {
  return acc > cur ? acc : cur;
}, 0);
console.log(max); // 5
// a > c : a : c
// 0 > 1 -> f 1
// 1 > 4 -> f 4
// 4 > 2 -> t 4
// 4 > 3 -> t 4
// 4 > 5 -> f 5

// -요소의 중복 횟수 구하기
fruits = ['ban', 'app', 'ora', 'ora', 'app'];
const count = fruits.reduce((acc, cur) => {
  console.log(acc, cur);
  acc[cur] = (acc[cur] || 0) + 1;
  console.log(acc);
  return acc;
}, {});
console.log(count);
// {}                       'ban' -> {ban: 1}
// {ban: 1}                 'app' -> {ban: 1, app: 1}
// {ban: 1, app: 1}         'ora' -> {ban: 1, app: 1, ora: 1}
// {ban: 1, app: 1, ora: 1} 'ora' -> {ban: 1, app: 1, ora: 2}
// {ban: 1, app: 1, ora: 2} 'app' -> {ban: 1, app: 2, ora: 2}

// -중첩 배열 평탄화 545p
// Array.prototype.flat 메서드를 사용하는 방법이 더 직관적

// -중복 요소 제거
values = [1, 2, 1, 3, 5, 4, 5];
result = values.reduce((acc, cur, i, arr) => {
  if (arr.indexOf(cur) === i) acc.push(cur);
  return acc;
}, []);
console.log(result); // [1, 2, 3, 5, 4]

// filter 메서드를 사용하는 방법이 더 직관적;
values = [1, 2, 2, 4, 6, 6];
result = values.filter((v, i, arr) => {
  console.log(v, i, arr);
  return arr.indexOf(v) === i;
});
console.log(result); // [1, 2, 4, 6]

// 27.9.6 Array.prototype.some
console.log(
  [5, 10, 15].some((item) => {
    // console.log(item); // 5 10 15
    return item < 10;
  }),
); // true

// 빈 배열은 언제나 false를 반환
console.log([].some((item) => item > 3)); // false

// 27.9.7 Array.prototype.every
console.log([5, 10, 15].every((item) => item >= 5)); // true
console.log([5, 10, 15].every((item) => item >= 10)); // false
// 빈 배열인 경우 언제나 true를 반환
console.log([].every((item) => item >= 3)); // true

// 27.8.9 Array.prototype.find
const names = [
  { id: 1, name: 'lee' },
  { id: 2, name: 'kim' },
  { id: 3, name: 'cho' },
  { id: 4, name: 'luv' },
];

// id가 4인 첫 번째 요소를 반환. 배열이 아니라 요소를 반환함
console.log(names.find((user) => user.id === 4)); // {id: 4, name: 'luv'}

// filter는 배열을 반환
console.log([1, 2, 2, 3].filter((item) => item === 2)); // [2, 2]
// find는 요소를 반환
console.log([1, 2, 2, 3].find((item) => item === 2)); // 2

// filter
const nctDream = [
  { name: 'Haechan', age: 22 },
  { name: 'Renjun', age: 22 },
  { name: 'Mark', age: 23 },
  { name: 'Jeno', age: 22 },
  { name: 'Jaemin', age: 22 },
  { name: 'Jisung', age: 20 },
  { name: 'Chenle', age: 21 },
];

// age가 22살인 멤버
const ageOf22 = nctDream.filter((mem) => mem.age === 22);
console.log(ageOf22);

// 27.9.9 Array.prototype.findIndex
// name이 'Haechan'인 요소의 인덱스 구하기
console.log(nctDream.findIndex((mem) => mem.name === 'Haechan')); // 0
// 프로퍼티 키와 값으로 요소의 인덱스를 구하는 경우 콜백 함수를 추상화할 수 있음
function predicate(key, value) {
  // key와 value를 기억하는 클로저를 반환
  return (item) => item[key] === value;
}
// age가 23인 요소의 인덱스 구하기
console.log(nctDream.findIndex(predicate('age', 23))); // 2

// 27.9.10 Array.prototype.flatMap
// map 메서드를 통해 생성된 새로운 배열을 평탄화한다. 즉, map 메서드와 flat 메서드를 순차적으로 실행하는 효과

arr = ['hello', 'world'];

// map과 flat을 순차적으로 실행
console.log(arr.map((x) => x.split('')));
// 0: ["h", "e", "l", "l", "o"]
// 1: ["w", "o", "r", "l", "d"]
console.log(arr.map((x) => x.split('')).flat());
// -> ["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"]

// flatMap은 map을 통해 생성된 새로운 배열을 평탄화함
console.log(arr.flatMap((x) => x.split('')));
// -> ["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"]
