## Route

route를 사용해 보자.

react-router-dom을 설치하자

=> npm i react-router-dom

그 후 import에서 써보자

```js
import { BrowserRouter, Route } from "react-router-dom";
// => 앞에 대문자로 되어있으니 컴포넌트이다.
// 남이 만든 컴포넌트니 어떻게 props를 어떻게 설정하느냐가 사용법이다.
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";

function App() {
	return (
		<BrowserRouter>
			<Route path='/' component={Home} />
			<Route path='/profile' component={Profile} />
			<Route path='/about' component={About} />
		</BrowserRouter>
	);
}
```

위와 같이 라우트를 사용한다. 하지만 url에 localhost:3000/about
하면 Home컴포넌트와 같이 나온다. 이것은 / 이거와 about이 포함되었다는것이다.
그래서 완벽히 주소가 일치해야한다. 그래서 exact를 사용한다.(매칭 알고리즘에 의해 같다라고 나오는 것이다.)

```js
import { BrowserRouter, Route } from "react-router-dom";
// => 앞에 대문자로 되어있으니 컴포넌트이다.
// 남이 만든 컴포넌트니 어떻게 props를 어떻게 설정하느냐가 사용법이다.
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";

function App() {
	return (
		<BrowserRouter>
			<Route path='/' exact component={Home} />
			<Route path='/profile' component={Profile} />
			<Route path='/about' component={About} />
		</BrowserRouter>
	);
}
```

위 와같이 하고 정해지지 않은 경로를 url에 친다고 하자.
localhost:3000/about/1
이러면 about이 그래도 보일 것이다.
이게 정해지지 않은 경로이다. 이것을 Dynamic Routing이다.

## Dynamic Routing

다이나믹 라우팅은 localhost:3000/about/1 이런거다.

그래서 1을 꺼내서 API를 보여주거나 하는 것이다.
저 URL 경로에서 1을 꺼내는 방법이다.
exact를 해서 아래와 같이 한다.

```js
import { BrowserRouter, Route } from "react-router-dom";
// => 앞에 대문자로 되어있으니 컴포넌트이다.
// 남이 만든 컴포넌트니 어떻게 props를 어떻게 설정하느냐가 사용법이다.
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";

function App() {
	return (
		<BrowserRouter>
			<Route path='/' exact component={Home} />
			<Route path='/profile' exact component={Profile} />
			<Route path='/profile:id' component={Profile} />
			<Route path='/about' component={About} />
		</BrowserRouter>
	);
}
```

이렇게 하면 같은 컴포넌트지만 다른 인스턴스이다.
:id가 파람스이다.
:id를 사용하는 아이는 Profile 컴포넌트가 꺼내서 사용하는 것이다.

Profile

```js
import React from "react";

export default function Profile({ history, location, match }) {
	console.log(history, location, match);
	const { id } = match.params;
	console.log(id);
	if (id === undefined) {
		return (
			<div>
				<h1>Profile</h1>
			</div>
		);
	}
	// api 호출하거나 숫자로 바꿔주거나 해야한다.
	return (
		<div>
			<h1>Profile: {id}</h1>
		</div>
	);
}
```

이렇게 작성을 한다.

props에 history,location,match가 왜 들어왔을까? 누군가가 해 준것이다. 그걸 해준 컴포넌트는 Route컴포넌트가 추가해 줘서 렌더를 해준 것이다.

그리고 두번째로 id를 받는 방법은 쿼리스트링을 이용하는 방식이다.
이것은 따로 Route를 추가 안 시켜도 되고 해당 컴포넌트에서 설정하면 된다.
이때 쿼리 스트링이란 localhost:3000/about?id=3
?id=3 이 쿼리 스트링이다.

그때 query-string인 API를 다운 받아서 사용해야한다.

