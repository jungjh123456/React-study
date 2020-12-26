## antdLayout

```js
import React from "react";
import { Row, Col } from "antd";

const colStyle = () => ({
	height: 50,
	backgrondColor: "red",
	opacity: Math.round(Math.random() * 10) / 10,
});

function App() {
	return (
		<div className='App'>
			<Row>
				<Col span={12} style={colStyle()} />
				<Col span={12} style={colStyle()} />
			</Row>
		</div>
	);
}
```

이런 식으로 사용 가능하다.

```js
import React from "react";
import { Row, Col } from "antd";

const colStyle = () => ({
	height: 50,
	backgrondColor: "red",
	opacity: Math.round(Math.random() * 10) / 10,
});

function App() {
	return (
		<div className='App'>
			<Row gutter={16}>
				<Col span={12} style={colStyle()}>
					<div style={colStyle()} />
				</Col>
				<Col span={12} style={colStyle()}>
					<div style={colStyle()} />
				</Col>
			</Row>
		</div>
	);
}
```

col안에 있는 아이가 띄어져 나온다.

왜 16일까?

<Row gutter={16 + 8n의 정수}>

이다 항상 16 + 8의 배수이다. 양쪽이 얼마나 띄울건지 결정해 주는 아이인데 완전히 쪼개 질려고 하면 저렇게 16이면 잘 뛰어줄 수 있는데 1이나 3을 넣으면 정확하게 못 띄운다.

이런 식으로 offset은 12 띄어서 나온다.

```js
function App() {
	return (
		<div className='App'>
			<Row gutter={16}>
				<Col span={12} offset={12} style={colStyle()}>
					<div style={colStyle()} />
				</Col>
				<Col span={12} style={colStyle()}>
					<div style={colStyle()} />
				</Col>
			</Row>
		</div>
	);
}
```

위로 맞춰라 오른쪽으로 맞춰라 할때 요즘은 flex를 사용한다.

```js
function App() {
	return (
		<div className='App'>
			<Row gutter={16}>
				<Col span={12} offset={12} style={colStyle()}>
					<div style={colStyle()} />
				</Col>
				<Col span={12} style={colStyle()}>
					<div style={colStyle()} />
				</Col>
			</Row>
			<Row
				style={{
					height: 300,
				}}
				justify='start'
				align='top'
			>
				<Col />
			</Row>
		</div>
	);
}
```

이런 식으로 flex를 지정할 수 있다.(flex는 기본으로 들어가 있다.)
