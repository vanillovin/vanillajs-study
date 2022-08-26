let a = 1
function f() {
  console.log(a, b, c)
  let b = 2
  console.log(a, b, c)
  if (true) {
    let c = 3
    console.log(a, b, c)
  }
  console.log(a, b, c)
}
f()

// let

// 1) 재할당 가능

let a = 1
a = 2
console.log(a)

// 2) 반복문 내에서의 함수 실행시

var funcs = []
for (var i = 0; i < 10; i++) {
  funcs.push(function() {
    console.log(i)
  })
}
funcs.forEach(function(f) {
  f()
})

let funcs = []
for (let i = 0; i < 10; i++) {
  funcs.push((function(v) {
    return function () {
      console.log(v)
    }
  })(i))
}
funcs.forEach(function(f) {
  f()
})

let funcs = []
for (let i = 0; i < 10; i++) {
  funcs.push(function() {
    console.log(i)
  })
}
funcs.forEach(function(f) {
  f()
})

// const
// constant variable: 상수 변수

// 참조형 데이터를 상수변수에 할당할 경우

const OBJ = {
  prop1: 1,
  prop2: 2
}
// OBJ  = 10
OBJ.prop1 = 3

let a = { a: 1 }
const b = a
a = 20
a // 20
b // {a: 1}

// @10: a -> @30
// @30: { a: 1 }
// @11: b -> @30
// @10: a -> @1020
// @1020: 20
// 참조하고있는주소가없으면사라짐(GC)