'use strict';

// JavaScript is synchronous.
// 자바스크립트는 동기적
// Execute the code block by orger after hoisting.
// 호이스팅이 된 이후부터 코드가 우리가 작성한 순서에 맞춰서 하나하나씩 동기적으로 실행
// hoisting: var, function declaration
// var변수, 함수 선언들이 자동적으로 제일 위로 올라가는 것

// 1. 동기와 비동기
// 동기 sync
console.log('1');
console.log('2');
console.log('3');
// 1 > 2 > 3

// 비동기 async
// 언제 코드가 실행될지 예측할 수 없음
console.log('1');
setTimeout(() => console.log('2'), 1000); // 브라우저가 제공하는 웹api
console.log('3');
// 1 > 3 > 2
// 자바스크립트는 코드를 위에서부터 아래로 실행함
// 먼저 콘솔로그 1을 만났네? > 1출력. 다음 줄 브라우저 api? 1초뒤에 실행
// 브라우저 API는 무조건 브라우저한테 먼저 요청을 보내고 응답을 기다리지 않고 넘어감
// 1초 지났네? 콜백함수 실행해! 그때 2를 실행

// 2. 콜백 마지막 정리
// 지금 당장 실행되지 않고 지정한 시점에 우리가 전달한 함수를 실행
// Call back 나중에 다시 불러줘~! 보통은 arrow function을 사용

// 그럼 콜백은 항상 비동기에 쓸까?
// 1. Synchronous callback
// 동기 콜백 - 즉각적으로 동기적으로 실행하는
function printImmediately(print) {
  print();
}
printImmediately(() => console.log('hello'));
// 함수의 선언은 호이스팅! 제일 위에 이 함수가 존재
// 1 > 3 > hello > 2

// 2. Asynchronous callback
// 비동기 콜백 - 나중에 언제 실행될지 예측할 수 없는
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log('async callback'), 2000);
// 1 > 3 > hello > 2 > async callback
// 아까처럼 함수 선언이 젤 위로 올라감

// 3. 콜백 지옥 체험 💩
// 콜백함수 안에서 다른 콜백함수를 부르고, 부르고, 부르고..
//  Callback Hell example
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === 'cocoa' && password === 'vanilla') ||
        (id === 'coder' && password === 'vanilla')
      ) {
        onSuccess(id);
      } else {
        onError(new Error('not found'));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === 'cocoa') {
        onSuccess({ name: 'cocoa', role: 'admin' });
      } else {
        onError(new Error('no access'));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt('enter your id!');
const password = prompt('enter your password');
userStorage.loginUser(
  id,
  password,
  (user) => {
    userStorage.getRoles(
      user,
      (userWithRole) => {
        alert(
          `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`,
        );
      },
      (error) => {
        console.log(error);
      },
    );
  },
  (error) => {
    console.log(error);
  },
);

/**
 * 4. 콜백 체인의 문제점
 * 가독성이 떨어지고 비즈니스 로직을 이해하기 어려움
 * 에러가 발생하거나 디버깅시 문제 분석과 유지보수가 힘듦
 */
