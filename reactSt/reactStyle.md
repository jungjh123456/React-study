# React Style

### React Component Styling

1. 컴포넌트 스타일링
2. CSS Module
3. Sass
4. Styled-components
5. React Shadow
6. Ant Design

## Style Loaders

```js
import "./App.css";
```

누가 이걸 보고 반응을 할까? 그것은 바로 웹팩이 본다. 즉 확장자를 만났을때 웹팩이 .css를 만나면 style-loader나 css-loader한테 변역하라고 시킨다.

웹팩은 그저 묶는 역할을 한다.

eject를 하면 수동으로 웹팩 설정을 바꿀 수 있다.

## css,sass 와 module

css나 sass를 할때는

import './...css' or './...scss'

로 사용한다. 모듈을 사용할 때는

```js
import Styled from "./styled.module.css";
import Styled from "./styled.module.scss";
```

이렇게 사용한다.

이렇게 모듈을 사용할 경우 어떤 이상한 이름으로 클래스를 바꾼 후 스타일을 추가한다.
그리고 실제 이름을 키로 변경한 이상한 이름을 value로 하는 객체를 export default 한다.

이렇게 [filename]\_[classname]\_\_[hash]이런 값이 되어 있다.

모듈에서 클래스 이름을 두개를 쓰고 싶으면
classNames를 사용하면 된다.

```js
import React from "react";
import styles from "./Button.module.css";
// import classNames from "classnames";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default class Button extends React.Component {
	state = {
		loading: false,
	};
	render() {
		const { loading } = this.state;
		// test
		console.log(classNames("foo", "bar"));
		console.log(classNames("foo", "bar", "baz"));
		console.log(classNames({ foo: true, bar: true }));
		console.log(classNames({ foo: true, bar: false }));
		console.log(
			classNames(null, false, "bar", undefined, 0, 1, { baz: null }, "")
		);
		console.log(classNames(styles.button, styles.loading));
		console.log(cx("button", "loading"));
		console.log(cx("button", { loading }));
		return (
			<button
				{...this.props}
				// className={classNames(styles.button, loading && styles.loading)}
				className={cx("button", { loading })}
				onClick={this.startLoading}
			/>
		);
	}

	startLoading = () => {
		this.setState({ loading: true });
		setTimeout(() => {
			this.setState({ loading: false });
		}, 1000);
	};
}
```

이런 식으로 쓰면 된다.

## Styled Component

CSS, SASS

css module, sass module -> 자동으로 클래스를 넣어준다.

Styled Component의 사용법은
일단 npx i styled-components를 다운받는다,

```js
import styled from "styled-components";

// const StyledButton = styled.button``; // 이렇게도 사용 가능하고
const StyledButton = styled.('button')``; // 이렇게도 사용 가능하다

export default StyledButton;

```

그러면 버튼 클래스에 SC-[]이런식으로 클래스가 달아진다.

sc는 style component이다. 이것은 style component가 만들어 준 것이다.

이렇게 만든 이유는 기술적으로 스코핑을 해결한 게 아니라 중복되지 않게 이름을 만들어 주는 것이다.

Button.jsx

```js
const StyledButton = styled.button`
	background: transparent;
	border-radius: 3px;
`;

export default StyleButton;
```

이런 식으로 사용을 한다.

```js
<Button primary>버튼</Button>
```

이런식으로 프롭스를 설정할 수 있다. 그러면 외부에서 설계에 맞게 호출을 해준다.

그러면

Button.jsx

```js
const StyledButton = styled.button`
	background: transparent;
	border-radius: 3px;
	${(props) => {
		if (props.primary) {
			return `
				background: palevioletred;
				color: white;
			`
		}
	}}
```

이런 식으로 바꿀 수 있다.

```js
const StyledButton = styled.button`
	background: transparent;
	border-radius: 3px;
	${(props) => {
		props.primary &&
		css`
				background: palevioletred;
				color: white;
			`
		}
	}}
```

이런 식으로도 사용할 수 있다.

```js
const StyledButton = styled.button`
	background: transparent;
	border-radius: 3px;
	${(props) => {
		props.primary &&
			css`
				background: palevioletred;
				color: white;
			`;
	}}}
`;

const PrimaryStyledButton = styled(StyledButton)`
	background: palevioletred;
	color: white;
`;
```

이렇게 오버라이드해서 사용할 수 있다. 그리고 다른 컴포넌트에 적용하면 오버라이드된 상태에서 나온다.

그리고 다른 태그로 바꿀 수 있는데 프롭스에 as 를 하는거고 이거는 컴포넌트에도 적용이 된다.

```js
<Button as='a' href='/hello'>
	버튼
</Button>
```

a태그 처럼 쓸 수 있다.

그리고 이런 식으로 사용 가능하다.

```js
function UppercaseButton(props) {
	return <button {...props} children={props.children.toUpperCase()} />;
}
<Button as={UppercaseButton} href='/hello'>
	button
</Button>;
```

이런 식으로 쓸 수 있다.

그리고 컴포넌트 자체에다가 스타일을 적용하려면

