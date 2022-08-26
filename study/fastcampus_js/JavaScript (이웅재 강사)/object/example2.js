// 표준 내장 객체
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects

// Array
const a = new Array('red', 'black', 'white');
console.log(a, typeof a); // [ 'red', 'black', 'white' ] object
console.log(a instanceof Array); // true
console.log(a instanceof Object); // true

const b = ['red', 'green', 'yellow'];
console.log(b, typeof b); // [ 'red', 'green', 'yellow' ] object
console.log(b instanceof Array); // true
console.log(b instanceof Object); // true

console.log(b.slice(0, 1)); // [ 'red' ]
console.log(Array.prototype.slice, Object.prototype.slice); // [Function: slice] undefined
