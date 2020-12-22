## 리엑트가 하는 일

리엑트 세계에서의 컴포넌트는 오직 랜더링과 업데이트만을 한다.

- Component Based Development

  - 독립적인 코드 블럭(HTML + CSS + JavaScript)
  - 작업의 단위

- Virtual DOM
- 이제는 DOM을 직접 다루지 않음

- JSX
  - NOT Templates
  - transpile to JS (Babel, TypeScript)

## Virtual DOM

우리가 실제 돔을 가지고 하는게 아니라 가짜 돔을 만들고 제어를 한다. 그리고 그 것을 가지고 리엑트가 랜더링을 대신 해준다.

왜 가상 돔을 쓰는 걸까? 만약 한 부분을 바꾸려면 가상 돔을 바꾸면 실제 돔도 바뀐다.
리엑트가 해주는 것은 우리가 직접 바꿀 필요가 없고 바꾸겠다고 말하면 react가 바뀐 부분만 바꿔준다.

## JSX

JSX는 templates가 아니다. templates는 html로 변환해 주지만 jsx는 html태그를 js로 변환해 준다.

변환 해주는 걸 도와주는게 Babel이나 TypeScript가 도와 준다.

```js
const element = <h1>Hello world!</h1>;
```

## component

HTML과 CSS와 JS를 합친 것이다.

컴포넌트가 아닌건 일반적인 html태그이다.

컴포넌트는 내가 지은 이름으로 태그를 만든다.

```js
<내가지은이름 prop={fale} />
```

이게 컴포넌트이다.

즉 우리는 이 컴포넌트를 작은 단위로 나뉘어서 작업을 할 것이다.

## CSR vs SSR

### CSR

- Js가 전부 다운로드 되어 리액트 애플리 케이션이 정상 실행되기 전까지는 화면이 보이지 않음
- Js가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행된 후 화면이 보이면서 유저가 인터렉션 가능

### SSR

- Js가 전부 다운로드 되지 않아도 일단 화면은 보이지만 유저가 사용 할 수 없음
- Js 가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행된 후 유저가 사용가능

## 리액트가 하는 일

리액트가 하는 일은 크게 2가지 이다.

하나. ReactDOM, react라는 2개의 라이브러리가 있다.

react를 가지고 컴포넌트를 만드는 것이다.

그 컴포넌트 중에 하얀 화면에다가 가장 큰 컴포넌트를 그려야하는데 그리는 역할을 하는게 ReactDOM이다. (import ReactDOM from 'react-dom')

## ReactDOM

ReactDOM에서 가장 많이 쓰이는 것은

```js
ReactDOM.render(
  <HelloMessage name="Mark">, // 무엇을 그릴 건지
  document.getElementById('hello-example')// 여기다 그릴것이고
)
```

이거다.

요런 함수를 쓰면 HTMLElement에 매칭해준다.

만들어진 리액트 컴포넌트를 실제 HTMLElement 에 연결할 때 ReactDOM을 이용한다.

## React 라이브러리

react라이브러리는 컴포넌트 만들 위한 라이브러리다.
