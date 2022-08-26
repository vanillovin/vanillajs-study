// prototype 상속
function Person() {}

Person.prototype.hello = function () {
  console.log('hello');
};

function Korean(region) {
  this.region = region;
  this.where = function () {
    console.log('where', this.region);
  };
}

Korean.prototype = Person.prototype;

const k = new Korean('Seoul');

k.hello();
k.where();

console.log(k instanceof Korean); // t
console.log(k instanceof Person); // t
console.log(k instanceof Object); // t

// 객체 리터럴
const a = {};
console.log(a, typeof a); // {} object

const b = { name: 'Mark' };
console.log(b, typeof b); // { name: 'Mark' } object

const c = {
  name: 'Mark',
  hello1() {
    console.log('hello1', this);
  },
  hello2: function () {
    console.log('hello2', this);
  },
  hello3: () => {
    console.log('hello3', this);
  },
};

c.hello1();
c.hello2();
c.hello3();

// hello1 {
//   name: 'Mark',
//   hello1: [Function: hello1],
//   hello2: [Function: hello2],
//   hello3: [Function: hello3]
// }
// hello2 {
//   name: 'Mark',
//   hello1: [Function: hello1],
//   hello2: [Function: hello2],
//   hello3: [Function: hello3]
// }
// hello3 {} <- this 바인딩이 되지 않는다
