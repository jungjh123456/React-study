## 서적 프로젝트

npx create-react-app my-book

을 해서 react app을 설치한다.

그 후

.nvmrc 파일을 만든 후 사용할 버전을 지정하고 터미널에 nvm use를 하면 적용이 된다.
그 후 router와 error-boundary와 antd 를 설치 하자.

```
npm i react-router-dom react-error-boundary antd
```

그리고 index.html폰트를 지정하자.

```html
    <title>React App</title>
    <link
    href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
    rel="stylesheet"
  />
  </head>
```

초기 App.js Route 설정 및 ErrorBoundary

```js
import logo from "./logo.svg";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
	return (
		<ErrorBoundary FallbackComponent={Error}>
			<BrowserRouter>
				<Switch>
					<Route path='/sighin' />
					<Route path='/home' />
					<Route />
				</Switch>
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
```

위 처럼 에러 바운더리에 에러객체의 이름인 Error를 쓰고 싶으면 pages폴더에 따로 만들어서 import 하면 된다.

```js
import logo from "./logo.svg";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Pages
import Error from "./pages/Error";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<ErrorBoundary FallbackComponent={Error}>
			<BrowserRouter>
				<Switch>
					<Route path='/sighin' component={Signin} />
					<Route path='/home' component={Home} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
```

pages 폴더를 만들어서 pages에 해당하는 컴포넌트를 만들자.

Home.jsx

```js
export default function Error() {
	return (
		<div>
			<h1>홈</h1>
		</div>
	);
}
```

Signin.jsx

```js
export default function Signin() {
	return (
		<div>
			<h1>Signin</h1>
		</div>
	);
}
```

Error.jsx

```js
export default function Error() {
	return (
		<div>
			<h1>에러</h1>
		</div>
	);
}
```

NotFound.jsx

```js
export default function NotFound() {
	return (
		<div>
			<h1>찾을 수 없음</h1>
		</div>
	);
}
```

그리고 뒤에 경로를 이상한거 치면 홈이 나오는 불상사를 피하기 위해 exact를 추가하자.
전에도 말했듯이 Switch는 제일 위 부터 검사한다. 즉 제일 작은 부분 부터 검사를 한다.

```js
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Pages
import Error from "./pages/Error";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<ErrorBoundary FallbackComponent={Error}>
			<BrowserRouter>
				<Switch>
					<Route path='/sighin' component={Signin} />
					<Route path='/' exact component={Home} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
```

## Signin 컴포넌트 꾸미기

Signin page에 직접 element를 사용하지 않고 Signin으로 하는 component로 옮긴다.

Signin.jsx

```js
export default function Signin() {
	return <Signin />;
}
```

그리고 components 폴더를 만들고 그 안에서 컴포넌트의 디자인을 만들 것이다.

```js
import { Row, Col } from "antd";
import React from "react";

const Signin = () => {
	return (
		<Row align='middle'>
			<Col>hello</Col>
		</Row>
	);
};
export default Signin;
```

이렇게 antd 레이아웃을 가져와서 만들자.

![image-20201227150503192](/Users/apple/Library/Application Support/typora-user-images/image-20201227150503192.png)

```js
import { Row, Col } from "antd";
import React from "react";

const Signin = () => (
	<Row align='middle'>
		<Col span={24}>
			<Row>
				<Col span={12}>좌</Col>
				<Col span={12}>우</Col>
			</Row>
		</Col>
	</Row>
);
export default Signin;
```

이런 식으로 좌 우를 분활 해서 레이아웃을 만들자.

> public폴더에 있는 Roboto.txt 파일은 나중에 실무가서 중요한 파일이다.
> 이것은 구글에 검색을 할 시에 회사나 링크가 나올 것이다.
> 구글에서 검색 로봇이 사이트를 계속 뒤진다. 어느 사이트를 뒤지나? 그것이 Roboto.txt에서 뒤진다.

## image 넣기

이미지를 넣고 싶으면 public에 이미지를 넣자

```js
import { Row, Col } from "antd";
import React from "react";

const Signin = () => (
	<Row style={{ height: "100vh" }} align='middle'>
		<Col span={24}>
			<Row>
				<Col
					span={12}
					style={{
						width: 800,
					}}
				>
					<img
						src='/img/bg_signin.png'
						alt='Signin'
						style={{
							width: "100%",
						}}
					/>
				</Col>
				<Col span={12}>
					<div>My Books</div>
					<div>Please Note Your Opinion</div>
				</Col>
			</Row>
		</Col>
	</Row>
);
export default Signin;
```

