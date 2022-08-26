/**
 * Async - Await
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function
 * async function 함수이름(){}
 * const 함수이름 = async () => {}
 */

// Promise 객체를 리턴하는 함수

// function p(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(ms);
//     }, ms);
//   });
// }

// Promise 객체를 이용해서 비동기 로직을 수행할 때

// p(1000).then((ms) => {
//   console.log(`${ms} ms 후에 실행된다.`);
// });

// // Promise 객체를 리턴하는 함수를 await 로 호출하는 방법

// (async function main() {
//   const ms = await p(1000);
//   console.log(`${ms} ms 후에 실행된다.`);
// })();

// main();

// Promise 객체가 rejected 된 경우의 처리를 위해
// try catch 를 이용한다.

// function p(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // resolve(ms)
//       reject(new Error('reason'));
//     }, ms);
//   });
// }

// (async function main() {
//   try {
//     const ms = await p(1000);
//   } catch (error) {
//     console.log(error);
//   }
// })();

// async function 에서 return 되는 값은
// Promise.resolve 함수로 감싸서 리턴된다.

// function p(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // resolve(ms)
//       reject(new Error('reason'));
//     }, ms);
//   });
// }

// async function asyncP() {
//   return 'Mark';
// }

// (async function main() {
//   try {
//     const name = await asyncP(1000);
//     console.log(name);
//   } catch (error) {
//     console.log(error);
//   }
// })();

//

// function p(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(ms);
//       // reject(new Error('reason'));
//     }, ms);
//   });
// }

// async function asyncP() {
//   const ms = await p(1000);
//   return 'Mark: ' + ms;
// }

// (async function main() {
//   try {
//     const name = await asyncP(1000);
//     console.log(name);
//   } catch (error) {
//     console.log(error);
//   }
// })();

//

// function p(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // resolve(ms);
//       reject(new Error('reason'));
//     }, ms);
//   });
// }

// async function asyncP() {
//   const ms = await p(1000);
//   return 'Mark: ' + ms;
// }

// (async function main() {
//   try {
//     const name = await asyncP(1000);
//     console.log(name);
//   } catch (error) {
//     console.log(error);
//   }
// })();

// finally

// function p(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // resolve(ms);
//       reject(new Error('reason'));
//     }, ms);
//   });
// }

// async function asyncP() {
//   const ms = await p(1000);
//   return 'Mark: ' + ms;
// }

// (async function main() {
//   try {
//     const name = await asyncP(1000);
//     console.log(name);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     console.log('end');
//   }
// })();

// function p(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(ms);
//     }, ms);
//   });
// }

// Promise
// p(1000)
//   .then(() => p(1000))
//   .then(() => p(1000))
//   .then(() => {
//     console.log('3000 ms 후에 실행');
//   });

// async await

// (async function main() {
//   await p(1000);
//   await p(1000);
//   await p(1000);
//   console.log('3000 ms 후에 실행');
// })();

function p(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

// Promise.all

// (async function main() {
//   const results = await Promise.all([p(1000), p(2000), p(3000)]);
//   console.log(results);
// })();

// Promise.race

(async function main() {
  const result = await Promise.race([p(1000), p(2000), p(3000)]);
  console.log(result);
})();
