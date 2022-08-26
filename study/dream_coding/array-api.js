// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array

// Q1. make a string out of an array
// join(separator?: string): string;
// Adds all the elements of an array separated by the specified separator string.
// 배열의 모든 아이들을 전달한 separated로 통해 스트링으로 리턴
{
  const fruits = ['apple', 'banana', 'orange'];
  const result = fruits.join(',');
  console.log(result); // apple,banana,orange
}

// Q2. make an array out of a string
{
  const fruits = '🍎, 🥝, 🍌, 🍒';
  const result = fruits.split(',');
  console.log(result); // ["🍎", " 🥝", " 🍌", " 🍒"]
}

// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
  const array = [1, 2, 3, 4, 5];
  const result = array.reverse();
  console.log(result); // [5, 4, 3, 2, 1]
  console.log(array); // [5, 4, 3, 2, 1] 배열 자체를 바꿈
}

// Q4. make new array without the first two elements
// splice는 배열 자체에서 데이터를 삭제 slice는 원하는 부분만만 리턴1
{
  const array = [1, 2, 3, 4, 5];
  const result = array.slice(2, 5);
  console.log(result); // [3, 4, 5]
  console.log(array); // [1, 2, 3, 4, 5]
}


class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}

const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
];

// Q5. find a student with the score 90
{
  const result = students.find((student) => student.score === 90);
  console.log(result);
}

// Q6. make an array of enrolled students
{
  const result = students.filter((student) => student.enrolled);
  console.log(result);
}

// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
// map: 배열 안에 들어있는 모든 요소들을 우리가 전달한 콜백 함수를 호출하면서 콜백 함수에세 가공(리턴)된 값들로 대체
// 콜백 함수에서 의미없는 이름(item, value..)은 이해하기 어려움
{
  const result = students.map((student) => student.score);
  console.log(result);
}

// Q8. check if there is a student with the score lower than 50
// some: 배열의 요소 중에서 콜백 함수 리턴이 true가 되는 애가 있는지 없는지 확인
// every: 배열에 들어있는 모든 요소들이 이 조건을 충족해야 true가 리턴
// 배열에서 하나라도 이 조건에 만족되는 값이 있으면 some, 모든 배열의 조건이 만족되야 할 때 every
{
  const result = students.some((student) => student.score < 50);
  console.log(result); // true

  const result2 = !students.every((student) => student.score >= 50);
  console.log(result2); // false
}

// Q9. compute students' average score
// 학생들의 평균 점수 구하기
// reduce
// Calls the specified callback function for all the elements in an array. 
// 콜백함수는 배열 안에 들어있느 모든 요소들마다 호출이 됨 (filter, sum, every와 비슷)
// The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
// 이 콜백함수에서 리턴되는 값은 함께 누적된 결과값을 리턴함
// => 배열에 있는 모든 요소들의 값을 누적하는 (함께 모아놓을 때?) 쓰는 함수
// => 우리가 원하는 시작점부터 모든 배열을 돌면서 어떤 값을 누적할 때 쓰는거구나.. 그래..
// reduceRight는 뒤에서부터 시작함!
// previousValue는 이전에 콜백함수에서 리턴된 값이 전달되어져 오고, 
// currentValue은 배열의 아이템을 순차적으로 전달받는다!
{
  // 배열 하나하나씩 순차적으로 'curr'에 전달이 되는데, 
  // 'prev'는 우리가 'return'한 값이 다음에 호출될 때 'prev'로 전달(연결)됨
  const result = students.reduce((prev, curr) => {
    console.log('----------');
    console.log(prev);
    console.log(curr);
    return prev + curr.score;
  }, 0);
  console.log(result / students.length);
}
// =>
{
  const result = students.reduce((prev, curr) => prev + curr.score, 0)
  console.log(result / students.length);
}

// Q10. make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
{
  // 묶어서 작성하는 것을 함수형 프로그래밍이라고 함
  const result = students // 점수로 변환 [45, 80, 90, 66, 88]
    .map((student) => student.score) // 점수로 변환
    .filter((score) => score >= 50) // 50점 이상인 아이들만 필터링
    .join(); // 문자열 반환
  console.log(result); // 80,90,66,88
}

// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
// sort
// 콜백함수에는 a와 b, 즉 이전 값과 현재 값이 전달이 되는데 
// 네가 만약 마이너스 값을 리턴하게 되면 첫 번째가 뒤에 것보다 작다고 간주돼서 정렬이 됨
// .sort((a, b) =>  a - b) 만약 b가 a보다 크다면 마이너스 벨류
{
  const result = students
    .map((student) => student.score) // 점수로 변환
    .sort((a, b) => b - a) // a - b > 45,66,80,88,90
    .join(); // sorting된 아이들 join
  console.log(result); // 90,88,80,66,45
}