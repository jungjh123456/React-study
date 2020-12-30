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
import { useEffect, useState } from "react";

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
import { useEffect, useState } from "react";

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

함수 컴포넌트에서 라이프사이클을 사용할 수 있다로 이해하지 말고 딱 3가지 요소를 기억하자

```js
useEffect(()=> {
	// 렌더 된 직 후에 실행
	return ... // 다시 변경이 일어났을때 cleanup이 실행된다.
} []) // 이 배열에 의해서 시점인지 기록

```

방금 했던걸 보면

첫번째 렌더링때 리엑트가 컴포넌트한테 state가 0일때의 UI를 준비하라고 하면 컴포넌트가 JSX로 리엑트한테 결과물로 주면서 useEffect안에 함수 실행하는 거 잊지 말라고 하고 리액트는 브라우저한테 말을 하고 브라우저는 응답을 한다. 그리고 화면에 그려준다. 다 그리고 나서 리액트는 useEffect를 실행한다.
다시 클릭 후 랜더링을 하면 브라우저의 클릭한 아이가 컴포넌트에서 지정한 함수로 지정하면서 setState를 1로 지정한 것을 호출할 것이다.
그러면 다시 리액트가 1로 할 거니까 컴포넌트한테 요청하고 1로 변한 jsx와 이팩트를 요청한다. 그리고 리액트가 받고 나서 브라우저에게 알려주고 다시 리액트가 useEffect를 실행 할 것이다.

## Custom Hooks (내가 만든 훅)

나만의 훅을 만들어 보자.

그래서 src에 hooks 폴더를 만들어 보자.
그리고 useWindowWidth.js파일을 만들자.

useWindowWidth.js

```js
export default function useWindowWidth() {
	const [width] = useState(window.innerWidth);

	return width;
}
```

훅의 특징은 다른 훅에서 사용할 수 있고 함수 컴포넌트에서 사용할 수 있다.
Example5.jsx로 돌아가서 만든 훅을 적용해보자.

Example5.jsx

