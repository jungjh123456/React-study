## Hooks & Context

Hooks NEW in React 16.8
컴포넌트 간 통신
Context API

## Basic Hooks

1. useState: 보통 class 컴포넌트에서 state를 쓰는 것 처럼 function 컴포넌트에서 쓸려고 나온 것
2. useEffect: 보통 함수에서는 라이프스타일을 사용할 수 없다. componentDidMount, componentDidUpdate를 처리할 수 없기 때문에 나온 것이다.
   하지만 100% 맞는 말이 아니다.

깊이 있게 사용하는 것은 어렵다.

react-create-app 을해서 새로운 프로젝트를 만들자.

컴포넌트 폴더를 만들고 Example1.jsx 컴포넌트를 만들자.

class로 만드는 컴포넌트를 만들자.

Example1.jsx

```js
import React from 'react';

export default class Example1 extends React.Component {
  state = {
    count: 0,
  }
  render() {
    const {count} = this.state
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={this.click}>Click me</button>
      </div>
    )
  }
  click = () => {
    this.setState({count} => ({count: count + 1}));
  }
}
```

App.js

```js
function App() {
	return <Example1 />;
}
```

추가한다.
이렇게 만든다.

함수 컴포넌트를 만들기 위해 Example2.jsx 를 만들자.

```js
import { useState } from "react";

export default function Example2() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={this.click}>Click me</button>
		</div>
	);
	function click() {
		// setState => 두 번째 배열 요소
		setCount(count + 1);
	}
}
```

App.js

```js
function App() {
	return (
		<>
			<Example1 />;
			<Example2 />;
		</>
	);
}
```

setCount가 불리면 어떻게 되냐? 새로운 count값을 바꾸고 그 count로 렌더를 다시 한다.
그래서 useState를 사용하면 setState처럼 사용할 수 있다.

그리고 useState는 배열로 준것이다. 왜 그러나? 그것은 이름을 자유롭게 쓰려고 배열상태로 준다.
그래서 여러개의 useState를 사용할 수 있다.

그런데 이렇게 단일 요소 하나만 관리하지 않고 객체로 관리를 하는 방법이 있다.

다시 새로운 Newfile 해서 Example3.jsx를 만들자.

```js
import { useState } from "react";

// state = { count: 0 }
export default function Example3() {
	const [state, setState] = useState({ count: 0 });

	return (
		<div>
			<p>You clicked {state.count} times</p>
			<button onClick={this.click}>Click me</button>
		</div>
	);
	function click() {
		// setState => 두 번째 배열 요소
		// setState({ count: state.count + 1 }); // 이렇게 도 사용할 수 있고 함수로도 사용가능하다.
		setState(({ count }) => ({ count: state.count + 1 }));
	}
}
```

```js
function App() {
	return (
		<>
			<Example1 />;
			<Example2 />;
			<Example3 />
		</>
	);
}
```

이런 식으로 만든다.

setState를 함수로 넣는 이유는 {count: state.count + 1} 이렇게 하지 않고 함수는 현재 state값을 가지고 그걸 조작해서 뭔가 데이터를 뭔가 조작해서 보통 함수를 넣는다.
static한 값이 바뀔 때는 객체로 넣는게 문법적으로 맞다.

const [스테이트 값, 스테이브 변경 함수] = useState(스테이트 초기값);

기존까지는 함수 컴포넌트라고 하면 Stateless Component 라고 했었다. 그래서 실제로 Stateless Functional Component (SFC)라고 이름이 불려 졌지만
훅이 나오고 나서 Functional Component(FC)가 되었다. 즉 Stateless 가 아니라 State를 사용할 수 있는 함수인 것이다.

왜 이런 일을 하나?

- 컴포넌트 사이에서 상태와 관련된 로직을 재사용하기 어려웠다. 기존에 클래스를 사용했던 상태만 따로 빼서 이식시키기 어려웠다.
- 컨테이너 방식 말고 상태와 관련된 로직
- 복잡한 컴포넌트들은 이해하기 어렵다.
- class는 사람과 기계를 혼동시킨디ㅏ.(컴파일 단계에서 코드를 최적화 하기 어렵게 만든다.)
- this.state 는 로직에서 레퍼런스를 공유하기 때문에 문제가 발생할 수 있다. (제일 중요)

지금 훅을 사용했던 코드는 count가 결국은 const이다. 그래서 이 코드가 의미하는 것은 사실은 count가 0일때는 항상 return 값이 되는 거고 새로 바뀌면 바뀐 count로 렌더를 다시 하는 것이다.

