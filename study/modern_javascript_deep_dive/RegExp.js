/**
 * 31장 RegExp
 */

/* 31.1 정규 표현식이란? */
// 정규 표현식regular expression은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는
// 형식 언어(formal language)다. 자바스크립트의 고유 문법이 아니며, 대부분의 프로그래밍 언어와
// 코드 에디터에 내장되어 있다. 자바스크립트는 펄Perl의 정규 표현식 문법을 ES3부터 도입했다.

// 사용자로부터 입력받은 휴대폰 전화번호
const tel1 = '010-1234-567팔';
const tel2 = '010-1234-5678';

// 정규 표현식 리터럴로 휴대폰 전화번호 패턴을 정의한다.
let regExp = /^\d{3}-\d{4}-\d{4}$/;

// tel이 휴대폰 전화번호 패턴에 매칭하는지 테스트(확인)한다.
console.log(regExp.test(tel1)); // f
console.log(regExp.test(tel2)); // t

// 만약 정규표현식을 사용하지 않는다면 반복문과 조건문을 통해 한 문자씩 연속해서 체크해야 한다.

/**
 * 31.2 정규 표현식의 생성
 * 정규 표현식 객체(RegExp 객체)를 생성하기 위해서는 정규 표현식 리터럴과 RegExp 생성자 함수를 사용할 수 있다.
 * 일반적인 방법은 정규 표현식 리털럴을 사용하는 것이다.
 * /regexp/i
 * 시작, 종료기호 / 패턴(pattern) / 플래그(flag)
 */

let target = 'Is this all there is?';

// 패턴: is
// 플래그: i => 대소문자를 구별하지 않고 검색한다.
let regexp = /is/i;

// test 메서드는 target 문자열에 대해 정규 표현식 regexp의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.
console.log(regexp.test(target)); // t

/**
 * RegExp 생성자 함수를 사용하여 RegExp 객체를 생성할 수도 있다.
 * pattern: 정규 표현식의 패턴
 * flags: 정규 표현식의 플래그(g, i, m, u, y)
 *
 * new RegExp(pattern[, flags])
 */

target = 'Is this all there is?';

regexp = new RegExp(/is/i); // ES6
// const regexp = new RegExp(/is/, 'i');
// const regexp = new RegExp('is', 'i');
console.log(regexp.test(target)); // t

/* 31.3 RegExp 메서드 */
// 정규표현식을 사용하는 메서드는 RegExp.prototype.exec, test, matech, replace, serach, split 등이 있다.

// 31.3.1 RegExp.prototype.exec
// exec 메서드는 인수로 전달받은 문자열에 대해 정규표현식의 패턴을 검색하여 매칭 결과를 배열로 반환한다.
// 매칭 결과가 없는 경우 null을 반환한다.
target = 'Is this all there is?';
regExp = /is/;
console.log(regExp.exec(target));
// ["is", index: 5, input: "Is this all there is?", groups: undefined]

// 31.3.2 RegExp.prototype.test
// 인수로 전달받은 문자열에 대해 정규표현식의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.
target = 'Is this all there is?';
regExp = /is/;
console.log(regExp.test(target)); // t

// 31.3.3 String.prototype.match
// String 표준 빌트인 객체가 제공하는 match 메서드는
// 대상 문자열과 인수로 전달받은 정규표현식과의 매칭 결과를 배열로 반환한다.
target = 'Is this all there is?';
regExp = /all/;
console.log(target.match(regExp));
// ["all", index: 8, input: "Is this all there is?", groups: undefined]

// exec 메서드는 문자열 내의 모든 패턴을 검색하는 g 플래그를 지정해도 첫 번째 매칭 결과만 반환한다.
// 하지만 String.prototype.match 메서드는 g 플래그가 지정되면 모든 매칭 결과를 배열로 반환한다.
target = 'Sugar Sugar Rune';
regExp = /sugar/gi;
console.log(target.match(regExp));
// ["Sugar", "Sugar"]

