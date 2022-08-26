// 3장
// 1. 비동기 처리의 이해
// 작업을 동기적(Synchronous)으로 처리하게 된다면 작업이 끝날 때까지 기다리는 동안 준비 상태가 되기 때문에 다른 작업을 할 수 없음
// 비동기적(Asynchronous)으로 처리한다면 코드를 실행할 때 흐름이 멈추지 않음. 동시에 여러 가지 작업을 처리하고
// 기다리는 과정에서 다른 함수를 호출할 수 있음

// 함수 내에서 하고자하는 작업이 백그라운드에서 수행되므로, 기존의 코드 흐름을 막지 않고 동시에 다른 작업을 진행할 수 있음
function work() {
  setTimeout(() => {
    const start = Date.now();
    for (let i = 0; i < 1000000000; i++) {}
    const end = Date.now();
    console.log(end - start + 'ms');
  }, 0);
}
console.log('작업 시작');
work();
console.log('다음 작업');

// work 함수가 끝난 다음 어떤 다른 작업을 하고 싶다면 콜백함수를 파라미터로 전달!
// 콜백함수란 함수 타입의 값을 파라미터로 넘겨줘서 받은 함수를 특정 작업이 끝난 후 호출하는 것
function work(callback) {
  setTimeout(() => {
    const start = Date.now();
    for (let i = 0; i < 1000000000; i++) {}
    const end = Date.now();
    console.log(end - start + 'ms');
    callback(end - start);
  }, 0);
}
console.log('작업 시작');
work((ms) => {
  console.log('작업이 끝났어요!');
  console.log(ms + 'ms 걸렸어요');
});
console.log('다음 작업');

// >지금은 단순히 연산량이 많은 작업을 비동기적으로 처리했지만, 나중에는 주로
// -Ajax Web API 요청: 서버 쪽에서 데이터를 받아와야 할 경우에 요청을 하고 서버에서 응답을 할 때까지 대기해야
// -파일 읽기: 주로 서버 쪽에서 읽어와야 하는 경우
// -암호화 / 복호화, 작업 예약

// 2. Promise
// 콜백함수로 처리하면 비동기 작업이 많아질 경우 코드가 쉽게 난잡해짐

// -숫자 n을 파라미터로 받고 다섯 번에 걸쳐서 1초마다 1씩 더해서 출력하는 작업을 set으로 구현
// callback hell
function increaseAndPrint(n, callback) {
  setTimeout(() => {
    const increased = n + 1;
    console.log(increased);
    if (callback) {
      callback(increased);
    }
  }, 1000);
}

increaseAndPrint(0, (n) => {
  increaseAndPrint(n, (n) => {
    increaseAndPrint(n, (n) => {
      increaseAndPrint(n, (n) => {
        increaseAndPrint(n, (n) => {
          console.log('작업 끝');
        });
      });
    });
  });
});

// 1초 뒤에 성공하는 promise 예제
// resolve, reject를 파라미터로 받고 성공할 수도 실패할 수도 있음.
//성공할 때는 resolve, 실패하는 상황에는 reject 함수를 호출

const myPromise = new Promise((resolve, reject) => {
  // 구현....
  setTimeout(() => {
    resolve('result');
  }, 1000);
});

// promise가 끝나고 어떤 작업을 하고 싶으면 then을 사용
myPromise.then((result) => {
  console.log('result');
});

// 1초 뒤에 실패하는 promise 예제
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error());
  }, 1000);
});

myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.error(e);
  });

// promise를 만드는 함수 작성
// 값이 5가 된다면 실패처리
function increaseAndPrint() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const value = n + 1;
      if (value === 5) {
        const error = new Error();
        error.name = 'ValueIsFiveError';
        reject(error);
        return;
      }

      console.log(value);
      resolve(value);
    }, 1000);
  });
}

increaseAndPrint(0).then((n) => {
  console.log('result: ', n);
});
