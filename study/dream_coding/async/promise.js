'use strict';

/**
 * Promise is a Javascript object for asynchronous operation.
 * State: pending -> fulfilled or rejected
 * Producer vs Consumer
 */

// 1. Producer
// when new Promise is created, the excutor runs automatically.
// 새로운 프로미스가 만들어진 순간 전달한 excutor 콜백함수가 바로 실행되는 것을 유의
// 만약 네트워크 요청을 사용자가 요구했을 때(버튼)만 해야한다면 불필요한 네트워크 통신이 이루어짐
const promise = new Promise((resolve, reject) => {
  // doing some heavy work (network, read files)
  console.log('doing something...'); // 프로미스가 만들어진 순간 실행
  setTimeout(() => {
    resolve('vanilla 🍦');
    // reject(new Error('no network 😱'));
  }, 2000);
});

// 2. Consumers: then, catch, finally
promise //
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log('finally 🔥');
  });

// 3. Promise chaining
// then에서는 값을 바로 전달해도 되고 또 다른 프로미스도 전달 가능
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));

// 4. Error Handling
// 프로미스 체이닝 오류 처리
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${hen} => 🥚`), 1000);
  });
const born = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🐥`), 1000);
  });

getHen() //
  .then(getEgg)
  .then(born)
  .then(console.log);

// getHen()
//   .then((hen) => getEgg(hen))
//   .then((egg) => born(egg))
//   .then((hello) => console.log(hello));

// reject, catch
const getHenn = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });
const getEggg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`${hen} => 🥚`)), 1000);
  });
const bornn = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🐥`), 1000);
  });

getHenn()
  .then(getEggg)
  .catch((error) => {
    return '🍪';
  })
  .then(bornn)
  .then(console.log)
  .catch(console.log);