```js
import React from "react";
import qs from "query-string";
import { Redirect } from "react-router-dom";

export default function About(props) {
	console.log(props);
	const search = props.location.search;
	console.log(search); // ?id=34&name=mark
	// 1. 직접 한다.
	// 2. 직접 안한다. => 먼가 있겠죠??
	// console.log(search.split("id=")[1]);
	// 내장 객체 const searchParams = new URLSearchParams(search); => 이 문제는 IE의 크로스브라우징이 안된다.
	// console.log(searchParams.get("id"), searchParams.get("name"));
	// 외부 라이브러리
	const { id } = qs.parse(search);

	if (id !== undefined) {
		return <Redirect to='/' />;
	}

	return (
		<div>
			<h1>About</h1>
			{id === undefined || <p>id : {id}</p>}
		</div>
	);
}
```

## Switch와 NotFound

Switch

- 여러 Route 중 순서대로 먼저 맞는 하나만 보여준다.
- exact를 뺄 수 있는 로직을 만들 수 있다.
- 가장 마지막에 어디 path에도 맞지 않으면 보여지는 컴포넌트를 설정해서 NotFound 페이지를 만들 수 있다.

만드는 법은 아래와 같습니다.

```js
import {
	BrowserRouter,
	Route,
	Switch,
	NavLink,
	Redirect,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// => Component
// 대분자로 시작하면, 클래스거나 컴포넌트거나
// 소무나로 시작하면, 변수거나 함수거나

// 남이 만든 컴포넌트 => 사용법을 숙지
// 컴포넌트의 사용법은 곧 => props 를 어떻게 설정하냐

import "./App.css";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";

const isLogin = false;

function App() {
	return (
		<ErrorBoundary FallbackComponent={ErrorPage}>
			<BrowserRouter>
				<Switch>
					<Route path='/about' component={About} />
					<Route path='/profile/:id' component={Profile} />
					<Route path='/profile' component={Profile} />
					<Route path='/' exact component={Home} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
```

이렇게 만들 수 있다.
이때 path가 맞는지는 위에서 부터 시작한다. 만약 profile/:id랑 profile이랑 순서를 바꾸면 profile/:id가 작동이 안된다.

Switch는 특징을 갖고 있다. 만약에 각 비교문이 포함 관계 있다면 순서에 따라 결과가 달라진다.

그래서 가장 좁은 부분 즉 겹침이 적은 부분을 위로 올리는 것이다. /이것은 profile about을 포함하고 있으니 NotFount 위로 쓰면 된다.

그래서 exact를 안써도 된다.

## JSX링크로 라우팅으로 이동하기

보통 이동을 할때 a태그를 쓴다 하지만 a태그는 이동을 해서 브라우저가 깜박거려서 사용하려면 기본동작을 제거해주고 사용해 줘야한다. 하지만 이렇게 안하려고 Route는 a링크 대신 Link태그를 사용하거나 NavLink를 사용한다.

사용하는 것은 아래와 같다.

```js
import {
	BrowserRouter,
	Route,
	Switch,
	NavLink,
	Redirect,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// => Component
// 대분자로 시작하면, 클래스거나 컴포넌트거나
// 소무나로 시작하면, 변수거나 함수거나

// 남이 만든 컴포넌트 => 사용법을 숙지
// 컴포넌트의 사용법은 곧 => props 를 어떻게 설정하냐

import "./App.css";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";

const isLogin = false;

function App() {
	return (
		<ErrorBoundary FallbackComponent={ErrorPage}>
			<BrowserRouter>
				<div>
					<ul>
						<li>
							<NavLink to='/'>home</NavLink>
						</li>
						<li>
							<NavLink
								to='/profile'
								exact
								activeStyle={{
									color: "red",
								}}
							>
								profile
							</NavLink>
						</li>
						<li>
							<NavLink to='/profile/3' exact activeClassName='active_mark'>
								profile : 3
							</NavLink>
						</li>
						<li>
							<NavLink to='/about'>about</NavLink>
						</li>
						<li>
							<NavLink to='/about?id=5'>about : 5</NavLink>
						</li>
						<li>
							<NavLink to='/login'>login</NavLink>
						</li>
					</ul>
				</div>
				<Switch>
					<Route path='/about' component={About} />
					<Route path='/profile/:id' component={Profile} />
					<Route path='/profile' component={Profile} />
					<Route path='/' exact component={Home} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
```

