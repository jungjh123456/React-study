# react

## 컴포넌트

독립적인 코드 블럭을 컴포넌트라고 한다.
(HTML, CSS, JavaScript)

react는 컴포넌트 단위로 작업을 해서 유지보수 면에서도 유용하다.

이때 컴포넌트는 무엇을 컴포넌트라고 할까? View를 따지면 해더영역 메인영역 푸터영역 등등 이렇게 나뉘어서 작업을 했을 것이다. 하지만 react를 하면 헤더영역 메인영역 푸터영역 각각 컴포넌트로 관리를 하고
헤더영역안에서도 작은 컴포넌트 단위로 만든다. 그리고 전체 뷰는 큰 컴포넌트라고 할 수 있다.

컴포넌트 단위로 하면 (HTML, CSS, JavaScript 전체를 한 컴포넌트에서 관리 할 수있다.)

그리고 react를 할 때 진짜 DOM을 건드는게 아니라 가상으로 존재하는 DOM을 조작하고 실제 DOM은 react가 알아서 해준다. 

일단 왜 진짜 DOM을 건들지 않는게 더 좋은가? 이것은 리랜더링 관점에서 보면 실제 DOM을 건들다 보면 불필요하게 리렌더링을 할 경우가 있다. 그래서 react는 가상의 돔을 우리가 제어를 하고 react가 가상의 돔과 실제 돔을 비교해서 달라진 부분만 리랜더링 하는 방식이다.

하지만 리엑트는 모든 면에서 좋지만 이 기술을 까면서 나온 기술이 있다. 그게 svelte다. 
svelte의 첫 화면엔 가상의 돔을 만들지 않고 리얼 돔을 직접 건든다. 라고 광고를 한다.
svelte는 진짜 돔을 건들지만 svelte가 알아서 해줄게 라는 패러다임인거 같다.
하지만 나는 그래도 react가 더 좋은 느낌이 든다...

## JSX 

JSX는 javascript를 확장한 문법이지만 사실은 자바스크립트로 변환되는 코드이다.

> template는 html로 변환이 되지만 jsx는 javascript로 변환이 된다.

```js
const element = <h1>Hello, world</h1>;
```
위 코드가 JSX이다. 이 것은 babel이 javascript로 변환을 시켜준다.

## JSX 란?

React에서는 이벤트가 처리되는 방식 시간에 따라 state 가 변하는 방식 화면에 표시하기 위해 데이터가 준비되는 방식 등 렌더링 로직이 본질적으로 다른 UI 로직과 연결된다는 사실을 받아 들입니다.

React는 별도의 파일에 마크업과 로직을 넣어 기술을 인위적으로 분리하는 대신 둘 다 포함하는 컴포넌트라고 부르는 느슨하게 연결된 유닛으로 관심사를 분리합니다. 

React는 JSX사용이 필수가 아니지만 대부분의 사람은 JavaScript 코드 안에서 UI관련 작업을 할 때 시각적으로 더 도움이 된다고 한다.

JSX에 표현식을 포함시키려면 JavaScript와 비슷한 템플릿 리터럴같이 $ 이거 없이 중괄호로 감싸는 방식을 쓴다.

```js
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

JSX의 중괄호 안에는 유효한 모든 JavaScript 표현식을 넣을 수 있습니다.

```js
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}
const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root');
)

```

JSX도 표현식이다.

컴파일이 끝나면 JSX 표현식이 정규 JavaScript 함수 호출이 되고 JavaScript 객체로 인식됩니다.

## JSX 속성 정의

속성에 따옴표를 이용해 문자열 리터럴을 정의할 수 있습니다.

```js
const element = <div tabIndex="0"></div>;
```
중괄호를 사용하여 어트리뷰트에 JavaScript 표현식을 삽입할 수도 있습니다.

```js
const element = <img src={user.avatarUrl}></img>;
```

어트리뷰트에 JavaScript 표현식을 삽입할 때 중괄호 주변에 따옴표를 입력하면 안된다. 따옴표 또는 중괄호 중 하나만 사용하고, 동일한 어트리뷰트에 두가지를 동시에 사용하면 안됩니다.

## JSX는 주입 공격을 방지합니다

JSX에 사용자 입력을 삽입하는 것은 안전합니다.

```js
const title = response.potentiallyMaliciousInput;
//이것은 안전
const element = <h1>{title}</h1>;
```

기본적으로 React DOM은 JSX에 삽입된 모든 값을 렌더링 하기 전에 이스케이프 하므로 애플리케이션에서 명시적으로 작성되지 않은 내용은 주입되지 않습니다. 모든 항목은 렌더링 되기 전에 문자열로 변환됩니다. 
이런 특성으로 인해 XSS공격을 방지할 수 있습니다.

## JSX는 객체를 표현한다.

Babel은 JSX를 React.createElement()호출로 컴파일 한다.

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
)
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

이 두 예시는 동일하다.

React.createElement()는 버그가 없는 코드를 작성하는 데 도움이 되도록 몇 가지 검사를 수행하며, 기본적으로 다음과 같은 객체를 생성합니다.

```js
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};

```

이러한 객체를 React엘리먼트라고 하며 이를 화면에 표시하려는 항목에 대한 설명이라고 생각할 수 있습니다.

React는 이러한 객체를 읽은 후 DOM을 구성하고 최신으로 유지하는 데 이러한 객체를 사용합니다.