```js
function MyButton(props) {
	console.log(props); // {children: '', className: "sc-fu.. fy..."} 이렇게 들어온다.
	return <button className={props.className}>MyButton {props.children}</button>; // 스타일을 먹으려면 props.className을 적용한다.
}

const StyledMyButton = styled(MyButton)`
	background: transparent;
	border-radius: 3px;
`;

export default StyledMyButton;
```

만약

```js
function MyButton(props) {
	console.log(props);
	return (
		<div className={props.className}>
			<button>MyButton {props.children}</button>
		</div>
	);
}

const StyledMyButton = styled(MyButton)`
	button {
		background: transparent;
		border-radius: 3px;
	}
`;

export default StyledMyButton;
```

이렇게 사용할 수 있다.

한 컴포넌트에 한 스타일 컴포넌트를 넣을 수도 있고 한 컴포넌트에 여러 스타일 컴포넌트를 만들 수도 있다.

많은 사람들이 한 컴포넌트에 한 스타일 컴포넌트 방식을 선호한다.

만약에 자바스크립트 표현식도 넣을 수 있다.

```js
function MyButton(props) {
	console.log(props);
	return (
		<div className={props.className}>
			<button>MyButton {props.children}</button>
		</div>
	);
}

const StyledMyButton = styled(MyButton)`
	button {
		background: transparent;
		border-radius: 3px;
		border: 2px solid ${(props) => props.color || "palevioletred"};
		color: ${(props) => props.color || "palevioletred"};
	}
`;

export default StyledMyButton;
```

위 예제는 만약 props.color가 있으면 그 컬러로 하고 없으면 오른쪽이 넣어진다.

이런 식으로 만들 수 있다.

그리고 클래스를 넣으려면 className에다 넣으면 props에 추가된다.

## global Style

글로벌 스타일을 어떻게 매길까?
index.css로 넣어도 된다. 하지만 컴포넌트단위로만 하고 싶은 사람이 있을 것이다.

그래서 App.js에 createGlobalStyle을 넣는다.

```js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
button {
	font-size: 30px;
}
`;

//를 하고 컴포넌트 처럼 넣어준다.

function App() {
	return (
		<div className='App'>
			<GlobalStyle />
			...
		</div>
	);
}
```

이런 식으로 한다.

## A태그

StyledA.jsx를 만들어 보자.

```js
import styled from "styled-components";

const StyledA = styled.a`
	color: ${(props) => props.color};
`;

export default StyledA;
```

그리고 App.js에서 적용하자.

```js
function App() {
	return (
		<div className='App'>
			<GlobalStyle />
			...
			<StyledA color='orange' href='naver.com' target='_BLANK'>
				태그 1
			</StyledA>
		</div>
	);
}
```

target blank를 계속 넣어줘야한다는 단점이 있다. 그래서 이렇게 안하고 StyledA에 내장해서 사용할 수 있다.

```js
import styled from "styled-components";

const StyledA = styled.a.attrs((props) => ({
	href: props.href || "https://localhost", // 이런 식으로 href 프롭스가 없을 시 기본으로 사용할 수 있다.
	color: props.color || "pelevioletred", // 기본색깔로 이걸로 지정된다.
	target: "_BLANK",
}))`
	color: ${(props) => props.color};
`;

export default StyledA;
```

이렇게 attrs() 함수를 사용할 수 있다.

## 웹 컴포넌트

웹 컴포넌트는 표준이다. React 컴포넌트는 표준이 아니다.

웹 컴포넌트는 3가지가 중요하다.

1. Custom elements: 태그(a 태그, p 태그)같이 태그를 만들 수 있어야 한다.
2. Shadow DOM: 캡슐화된 그림자 DOM트리를 엘리먼트를 추가하고 javaScript API로 엘리먼트의 기능을 프라이빗하게 유지할 수 있다. (custorm element안에서 태그를 만들 수 있다. 외부하고 내부가 독립적으로 캡슐화 되어 있게 만드는 것) -> 이방법이 React Shadow DOM 형식이다.
3. HTML 템플릿 커스텀하게 html 템플릿이 있어야 한다.

을 가져야지 웹 컴포넌트라고 할 수 있다.

근데 아직은 일부 브라우저에서 사용이 불가능한 아이들이 있기 때문에 널리 쓰이지 않는다

## react-shadow

react shadow를 설치 해 보자.

npm i react-shadow를 터미널에 실행 하자.

일단 전역에다가 스타일을 먹여 보자

index.css

```js
p {
	color: red;
}

```

app.js

```js
<p>안녕하세요</p>
```

빨간 색으로 뜰 것이다. 만약에 이것을 컴포넌트에다 넣어도 빨간색이 나올 것이다.

이제 격리 시켜보자 컴포넌트를 하나 만들자.

Shadow.jsx

```js
import React from "react";
import root from "react-shadow";

const style = `
		p {
			color: orange;
		}
`;

export default function Shadow() {
	return (
		<root.div>
			<p>안녕하세요</p>
			<style type='text/css'>{style}</style>
		</root.div> // 외부와 차단되었다.
	);
}
```

이렇게 만들 수 있다.
