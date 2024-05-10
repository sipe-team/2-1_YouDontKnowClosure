# YDKJS

- NaN 은 === 연산자와 쓰지말자
- JS는 인터프리터 언어라고 하지만 컴파일언어이기도 한다
- == 는 느슨한 동등 비교연산자가 아닌 강제 변환 동등 비교 연산자 라고 설명하는게 적합하다고 생각

---

## 스코프

이 책에서 왜 초반부터 JavaScript가 인터프리터 언어가 아닌 컴파일 과정을 거치는 컴파일 언어라는 이야기를 했었는지 이 장에 들어서 알 수 있었다. 한 줄 씩 읽어 실행하는 인터프리터 언어라면 아래의 코드에서 에러가 나는게 이상하다.

```jsx
console.log('hi dasom');

var name = .'dasom';
// SyntaxError: unexpected token.
```

한 줄 씩 읽어 실행되는 언어라면 콘솔이 찍히고 난 뒤에 에러가 나는 게 맞지만, 실제로 이 코드를 실행시켜보면 콘솔은 찍히지 않고 에러가 표시된다. 이는 JS 엔진에서 코드를 실행하기 전에 전체 프로그램을 먼저 파싱하기 때문이다.

### 호이스팅

```jsx
function saySomething() {
  var greeting = "hi";
  {
    greeting = "how are you?"; // 여기서 오류 발생
    let greeting = "hello!";
    console.log(greeting);
  }
}

saySomething();
// ReferenceError: Cannnot access 'greeting' before initialization
```

이 예문에서 에러는 JS에서 어떻게 프로그램을 파싱하는지, 스코프가 어떻게 작용하는지 더 두드러지게 보인다.

오류가 발생하는 스코프 바깥에서 greeting을 선언하였지만 그보다 더 가까운 스코프 내에서 let으로 새로 선언하였고, 그 선언전에 접근하려다가 생기는 before initialization 에러가 표시된다.

이는 프로그램이 실행되기 전 파싱이 이뤄져야만 이런 스코프와 선언에 관한 처리가 정확해지는 것이다.

이 책에서는 이를 스코프를 담당하는 ‘스코프 매니저’가 처리하는 것이라 표현하기도 한다.

## 클로저

흔히 클로저를 변수의 순간 상태를 기록한 스냅숏이라고 착각하는 경우가 있는데, 클로저는 실시간으로 변수 자체에 언제든 접근할 수 있도록 관계를 맺어주는 라이브 링크라고 볼 수 있다. 그렇기 때문에 클로저를 통해 값을 읽는 것 뿐만 아니라 수정, 재할당할 수도 있다.

```jsx
var keeps = [];

for (var i = 0; i < 3; i++) {
  keeps[i] = function keepI() {
    // i를 감쌈
    return i;
  };
}

keeps[0](); // 3
keeps[1](); // 3
keeps[2](); // 3
```
