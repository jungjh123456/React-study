# component and props


## 함수 컴포넌트와 클래스 컴포넌트

컴포넌트를 정의하는 가장 간단한 방법은 JavaScript 함수를 작성하는 것 입니다.
```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

이 함수는 데이터를 가진 하나의 props 객체 인자를 받은 후 React 엘리먼트를 반환하므로 유효한 React 컴포넌트 입니다. 이러한 컴포넌트는 JavaScript 함수이기 때문에 말 그대로 함수 컴포넌트라고 호칭합니다.

또한 class를 사용하여 컴포넌트를 정의할 수 있습니다.

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
React의 관점에서 볼 때 위 두 가지 유형의 컴포넌트는 동일합니다.

class는 몇 가지 추가 기능이 있으며 이에 대해서는 다음 장에서 설명합니다. 그때까지는 간결성을 위해 함수 컴포넌트를 사용하겠습니다. 함수 컴포넌트와 클래스 컴포넌트 둘 다 몇 가지 추가 기능이 있습니다.

## 컴포넌트 렌더링

이전까지는 React 엘리먼트를 DOM 태그로 나타냈습니다.

```js
const element = <div />;
```

React 엘리먼트는 사용자 정의 컴포넌트로도 나타낼 수 있습니다.

```js
const element = <Welcome name="Sara" />;
```

React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달합니다. 이 객체를 "props"라고 합니다.

```js
function welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);

```

이 예시에서는 다음과 같은 일들이 일어난다.

1. <Welcome name="Sara" />엘리먼트로 ReactDOM.render()를 호출합니다.
2. React는 {name: 'Sara'}를 props로 하여 Welcome 컴포넌트를 호출합니다.
3. Welcome 컴포넌트는 결과적으로 <h1>Hello, Sara</h1>엘리먼트를 반환합니다.
4. ReactDOM은 <h1>Hello, Sara</h1>엘리먼트와 일치하도록 DOM을 효율적으로 업데이트 합니다.

> 컴포넌트의 이름은 항상 대문자로 시작합니다. 
  React는 소문자로 시작하는 컴포넌트를 DOM 태그로 처리합니다.

## 컴포넌트 합성

컴포넌트는 자신의 출력에 다른 컴포넌트를 참조할 수 있습니다. 이는 모든 세부 단계에서 동일한 추상 컴포넌트를 사용할 수 있음을 의미합니다. React 앱에서는 버튼, 폼, 다이얼로그, 화면 등의 모든 것들이 흔히 컴포넌트로 표현됩니다.

예를 들어 Welcome을 여러 번 렌더링 하는 App 컴포넌트를 만들 수 있습니다.

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
    <Welcome name="Sara" />
    <Welcome name="Cahal" />
    <Welcome name="Edite" />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root');
);
```

일반적으로 새 React 앱은 최상위에 단일 App 컴포넌트를 가지고 있습니다. 하지만 기존 앱에 React를 통합하는 경우에는 Button과 같은 작은 컴포넌트부터 시작해서 뷰 계층의 상단으로 올라가면서 점진적으로 작업해야 할 수 있습니다.

## 컴포넌트 추출

컴포넌트를 여러 개의 작은 컴포넌트로 나누는 것을 거북하게 느끼지 않도록 하자.

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
      {formatDate(props.date)}
      </div>
    </div>
  )
}
```

이 컴포넌트는 객체,text 및 date(날짜)를 props로 받은 후 소셜 미디어 웹 사이트의 코멘트를 나타냅니다.

이 컴포넌트는 구성요소들이 모두 중첩 구조로 이루어져 있어서 변경하기 어려울 수 있으며, 각 구성요소를 개별적으로 재사용하기도 힘듭니다. 이 컴포넌트에서 몇 가지 컴포넌트를 추출하겠습니다.

```js
function Avatar(props) {
  return (
    <img className="Avatar" 
    src={props.user.avatarUrl} 
    alr={props.user.name}
    />
  );
}
```

Avatar는 자신이 Comment내에서 렌더링 된다는 것을 알 필요가 없습니다. 따라서 props의 이름을 author에서 더욱 일반화된 user로 변경하였습니다.

props의 이름은 사용될 context가 아닌 컴포넌트 자체의 관점에서 짓는 것을 권장한다.

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
    </div>
    <div className="Comment-text">
      {props.text}
    </div>
    <div className="Comment-date">
      {formatDate(props.date)}
    </div>
  );
}
```

다음으로 Avatar 옆에 사용자의 이름을 렌더링하는 UserInfo컴포넌트를 추출합니다.

```js
function UserInfo(props) {
  return (
    <div className="UserInfo">
    <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```
comment

```js
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

## props는 읽기 전용이다.

함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안됩니다. 다음 sum함수를 살펴보자

```js
function sum(a, b) {
  return a + b;
}
```
이런 함수들은 순수 함수라고 호칭합니다. 입력값을 바꾸려 하지 않고 항상 동일한 입력값에 대해 동일한 결과를 반환하기 때문입니다.

반면에 다음 함수는 자신의 입력값을 변경하기 때문에 순수 함수가 아니다.

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React는 매우 유연하지만 한가지 엄격한 규칙이 있습니다.

모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수 처럼 동작해야 합니다.
