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
