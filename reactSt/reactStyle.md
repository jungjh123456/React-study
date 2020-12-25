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

```js
const StyledButton = styled.button`
	background: transparent;
	border-radius: 3px;
`;

export default StyleButton;
```

이런 식으로 사용을 한다.