components폴더에

그리고 Signin.module.css를 추가하자.

```css
.signin_row {
	height: 100vh;
}

.signin_title {
	text-align: center;
	font-size: 30px;
	font-weight: bold;
	color: #642828;
	text-transform: uppercase;
	margin-top: 80px;
}

.signin_subtitle {
	text-align: center;
	font-size: 20px;
	font-weight: bold;
	text-transform: uppercase;
}

.signin_underline {
	width: 200px;
	height: 6px;
	margin: 20px auto 0 auto;
	background: linear-gradient(to right, #803b32, #ddb49b);
}

.signin_contents {
	margin-top: 50px;
	background-color: #f3f7f8;
	margin-left: auto;
	margin-right: auto;
	width: 800px;
}

.signin_bg {
	width: 100%;
}

.email_title {
	font-family: Roboto;
	font-size: 12px;
	font-weight: bold;
	margin-top: 40px;
	text-align: left;
	padding-left: 40px;
}

.password_title {
	font-family: Roboto;
	font-size: 12px;
	font-weight: bold;
	margin-top: 10px;
	text-align: left;
	padding-left: 40px;
}

.required {
	color: #971931;
}

.input_area {
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 40px;
	padding-right: 40px;
}

.input {
	width: 100%;
	border-radius: 1px;
	border-width: 1px;
	font-family: Roboto;
}

.button_area {
	text-align: center;
	padding-left: 40px;
	padding-right: 40px;
	margin-top: 20px;
}

.button {
	border-color: #28546a;
	background-color: #28546a;
	text-transform: uppercase;
	border-radius: 1px;
	border-width: 2px;
	color: white;
	width: 100%;
}

.button:hover {
	background-color: #28546a;
	color: white;
}
```

그리고 components에 있는 Signin.jsx에 import를 해서 가져 와 보자.

```js
import { Row, Col } from "antd";
import React from "react";
import styles from "./Signin.module.css";

console.log(styles);
const Signin = () => (
	<Row align='middle' className={styles.signin_row}>
		<Col span={24}>
			<Row>
				<Col span={12} className={styles.signin_contents}>
					<img
						src='/img/bg_signin.png'
						alt='Signin'
						className={styles.signin_bg}
					/>
				</Col>
				<Col span={12}>
					<div className={styles.signin_title}>My Books</div>
					<div className={styles.signin_subtitle}>Please Note Your Opinion</div>
				</Col>
			</Row>
		</Col>
	</Row>
);
export default Signin;
```

styles 콘솔에는

```js
{signin_row: "Signin_signin_row__2MSlG", signin_title: "Signin_signin_title__Q5bMW", signin_subtitle: "Signin_signin_subtitle__36Jj2", signin_underline: "Signin_signin_underline__2mWLl", signin_contents: "Signin_signin_contents__1W233", …}
```

이렇게 이름이 지정된다.

```js
import { Row, Col, Input, Button } from "antd";
import React from "react";
import styles from "./Signin.module.css";

console.log(styles);
const Signin = () => (
	<form>
		<Row align='middle' className={styles.signin_row}>
			<Col span={24}>
				<Row className={styles.signin_contents}>
					<Col span={12}>
						<img
							src='img/bg_signin.png'
							alt='Signin'
							className={styles.signin_bg}
						/>
					</Col>
					<Col span={12}>
						<div className={styles.signin_title}>My Books</div>
						<div className={styles.signin_subtitle}>
							Please Note Your Opinion
						</div>
						<div className={styles.signin_underline} />
						<div className={styles.email_title}>
							Email
							<span className={styles.required}> *</span>
						</div>
						<div className={styles.input_area}>
							<Input
								placeholder='Email'
								autoComplete='email'
								name='email'
								className={styles.input}
							/>
						</div>
						<div className={styles.password_title}>
							Password
							<span className={styles.required}> *</span>
						</div>
						<div className={styles.input_area}>
							<Input
								type='password'
								autoComplete='current-password'
								className={styles.input}
							/>
						</div>
						<div className={styles.button_area}>
							<Button size='large' className={styles.button}>
								Sign In
							</Button>
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
	</form>
);
export default Signin;
```

