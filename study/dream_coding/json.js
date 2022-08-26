'use strict';
/*
JSON (JavaScript Object Notation)
- simplest data interchange format 데이터를 주고받을 때 쓸 수 있는 가장 간단한 파일 포맷
- lightweight text-based structure 텍스트를 기반으로 하여 가벼움
- easy to read 사람 눈으로 읽기 편함
- key-value pairs 키 벨류 파일 포맷 (형식)
* used for seralization and transmission of data between the network the connection
  데이터를 보통은 서버와 주고받을 때 직렬화하고 전송할 때 쓰임
- independent programming language and platform 프로그래밍 언어랑 플랫폼 상관 없음

'Client' <-- response응답- HTTP(Hypertext Transfer Protocal) -request요청 --> 'Server'
'object' <-- deserialize(비정렬화)- 변환 -seialize(직렬화) --> 'string(json)' *

-stringify(obj)
JSON interface에는 parse와 stringify 두 가지의 API가 있고, 전달되는 매개변수의 차이가 있음
이런아이?를 오버로딩(Overloading)이라고함! 오버로딩은 함수의 이름은 동일하지만 
어떤 파라미터, 몇 개를 전달하냐에 따라 각각 다른 방식으로 호출
*/


// 1. Object to JSON
// stringfy(obj) 

// boolean > JSON
let json = JSON.stringify(true); // *Ctrl+클릭*
console.log(json); // true

// Array > JSON
json = JSON.stringify(['apple', 'banana']);
console.log(json);
// > ["apple","banana"] 배열처럼 보이게 표기됨. json의 규격사항

// Object > JSON
const rabbit = {
  name: 'tori',
  color: 'white',
  size: null,
  birthDate: new Date(),
  jump: function () {
    console.log(`${this.name} can jump!`);
  },
};

json = JSON.stringify(rabbit);
console.log(json);
// > {"name":"tori","color":"white","size":null,"birthDate":"2020-12-28T11:58:36.348Z"}
// jump 함수는 포함 x. 함수는 오브젝트의 데이터가 아니기 때문에 제외되고 
// 자바스크립트의 특별한 데이터 symbol도 포함 안 됨

// replacer(콜백 함수)로 세밀하게 '통제' - 함수 형태, 배열 형태로 전달 가능
// 이름만 JSON으로 변경하고 싶다면? 해당하는 프로퍼티만 제이슨으로 변환됨
json = JSON.stringify(rabbit, ['name', 'color', 'size']);
console.log(json);
// > {"name":"tori","color":"white","size":null}

json = JSON.stringify(rabbit, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return value;
})

json = JSON.stringify(rabbit, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return key === 'name' ? 'vanilla' : value;
});
console.log(json);


// 2. JSON to Object
// parse(json)
json = JSON.stringify(rabbit);
console.log(json);
const obj = JSON.parse(json);
const obj = JSON.parse(json, (key, value) => {
  return key === 'birthDate' ? new Date(value) : value;
});
console.log(obj);
rabbit.jump();
// obj.jump();

console.log(rabbit.birthDate.getDate());
console.log(obj.birthDate);
console.log(obj.birthDate.getDate());