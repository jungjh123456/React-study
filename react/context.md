## Context

comtext를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있습니다.

일반적인 React 애플리케이션에서 데이터는 위에서 아래로 props를 통해 전달되지만 애플리케이션 안의 여러 컴포넌트들에 전해줘야 하는 props의 경우 과정이 번거로울 수 있습니다.
context를 이용하면 트리 단계마다 명시적으로 props를 넘겨주지 않아도 많은 컴포넌트가 이러한 값을 공유하도록 할 수 있습니다.

## 언제 context를 써야 할까

context는 React 컴포넌트 트리 안에서 전역적 이라고 볼 수 있는 데이터를 공유할 수 있도록 고안된 방법입니다. 그러한 데이터로는 현재 로그인한 유저, 테마, 선호하는 언어 등이 있습니다. 예를 들어, 아래의 코드는 버튼 컴포넌트를 꾸미기 위해 테마 props를 명시적으로 넘겨주고 있습니다.

```js
class App extends React.Component {
	render() {
		return <Toolbar theme='dark' />;
	}
}

function Toolbar(props) {
	return (
		<div>
			<ThemedButton theme={props.theme} />
		</div>
	);
}

class ThemedButton extends React.Component {
	render() {
		return <Button theme={this.props.theme} />;
	}
}
```

context를 사용하면 중간에 있는 엘리먼트들에게 props를 넘겨주지 않아도 됩니다.

```js
const ThemeContext = React.createContext("light");

class App extends React.Component {
	render() {
		return (
			<ThemeContext.Provider value='dark'>
				<Toolbar />
			</ThemeContext.Provider>
		);
	}
}

function Toolbar() {
	return (
		<div>
			<ThemedButton />
		</div>
	);
}

class ThemedButton extends React.Component {
	static contextType = ThemeContext;
	render() {
		return <Button theme={this.context} />;
	}
}
```

## context를 사용하기 전에 고려할 것

context의 주된 용도는 다양한 레벨에 네스팅된 많은 컴포넌트에게 데이터를 전달하는 것입니다. context를 사용하면 컴포넌트를 재사용하기가 어려워지므로 꼭 필요할 때만 쓰세요.

여러 레벨에 걸쳐 props 넘기는 걸 대체하는 데에 context보다 컴포넌트 함성이 더 간단한 해결책일 수도 있습니다.

예를 들어 여러 단계 아래에 있는 Link와 Avatar 컴포넌트에게 user와 avatarSize라는 props를 전달해야 하는 Page 컴포넌트를 생각해봅시다.

```js
<Page user={user} avatarSize={avatarSize} />
<PageLayout user={user} avatarSize={avatarSize} />
<NavigationBar user={user} avatarSize={avatarSize} />

<Link href={user.permalink}>
	<Avatar user={user} size={avatarSize} />
</Link>
```

실제로 사용되는 곳은 Avatar 컴포넌트 뿐인데 user와 avatarSize props를 여러 단계에 걸쳐 보내줘야 한다는 게 번거로워 보일 수 있습니다. 게다가 위에서 Avatar 컴포넌트로 보내줘야하는 props가 추가된다면 그 또한 중간 레벨에 몯 추가해줘야 합니다.

Avatar 컴포넌트 자체를 넘겨주면 context를 사용하지 않고 이를 해결할 수 있습니다. 그러면 중간에 있는 컴포넌트들이 user나 avatarSize에 대해 전혀 알 필요가 없습니다.

```js
function Page(props) {
	const user = props.user;
	const userLink = (
		<Link href={user.permalink}>
			<Avatar user={user} size={props.avatarSize} />
		</Link>
	);
	return <PageLayout userLink={userLink} />;
}

<Page user={user} avatarSize={avatarSize} />
<PageLayout userLink={...} />
<NavigationBar userLink={...} />
{props.userLink}
```

이렇게 바꾸면 Link와 Avatar 컴포넌트가 user와 avatarSize props를 쓴다는 걸 알아야 하는 건 가장 위에 있는 Page 뿐이다.

이러한 제어이 역전을 이용하면 넘겨줘야 하는 props의 수는 줄고 최상위 컴포넌트의 제어력은 더 커지기 때문에 더 깔끔한 코드를 쓸 수 있는 경우가 많습니다. 하지만 이 방법이 항상 옳은 것은 아닙니다. 복잡한 로직을 상위로 옮기면 이 상위 컴포넌트들은 더 난해해지기 마련이고 하위 컴포넌트들은 필요 이상으로 유연해져야 합니다.

자식으로 둘 수 있는 컴포넌트의 수에 제한은 없습니다.