```js
import { useEffect, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

// state = { count: 0 }
export default function Example5() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("Mark");

	const width = useWindowWidth();

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
			<h2>
				{name} - {width}
			</h2>
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

이렇게 하면 name 옆에 현재 가로값이 나올 것이다.
위에서 하고 싶었던 거는 가로값을 줄었다 늘렸다하면 가로 값이 화면에서 나오게 하는 훅을 만들고 싶은 거다.

그래서 다른 컴포넌트를 만들어서 해보자.
Example6.jsx 를 만들자.

```js
import { useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

// state = { count: 0 }
export default function Example5() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("Mark");

	const width = useWindowWidth();

	return (
		<div>
			<h2>
				{name} - {width}
			</h2>
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

커스텀 훅이 왜 나왔나? 상태에 대한 로직을 재사용하기 어렵다.
재사용을 위해서 따로 때어내는 행위를 하는 것이다.
useWindowWidth는 이렇게 사용할 수 있다.

```js
import { useEffect, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

// state = { count: 0 }
export default function Example5() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("Mark");

	const [width, setWidth] = useState(window.innderWidth);

	// 우리가 화면 크기를 줄이거나 늘릴때 알아차리는건 window객체이다. 즉 render 직후에 이벤트를 달아줘야한다.

	useEffect(() => {
		const resize = () => {
			setWidth(window.innerWidth);
		};
		window.addEventListener("resize", resize); // reference를 넣어야하기 때문에 함수를 만들어서 참조값을 갖고 있는 식별자를 넣는다.
		return () => {
			window.removeEventListener("resize", ㄱㄷ냨ㄷ);
		};
	}, []);

	return (
		<div>
			<h2>
				{name} - {width}
			</h2>
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

이렇게 만들 수 있다.

```js
const [width, setWidth] = useState(window.innderWidth);

// 우리가 화면 크기를 줄이거나 늘릴때 알아차리는건 window객체이다. 즉 render 직후에 이벤트를 달아줘야한다.

useEffect(() => {
	const resize = () => {
		setWidth(window.innerWidth);
	};
	window.addEventListener("resize", resize); // reference를 넣어야하기 때문에 함수를 만들어서 참조값을 갖고 있는 식별자를 넣는다.
	return () => {
		window.removeEventListener("resize", ㄱㄷ냨ㄷ);
	};
}, []);
```

이 부분을 우리가 만든 useWindowWidth.js에 그대로 합치자

uswWindowWidth.js

```js
import { useEffect, useState } from "react";
export default function useWindowWidth() {
	const [width, setWidth] = useState(window.innderWidth);

	// 우리가 화면 크기를 줄이거나 늘릴때 알아차리는건 window객체이다. 즉 render 직후에 이벤트를 달아줘야한다.

	useEffect(() => {
		const resize = () => {
			setWidth(window.innerWidth);
		};
		window.addEventListener("resize", resize); // reference를 넣어야하기 때문에 함수를 만들어서 참조값을 갖고 있는 식별자를 넣는다.
		return () => {
			window.removeEventListener("resize", ㄱㄷ냨ㄷ);
		};
	}, []);
	return width;
}
```

이렇게 옮기고 Example6.jsx 에서

```js
import { useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

// state = { count: 0 }
export default function Example5() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("Mark");

	const width = useWindowWidth();

	return (
		<div>
			<h2>
				{name} - {width}
			</h2>
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

이렇게 간단한 윈도우의 가로값을 가져오는 훅을 만들었다.

훅은 다른 훅에서 사용하거나 함수 컴포넌트에서만 사용할 수 있다.

custom훅은 useState와 useEffect로 이루어 진다.

하나 더 만들어 보자.

hoc로 만든 withHasMounted와 훅으로 만든 useHasMounted를 만들어서 비교해 보자.

처음에는 HOC를 만들자.

폴더를 만들고 withHasMounted.js를 만들자.
그리고 hocks폴더 안에도 하나 만들자 useHasMounted.js를 하나 만들자.

withHasMounted.js

```js
import React from "react";
export default function withHasMounted(Component) {
	class C extends React.Component {
		state = {
			hasMounted: false,
		};

		render() {
			return <Component {...this.props} hasMounted={this.state.hasMounted} />;
		}
		componentDidMount() {
			this.setState({ hasMounted: true });
		}
	}

	return C;
}
```

Example6.jsx에서 써보자.

```js
import { useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";
import withHasMounted from "../hocks/withHasMounted";

function Example6(props) {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("Mark");

	const width = useWindowWidth();

	return (
		<div>
			<h2>
				{name} - {width} - {props.hasMounted.toString()}
			</h2>
			<p>You clicked {state.count} times</p>
			<button onClick={this.click}>Click me</button>
		</div>
	);
	function click() {
		setState(count + 1);
	}
}
// state = { count: 0 }
export default withHasMounted(Example6);
```

이렇게 만든 아이를 훅으로 만들자.

useHasMounted.js

```js
export default function useHasMounted() {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);
	return hasMounted;
}
```

이렇게 하면 훅이 만들어 진다.

Example6.jsx

```js
import { useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";
import withHasMounted from "../hocks/withHasMounted";

function Example6(props) {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("Mark");

	const width = useWindowWidth();
	const hasMounted = useHasMounted();

	return (
		<div>
			<h2>
				{name} - {width} - {props.hasMounted.toString()}
			</h2>
			<p>You clicked {state.count} times</p>
			<button onClick={this.click}>Click me</button>
		</div>
	);
	function click() {
		setState(count + 1);
	}
}
// state = { count: 0 }
export default withHasMounted(Example6);
```

이렇게 보면 차이점이 드러난다. hoc를 사용할 때마다 컴포넌트를 감싸서 하나의 컴포넌트를 만든다. 즉 많이 사용하면 컴포넌트가 계속 랩핑된다. 그래서 새로운 용어가 나왔다.
예전에 콜백 핼이라 불렸던 것 처럼 랩핑 핼이 나왔다.

이와 다르게 훅은 다르게 랩핑을 하는 일이 없이 하나의 state를 사용하는데 로직만 따로 분리를 해서 간편하게 useHasMounted에 옮겨 놓았다.
그래서 HOC를 떠나서 hooks로 오는 것이다.

> 왜 hoc보다 더 hooks를 더 선호하냐?

    HOC를 사용하면 변화되는 데이터를 프롭스로 관리하는데 그 프롭스를 위해서 계속 컴포넌트를 랩핑하는 과정이 생기는데 그 과정에서의 복잡조도 증가하고 불필요한 랩핑으로 인해서 디버깅도 힘들다.

## 컴포넌트 간 통신

컴포넌트를 많이 만들 예정이다. 컴포넌트 안에서의 로직을 만드는 것도 중요하지만 컴포넌트 간에 통신하는 것도 골머리를 아프게 된다.

### 하위 컴포넌트를 변경하기

만약 A의 버튼을 클릭해서 B안에 있는 C안에 있는 D안에 있는 E의 value를 바꾸고 싶으면

1. <A /> 컴포넌트에서 button 에 onClick이벤트를 만들고,
2. button 을 클릭하면, <A /> 의 state를 변경하여, <B />로 내려주는 props를 변경
3. <B />의 props 가 변경되면, <C />의 props에 전달
4. <C /> 의 props가 변경되면, <D />의 props로 전달
5. <D />의 props가 변경되면, <E />의 props로 전달

이렇게 주고 받고 주고 받으니 골머리를 때린다.

### 상위 컴포넌트를 변경하기

E의 button를 클릭하여 A의 p를 변경하려면

1. <A />에 함수를 만들고, 그 함수 안에 state를 변경하도록 구현, 그 변경으로 인해 p안의 내용을 변경
2. 만들어진 함수를 props에 넣어서, <B />로 전달.
3. <B />의 props의 함수를 <C />의 props로 전달
4. <C />의 porps의 함수를 <D />의 props로 전달.
5. <D />의 props의 함수를 <E />의 props 로 전달, <E />에서 클릭하면 props 로 받은 함수를 실행

```js
import React from "react";

class A extends React.Component {
	state = {
		value: "아직 안바뀜",
	};

	render() {
		// B에게 change props로 전달한다.
		console.log("A render");
		return (
			<div>
				<h3>{this.state.value}</h3>
				<B change={this.change} />
			</div>
		);
	}

	change = () => {
		this.setState({
			value: "A 의 값을 변경",
		});
	};
}

export default A;

const B = (props) => (
	<div>
		<p>여긴 B</p>
		<C {...props} />
	</div>
);

const C = (props) => (
	<div>
		<p>여긴 C</p>
		<D {...props} />
	</div>
);

const D = (props) => (
	<div>
		<p>여긴 D</p>
		<E {...props} />
	</div>
);

const E = (props) => {
	function click() {
		props.change(); // 받아서 실행을 한다.
	}
	return (
		<div>
			<p>여긴 E</p>
			<button onClick={click}>클릭</button>
		</div>
	);
};
```

E에서 받아서 실행하면 value값이 바뀌고 부모가 바뀌었으니 자식도 다시 바뀐다. 이게 계속 반복이 된다.

state는 최상단 부모한테 있어야지 컴포넌트 간에 커뮤니케이션이 활성화 된다.

관리하는데 너무 복잡해 진다.(찾기도 어렵다.)

그래서 나온게 Context API 이다. withRouter랑 비슷하다.

## Context API

Context API를 사용하면 위아래 관계에 없어도 점프할 수 있다. 그런 개념이다. 점프 할 수 있는 기능을 준다는 것만 기억하자.

데이터를 조작하거나 있는 곳은 가장 부모에서 하는 일이 모든 곳에 다 전파 되어야 하는 상황이다. 가장 부모와 해당 데이터를 변경하는 함수를 사용하는 아이가 저 멀리 어딘가 있고 저 멀리 어딘가에 있는 아이와 이 부모가 만든 메서드 데이터를 연결하는 행위가 힘들다 그래서 Context API는 가장 상위에 데이터와 그 데이터를 바꾸는 아이를 두는 것 이다.

그 아이를 다른 컨포넌트한테 주는 방법은 그 컨텍스트에서 가져와 하면 가져올 수 있다.
그래서 데이터를 Set하는 놈이 있어야 한다. (Provider) Set하는 놈은 최상단 부모이다. 최상단 부모에다가 Set을 하면 된다.
보통 ErrorBoundary 바로 밑에 있다. (Set하는 놈) 그 Set하는 놈을 프로바이더라고 한다. (주는 놈)

데이터를 GET 하는 놈

- 모든 하위 컴포넌트에서 접근 가능
- 컨슈머로 하는 방법 (컨슈머는 소비자 받아서 쓰는 놈)
  - 클래스 컴포넌트의 this.context 로 하는 방법
  - 펑셔널 컴포넌트의 useContext 로 하는 방법

사용하기 위해서 create-react-app을해서 새로운 프로젝트를 만들고 시작하자.

1단계로 컨텍스트를 생성한다.

폴더를 하나 만든다.

contexts폴더를 생성 그 안에다가 PersonContext.js를 만들자.

PersonContext.js

```js
import React from "react";

// context를 생성하는 API를 생성하자.

const PersonsContext = React.createContext(); // 이게 context이다.

//공유하기 위해 내보내자.
export default PersonContext;
```

PersonContext.Provider를 사용한다는 것이다. 이것을 어디서 사용할까?

데이터를 set하는 놈을 어디서 한다고 했죠? 그건 가장 상위 컴포넌트에 하는 것이다. (그래야 하위 컴포넌트에서 받아서 사용할 수 있기 때문에)

index.js로 가서 Provider를 감싸서 value를 설정하자.
index.js

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PersonContext from "./contexts/PersonContext";

ReactDOM.render(
	<React.StricMode>
		<PersonContext.Provider>
			<App />
		</PersonContext.Provider>
	</React.StricMode>,
	document.getElementById("root")
);
```

위 처럼 넣어 준다. 그리고 이제 value를 setting해주자.(데이터를 setting)

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PersonContext from "./contexts/PersonContext";

const persons = [
	{ id: 0, name: "Mark", age: 38 },
	{ id: 1, name: "Hanna", age: 27 },
];

ReactDOM.render(
	<React.StricMode>
		<PersonContext.Provider value={persons}>
			<App />
		</PersonContext.Provider>
	</React.StricMode>,
	document.getElementById("root")
);
```

이렇게 value를 넣자.
<PersonContext.Provider value={persons}> 이 부모 밑에 있는 아이들은 props를 안넣어도 value를 사용할 수 있다.

그러면 components폴더를 만들어서 Example1.jsx, Example2.jsx, Example3.jsx를 생성해 보자.

Example1.jsx

```js
import React from "react";
import PersonContext from "../contexts/PersonContext";

// 데이터를 GET하기 - 컨슈머 사용하기 class function 관계 없음

export default function Example1() {
	return (
		// 이 안에 함수를 넣자.
		<PersonContext.Consumer>
			{(value) => <p>{JSON.stringify(value)}</p>}
		</PersonContext.Consumer>
	);
}
```

이렇게 만들고 App.js 에서 가서 만들자.

App.js

```js
import Example1 from "./components/Example1";
import "./App.css";
function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<Example1 />
			</header>
		</div>
	);
}
```

이렇게 한다. 그러면 value에 대한 데이터가 화면에 나올것이다.

p태그를 ul로 바꿔 보자.

```js
import React from "react";
import PersonContext from "../contexts/PersonContext";

// 데이터를 GET하기 - 컨슈머 사용하기 class function 관계 없음

export default function Example1() {
	return (
		// 이 안에 함수를 넣자.
		<PersonContext.Consumer>
			{(value) => (
				<ul>
					{value.map((person) => (
						<li>{person.name}</li>
					))}
				</ul>
			)}
		</PersonContext.Consumer>
	);
}
```

하면 name이 화면에 나올 것이고 이걸 스타일을 적용하면 된다.

이렇게도 사용을 한다. personContext를 직접 들고오지 않고 PersonContext.Consumer를 다른 이름으로 붙어서 걔를 들고 올수 있다.

PersonContext.js 로 가서

```js
import React from "react";

// context를 생성하는 API를 생성하자.

const PersonsContext = React.createContext(); // 이게 context이다.

//공유하기 위해 내보내자.
export default PersonContext;

export const { Provider, Consumer } = PersonContext;
```

PersonContext.Provider를 않쓰고 Provider 가져다가 Provider하면 된다.

index.js

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "./contexts/PersonContext";

const persons = [
	{ id: 0, name: "Mark", age: 38 },
	{ id: 1, name: "Hanna", age: 27 },
];

ReactDOM.render(
	<React.StricMode>
		<Provider value={persons}>
			<App />
		</Provider>
	</React.StricMode>,
	document.getElementById("root")
);
```

Example1.jsx

```js
import React from "react";
import { Consumer } from "../contexts/PersonContext";

// 데이터를 GET하기 - 컨슈머 사용하기 class function 관계 없음

export default function Example1() {
	return (
		<>
			<h1>Consumer 사용</h1>
			<Consumer>
				{/* 이 안에 함수를 넣자.*/}
				{(value) => (
					<ul>
						{value.map((person) => (
							<li>{person.name}</li>
						))}
					</ul>
				)}
			</Consumer>
		</>
	);
}
```

이런 식으로 사용할 수 있다.

보통 Consumer를 hoc나 훅으로 사용할 수 있다.

### 2번째 장법 class로 사용해서 get하는 방법

Example2.jsx로 가서 만들어 보자.
this.context를 사용해 보자,

Example2.jsx

```js
class Example2 extends React.Component {
	render() {
		<>
			<h1>this.context 사용</h1>
			<ul>
				{this.context.map((person) => (
					<li>{person.name}</li>
				))}
			</ul>
		</>;
	}
}

export default Example2;
```

App.js에서 2를 추가하자.

```js
import Example1 from "./components/Example1";
import Example2 from "./components/Example2";

import "./App.css";
function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<Example1 />
				<Example2 />
			</header>
		</div>
	);
}
```

## Additional Hooks (추가적인 훅)

useReducer, useCallback, useMemo, useRef
