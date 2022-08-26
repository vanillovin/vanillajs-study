// 내부도 다 상수로 만들고 싶다.
// 해결방안: Object.freeze(), Object.defineProperty()

const OBJ1 = {
  prop: 1
}
Object.freeze(OBJ1)
// OBJ1.prop1 = 10

const OBJ2 = {
  prop: 1,
  prop2: [ 1, 2, 3 ]
}
Object.freeze(OBJ2)
// OBJ2.prop2 = 10
OBJ2.prop[1] = 20
// 참조형데이터는얼지않음

Object.freeze(OBJ2.prop2)

// 1) obj 자체를 얼린다.
// 2) obj 내부의 프로퍼티들을 순회하면서, 혹시 참조형이면, 1)반복 -> 재귀.

// DeepFreezing
// DeepCopy 깊은복사

// 얕은복사: 객체의 프로퍼티들을 복사 (depth 1단계까지만)
// 그냥같은배열을참조.프로퍼티가가리키는메모리만복사
// 깊은복사를 해야만 immutable 하다. <-> mutable
// 불변객체. -> 매번새로운객체를생성

var a = {
  a: 1,
  b: [1, 2, 3],
  c: { d: 1, e: 2 }
}
 
var b = Object.assign({}, a)
b // { a: 1, b: [ 1, 2, 3 ], c: { d: 1, e: 2 }}
b.b[1] = 20
console.log(a.b) // [ 1, 20, 3 ]

b.b = Object.assign([], a.b)
console.log(b); // { a: 1, b: [ 1, 20, 3 ], c: { d: 1, e: 2 }}
console.log(a); // { a: 1, b: [ 1, 2, 3 ], c: { d: 1, e: 2 }}

// 깊은복사: 객체의 프로퍼티들을 복사 (모든 depth에 대해서)
// 1) 프로퍼티들을 복사한다.
// 2) 프로퍼티들 중에 참조형이 있으면, 1) 반복 --> 재귀.

