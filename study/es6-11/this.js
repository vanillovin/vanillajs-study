var value = 0;
var obj = {
  value: 1,
  setValue: function () {
    this.value = 2; // this: obj -> obj.value = 2;
    // var self = this;
    (function () {
      // self.value = 3;
      this.value = 3; // this: window -> window.value = 3;
                      // 전역 value = 3
    })();
  },
};
obj.setValue();
console.log(value); // 3
console.log(obj.value); // 2

// 블록스코프는 this에 영향을 받지 않는다.
var value = 0;
var obj = {
  value: 1,
  setValue: function () {
    this.value = 2;
    {
      this.value = 3;
    }
  },
};
obj.setValue();
console.log(value); // 0
console.log(obj.value); // 3
