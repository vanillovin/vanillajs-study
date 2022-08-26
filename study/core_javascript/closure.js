// CLOSURE
// 닫힘 / 폐쇄 / 완결성
// 함수 X 그 함수가 선언될 당시의 L.E
// 실컨 A의 내부에서 함수 B를 선언한 상황! 실컨 A와 함수 B가 콤비가 되어 무언가를 한다!!
// > B의 outerEnvironmentReference는 A의 environmentRecord를 참조.
// > 컨텍스트 A에서 선언한 변수를 내부함수 B에서 접근할 경우에만 발생하는 특수한 현상
var outer = function () {
  var a = 1;
  var inner = function () {
    console.log(++a);
  };
  inner();
};
outer();

// 컨텍스트 A에서 선언한 변수 a를 참조하는 내부함수 B를 A의 외부로 전달할 경우,
// A가 종료된 이후에도 a가 사라지지 않는 현상
// 지역변수가 함수 종료 후에도 사라지지 않게 할 수 있다.
// 함수 종료 후에도 사라지지 않는 지역변수를 만들 수 있다!
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
};
var outer2 = outer();
console.log(outer2()); // 2
console.log(outer2()); // 3

function a() {
  var localA = 1;
  var localB = 2;
  var localC = 3;
  return {
    get a() {
      return localA;
    },
    set a(v) {
      localA = v;
    },
    get b() {
      return localB + localC;
    },
    set b(v) {
      throw Error('read only');
    },
  };
}
var obj = a();