이렇게 만든다.
![image-20201227173722461](/Users/apple/Library/Application Support/typora-user-images/image-20201227173722461.png)

버튼에 click이벤트를 넣자.

```js
import { Row, Col, Input, Button } from "antd";
import React from "react";
import styles from "./Signin.module.css";

console.log(styles);
const Signin = () => {
	return (
		<form>
			<Row align='middle' className={styles.signin_row}>
				<Col span={24}>
					<Row className={styles.signin_contents}>
						<Col span={12}>
							<img
								src='img/bg_signin.png'
								alt='Signin'
								className={styles.signin_bg}
							/>
						</Col>
						<Col span={12}>
							<div className={styles.signin_title}>My Books</div>
							<div className={styles.signin_subtitle}>
								Please Note Your Opinion
							</div>
							<div className={styles.signin_underline} />
							<div className={styles.email_title}>
								Email
								<span className={styles.required}> *</span>
							</div>
							<div className={styles.input_area}>
								<Input
									placeholder='Email'
									autoComplete='email'
									name='email'
									className={styles.input}
								/>
							</div>
							<div className={styles.password_title}>
								Password
								<span className={styles.required}> *</span>
							</div>
							<div className={styles.input_area}>
								<Input
									type='password'
									autoComplete='current-password'
									className={styles.input}
								/>
							</div>
							<div className={styles.button_area}>
								<Button size='large' className={styles.button} onClick={click}>
									Sign In
								</Button>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>
		</form>
	);
	function click() {}
};
export default Signin;
```

버튼 컴포넌트에 onClick이라는 프롭스를 넘겨준 것이다.

배경색을 지정하려면 위 처럼 styles.signin_contents 이것을 추가하자.

class 로 만들어 보자.

```js
import { Row, Col, Input, Button } from "antd";
import React from "react";
import styles from "./Signin.module.css";

console.log(styles);

class Signin extends React.Component {
	render() {
		return (
			<form>
				<Row align='middle' className={styles.signin_row}>
					<Col span={24}>
						<Row className={styles.signin_contents}>
							<Col span={12}>
								<img
									src='img/bg_signin.png'
									alt='Signin'
									className={styles.signin_bg}
								/>
							</Col>
							<Col span={12}>
								<div className={styles.signin_title}>My Books</div>
								<div className={styles.signin_subtitle}>
									Please Note Your Opinion
								</div>
								<div className={styles.signin_underline} />
								<div className={styles.email_title}>
									Email
									<span className={styles.required}> *</span>
								</div>
								<div className={styles.input_area}>
									{/* <Input
                placeholder="Email"
                autoComplete="email"
                name="email"
                className={styles.input}
              /> */}
									<input type='text' />
								</div>
								<div className={styles.password_title}>
									Password
									<span className={styles.required}> *</span>
								</div>
								<div className={styles.input_area}>
									<Input
										type='password'
										autoComplete='current-password'
										className={styles.input}
									/>
								</div>
								<div className={styles.button_area}>
									<Button
										size='large'
										className={styles.button}
										onClick={this.click}
									>
										Sign In
									</Button>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</form>
		);
	}
	click = () => {
		console.log("dd");
	};
}
export default Signin;
```

state에 email을 기본 값으로 하자.

만약 클래스에 초기값을 설정하면 렌더되면서 input에 value에 this.state.email 을 넣고 콘솔로 가면 onChange가 없다고 에러가 발생한다. 그러면 onChange를 써야한다.

```js
import { Row, Col, Input, Button } from "antd";
import React from "react";
import styles from "./Signin.module.css";

console.log(styles);

class Signin extends React.Component {
	state = {
		email: "",
	};
	render() {
		return (
			<form>
				<Row align='middle' className={styles.signin_row}>
					<Col span={24}>
						<Row className={styles.signin_contents}>
							<Col span={12}>
								<img
									src='img/bg_signin.png'
									alt='Signin'
									className={styles.signin_bg}
								/>
							</Col>
							<Col span={12}>
								<div className={styles.signin_title}>My Books</div>
								<div className={styles.signin_subtitle}>
									Please Note Your Opinion
								</div>
								<div className={styles.signin_underline} />
								<div className={styles.email_title}>
									Email
									<span className={styles.required}> *</span>
								</div>
								<div className={styles.input_area}>
									{/* <Input
                placeholder="Email"
                autoComplete="email"
                name="email"
                className={styles.input}
              /> */}
									<input
										type='text'
										value={this.state.email}
										onChange={this.change}
									/>
								</div>
								<div className={styles.password_title}>
									Password
									<span className={styles.required}> *</span>
								</div>
								<div className={styles.input_area}>
									<Input
										type='password'
										autoComplete='current-password'
										className={styles.input}
									/>
								</div>
								<div className={styles.button_area}>
									<Button
										size='large'
										className={styles.button}
										onClick={this.click}
									>
										Sign In
									</Button>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</form>
		);
	}
	click = () => {
		console.log("dd");
	};
	change = () => {
		console.log("change");
	};
}
export default Signin;
```

