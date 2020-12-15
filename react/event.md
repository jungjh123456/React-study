# 이벤트 처리하기

React 엘리먼트에서 이벤트를 처리하는 방식은 DOM 엘리먼트에서 이벤트를 처리하는 방식과 매우 유사합니다.

예를 들어 HTML은 다음과 같습니다.

```js
<button onclick='activateLasers()'>Activate Lasers</button>
```

React에서는 약간 다릅니다.

```js
<button onClick={activateLasers}>Activate Lasers</button>
```

또 다른 차이점으로 React에서는

```js
function ActionLink() {
	function handleClick(e) {
		e.preventDefault();
		console.log("The link was clicked.");
	}

	return (
		<a href='#' onClick={handleClick}>
			Click me
		</a>
	);
}
```

여기서 e는 합성 이벤트입니다. React는 W3C명세에 따라 합성 이벤트를 정의하기 때문에 브라우저 호환성에 대해 걱정할 필요가 없습니다. React이벤트는 브라우저 고유 이벤트와 정확히 동일하게 동작하지는 않습니다. 더 자세한 사항은 합성 이벤트을 참고하시기 바랍니다.

React를 사용할 때 DOM 엘리먼트가 생성된 후 리스너를 추가하기 위해 addEventListener를 호출할 필요가 없습니다. 대신 엘리먼트가 처음 렌더링될 때 리스너를 제공하면 됩니다.

ES6 클래스를 사용하여 컴포넌트를 정의할 때 일반적인 패턴은 이벤트 핸들러를 클래스의 메서드로 만드는 것입니다. 예를 들어, 다음 Toggle 컴포넌트는 사용자가 ON과 OFF 상태를 토글할 수 있는 버튼을 렌더링
합니다.

```js
class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isToggleOn: true };

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState((state) => ({
			isToggleOn: !state.isToggleOn,
		}));
	}

	render() {
		return (
			<button onClick={this.handleClick}>
				{this.state.isToggleOn ? "ON" : "OFF"}
			</button>
		);
	}
}

ReactDOM.render(<Toggle />, document.getElementById("root"));
```

JSX 콜백 안에서 this의 의미에 대해 주의해야 합니다 JavaScript에서 클래스 메서드는 기본적으로 바인딩되어 있지 않습니다. this.handleClick을 바인딩하지 않고 onClick에 전달하였다면 함수가 실제 호출될 때 this는 undefined가 됩니다.

이는 React만의 특수한 동작이 아니며, JavaScript에서 함수가 작동하는 방식의 일부입니다. 일반적으로 onClick={this.handleClick}과 같이 뒤에 ()를 사용하지 않고 메서드를 참조할 경우 해당 메서드를 바인딩 해야합니다.

만약 bind를 호출하는 것이 불편하다면 이를 해결할 수 있는 두 가지 방법이 있습니다. 실험적인 퍼블릭 클래스 필드 문법을 사용하고 있다면 클래스 필드를 사용하여 콜백을 올바르게 바인딩 할 수 있습니다.

```js
class LiggingButton extends React.Component {
	handleClick = () => {
		console.log("this is:", this);
	};

	render() {
		return <button onClick={this.handleClick}>Click me</button>;
	}
}
```

이 문법의 문제점은 LoggingButton이 렌더링 될 때마다 다른 콜백이 생성된다는 것입니다. 대부분의 경우 문제가 되지 않으나 콜백이 하위 컴포넌트에 props로서 전달된다면 그 컴포넌트들은 추가로 다시 렌더링을 수행할 수도 있습니다. 이러한 종류의 성능 문제를 피하고자 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하는 것을 권장합니다.

## 이벤트 핸들러에 인자 전달하기

루프 내부에서는 이벤트 핸들러에 추가적인 매개변수를 전달하는 것이 일반적입니다. 예를 들어 id가 행의 ID일 경우 다음 코드가 모두 작동합니다.

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={(e) => this.deleteRow,bind(this, id)}>Delete Row</button>
```

위 두 줄은 동등하며 각각 화살표 함수와 Function.prototype.bind를 사용합니다.

두 경우 모두 React 이벤트를 나타내는 e 인자가 ID 뒤에 두번째 인자로 전달 됩니다. 화살표 함수를 사용하면 명시적으로 인자를 전달해야 하지만 bind를 사용할 경우 추가 인자가 자동으로 전달됩니다.
