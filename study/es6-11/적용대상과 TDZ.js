// if문. for문. while문. switch-case문. '문단' 결과를 리턴하지 않아요.
// -> 문 자체가 하나의 block-scope가 된다.

// 식. expression. 값이 될 수 있는 경우.
// 값.

if (true) {

} // 실행하고 끝.

for (var i = 0; i < 10; i++) { }

while (true) { }

switch (a) { case: break; }

// Hoisting
// TDZ: Temporal Dead Zone (임시사각지대)
// Ecmascript에서 정의한 개념은 아닙니다.

// 1. 호이스팅
// 기존 var: 
// 1) 변수명만 위로 끌어올리고 
// 2) undefined 를 할당한다.

if (true) {
  let a = 10
  if (true) {
    console.log(a)
    const a = 20
    console.log(a)
  }
  console.log(a);
}
console.log(a);

// let, const:
// 1) 변수명만 위로 끌어올리고 / 끝.