/**
 * 31.4 플래그
 * 플래그는 옵션이므로 선택적으로 사용할 수 있으며,
 * 순서와 상관없이 하나 이상의 플래그를 동시에 설정할 수도 있다.
 * 어떠한 플래그를 사용하지 않은 경우 대소문자를 구별해서 패턴을 검색한다.
 *
 *   의미        설명
 * i Ignore case 대소문자를 구별하지 않고 패턴을 검색한다.
 * g Global      대상 문자열 내에서 패턴과 일치하느 모든 문자열을 전역 검색한다.
 * m Multi line  문자열의 행이 바뀌더라도 패턴 검색을 계속한다.
 */

target = 'Is this all there is?';

// is 문자열을 대소문자 구별하여 한 번만 검색
console.log(target.match(/is/));
// ["is", index: 5, input: "Is this all there is?", groups: undefined]

// 대소문자를 구별하지 않고 한 번만 검색
console.log(target.match(/is/i));
// ["Is", index: 0, input: "Is this all there is?", groups: undefined]

// 대소문자를 구별하여 전역 검색
console.log(target.match(/is/g));
// ["is", "is"]

// 대소문자 구별하지 않고 전역 검색
console.log(target.match(/is/gi));
// ["Is", "is", "is"]

/**
 * 31.5 패턴
 * 정규표현식은 패턴과 플래그로 구성된다.
 * 패턴은 문자열의 일정한 규칙을 표현하기 위해 사용하며,
 * 플래그는 정규표현식의 검색 방식을 설정하기 위해 사용한다.
 * 패턴은 /로 열고 닫으며 문자열의 따옴표는 생략한다. 포함시 따옴표까지 패턴에 포함되어 검색된다.
 * 또한 패턴은 특별한 의미를 가지는 메타문자meta character 또는 기호로 표현할 수 있다.
 * 어떤 문자열에 패턴과 일치하는 문자열이 존재할 때 '정규표현식과 매치match한다'고 표현한다.
 */

// 31.5.1 문자열 검색
// 정규 표현식의 패턴에 문자 또는 문자열을 지정하면 검색 대상 문자열에서 패턴으로 지정한 문자 또는 문자열을 검색한다.
target = 'Is this all there is?';

// 'is' 문자열과 매치하는 패턴. 플래그가 생략되었으므로 대소문자를 구별한다.
regExp = /is/;

// target과 정규 표현식이 매치하는지 테스트
console.log(regExp.test(target)); // t

// target과 정규 표현식의 매칭 결과를 구현
console.log(target.match(regExp));
// ["is", index: 5, input: "Is this all there is?", groups: undefined]

// 대소문자를 구별하지 않고 검색하려면 플래그 i를 사용
regExp = /is/i;
console.log(target.match(regExp));
// ["Is", index: 0, input: "Is this all there is?", groups: undefined]

// 31.5.2 임의의 문자열 검색
// .은 임의의 문자 한 개를 의미한다. 문자의 내용은 무엇이든 상관없다. 다음 예제의 경우
// .을 3개 연속하여 패턴을 생성했으므로 문자의 내용과 상관없이 3자리 문자열과 매치한다.
target = 'Is this all there is?';

// 임의의 3자리 문자열을 대소문자를 구별하여 전역 검색
regExp = /.../g;

console.log(target.match(regExp));
// ["Is ", "thi", "s a", "ll ", "the", "re ", "is?"]

// 31.5.3 반복 검색
// {m,n}은 앞선 패턴(다음 예제의 경우 A)이 최소 m번, 최대 n번 반복되는 문자열을 의미한다.
// 콤마 뒤에 공백이 있으면 정상 동작하지 않으므로 주의하기 바란다.

target = 'A AA B BB Aa Bb AAA';

// {n} = {n,n}
regExp = /A{2}/g;
console.log(target.match(regExp));
// ["AA", "AA"]

// {n,} = 최소n번 = +
regExp = /A{1,}/g;
console.log(target.match(regExp));
// ["A", "AA", "A", "AAA"]

regExp = /A+/g;
console.log(target.match(regExp));
// ["A", "AA", "A", "AAA"]

// ? = 최대한번 = {0,1}
target = 'color colour';

// 'colo' 다음' u'가 최대 한 번(0번 포함) 이상 반복되고
// 'r'이 이어지는 문자열 'color', 'colour'를 전역 검색한다.
regExp = /colou?r/g;
console.log(target.match(regExp));
// ["color", "colour"]