## JS로 라우팅 이동하기

```js
import {
	BrowserRouter,
	Route,
	Switch,
	NavLink,
	Redirect,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// => Component
// 대분자로 시작하면, 클래스거나 컴포넌트거나
// 소무나로 시작하면, 변수거나 함수거나

// 남이 만든 컴포넌트 => 사용법을 숙지
// 컴포넌트의 사용법은 곧 => props 를 어떻게 설정하냐

import "./App.css";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";

const isLogin = false;

function App() {
	return (
		<ErrorBoundary FallbackComponent={ErrorPage}>
			<BrowserRouter>
				<div>
					<ul>
						<li>
							<NavLink to='/'>home</NavLink>
						</li>
						<li>
							<NavLink
								to='/profile'
								exact
								activeStyle={{
									color: "red",
								}}
							>
								profile
							</NavLink>
						</li>
						<li>
							<NavLink to='/profile/3' exact activeClassName='active_mark'>
								profile : 3
							</NavLink>
						</li>
						<li>
							<NavLink to='/about'>about</NavLink>
						</li>
						<li>
							<NavLink to='/about?id=5'>about : 5</NavLink>
						</li>
						<li>
							<NavLink to='/login'>login</NavLink>
						</li>
					</ul>
				</div>
				<Switch>
					<Route path='/about' component={About} />
					<Route path='/profile/:id' component={Profile} />
					<Route path='/profile' component={Profile} />
					<Route
						path='/login'
						render={(props) => {
							console.log("헛", props);
							if (isLogin) {
								return <Redirect to='/' />;
							}
							return <Login />;
						}}
					/>
					<Route path='/' exact component={Home} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
```

Login 컴포넌트를 만들자

```js
import React from "react";
import Button from "../components/Button";

export default function Login(props) {
	console.log(props);
	return (
		<div>
			<h1>Login</h1>
			<Button />
		</div>
	);
}
```

Button 컴포넌트를 만들자

```js
import React from "react";
import { withRouter } from "react-router-dom";
function Button(props) {
	return (
		<button
			onClick={() => {
				// 2초 후에 페이지 이동
				setTimeout(() => {
					// 페이지 이동
					// console.log('이동');
					// window.location.assign("/")
					props.history.push("/");
				}, 2000);
			}}
		>
			나의 버튼
		</button>
	);
}
export default withRouter(Button);
```

Route => Login
Login => A => => B => C => Button
으로 넘겨준다. 이러면 실제 넣어주는 아이는 Route고 받는 아이가 Button인데 위 와같이 하면 실수하기 좋다.

이럴때 사용하라고 나온 기술의 이름이 있다.

이게 H O F 이다.

이것은 컴포넌트를 인수로 주고 추가해 줘서 새로운 컴포넌트로 만들어준다.

즉 withRouter()를 사용하면 props를 받을 수 있다.

## Redirect

Redirect는 location을 하거나 해서 해준다.
얘도 컴포넌트이다. 위에 코드에서 Redirect 컴포넌트를 사용할 수 있다.

```js
import React from "react";
import qs from "query-string";
import { Redirect } from "react-router-dom";

export default function About(props) {
	console.log(props);
	const search = props.location.search;
	console.log(search); // ?id=34&name=mark
	// 1. 직접 한다.
	// 2. 직접 안한다. => 먼가 있겠죠??
	// console.log(search.split("id=")[1]);
	// 내장 객체 const searchParams = new URLSearchParams(search);
	// console.log(searchParams.get("id"), searchParams.get("name"));
	// 외부 라이브러리
	const { id } = qs.parse(search);

	if (id !== undefined) {
		return <Redirect to='/' />;
	}

	return (
		<div>
			<h1>About</h1>
			{id === undefined || <p>id : {id}</p>}
		</div>
	);
}
```