하지만 input에 변화가 없을 것이다; 그럴때 change 함수에 this.setState로 해서 상태를 바꿔줘야한다.

```js
import { Row, Col, Input, Button } from "antd";
import React from "react";
import styles from "./Signin.module.css";

console.log(styles);

class Signin extends React.Component {
	state = {
		email: "",
	};
	render() {
		return (
			<form>
				<Row align='middle' className={styles.signin_row}>
					<Col span={24}>
						<Row className={styles.signin_contents}>
							<Col span={12}>
								<img
									src='img/bg_signin.png'
									alt='Signin'
									className={styles.signin_bg}
								/>
							</Col>
							<Col span={12}>
								<div className={styles.signin_title}>My Books</div>
								<div className={styles.signin_subtitle}>
									Please Note Your Opinion
								</div>
								<div className={styles.signin_underline} />
								<div className={styles.email_title}>
									Email
									<span className={styles.required}> *</span>
								</div>
								<div className={styles.input_area}>
									{/* <Input
                placeholder="Email"
                autoComplete="email"
                name="email"
                className={styles.input}
              /> */}
									<input
										type='text'
										value={this.state.email}
										onChange={this.change}
									/>
								</div>
								<div className={styles.password_title}>
									Password
									<span className={styles.required}> *</span>
								</div>
								<div className={styles.input_area}>
									<Input
										type='password'
										autoComplete='current-password'
										className={styles.input}
									/>
								</div>
								<div className={styles.button_area}>
									<Button
										size='large'
										className={styles.button}
										onClick={this.click}
									>
										Sign In
									</Button>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</form>
		);
	}
	click = () => {
		console.log("dd");
	};
	change = (e) => {
		this.setState({ email: e.target.value });
	};
}
export default Signin;
```

이메일이 맞는지 아닌지 확인해야한다. 이때 정규 표현식을 사용하는게 낫다.

```js
import { Row, Col, Input, Button } from "antd";
import React from "react";
import styles from "./Signin.module.css";

console.log(styles);

class Signin extends React.Component {
	state = {
		email: "",
		loading: false,
	};
	render() {
		const { email, loading } = this.state;
		const isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		);
		return (
			<form>
				<Row align='middle' className={styles.signin_row}>
					<Col span={24}>
						<Row className={styles.signin_contents}>
							<Col span={12}>
								<img
									src='img/bg_signin.png'
									alt='Signin'
									className={styles.signin_bg}
								/>
							</Col>
							<Col span={12}>
								<div className={styles.signin_title}>My Books</div>
								<div className={styles.signin_subtitle}>
									Please Note Your Opinion
								</div>
								<div className={styles.signin_underline} />
								<div className={styles.email_title}>
									Email
									<span className={styles.required}> *</span>
								</div>
								<div className={styles.input_area}>
									{/* <Input
                placeholder="Email"
                autoComplete="email"
                name="email"
                className={styles.input}
              /> */}
									<input
										type='text'
										value={this.state.email}
										onChange={this.change}
									/>
									{isEmail ? "이메일 맞음" : "이메일 아님"}
								</div>
								<div className={styles.password_title}>
									Password
									<span className={styles.required}> *</span>
								</div>
								<div className={styles.input_area}>
									<Input
										type='password'
										autoComplete='current-password'
										className={styles.input}
									/>
								</div>
								<div className={styles.button_area}>
									<Button
										size='large'
										className={styles.button}
										onClick={this.click}
									>
										Sign In
									</Button>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</form>
		);
	}
	click = () => {
		console.log("dd");
	};
	change = (e) => {
		this.setState({ email: e.target.value });
	};
}
export default Signin;
```
