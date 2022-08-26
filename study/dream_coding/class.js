'use strict';

/**
 * Class
 * - template
 * - declare once
 * - no data in
 * 조금 더 연관있는 데이터를 묶은 컨테이너
 * name, age과 같은 속성 (field) & speak() 같은 행동 (method)
 *
 * Object
 * - instance of a class
 * - created many times
 * - data in
 */

// Object-oriendted programming
// class: template
// object: instance of a class
// JavaScript classes
//  - introduced in ES6
//  - syntactical sugar over prototype-based inheritance

// 1. Class declarations
class Person {
  // constructor
  constructor(name, age) {
    // fields
    this.name = name;
    this.age = age;
  }
  // methods
  speak() {
    console.log(`${this.name}: hello!`);
  }
}

const cocoa = new Person('cocoa', 22);
console.log(cocoa.name);
console.log(cocoa.age);
cocoa.speak();

// 2. Getter and setters
//  자판기 커피(class coffeeVendingMuchine), 커피 갯수(int number of coffee),
//  integer를 -1 설정 x, 커피는 가장 적은 수가 0 사용자가 0으로 설정하지 않게 getter, setter 사용
//  다른 사람이 자판기 커피 개수를 수정하지 못하게 private으로 만들기 (인캡슐레이션)
class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  get age() {
    return this._age;
  }
  set age(value) {
    this._age = value < 0 ? 0 : value;
  }
}

const user1 = new User('Chocola', 'Coco', -1);
console.log(user1.age);

// 3. Fields (public, private)
//  Too soon! 최신이라 아직 지원하지 않음. babel을 이용
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields
class Experiment {
  publicField = 2;
  #privateField = 0;
}
const experiment = new Experiment();
console.log(experiment.publicField); // 2
console.log(experiment.privateField); // undefined

// 4. Static properties and methods - Too soon!
//  오브젝트, 들어오는 데이터에 상관없이 공통적으로 클래스에서 사용하는 것
class Article {
  static publisher = 'Dream Coding';
  constructor(articleNumber) {
    this.articleNumber = articleNumber;
  }
  static printPublisher() {
    console.log(Article.publisher);
  }
}

const article1 = new Article(1);
const article2 = new Article(2);
console.log(article1.publisher); // u
console.log(Article.publisher);
Article.printPublisher();

/**
 * 상속 & 다양성
 */

// 5. Inheritance
//  a way for one class to extend another class.
class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    console.log(`drawing ${this.color} color!`);
  }
  getArea() {
    return width * this.height;
  }
}

// extends 연장 - Shape의 모든 것이 Rectangle에 포함됨
class Rectangle extends Shape {}

// 다양성 - 필요한 함수를 재정의 overwriting
class Triangle extends Shape {
  draw() {
    super.draw(); // 부모의 메서드도 호출
    console.log('🔺'); // 우리가 재정의
  }
  getArea() {
    return (this.width * this.height) / 2;
  }
  toString() {
    return `Triangle: color: ${this.color}`;
  }
}

const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw();
console.log(rectangle.getArea());
const triangle = new Triangle(20, 20, 'red');
triangle.draw();
console.log(triangle.getArea());

// 6. Class checking: instanceOf
//  object는 class를 이용해서 만든 새로운 instance
//  왼쪽에 있는 object가 오른쪽 class의 instance 인지 아닌지
console.log(rectangle instanceof Rectangle); // t
console.log(triangle instanceof Rectangle); // f
console.log(triangle instanceof Triangle); // t
console.log(triangle instanceof Shape); // t
console.log(triangle instanceof Object); // t
console.log(triangle.toString());

let obj = { value: 5 };
function change(value) {
  value.value = 7;
}
change(obj);
console.log(obj);