```js
function Page(props) {
	const user = props.user;
	const content = <Feed user={user} />;
	const topBar = (
		<NavigationBar>
			<Link href={user.permalink}>
				<Avatar user={user} size={props.avatarSize} />
			</Link>
		</NavigationBar>
	);
	return <PageLayout topBar={topBar} content={content} />;
}
```

이 패턴을 사용하면 자식 컴포넌트와 직속 부모를 분리하는 문제는 대개 해결할 ㅅ 있습니다. 더 나아가 render props를 이용하면 렌더링 되기 전부터 자식 컴포넌트가 부모 컴포넌트와 소통하게 할 수 있습니다.

하지만 같은 데이터를 트리 안 여러 레벨이 있는 많은 컴포넌트에 주어야 할 때도 있습니다. 이런 데이터 값이 변할 때마다 모든 하위 컴포넌트에게 널리 방송하는 것이 context입니다. 흔히 예시로 드는 선호 로케일 테마 데이터 캐시 등을 관리하는 데 있어서는 일반적으로 context를 사용하는게 가장 편리합니다.

## API

```js
const MyContext = React.createContext(defaultValue);
```

Context 객체를 만듭니다. Context 객체를 구독하고 있는 컴포넌트를 렌더링할 때 React는 트리 상위에서 가장 가까이 있는 짝이 맞는 Provider로부터 현재값을 읽습니다.

defaultValue 매개변수는 트리 안에서 적절한 Provider를 찾지 못했을 때만 쓰이는 값입니다.

컴포넌트를 독립적으로 테스트 할 때 유용한 값입니다. Provider를 통해 undefined을 값으로 보낸다고 해도 구독 컴포넌트들이 defaultValue를 읽지는 않는다는 점에 유의하세요.

## Context.Provider

```js
<MyContext.Provider value={/* 어떤 값 */}>
```

Context 오브젝트에 포함된 React 컴포넌트인 Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할을 합니다.

Provider 컴포넌트는 value prop을 받아서 이 값을 하위에 있는 컴포넌트에게 전달합니다. 값을 전달받을 수 있는 컴포넌트의 수에 제한은 없습니다. Provider 하위에 또 다른 Provider를 배치하는 것도 가능하며, 이 경우 하위 Provider의 값이 우선시 됩니다.

Provider 하위에서 context를 구독하는 모든 컴포넌트는 Provider의 value prop가 바뀔 때마다 다시 렌더링 됩니다. Provider로 부터 하위 consumer(.contextType와 useContext을 포함한)로의 전파는 shouldComponentUpdate 메서드가 적용되지 않으므로 상위 컴포넌트가 업데이트를 건너 뛰더라도 consumer가 업데이트 됩니다.

context값의 바뀌었는지 여부는 Object.js와 동일한 알고리즘을 사용해 이전 값과 새로운 값을 비교해 측정됩니다.

## Class.contextType

```js
class MyClass extends React.Component {
	componentDidMount() {
		let value = this.context;
		/* MyContext의 값을 이용한 코드 */
	}
	componentDidUpdate() {
		let value = this.context;
		/* ... */
	}
	componentWillUnmount() {
		let value = this.context;
		/* ... */
	}
	render() {
		let value = this.context;
		/* ... */
	}
}
MyClass.contextType = MyContext;
```

React.createContext()로 생성한 Context 객체를 원하는 클래스의 contextType 프로퍼티로 지정할 수 있습니다.

그러면 그 클래스 안에서 this.context를 이용해 해당 Context의 가장 가까운 Provider를 찾아 그 값을 읽을 수 있게 됩니다. 이 값은 render를 포함한 모든 컴포넌트 생명주기 매서드에서 사용할 수 있습니다.

```js
class MyClass extends React.Component {
	static contextType= MyContext;
	render() {
		let value = this.context;
		/*context 값을 이용한 렌더링*/}
	}
}
```

Context.Consumer

```js
<MyContext.Consumer>
{value => /*context 값을 이용한 렌더링*/}
</MyContext.Consumer>
```

context변화를 구독하는 React 컴포넌트입니다. 함수 컴포넌트안에서 안에서 context를 읽기 위해서 쓸 수 있습니다.

Context.Consumer의 자식은 함수여야합니다. 이 함수는 context의 현재값을 받고 React 노드를 반환합니다. 이 함수가 받는 value 매개변수 값은 해당 context의 Provider 중 상위 트리에서 가장 가까운 Provider의 value prop과 동일합니다. 상위에 Provider가 없다면 value 매개변수 값은 createContext()에 보냈던 defaultValue와 동일할 것입니다.

> 함수를 자식으로 받는 패턴에 대해서는 render props를 참조하세요.
