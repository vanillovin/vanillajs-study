// 3장 | 벨로퍼트와 함께 하는 모던 자바스크립트:
// 자바스크립트에서 비동기 처리 다루기
// 동기적(Synchronous), 비동기적(Asynchronous)

// 01. 비동기 처리의 이해
function work(callback) {
  setTimeout(() => {
    const start = Date.now(); // ms
    for (let i = 0; i < 100000000; i++) {}
    const end = Date.now();
    console.log(end - start + 'ms');
    callback(end - start);
  }, 0); // 4ms가 초깃값
}

// console.log('작업 시작!');
// work((ms) => {
//   console.log('작업이 끝났어요!');
//   console.log(ms + 'ms 걸렸다고 해요.');
// }); // 코드의 흐름이 여기서 멈춰있음
// work가 끝나고 난 다음에 비로소 다음 작업이 실행됨
// console.log('다음 작업');

// 만약 작업이 진행되는 동안 다른 작업도 계속 하고싶다면?
// setTimeout

// 02. Promise
// function increaseAndPrint(n, callback) {
//   setTimeout(() => {
//     const increased = n + 1;
//     console.log(increased);
//     if (callback) {
//       callback(increased);
//     }
//   }, 1000);
// }

// callback hell
// increaseAndPrint(0, (n) => {
//   increaseAndPrint(n, (n) => {
//     increaseAndPrint(n, (n) => {
//       increaseAndPrint(n, (n) => {
//         increaseAndPrint(n, (n) => {
//           console.log('작업 끝!');
//         });
//       });
//     });
//   });
// });

// 성공하면 resolve, 실패하면 reject 호출
// const myPromies = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('result');
//     // reject(new Error());
//   }, 1000);
// });

// myPromies
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.error(e);
//   });

// then을 연달아서 쓸 수 있음
function increaseAndPrint(n) {
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

// increaseAndPrint(0).then((n) => {
//   console.log('result: ', n);
// });

// increaseAndPrint(0)
//   .then((n) => {
//     return increaseAndPrint(n);
//   })
//   .then((n) => {
//     return increaseAndPrint(n);
//   })
//   .then((n) => {
//     return increaseAndPrint(n);
//   })
//   .then((n) => {
//     return increaseAndPrint(n);
//   })
//   .then((n) => {
//     return increaseAndPrint(n);
//   })
//   .catch((e) => {
//     console.error(e);
//   });

// 에러가 어디서 발생했는지 파악하기가 어려움
// 특정 조건으로 분기를 잡기도 어려움
// 특정 값을 공유해가면서 작업을 연달아서 하기 번거로움
// increaseAndPrint(0)
//   .then(increaseAndPrint)
//   .then(increaseAndPrint)
//   .then(increaseAndPrint)
//   .then(increaseAndPrint)
//   .then(increaseAndPrint)
//   .catch((e) => console.error(e));

// 03. async, await
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function process() {
  console.log('안녕하세요!');
  await sleep(1000);
  console.log('반갑습니다!');
}

process();

// 04. Promise all, Promise.race
