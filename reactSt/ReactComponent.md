# 리엑트 컴포넌트 만드는 법

리엑트는 컴포넌트를 해서 웹사이트를 잘 만드는게 우리의 목적이다.

## Hooks 이전과 이후

Hooks 이전에는 컴포넌트 내부에 상태가 있다면 class를 해서 만들고 라이프사이클을 사용해야 한다면 class를 오버라이징 해서 사용한다. 관계가 없다면 function을 사용한다.

Hooks 이후에는 class또는 function인데 지금은 hip한게 함수형 프로그래밍이다. 그래서 function을 쓰자.
(사람마다 뭐가 좋은지는 사람마다 다르다.)

## class로 컴포넌트 만들기

Class 컴포넌트를 만들 때는 아래와 같이 만든다.

```js
class Component extends React.Component {
  render() {
    return (
      ... // jsx
    )
  }
}

```

class는 render메서드가 필수 이다.

## function 컴포넌트 만들기

function 컴포넌트를 만들 때는 아래와 같이 만든다.

```js
function Component() {
  return (
    ... // jsx
  )
}

ReactDOM.render(<Component />, document.getElementById('root'));
```

이중 규칙이 있는데 함수 이름 앞에는 무조건 대문자 여야지 컴포넌트이다.

나중에 import로 해서 라이브러리가 제공하는 컴포넌트나 함수를 가져오는데 거의 앞이 대문자로 시작하면 컴포넌트라고 생각하면 되고 소문자로 시작하면 변수나 함수로 생각 하면 쉽다.

## props와 state

렌더를 다시 그리게 해주는 원인이 props와 state이다.

이 2개가 렌더를 다시 하게 되는 요인이다.

Props는 컴포넌트 외부에서 컴포넌트에게 주는 데이터입니다.
ex) 이미지 태그에 경로를 넣어주면 이미지가 받아서 화면에 보여준다.

State는 컴포넌트 내부에서 변경할 수 있는 데이터 입니다.
ex) 내부에서 1일때 그려졌던게 a는 2일때 바뀌면 다시 그린다.

props나 state가 바뀌면 render함수가 다시 호출되어서 다시 그린다.

## Render 함수

클래스 컴포넌트에서의 렌더함수 함수 컴포넌트에서의 렌더함수를 어떻게 설정하느냐에 따라서 어떻게 바꿀지 우리가 만드는 것이다.

```js
render() {
  if (props.a === 1) {
    return (
      ...jsx
    )
  } else {
    return (
      ...(jsx)
    )
  }
}
```

## Hooks 이전

class 내부에 초기값을 설정하는 방법은 2가지 이다.

1. State ={};
2. constructor

이렇게 클래스 필드에서 설정을 한다.

```js
class Component extends React.Component {
	state = {
		count: 1,
	};

	render() {
		<div>
			<p>Count: {this.state.count}</p>
		</div>;
	}
}
```

위와 같이 초기값을 설정할 수 있다.

## State값을 바꾸는 법

State값을 바꾸는 방법은 this.setState()로 바꿀 수 있다.

## 이벤트 핸들러

React핸들러는 이벤트 핸들러를 달때는 어트리뷰트 방식으로 이벤트를 등록한다.

```js
<button onClick={click}></button>
```

이런 식으로 이벤트를 달은다.

## Component Lifecycle

### Component 생성 및 마운트(< 16.3)

constructor
componentWillMount (일어날꺼같은거)
render() (우리가 알고 있는 렌더 함수)
componentDidMount (끝)

Declarative(디클레러티브)

initialzation => Mounting => updation => Unomunting

### Component 라이프 사이클 변경 (v16.3)

constructor
componentWillMount => getDerivedStateFromProps (props로부터 state를 derived한다. 해야하는 일 ex) 먹는 곳)
render
componentDidMount

componentWillReceiveProps => getDerivedStateFromProps
shouldComponentUpdate
render
componentWillUpdate => getSnapshotBeforeUpdate
(dom에 적용)
componentDidUpdate
componentWillUnmount

### getDerivedStateFromProps

```js
import React from "react";

class App extends React.Component {
	state = {
		age: 0,
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		console.log(nextProps, prevState);
		if (prevState.age !== nextProps.age) {
			return { age: nextProps.age };
		}

		return null;
	}

	render() {
		console.log("App render");
		return <div>{this.state.age}</div>;
	}
}

export default App;
```

### getSnapshotBeforeUpdate

```js
import React from "react";
import "./App.css";

let i = 0;

export default class App extends React.Component {
	state = { list: [] };

	getSnapshotBeforeUpdate(prevProps, prevState) {
		if (prevState.list.length === this.state.list.length) return null;
		const list = document.querySelector("#list");
		return list.scrollHeight - list.scrollTop;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (snapshot === null) return;
		const list = document.querySelector("#list");
		list.scrollTop = list.scrollHeight - snapshot;
	}

	componentDidMount() {
		setInterval(() => {
			this.setState({
				list: [...this.state.list, i++],
			});
		}, 1000);
	}

	render() {
		return (
			<div id='list' style={{ height: 100, overflow: "scroll" }}>
				{this.state.list.map((i) => (
					<div>{i}</div>
				))}
			</div>
		);
	}
}
```

### Component 생성 및 마운트(< 16.3)

```js
class App extends React.Component {
	state = {
		count: 0,
	};
	render() {
		console.log("render"); // 3
		return (
			<div>
				<p>{count}</p>
			</div>
		);
	}

	constructor(props) {
		super(props);
		console.log("constructor"); // 1
	}
	componentWillMount() {
		console.log("componentWillMount"); // 2

		// 여기서 render에서 일어나는 일을 하면 안되고
	}

	componentDidMount() {
		// 꽤 많이 쓰인다.
		console.log("componentDidMount"); // 4
		//여기서 render된 직후니 뭐 할 수 있다.
		// 여기서 하는건 명확히 정해져 있다.
		// 1. 타이머
		// 2. API를 호출하는 일
		// 3. 렌더 된 결과들이 먼가 하기(최초에만 해야하는 일)
		// 뷰와 관련된 초기 설정
	}
}
```

이렇게 된다.
