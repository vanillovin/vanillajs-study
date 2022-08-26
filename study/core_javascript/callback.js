// callback function
// 부르다 호출하다 뒤돌아오다 되돌다 = 되돌아 호출해달라
// 내가 넘기고자하는 대상에 제어권을 맡긴다

// 특징
// 다른함수A의 인자로 콜백함수B를 전달하면, A가 B의 제어권을 갖게 된다.
// 제어권을 갖고있는 A는 특별한 요청(bind)가 없는한 A에 미리 정해놓은 방식에 따라 B를 호출한다.
// 미리 정해놓은 방식이란 어떤 '시점'에 콜백을 호출할지,
// '인자'에는 어떤 값들을 지정할지, 'this'에는 무엇을 바인딩할지 등이다.

// 주의! 콜백은 '함수'다.
var arr = [1, 2, 3, 4, 5];
var obj = {
  vals: [1, 2, 3],
  logValues: function (v, i) {
    if (this.vals) {
      console.log(this.vals, v, i);
    } else {
      console.log(this, v, i);
    }
  },
};
obj.logValues(1, 2); // 메소드로 호출
arr.forEach(obj.logValues); // 콜백함수로 전달
arr.forEach(obj.logValues, obj);

// 제어권
// -호출 시점
// var count = 0;
// var timer = setInterval(function () {
//   console.log(count);
//   if (++count > 4) clearInterval(timer);
// }, 300);
// debugger;
var count = 0;
var cbFunc = function () {
  console.log(count);
  if (++count > 4) clearInterval(timer);
};
var timer = setInterval(cbFunc, 300);

// -인자
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
var arr = [1, 2, 3, 4, 5];
var entries = [];
arr.forEach(
  function (v, i) {
    entries.push([i, v, this[i]]);
  },
  [10, 20, 30, 40, 50],
);
console.log(entries);
// [ [0, 1, 10], [1, 2, 20], [2, 3, 30], [3, 4, 40], [4, 5, 50] ]

var newArr = [10, 20, 30].map(function (currentValue, index) {
  console.log(currentValue, index);
  return currentValue + 5;
});
console.log(newArr);

// -this
// 콜백 함수도 함수이기 때문에 기본적으로는 this가 전역객체를 참조하지만,
// 제어권을 넘겨받을 코드에서 콜백 함수에 별도로 this가 될 대상을 지정할 경우 그 대상을 참조한다.
// https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener
document.body.innerHTML = '<div id="a" style="cursor: pointer">🍪</div>';
function cbFunc(x) {
  console.log(this, x);
}
document.getElementById('a').addEventListener('click', cbFunc);

Array.prototype.map = function (callback, thisArg) {
  var mappedArr = [];
  for (var i = 0; i < this.length; i++) {}
};

// -실행 시점
var cb = function () {
  console.log('1초마다 실행될 겁니다.');
};
// setInterval(cb, 1000);
