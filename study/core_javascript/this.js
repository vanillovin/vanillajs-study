/**
 * THIS
 * ThisBinding은 실행컨텍스트가 활성화(함수 호출) 될 때 결정
 * 호출되는 방식에 따라 정적이 아닌 동적으로 바인딩
 * - 전역공간에서 > 전역객체 (window / global)
 * - 함수 호출시 > 전역객체 (window / global)
 * - 메소드 호출시 > 메소드 호출 주체 (메소드명 앞의 객체)
 * - callback 호출시 > 기본적으로는 함수내부에서와 동일, 제어권, 명시적
 * - 생성자함수 호출시 > 인스턴스
 * 함수는 (전역객체의) 메소드다! 라고 생각하자.
 * 명시적 this 바인딩. 위 규칙에 부합하지 않는 경우 this 예측
 * -call, apply 메서드는 this를 명시적으로 지정하면서 함수 또는 메서드 호출
 * -bind 메서드는 this 및 함수에 넘길 인수를 일부 지정해서 새로운 함수를 만듦
 * -요소를 순회하면서 콜백 함수를 반복 호출하는 내용의 일부 메서드는 별도의 인자로 this를 받기도 함
 */

// 1. 전역 공간에서
/* 브라우저 콘솔에서 */
console.log(this); // window
console.log(window);
console.log(this === window);
/* node.js에서 */
console.log(this); // global

/* 전역변수와 전역객체 */
// 자바스크립트의 모든 변수는 실은 특정 객체의 프로퍼티로서 동작
// 전역변수를 선언하면 자스엔진은 이를 전역객체의 프로퍼티로 할당한다
// var a = 1;
// console.log(a); // 1 window. 이 생략된 것으로 여겨도 무방
// console.log(window.a); // 1
// console.log(this.a); // 1

// 함수 vs 메서드 - 독립성
var func = function (x) {
  console.log(this, x);
};
func(1);
var obj = {
  method: func,
};
obj.method(2);

// 2. 함수 호출시 - 무조건 전역공간 그냥 외우기
// 함수를 실행한 순간 호출한 대상, 주체 -> 전역공간
// es6에서 this binding을 하지 않는 arrow function이 나옴
function a() {
  console.log(this);
}
a();

function b() {
  function c() {
    console.log(this);
  }
  c();
}
b();

var d = {
  e: function () {
    function f() {
      console.log(this);
    }
    f(); // 호출한 형태만 보기
  },
};
d.e();

// 3. 메소드 호출시
// 함수는 그 자체로 독립적으로 기능 수행하는 반면,
// 메소드는 자신을 호출한 대상 객체에 관한 동작을 수행
var a = {
  b: function () {
    console.log(this); // a
  },
};
a.b(); // .앞에

var a = {
  b: {
    c: function () {
      console.log(this); // a.b
    },
  },
};
a.b.c();

// 메서드의 내부함수에서의 this
var obj1 = {
  outer: function () {
    console.log(this); // obj1
    var innerFunc = function () {
      console.log(this); // window obj2
    };
    innerFunc();

    var obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod();
  },
};
obj1.outer();

// 내부함수에서의 우회법(메소드의 경우)
// es6 전 this를 다른 변수 안에 담았음(self, that, _this)
// var a = 10;
// var obj = {
//   a: 20,
//   b: function () {
//     console.log(this.a); // 20

//     function c() {
//       console.log(this.a); // 10
//     }
//     c();
//   },
// };
// obj.b();

var a = 10;
var obj = {
  a: 20,
  b: function () {
    var self = this;
    console.log(this.a);

    function c() {
      console.log(self.a);
    }
    c();
  },
};
obj.b();

// this 바인딩하지 않는 함수(화살표 함수)
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = () => {
      console.log(this);
    };
    innerFunc();
  },
};
obj.outer();

// 4. callback 호출시
// 콜백함수에서의 this
// 기본적으로는 함수의 this와 같다.
// 제어권을 가진 함수가 callback의 this를 명시한 경우 그에 따른다.
// 개발자가 this를 바인딩한 채로 callback을 넘기면 그에 따른다.
var callback = function () {
  console.dir(this); // window
};
var obj = {
  a: 1,
  b: function (cb) {
    cb(); // 함수호출
    // cb.call(this-obj);
  },
};
obj.b(callback);

var callback = function () {
  console.dir(this); // obj
};
var obj = {
  a: 1,
};
setTimeout(callback.bind(obj), 100);

