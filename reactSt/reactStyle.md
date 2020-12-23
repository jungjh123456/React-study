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