Example1에서 클래스에서 보면 this.state는 결국에는 이전상태에서도 state가 있고 바뀐 상태에서도 state가 있다. 클래스가 한번 객체화 하면은 state를 가지고 있어서 타이밍 차이가 있는 일에선 앞에상태와 뒤에 상태가 제대로 반영하지 못하는 단점이 있다.

이해가 안된다면

[useEffect관련자료](https://rinae.dev/posts/a-complete-guide-to-useeffect-ko)

```js
function Counter() {
	const [count, setCount] = useState(0);
	function handleAlertClick() {
		setTimeout(() => {
			alert("You clicked on: " + count);
		}, 3000);
	}
	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
			<button onClick={handleAlertClick}>Show alert</button>
		</div>
	);
}
```

이 자료에서 보자. 클래스에서 만드는 카운트 버튼이 있다. 이것을 3번 누르고 show alert라는 settimeout을 걸어둔 버튼이 alert가 3초뒤에 나온다. 이것을 누르고 3초 사이에 다시 카운트를 다시 누르면 카운트가 올라간다. state가 갖고 있어서 그 이후에 값으로 뜰 뿐이고 하지만 함수 컴포넌트에서는 3번 누르고 alert를 누르고 다시 눌려도 안 바뀔 것이다.

함수는 함수기 때문에 한번 함수기 때문에 한번 실행하면 끝나는 것이다. 하지만 클래스에서의 스테이트는 객체가 만들어지면서 파괴하기 전까지 스테이트 값을 물고 있어서 그렇다.

이처럼 컨트롤 할 수 없는 상황에는 훅이 좋다인데 과연 좋은 것일까? function 컴포넌트에서 이를 5로 뛰울 수 있을까? 공유해야 할 상황에 대한 처리가 어려워진다.(물론 안되지는 않는다.) -> 일반적인 방법으로는 안된다.

- useState
- state를 대체 할 수 있지만 완벽히 같지는 않는다. 클래스 컴포넌트에서는 reference를 공유하고 함수 컴포넌트는 reference를 공유하지 않고 그 시점에 렌더를 하기 때문입니다.
- useEffect
- 라이프 사이클 훅을 대체 할 수 있다.
  - componentDidMount
  - componentDidUpdate
  - componentWillUnmount

componentDidMount, componentDidUpdate는 밑에와 같이 사용한다.

```js
import React from "react";

export default class Example4 extends React.Component {
	state = { count: 0 };
	componentDidMount() {
		console.log("componentDidMount", this.state.count);
	}

	componentDidUpdate() {
		console.log("componentDidUpdate", this.state.count);
	}

	render() {
		const { count } = this.state;
		return (
			<div>
				<p>You clicked {count} times</p>
				<button onClick={this.click}>Click me</button>
			</div>
		);
	}

	click = () => {
		this.setState({ count: this.state.count + 1 });
	};
}
```

클래스 컴포넌트에서 오버라이드 해서 사용을 한다. componentDidMount 시점에 API를 호출했었다. 이게 가장 필요한 아이이다.

useEffect를 가지고 이용해 보자.

Exampe5.jsx를 만들어 보자.

```js
import { useState } from "react";
// state = { count: 0 }
export default function Example5() {
	const [count, setCount] = useState(0);

	// 2개의 인자를 받는다. 하나는 함수
	useEffect(() => {
		console.log("componentDidMount & componentDidUpdate");
	});

	return (
		<div>
			<p>You clicked {state.count} times</p>
			<button onClick={this.click}>Click me</button>
		</div>
	);
	function click() {
		// setState => 두 번째 배열 요소
		// setState({ count: state.count + 1 }); // 이렇게 도 사용할 수 있고 함수로도 사용가능하다.
		setState(count + 1);
	}
}
```

이렇게 하면 useEffect 가 콘솔에 한번 뜬다. componentDidMount의 의미이다. 그리고 클릭을 하면 componentDidUpdate의 의미이다.
componentDidMount만 하고 싶으면

```js
import { useState } from "react";
// state = { count: 0 }
export default function Example5() {
	const [count, setCount] = useState(0);

	// 2개의 인자를 받는다. 하나는 함수 이 아이는 시점이 없다.
	useEffect(() => {
		console.log("componentDidMount & componentDidUpdate");
	}); // 시점을 지정하지 않으면 무조건 랜더 된 직후를 의미 한다.

	// 2번째 인자로 빈 배열을 넣으면 componentDidMount만 실행한다. 즉 함수는 실행되는 아이(한일?)를 의미하고 2번째 인자인 배열은 시점을 이야기 하는 것이다.(언제의 뜻?)
	useEffect(() => {
		console.log("componentDidMount");
	}, []); // 시점이 빈 배열이면 최초에 렌더 된 직후를 의미(의존성?)

	return (
		<div>
			<p>You clicked {state.count} times</p>
			<button onClick={this.click}>Click me</button>
		</div>
	);
	function click() {
		// setState => 두 번째 배열 요소
		// setState({ count: state.count + 1 }); // 이렇게 도 사용할 수 있고 함수로도 사용가능하다.
		setState(count + 1);
	}
}
```

완전히 LifeCycle이랑 다른 의미이다. 랜더가 일어난 화면에 그려진 직 후를 의미하는 건데 그게 언제 직후인지 의미하는 것을 두 번째 인자로 세분화 할 수 있다.
사실은 이것을 통해서 componentDidMount구현할 수 있지만 얘는 원레 이것을 하기위해 태어난 아이가 아니다.

그리고 componentWillUnmount를 할 것이다 즉 컴포넌트가 사라질때 componentWillUnmont가 한다.

```js
import { useState } from "react";
// state = { count: 0 }
export default function Example5() {
	const [count, setCount] = useState(0);

	// 2개의 인자를 받는다. 하나는 함수 이 아이는 시점이 없다.
	useEffect(() => {
		console.log("componentDidMount & componentDidUpdate");
	}); // 시점을 지정하지 않으면 무조건 랜더 된 직후를 의미 한다.

	// 2번째 인자로 빈 배열을 넣으면 componentDidMount만 실행한다. 즉 함수는 실행되는 아이(한일?)를 의미하고 2번째 인자인 배열은 시점을 이야기 하는 것이다.(언제의 뜻?)
	useEffect(() => {
		console.log("componentDidMount");

		return () => {
			console.log("componentWillUnmount");
		}; // 함수를 리턴을 한다. 함수를 반환하면 해당 함수는 다음 랜더를 하기 전에 실행한다.
	}, []); // 시점이 빈 배열이면 최초에 렌더 된 직후를 의미(의존성?)

	return (
		<div>
			<p>You clicked {state.count} times</p>
			<button onClick={this.click}>Click me</button>
		</div>
	);
	function click() {
		// setState => 두 번째 배열 요소
		// setState({ count: state.count + 1 }); // 이렇게 도 사용할 수 있고 함수로도 사용가능하다.
		setState(count + 1);
	}
}
```

최초로 랜더를 하면

```js
() => {
	console.log("componentDidMount");

	return () => {
		console.log("componentWillUnmount");
	};
};
```

이 함수가 호출 될 것이다. 호출한 결과를 return한 걸 들고 있는다 다음번에 위에를 실행할 렌더시점 직전에 return한 함수를 호출하고 다시

```js
() => {
	console.log("componentDidMount");

	return () => {
		console.log("componentWillUnmount");
	};
};
```

얘를 실행한다.

다시 가서 찍어도 이 시점을 다시 찍을 수 없다. 최초에 한번에만 실행되고 그 다음에는 실행이 안된다. 그 다음은 없어질때 실행한다. 없어질때도 랜더를 다시하는 것이니까

```js
import { useState } from "react";

// state = { count: 0 }
export default function Example5() {
	const [count, setCount] = useState(0);

	// 2개의 인자를 받는다. 하나는 함수 이 아이는 시점이 없다.
	useEffect(() => {
		console.log("componentDidMount & componentDidUpdate");
		return () => {
			console.log(`clean up`);
		};
	}); // 시점을 지정하지 않으면 무조건 랜더 된 직후를 의미 한다.

	// 2번째 인자로 빈 배열을 넣으면 componentDidMount만 실행한다. 즉 함수는 실행되는 아이(한일?)를 의미하고 2번째 인자인 배열은 시점을 이야기 하는 것이다.(언제의 뜻?)
	useEffect(() => {
		console.log("componentDidMount");

		return () => {
			console.log("componentWillUnmount");
		}; // 함수를 리턴을 한다. 함수를 반환하면 해당 함수는 다음 랜더를 하기 전에 실행한다.
	}, []); // 시점이 빈 배열이면 최초에 렌더 된 직후를 의미(의존성?)

	return (
		<div>
			<p>You clicked {state.count} times</p>
			<button onClick={this.click}>Click me</button>
		</div>
	);
	function click() {
		// setState => 두 번째 배열 요소
		// setState({ count: state.count + 1 }); // 이렇게 도 사용할 수 있고 함수로도 사용가능하다.
		setState(count + 1);
	}
}
```

clean up 을 해보자 click me를 누르면 count가 다시 될 것이다. 그러면 무조건

```js
// 2개의 인자를 받는다. 하나는 함수 이 아이는 시점이 없다.
useEffect(() => {
	console.log("componentDidMount & componentDidUpdate");
	return () => {
		console.log(`clean up`);
	};
}); // 시점을 지정하지 않으면 무조건 랜더 된 직후를 의미 한다.
```

얘를 실행하는데 전에 return한 함수를 가지고 있었기 때문에 그 return한 함수가 먼저 console.log(`clean up`); 실행 하고 console.log("componentDidMount & componentDidUpdate"); 될 것이다. 즉 다음번에 실행되기 전에 정리할 게 있으면 정리하려고 clean up이라는 말을 쓴다.

```js
import { useState } from "react";

// state = { count: 0 }
export default function Example5() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("Mark");
	// 2개의 인자를 받는다. 하나는 함수 이 아이는 시점이 없다.
	useEffect(() => {
		console.log("componentDidMount & componentDidUpdate");
		return () => {
			console.log(`clean up`);
		};
	}); // 시점을 지정하지 않으면 무조건 랜더 된 직후를 의미 한다.

	// 2번째 인자로 빈 배열을 넣으면 componentDidMount만 실행한다. 즉 함수는 실행되는 아이(한일?)를 의미하고 2번째 인자인 배열은 시점을 이야기 하는 것이다.(언제의 뜻?)
	useEffect(() => {
		console.log("componentDidMount");

		return () => {
			console.log("componentWillUnmount");
		}; // 함수를 리턴을 한다. 함수를 반환하면 해당 함수는 다음 랜더를 하기 전에 실행한다.
	}, []); // 시점이 빈 배열이면 최초에 렌더 된 직후를 의미(의존성?)

	useEffect(() => {
		console.log("[name]");

		return () => {
			console.log("[name] - cleanup");
		};
	}, [name]);

	return (
		<div>
			<h2>{name}</h2>
			<p>You clicked {state.count} times</p>
			<button onClick={this.click}>Click me</button>
		</div>
	);
	function click() {
		// setState => 두 번째 배열 요소
		// setState({ count: state.count + 1 }); // 이렇게 도 사용할 수 있고 함수로도 사용가능하다.
		setState(count + 1);
	}
}
```

이러면 최초의 name이 뜰 것이다. 하지만 버튼을 눌려도 뜨지 않는다. 다시 렌더를 안하니까

```js
import { useState } from "react";

// state = { count: 0 }
export default function Example5() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("Mark");
	// 2개의 인자를 받는다. 하나는 함수 이 아이는 시점이 없다.
	useEffect(() => {
		console.log("componentDidMount & componentDidUpdate");
		return () => {
			console.log(`clean up`);
		};
	}); // 시점을 지정하지 않으면 무조건 랜더 된 직후를 의미 한다.

	// 2번째 인자로 빈 배열을 넣으면 componentDidMount만 실행한다. 즉 함수는 실행되는 아이(한일?)를 의미하고 2번째 인자인 배열은 시점을 이야기 하는 것이다.(언제의 뜻?)
	useEffect(() => {
		console.log("componentDidMount");

		return () => {
			console.log("componentWillUnmount");
		}; // 함수를 리턴을 한다. 함수를 반환하면 해당 함수는 다음 랜더를 하기 전에 실행한다.
	}, []); // 시점이 빈 배열이면 최초에 렌더 된 직후를 의미(의존성?)

	useEffect(() => {
		console.log("[count]", count);

		return () => {
			console.log("[count] - cleanup", count);
		};
	}, [count]);

	return (
		<div>
			<h2>{name}</h2>
			<p>You clicked {state.count} times</p>
			<button onClick={this.click}>Click me</button>
		</div>
	);
	function click() {
		// setState => 두 번째 배열 요소
		// setState({ count: state.count + 1 }); // 이렇게 도 사용할 수 있고 함수로도 사용가능하다.
		setState(count + 1);
	}
}
```

하지만 count로 바꾸면 값이 바뀌면서 렌더가 다시 되니까 실행 될 것이다.

이때 한번더 누르면 [count]-cleanup 1이 찍히고 count 2가 찍 힐 것이다.

## Custom Hooks (내가 만든 훅)

## Additional Hooks (추가적인 훅)

useReducer, useCallback, useMemo, useRef

```

```