setTimeout(function () {
  console.log(this); // window
}, 300);

[1, 2, 3, 4].forEach(function (x) {
  console.log(this, x); // window
});

document.body.innerHTML += '<div id="a">클릭하세요</div>';
var obj = { a: 1 };
document.getElementById('a').addEventListener(
  'click',
  function () {
    console.dir(this); // obj
  }.bind(obj),
);

// 5. 생성자 함수 호출시 - 생성될 인스턴스
function Person(n, a) {
  this.name = n;
  this.age = a;
}
var gomugom = new Person('고무곰', 30);
console.log(gomugom);

var Cat = function (name, age) {
  this.bark = '야옹';
  this.name = name;
  this.age = age;
};
var mint = new Cat('민트', 4);
var choco = new Cat('초코', 6);
console.log(mint, choco);

// 6. 명시적인 this 바인딩
// call과 apply는 즉시 호출, bind는 새로운 함수 생성(currying)
function aa(x, y, z) {
  console.log(this, x, y, z);
}
var bb = {
  c: 'eee',
};
// {c: "eee"} 1 2 3
aa.call(bb, 1, 2, 3);
aa.apply(bb, [1, 2, 3]);
var c = aa.bind(bb);
c(1, 2, 3);
var d = aa.bind(bb, 1, 2);
d(3);

// call 메서드
var obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};
obj.method(2, 3); // 1 2 3
obj.method.call({ a: 4 }, 5, 6); // 4 5 6

// apply 메서드
var func = function (a, b, c) {
  console.log(this, a, b, c);
};
func.apply({ x: 1 }, [4, 5, 6]); // {x:1} 4 5 6
obj.method.apply({ a: 4 }, [5, 6]); // 4 5 6

// 생성자 내부에서 다른 생성자를 호출
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}
function Student(name, gender, school) {
  Person.call(this, name, gender);
  this.school = school;
}
function Employee(name, gender, company) {
  Person.apply(this, [name, gender]);
  this.company = company;
}
var by = new Student('보영', 'female', '단대');
var jm = new Employee('재민', 'male', '구골');
console.log(by, jm);

// 여러 인수를 묶어 하나의 배열로 전달하고 싶을 때
// - apply 활용
console.clear();
var numbers = [10, 20, 3, 16, 45];
// var max = (min = numbers[0]);
// numbers.forEach(function (number) {
//   if (number > max) max = number;
//   if (number < min) min = number;
// });
// var max2 = Math.max.apply(null, numbers);
// var min2 = Math.min.apply(null, numbers);
// -ES6 펼치기 연산자 활용
const max3 = Math.max(...numbers);
const min3 = Math.min(...numbers);
console.log(max3, min3);

// bind 메서드
// 즉시 호출하지 않고 넘겨 받은 this 및 인수들을 바탕으로 새로운 함수 반환
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
func(1, 2, 3, 4);
var bindFunc1 = func.bind({ x: 1 });
bindFunc1(5, 6, 7, 8);
var bindFunc2 = func.bind({ x: 1 }, 4, 5);
bindFunc2(6, 7);
bindFunc2(8, 9);

// name 프로퍼티
var bindFunc = func.bind({ x: 1 }, 4, 5);
console.log(func.name); // func
console.log(bindFunc.name); // bound func

// 상위 컨텍스트의 this를 내부함수나 콜백 함수에 전달하기
// -우회법보다 call, apply, bind 메서드로 더 깔끔하게 처리 가능
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    };
    innerFunc.call(this);
  },
};
obj.outer();

var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    }.bind(this);
    innerFunc();
  },
};
obj.outer();

var obj = {
  logThis: function () {
    console.log(this);
  },
  logThisLater1: function () {
    setTimeout(this.logThis, 500);
  },
  logThisLater2: function () {
    setTimeout(this.logThis.bind(this), 1000);
  },
};
obj.logThisLater1(); // window
obj.logThisLater2(); // obj

// 별도의 인자로 this를 받는 경우(콜백 함수 내에서의 this)
// 콜백 함수와 함께 thisArg를 인자로 받는 메서드 92p
var report = {
  sum: 0,
  count: 0,
  add: function () {
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function (entry) {
      this.sum += entry;
      ++this.count;
    }, this);
  },
  average: function () {
    return this.sum / this.count;
  },
};
report.add(60, 85, 95);
console.log(report.sum, report.count, report.average());
