# Redux

## Redux Basic

1. 리덕스 개요
2. 리덕스 Action
3. 리덕스 Reducers
4. createStore, combineReducers
5. Context 로 연결하기
6. react-redux

이 리덕스는 난이도가 상당히 높다.

## Redux Basic

### Redux 개요

이전에 배웠던게 ContextApi를 배웠다. 리덕스는 context에 의해서 우리가 어떻게 하면 프로그램 복잡도를 최소한으로 하고 규칙화된 코드를 짤 것이냐에 집중을 하면 보면 된다.

하위 컴포넌트에서 최상위 컴포넌트에 있는 메서드를 이용해서 데이터를 set해서 렌더를 다시 하도록 유도를 한 것이다.
그래서 이 부분을 정확하게 쉽게 할 수 있냐에 집중을 하고 있는게 Redux이다.

예전에 컴포넌트간에 커뮤니케이션을 하려면 상위 컴포넌트에 데이터와 데이터를 바꾸는 아이가 있고 각자 하위 컴포넌트가 나눠가진 형태로 호출하고 그 데이터를 다시 그리는게 기본이었다.

![image-20201230212116614](./img/reduximg.png);

위 그림에서 왼쪽 컴포넌트에서 오른쪽 컴포넌트로 갈때 상위 컴포넌트에서 데이터와 데이터를 바꾸는 함수를 사용해 오른쪽 컴포넌트의 상태를 바꿀 수 있었다.

그래서 state와 state를 바꾸는 함수가 최상위 컴포넌트에 있어야만 했다.

하지만 이제 바뀌었다. 가운데(최상위 컴포넌트)를 통하지 않은 것 처럼 보이지만 실은 통하지만 실제 보이는건 하위 컴포넌트에서 행동을 하게 되면 외부 상태가 변해서 가져다 쓰는 다른 컴포넌트가 렌더가 다시되도록 로직이 되어있다. 아래와 같은 그림처럼 되었다.

![image-20201230212116614](./img/Reduximg2.png);

저 파란색 공은 어디에 있나? 그 파란색 공은 컨텍스트이다. 컨텍스트에 넣어주는 state와 state를 변경하는 로직이 들어 있는데 그 로직을 사용하는 방법이 리덕스 만의 방식으로 제공해 준다.

그 컨텍스트의 이름이 스토어 이다.

스토어라고 부르면 보통은 state와 state를 바꾸는 로직을 한꺼번에 담고 있는 아이라고 생각 하면 된다.

![image-20201230212116614](./img/Reduximg3.png);

이런 그림이다. state와 state를 변경하는 로직이 Store에 있고 이제 하위 컴포넌트(초록색)이 뭔가를 하면 store에서 상태를 변경해 다른 컴포넌트에다 연결할 수 있다..(파란색)

연결하는 방식은 컨슈머라든가 useContext를 내부적으로 구현이 되어 있다. 갖다 쓰겠다 등록을 하면 파란색을 가지고 있는 아이는 다시 랜더를 할 것이다. 초록색 선을 하는 공은 파란색처럼 변경에 의해서 그림을 그리는 아이는 아니고 그냥 보라색 공은 변해라 얍 하면 되는 아이이다. 초록색 선은 변경하는 사람이로 파란색 선은 그 변경에 의해서 데이터 변화를 트랙킹 하다가 그림을 그리는 아이이다.

위처럼 이렇게 분리된 것 처럼 보이지만 실제로는 파란색만 있는 아이가 있고 초록색이 있는 아이가 있고 둘다 있는 아이가 있다.

### 리턱스를 배운다는 것..

1. 단일 스토어를 만드는 법(스토어를 만드는 법)
   - 가장 중요한 요소는 이 안에 state가 무엇이냐를 설정하는 것과 그 state를 어떻게 바꾸느냐를 담고 있는게 중요하다.
2. 리액트에서 스토어 사용하는 법
   - 위에서 트리들은 컴포넌트 트리이다. 컴포넌트 트리는 리엑트 컴포넌트로 되어 있는 거고 store에 연결해서 어떻게 사용하는지 익히는 것(만약 다른 것을 배운다 하면 vue컴포넌트에서 스토어를 사용하는 법도 있고 앵귤러에서 스토어에서 사용하는 법도 있다.)

- 단일 스토어다!!!

저 위에 그림에서 store는 우리의 앱에서는 하나이다. (하나가 아닌 것도 있나? 그게 mobx이다 하나가 아니고 여러개이다. )
리덕스는 단일 스토어이다. 2개의 처리 방식이 다를 수 도 있다.  
리덕스는 단일 스토어 이기 때문에 이 스토어 하나에 있는 단일 스테이트가 앱이 커질 수록 복잡해 진다. 단일 스토어이기 때문에 그 스테이트를 분리하게 합니다 그래서 분리하는 방법을 알려준다. mobx는 스토어가 분리가 되어 있기 때문에 하나로 합치려고 하지 않는다.

단일 스토어를 만드려면 리덕스를 사용한다. (단일 스토어를 만드는 법은 똑같다.)

- [만들기] 단일 스토어 사용하기

  - import redux

  - 액션을 정의하고,
  - 액션을 사용하는, 리듀서를 만들고,
  - 리듀서들을 합친다.
  - 최종 합쳐진 리듀서를 인자로, 단일 스토어를 만든다.


리덕스는 큰 장점이 있다. 누군가가 짜도 비슷할 것이다.
보통 리덕스를 사용하면 코드가 안정적이고 보수적으로 관리를 하게 된다. (내부적인 로직은 다를 수도 있다. 하지만 찾으려가면 꼭 거기로 찾으려 갈 수 밖에 없다.)

- [사용하기] 준비한 스토어를 리액트 컴포넌트에서 사용하기
  - inport react-redux
  - connect함수를 이용해서 컴포넌트에 연결

connect함수는 hoc함수이다. hoc는 한물 갔다. 훅이있다.(너무 좋다.)



```bash
npx create-react-app redux-start
```

해서 프로젝트를 하나 생성해 보자.

그리고 만든 폴더로 들어가서 

```bash
npm i redux
```

redux를 설치하자.



## Action

Action을 하기 전에 state가 구상되어 있어야 한다.

### 리덕스의 액션이란?

- 액션은 사실 그냥 객체 입니다.(플레인 객체)
- 두 가지 형태의 액션이 있습니다.
  - {type: 'TEST'} // payload 없는 액션
  - {type: 'TEST', params: 'hello'} // payload 있는 액션
- type만이 필수 프로퍼티이며 type은 문자열 이다.

> 문자열의 가장 큰 단점은 오타이다.



### 리덕스의  액션 생성자란?

```react
function 액션생성자(...args) { return 액션; }
```

- 액션을 생성하는 함수를 "액션 생성자 (Action Creator)" 라고 합니다. 액션을 리턴하는 함수이다.
- 함수를 통해 액션을 생성해서 액션 객체를 리턴해준다.
- createTest('hello'); // {type: 'TEST', params: 'hello'} 리턴

### 리덕스의 액션은 어떤 일을 하나요?

- 액션 생성자를 통해 액션을 만들어 낸다.
- 만들어낸 액션 객체를 리덕스 스토어에 보낸다.

![image-20201230212116614](./img/Reduximg3.png)

초록색이 store로 날라간게 액션 객체이다. 

- 리덕스 스토어가 액션 객체를 받으면 스토어의 상태값이 변경된다.

액션을 보냈으면 파란색 아이들이 다 바꾸려고 랜더할려고 한다. 랜더를 하려고 하고 싶으면 액션을 만들어서 보내야 한다.

- 변경된 상태 값에 의해 상태를 이용하고 있는 컴포넌트가 변경된다.
- 액션은 스토어에 보내는 일종의 인풋이라 생각할 수 있다.



### 액션을 준비하기 위해서는?

- 액션의 타입을 정의하여 변수로 빼는 단계
  - 강제는 아니다.
  - 그냥 타입을 문자열로 넣기에는 실수를 유발할 가능성이 크다.
  - 미리 정의한 변수를 사용하면 스펠링에 주의를 덜 기울여도 된다.
- 액션 객체를 만들어 내는 함수를 만드는 단계 (actioncreator를 만든다.)
  - 하나의 액션 객체를 만들기 위해 하나의 함수를 만들어 낸다.
  - 액션의 타입은 미리 정의한 타입 변수로 부터 가져와서 사용한다.



### 액션 준비 코드

```js
// actions.js

// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo
export const ADD_TODO = 'ADD_TODO';

// 액션 생산자
// 액션의 타입은 미리 정의한 타입으로 부터 가져와서 사용하며,
// 사용자가 인자로 주지 않습니다.
export function addTodo(text) {
  return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
}
```



actions.js를 만들자.



action을 만들기 전에 state를 구상해보자. 어떤 state를 줄지 생각해 보자. 
["장보기","산책하기"]; 이런 택스트들이 ADD_TODO라는 아이를 액션을 실행할 때 같이 들어가야 하는 단어기 때문에 이런 아이들이 있는 경우에는 페이로드를 넣어줘야한다. (페이로드란 화물이 도착하면 짐을 넣고 보내는 걸로 이해)

ADD_TODO할때 장보기를 넣고 실행하면 type이 ADD_TODO이고 text가 장보기인 액션 객체가 만들어 진다.

## Reducers - 리듀서

### 리덕스의 리듀서란 ?

- 액션을 주면, 그 액션이 적용되어 달라진(안달라질수도..) 결과를 만들어 줌

- 그냥 함수이다.
  - Pure Function (순수 함수)
  - Immutable
    - 왜?
      - 리듀서를 통해 스테이트가 달라졌음을 리덕스가 인지하는 방식



순수함수는 비순수함수와 다르게 부수효과가 일어나지 않고 같은 인풋을 넣으면 같은 결과를 만들어 주는 순수함수이다.

그리고 immutable이다. 리듀서를 통해서 스테이트가 달라졌음을 리덕스가 인지를 한다.

 ```js
function 리듀서(previousState, action) {
  return newState;
}
 ```

- 액션을 받아서 스테이트를 리턴하는 구조
- 인자로 들어오는 previousState와 리턴되는 newState는 다른 참조를 가지도록 해야합니다.

previousState: 이전의 상태값

action: 현재 들어온 액션

![image-20201230212116614](./img/Reduximg3.png)



그림에서 보면 보라색이 액션을 던지면 store안에서 reducer함수가 실행된다. 어떻게 실행 되나? 초록색을 받았을 때의 현재 상태와 초록색 액션을 인자로 해서 바뀔 스테이트를 리턴해 내는 그런 함수를 실행하는 것 이다.

그래서 첫 번째 인자가 현재 스테이트(이전의 스테이즈) 2번째는 방금 받아들인 액션 리턴이 새로운 스테이트이다. 

받은 previousState를 새로 만들어서 보내야한다. (이뮤터블하게) setState할때와 같은 방식이다.

reducers.js로 만들자,

```js

// 언제 실행 되나?
// 1. 앱이 최초로 실행될 때 => 초기 state를 만들어서 할당한다. 이런 행동을 해야한다.
// 2. 액션이 날라왔을 때
function todoApp(previousState, action) { 
  // 앱이 최초로 실행됬을 때 타이밍을 알려면 최초에 previousState는 undefined가 들어온다.
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return []; // 초기값
  }
  
  // 변경이 일어나는 로직
  
  // 변경이 안일어났을때
  return previousState;
}
```



변경이 일어날려면 밑에와 같이 해야한다.



```js

import { ADD_TODO } from "./actions";

// 언제 실행 되나?
// 1. 앱이 최초로 실행될 때 => 초기 state를 만들어서 할당한다. 이런 행동을 해야한다.
// 2. 액션이 날라왔을 때
function todoApp(previousState, action) { 
  // 앱이 최초로 실행됬을 때 타이밍을 알려면 최초에 previousState는 undefined가 들어온다.
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return []; // 초기값
  }
  
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return [...previousState, action.text];
  }
  
  // 변경이 안일어났을때
  return previousState;
}
```



정리해 보면 todoApp을 실행하는데 현재값과 새로운 액션이 들어왔다. 근데 만약에 undefined면 최초이기 때문에 그때 state값을 빈배열로 초기값으로 할당하고 만약 다른 액션이 들어오거나 다른 일이 일어나면은 반응을 안한다.

```js
  if (action.type === ADD_TODO) {
    return [...previousState, action.text];
  }
```

이거에만 반응할 일으키꺼니까 ADD_TODO라는 타입에 액션을 발행한 것이기 때문에 그것에 변경하는 로직을 추가해 주고 이거 외에는 변경 안한다고 한다.

이때까지 놀라운건 지금까지 import redux를 한적이 없다.

액션에서 addTodo를 쓴 적이 없다. 지금까지 한번도 발생시킨적이 없기 때문이다. reducer를 만들때 발생하는게 아니라 누가 발생시키는 건가? 그것은 리엑트 컴포넌트가 클릭을 했을때  addTodo를 넣는다 이런 식이다.



## createStore

store가 중요하다. redux로 부터 import를 하는 함수이다.

```js
const store = createStore(리듀서);
```

우리가 만든 리유서인 todoApp이라는 리듀서이다. 그래서 todoApp이라는 리듀서를 인자로 넣고 createStore를 실행하면 그 결과로 Store가 나온다.

- createStore 아이는 이런 타입을 가지고 있다.

  - 첫번째 인자로 reducer: Reducer를 받고
  - 두번째 인자로 preloadedState를 받고
  - 세번째 인자로 enhancer?: StoreEnhancer을 받는다.

  지금은 두번째인자 세번째 인자는 사용을 안하고 Reducer만 가지고 실행을 할 것이다.

  enhancer는 나중에 자세히 공부 할 것이다.

  두번째 인자는 최초에 previousState가 undefined인데 2번째 인자를 뭔가를 넣으면 previousState가 undefined가 아니게 된다.



### 스토어 만들기

src에 store.js를 만들자.

- store.js

```js
import { createStore } from 'redux';

const store = createStore()
```

해서 createStore에 첫 번째 인자로 우리가 만든 리듀서를 넣는다. reducers.js에서 export해서 사용해 보자.



- reducers.js

```js

import { ADD_TODO } from "./actions";

// 언제 실행 되나?
// 1. 앱이 최초로 실행될 때 => 초기 state를 만들어서 할당한다. 이런 행동을 해야한다.
// 2. 액션이 날라왔을 때
export function todoApp(previousState, action) { 
  // 앱이 최초로 실행됬을 때 타이밍을 알려면 최초에 previousState는 undefined가 들어온다.
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return []; // 초기값
  }
  
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return [...previousState, action.text];
  }
  
  // 변경이 안일어났을때
  return previousState;
}
```



store.js



```js
import { createStore } from 'redux';
import {todoApp} from './reducers';

const store = createStore(todoApp)

export default store;
```

이렇게 만들자.

store를 가져다 써보자 .



Index.js에서 써보자.



- Index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

console.log(store);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```



콘솔에는 찍히는건 아래와 같다.

![image-20201230212116614](./img/Reduximg4.png)



함수이름이 dispatch getState replaceReducer subscribe 4개밖에 없다.

redux라는 라이브러리는 엄청 일을 하는 라이브러리이다. 

### store

- Store.getState();
- Store.dispatch(액션); store.dispatch(액션생성자());
- const unsubscribe = store.subscribe(() => {});
  - 리턴이 unsubscribe 라는 점
  - Unsubscribe(); 하면 제거
- Store.replaceReducer(다른리듀서); // 얘는 쓸일이 별로 없다.(다른 리듀서로 교체 하는 아이다.)



- index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

console.log(store.getstate());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


```

콘솔에 찍히는 것은 빈 배열이다. 이 빈배열은 리듀서에 있는 초기 값이다. 



그 다음 할 일은 dispatch를 해보자.



action.js를 addTodo를 바꿔보자

- action.js

```js
export const ADD_TODO = 'ADD_TODO';


export const addTodo = (text) => (
   {type: ADD_TODO, text } // { type: ADD_TODO, text: text }
  )

// 최초의 상태값
// ["text"]

```

그리고 index.js에서 dispatch를 사용해 보자.



- index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { addTodo } from './actions';

console.log(store.state());
store.dispatch(addTodo('장보기'));
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

아무일도 안생기지만 store.dispatch(addTodo('장보기')); 이 아이가 전에 위 그림에서 보면 초록색 아이이다.
dispatch를 하면 action이 store한테 도달 하는 것이다.

그러면 console을 다시 찍어 보자.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { addTodo } from './actions';

console.log(store.state());
store.dispatch(addTodo('장보기'));
console.log(store.state());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```



다시 찍으면 ["장보기"]가 들어 있을 것이다.

이제 subscribe()를 써보자. 

subscribe는 구독이라는 의미이다. 어떤 것을 구독 하겠나요? store안에 있는 state가 변하면 새로 실행 되는 것이다. 

- Index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { addTodo } from './actions';

console.log(store.state());

store.subscribe(() => {
  console.log(store.state());
})

store.dispatch(addTodo('장보기'));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


```



하면 장보기가 들어온다. (일단 구독을 하고 dispatch를 해야한다. 이제 들어온다.)

subscribe는 최초에 설정될 때에는 할 수가 없다. 생성될때 빈배열로 세팅이 된다.

생성이 될때는 

- Store.js

```js
import { createStore } from 'redux';
import {todoApp} from './reducers';

const store = createStore(todoApp)

export default store;
```

이 때 이다.  이 store.js에다가 subscribe를 해봐야 초기값을 설정되는걸 여기서 볼수 없다.



이제 index.js에서 한거 지우자.

- index.js

  ```js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import './index.css';
  import App from './App';
  import reportWebVitals from './reportWebVitals';
  import store from './store';
  
  
  ReactDOM.render(
    <React.StrictMode>
      <App store={store}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
  
  
  ```

  그리고 App한테 store를 준다.

이제 App에서 store를 받을 수 있다.

- App.js

```js
import logo from './logo.svg';
import './App.css';

function App({ store }) {
  console.log(store.getState());
  return (
    <div className="App">
      <header className="App-header">
     
      </header>
    </div>
  );
}

export default App;

```



위에 처럼 하면 콘솔에 빈배열이 나온다.

화면에 출력해 보자.



- App.js

```js
import logo from './logo.svg';
import './App.css';

function App({ store }) {
const state = store.getState();
  return (
    <div className="App">
      <header className="App-header">
        {JSON.stringify(state)}
        <button>add</button>
      </header>
    </div>
  );
}

export default App;


```

화면에 나올 것이고 add를 누르면 새로운 아이를 추가할 것이다.



- App.js

```js
import './App.css';
import { addTodo } from './actions';


function App({ store }) {
  const state = store.getState();
    return (
      <div className="App">
        <header className="App-header">
          {JSON.stringify(state)}
          <button onClick={click}>add</button>
        </header>
      </div>
    );
    function click() {
      store.dispatch(addTodo('아무거나'))
    }
  }
  
  export default App;
  
```



이렇게 하고 버튼을 누르면 될까 안될까?? 

당연히 안된다. 왜 안될까? 얘를 눌렸다고 해서 return이 다시 실행 하는 건 아니다. 

조금 꼼수를 해서 실행하도록 하자. 

아래와 같이 useState를 사용을 하자.

- App.js

```js
import './App.css';
import { addTodo } from './actions';
import { useState } from 'react';


function App({ store }) {
  const [state, setState] = useState(store.getState());

    return (
      <div className="App">
        <header className="App-header">
          {JSON.stringify(state)}
          <button onClick={click}>add</button>
        </header>
      </div>
    );
    function click() {
      store.dispatch(addTodo('아무거나'))
    }
  }
  
  export default App;
```



그리고 클릭을 했을때 반응을 해야해서 useEffect()를 사용하자.



- App.js

```js
import './App.css';
import { addTodo } from './actions';
import { useEffect, useState } from 'react';


function App({ store }) {
  const [state, setState] = useState(store.getState());
    
  useEffect(() => {
      store.subscribe(() => {
        setState(store.getState());
      })
    },[store])


    return (
      <div className="App">
        <header className="App-header">
          {JSON.stringify(state)}
          <button onClick={click}>add</button>
        </header>
      </div>
    );
    function click() {
      store.dispatch(addTodo('아무거나'))
    }
  }
  
  export default App;
  
  

```



이렇게 하면 잘 돌아간다. 

위에서 한가지가 빠졌다. 

```js
  useEffect(() => {
      store.subscribe(() => {
        setState(store.getState());
      })
    },[store])


```

componentDidMount 시점이다. 그래서 componentWillUnmount에 항상 해지한게 있어야 한다.



- App.js

```js
import './App.css';
import { addTodo } from './actions';
import { useEffect, useState } from 'react';


function App({ store }) {
  const [state, setState] = useState(store.getState());
    
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        setState(store.getState());
      })
      return () => {
        unsubscribe();
      }
    },[store])

    return (
      <div className="App">
        <header className="App-header">
          {JSON.stringify(state)}
          <button onClick={click}>add</button>
        </header>
      </div>
    );
    function click() {
      store.dispatch(addTodo('아무거나'))
    }
  }
  
  export default App;
  
  

```

이렇게 만든다.

어디서는 store만 있으면 dispatch에 반응할 수 있는 리엑트 컴포넌트가 되겠구나 라는 생각이 든다.

어디서는 store를 가져다 쓸 수 있는 상태를 하게해주는 contextAPI를 사용하면 된다.

Src/contexts폴더를 만들어서 ReduxContext.js파일을 생성하자.



- ReduxContext.js

```js
import React from "react";

const ReduxContext = React.createContext();

export default ReduxContext;
```



이게 끝이다 그리고 ReduxContext를 index.js에다가 

- index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import ReduxContext from './contexts/ReduxContext';


ReactDOM.render(
  <React.StrictMode>
    <ReduxContext.Provider value={store}>
      <App />
    </ReduxContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


```

이렇게 Provider로 감싸고 App.js가서 

- App.js

```js
import './App.css';
import { addTodo } from './actions';
import { useContext, useEffect, useState } from 'react';
import ReduxContext from './contexts/ReduxContext';


function App() {
  const store = useContext(ReduxContext);

  const [state, setState] = useState(store.getState());
    
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        setState(store.getState());
      })
      return () => {
        unsubscribe();
      }
    },[store])

    return (
      <div className="App">
        <header className="App-header">
          {JSON.stringify(state)}
          <button onClick={click}>add</button>
        </header>
      </div>
    );
    function click() {
      store.dispatch(addTodo('아무거나'))
    }
  }
  
  export default App;
  
  

  

```

이렇게 하면 잘 나올 것이다.

![image-20201230212116614](./img/Reduximg5.png)

로직과 관계 없이 복잡한 내용들이 있다.

예를 들면 useEffect를 사용했던 거다.  어떤 컴포넌트든지 store랑 연결하면 100% 일어나야하는 일이다.

그래서 요런거를 빼서 hock을 만든다. 이것은 커스텀 훅인데 이 커스텀 훅을 누가 만들어서 주는 것일까? 그것은 리엑트 리덕스에서 만들어서 줄 것이다. 위에는 직접 만든 것이다. (알고 보면 저런 식으로 동작하는 코드이다.)

하나 더 말들자 src에 뉴 폴더해서 components 폴더 만들고 Form.jsx 파일와 todoList.jsx를 만들자.



- TodoList.jsx

```js
import React, { useContext, useEffect, useState } from 'react';
import ReduxContext from '../contexts/ReduxContext';

export default function TodoList() {
  const store = useContext(ReduxContext);
  const [todos, setTodos] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTodos(store.getState());
    })
    return () => {
      unsubscribe();
    }
  }, [store])
  return (
  <div>
    <ul>
      {todos.map(todo => <li>{todo}</li>)}
    </ul>
  </div>
  )
}
```

이렇게 만든 후 App.js에서 사용해 보자.



- App.js

```js
import './App.css';
import { addTodo } from './actions';
import { useContext, useEffect, useState } from 'react';
import ReduxContext from './contexts/ReduxContext';
import TodoList from './components/TodoList';


function App() {
  const store = useContext(ReduxContext);

  const [state, setState] = useState(store.getState());
    
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        setState(store.getState());
      })
      return () => {
        unsubscribe();
      }
    },[store])

    return (
      <div className="App">
        <header className="App-header">
          <TodoList />
          <button onClick={click}>add</button>
        </header>
      </div>
    );
    function click() {
      store.dispatch(addTodo('아무거나'))
    }
  }
  
  export default App;
```

![image-20201230212116614](./img/Reduximg6.png)

잘 나올 것이다.



이제 Form.jsx를 넣어보자.

- Form.jsx

```js
import React from 'react';

export default function Form() {
  return (
    <div>
      <input type="text" />
      <button>add</button>
    </div>
  )
}
```



- App.js

```js
import './App.css';
import { addTodo } from './actions';
import { useContext, useEffect, useState } from 'react';
import ReduxContext from './contexts/ReduxContext';
import TodoList from './components/TodoList';
import Form from './components/Form';


function App() {
  const store = useContext(ReduxContext);

  const [state, setState] = useState(store.getState());
    
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        setState(store.getState());
      })
      return () => {
        unsubscribe();
      }
    },[store])

    return (
      <div className="App">
        <header className="App-header">
          <TodoList />
          <Form />
        </header>
      </div>
    );
    function click() {
      store.dispatch(addTodo('아무거나'))
    }
  }
  
  export default App;
```

이렇게 하면 Form컴포넌트가 완성된다.

일단 Form가서 둘 중 하나이다. 컨트롤드, 언 컨트롤드 



언 컨트롤드로 해보자. (클래스 컴포넌트에서는 createRef를 써야했었고 함수는 useRef를 사용하자.)

- Form.jsx

```js
import React, { useRef } from 'react';

export default function Form() {
  const inputRef = useRef();
  return (
    <div>
      <input type="text" ref={inputRef}/>
      <button onClick={click}>add</button>
    </div>
  )
  function click() {
    console.log(inputRef);
  }
}
```

하면 콘솔에는 

![image-20201230212116614](./img/Reduximg7.png)

이렇게 current에 input이 들어와 있을 것이다.



- Form.jsx

```js
import React, { useRef } from 'react';

export default function Form() {
  const inputRef = useRef();
  return (
    <div>
      <input type="text" ref={inputRef}/>
      <button onClick={click}>add</button>
    </div>
  )
  function click() {
    console.log(inputRef.current.value);
  }
}
```

하면 콘솔에 input태그에 쓴 value가 나올 것이다.

여기서 어떻게 해야 할까? 액션 생성자 함수로 액션을 생성하자.



- actions.js

```js
export const ADD_TODO = 'ADD_TODO';


export const addTodo = (text) => (
   {type: ADD_TODO, text } // { type: ADD_TODO, text: text }
  )

// 최초의 상태값
// ["text"]
```

이 액션에 addTodo를 Form.jsx에 가져오자.



- Form.jsx

```js
import React, { useRef } from 'react';
import { addTodo } from "../actions";

export default function Form() {
  const inputRef = useRef();
  return (
    <div>
      <input type="text" ref={inputRef}/>
      <button onClick={click}>add</button>
    </div>
  )
  function click() {
    const todo = inputRef.current.value;
    addTodo(todo);
    console.log(addTodo(todo))
  }
}
```

그러면 add 버튼을 누르면 아래와 같이 콘솔에 찍힌다.

![image-20201230212116614](./img/Reduximg8.png)

얘를 치고 나서 빈칸으로 만들고 싶으면 

- Form.jsx

```js
import React, { useRef } from 'react';
import { addTodo } from "../actions";

export default function Form() {
  const inputRef = useRef();
  return (
    <div>
      <input type="text" ref={inputRef}/>
      <button onClick={click}>add</button>
    </div>
  )
  function click() {
    const todo = inputRef.current.value;
    addTodo(todo);
    console.log(addTodo(todo))
    inputRef.current.value = "";
  }
}
```

이렇게 하고 이제 dispatch를 하면 된다.



- ReduxContext.js

```js
import React from "react";

const ReduxContext = React.createContext();

export default ReduxContext;
```

이전에 만든 createContext를 가지고 dispatch를 하면 된다.



- Form.js

```js
import React, { useContext, useRef } from 'react';
import { addTodo } from "../actions";
import ReduxContext from '../contexts/ReduxContext';

export default function Form() {
  const store = useContext(ReduxContext);

  const inputRef = useRef();
  return (
    <div>
      <input type="text" ref={inputRef}/>
      <button onClick={click}>add</button>
    </div>
  )
  function click() {
    const todo = inputRef.current.value;
    addTodo(todo);
    store.dispatch(addTodo(todo))
    inputRef.current.value = "";
  }
}
```

그러면 아래와 같이 인풋에 작성하고 add를 누르면 화면에 그려질 것이다.

![image-20201230212116614](./img/Reduximg9.png)



얘는 subscribe 할 필요가 없다. 왜냐하면 받아서 그림 그릴게 없으니까

그래서 지금 index.js에서 Provider에서 넣어준 아이를 TodoList.jsx에서는 보여주는 용도로 쓰고 있고 Form.jsx에서는 액션을 날려주는 아이로 쓰고 있다.



## 로직을 추가하기

- action을 정의하고 action 생성자를 만들고, reducer를 수정하면 된다.

새로 추가될 로직

```js
// actions.js

// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

// 액션 생산자
// 액션의 타입은 미리 정의한 타입으로 부터 가져와서 사용하며,
// 사용자가 인자로 주지 않습니다.
export function addTodo(text) {
  return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
}
```

```js
// actions.js

// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

// 액션 생산자
// 액션의 타입은 미리 정의한 타입으로 부터 가져와서 사용하며,
// 사용자가 인자로 주지 않습니다.
export function addTodo(text) {
  return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index }; // { type: COMPLETE_TODO, index: index}
}
```

COMPLETE_TODO라고 하는걸 할 것이다. COMPLETE_TODO를 하려면 만약에 ADD_TODO로 들어간 아이가 할일이 끝나면 COMPLETE_TODO를 누르면은 ADD_TODO들어와 있던 데이터가 complete됐다고 떠야 한다.



action.js로 가서 addTodo를 실행할 때 거기가 reducers.js이다.



- reducers.js

새로 추가될 아이가 그냥 text가 아니고 객체 형태로 추가해야한다.

```js

// 언제 실행 되나?
// 1. 앱이 최초로 실행될 때 => 초기 state를 만들어서 할당한다. 이런 행동을 해야한다.

import { ADD_TODO } from "./actions";

// 2. 액션이 날라왔을 때
export function todoApp(previousState, action) { 
  // 앱이 최초로 실행됬을 때 타이밍을 알려면 최초에 previousState는 undefined가 들어온다.
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return []; // 초기값
  }
  
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return [...previousState, {text: action.text, done: false}];
  }
  
  // 변경이 안일어났을때
  return previousState;
}
```

변경이 일어나는 로직에서 변경을 한다.

이런 데이터가 들어온다는 사실을 알게 되었으니 TodoList.jsx에서 

- TodoList.jsx

```js
import React, { useContext, useEffect, useState } from 'react';
import ReduxContext from '../contexts/ReduxContext';

export default function TodoList() {
  const store = useContext(ReduxContext);
  const [todos, setTodos] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTodos(store.getState());
    })
    return () => {
      unsubscribe();
    }
  }, [store])
  return (
  <div>
     <ul>
      {todos.map(todo => <li>{todo.text}</li>)}
    </ul>
  </div>
  )
}
```



이렇게 바꿔주면 잘 나올 것이다.

![image-20201230212116614](./img/Reduximg9.png)

그리고 이 아이 옆에다가 버튼을 추가하자.



```js
import React, { useContext, useEffect, useState } from 'react';
import ReduxContext from '../contexts/ReduxContext';

export default function TodoList() {
  const store = useContext(ReduxContext);
  const [todos, setTodos] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTodos(store.getState());
    })
    return () => {
      unsubscribe();
    }
  }, [store])
  return (
  <div>
    <ul>
      {todos.map(todo => (<li>{todo.text}<button onClick={click}>done</button></li>))}
		</ul>
  </div>
  )
  function click() {
    
  }
}
```

이 버튼을 누르면 됐다고 변경을 할 것이다.



이제 리덕스 쪽을 바꾸러 가자.

이 done을 누르면 complete 형식의 dispatch가 날라 갈 것 인데 맨 처음에 하는 일은 actions.js에서 type을 만들어 줘야한다.

눌렸을 때 어느 건지를 알아내야하는데 보통은 이렇게 하면 안돼는데 지금은 빠르게 하기 위해서 생각 없이 인덱스라는 것을 줘야한다.

- actions.js

```js
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

export const addTodo = (text) => (
   {type: ADD_TODO, text } // { type: ADD_TODO, text: text }
);

export const completeTodo = (index) => ({
  type: COMPLETE_TODO,
  index,
});

// 최초의 상태값
// ["text"]
```



reducers.js에서는 이제

```js
// 2. 액션이 날라왔을 때
export function todoApp(previousState, action) { 
  // 앱이 최초로 실행됬을 때 타이밍을 알려면 최초에 previousState는 undefined가 들어온다.
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return []; // 초기값
  }
 
```

얘랑

```js
  // 변경이 안일어났을때
  return previousState;
}
```

얘는 변동이 없다.

여기서 만약에 action.type === COMPLETE_TODO면 새로운 배열을 리턴해야하는데 그 아이를 빼고 리턴해야 한다.

여기서 가장 쉬운 방법 for문을 돌면 된다. 



- reducers.js

```js

// 언제 실행 되나?
// 1. 앱이 최초로 실행될 때 => 초기 state를 만들어서 할당한다. 이런 행동을 해야한다.

import { ADD_TODO, COMPLETE_TODO } from "./actions";

// 2. 액션이 날라왔을 때
export function todoApp(previousState, action) { 
  // 앱이 최초로 실행됬을 때 타이밍을 알려면 최초에 previousState는 undefined가 들어온다.
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return []; // 초기값
  }
  
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return [...previousState, {text: action.text, done: false}];
  }
  if (action.type === COMPLETE_TODO) {
    const newState = [];
    for (let i = 0; i < previousState.length; i++) {
      const todo = previousState[i]
      if (i === action.index) {
        todo.done = true;
        newState.push({...todo});
      }
      newState.push({ ...todo })
    }
    return newState;
  }
  // 변경이 안일어났을때
  return previousState;
}
```

이렇게 짜니까 너무 복잡하다...(쉬운데 코드가 긴 방법이다.)

이거보다 간단한 방법은 아래 방법이다.

- reducers.js

```js

// 언제 실행 되나?
// 1. 앱이 최초로 실행될 때 => 초기 state를 만들어서 할당한다. 이런 행동을 해야한다.

import { ADD_TODO, COMPLETE_TODO } from "./actions";

// 2. 액션이 날라왔을 때
export function todoApp(previousState, action) { 
  // 앱이 최초로 실행됬을 때 타이밍을 알려면 최초에 previousState는 undefined가 들어온다.
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return []; // 초기값
  }
  
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return [...previousState, {text: action.text, done: false}];
  }
  if (action.type === COMPLETE_TODO) {
    const newState = [...previousState];
    newState[action.index].done = true;
    return newState;
  }
  // 변경이 안일어났을때
  return previousState;
}
```

이렇게 엄청 간단해 진다. 



이제 로직은 다 됬으니 dispatch를 날려주면 된다.



- TodoList.jsx

```js
import React, { useContext, useEffect, useState } from 'react';
import { completeTodo } from '../actions';
import ReduxContext from '../contexts/ReduxContext';

export default function TodoList() {
  const store = useContext(ReduxContext);
  const [todos, setTodos] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTodos(store.getState());
    })
    return () => {
      unsubscribe();
    }
  }, [store]);

  return (
  <div>
    <ul>
      {todos.map((todo,index) => {
        function click() {
          store.dispatch(completeTodo(index));
        }
        if (todo.done) {
          return  <li style={{textDecoration: "line-through"}}>{todo.text}</li>
        }
      return ( 
        <li>{todo.text}
        <button onClick={click}>done</button>
        </li>
      )
    })}
      </ul>
  </div>
  )
}
```

이렇게 하자. map안에 click이밴트함수를 넣은 이유는 Index를 받기 위함이다.



이렇게 완성을 하면 done 버튼을 누르면 가운데 선이 그려질 것이다.

![image-20201230212116614](./img/Reduximg10.png)



## 정리

로직을 추가할 때  action을  정의하고, action 생성자를 만들고, reducer를 수정해야한다 빠진게 있다 그건 맨 앞에 state를 구상해야 한다. (세로 변경하는 state)





## 애플리케이션이 커지면 state 가 복잡해 진다.

이전에는 

```js
[
  {
    tdxt: 'Hello',
    completede: false
  }
]
```

근데 이제 애플리케이션이 복잡해 져서 그래서

```js
{
  todos: [
    {
      text: "Hello",
      completed: false
    }
  ],
    filter: "SHOW_ALL"
}
```

이렇게 todos도 만들고 filter도 만들고 더 많이 생긴다.

- 리듀서를 크게 만들고 state를 변경하는 모든 로직을 담을 수도 있다.

예를들어서 리턴해줄때 어떻게 리턴 해줬나면 

- reducers.js

```js
return [...previousState, {text: action.text, done: false}];
```

이렇게 todo만 리턴했다. 

이렇게 리턴하는게 아니라 아예 초기 값이 이런 형태가 아니라 변경을 하는 거다.

일단 변경 state를 구상해보자.

```js
{todos: [{text: "장보기", done: false},{text: "장보기", done: false}], filter: 'SHOW_ALL'}
```

이런걸 추가했다고 보자.

이제 최초의 상태값이 바뀌겠다.

```js
// 기존 초기값
[] => []
// 이후 초기값
[] => {todos:[], filter: 'SHOW_ALL'}
```

이렇게 바뀌면 이렇게 해당하게 reducers.js 도 바꿔줘야한다.

- reducers.js

```js

// 언제 실행 되나?
// 1. 앱이 최초로 실행될 때 => 초기 state를 만들어서 할당한다. 이런 행동을 해야한다.

import { ADD_TODO, COMPLETE_TODO } from "./actions";

// 2. 액션이 날라왔을 때
export function todoApp(previousState, action) { 
  // 앱이 최초로 실행됬을 때 타이밍을 알려면 최초에 previousState는 undefined가 들어온다.
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return []; // 초기값 이것도 달라지고
  }
  
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return [...previousState, {text: action.text, done: false}];
  } // 이것도 달라지고
  
  if (action.type === COMPLETE_TODO) {
    const newState = [...previousState];
    newState[action.index].done = true;
    return newState;
  } // 이것도 달라진다
  
  // 변경이 안일어났을때 이때만 달라지지 않는다.
  return previousState;
}
```

그래서 달라진다고 말을 했던건 리듀서를 크게 만드는 것이다. 시간이 갈 수록 복잡해 질 것이다.

그래서 리덕스는 저걸 쪼개는 방법을 알려준다. (쪼개는 방법을 모르는 상태에서 이걸 하면 복잡해질 수 밖에 없다.)

mobX같은 경우 2개를 다른 스토어로 사용하겠다. (todos에 대한 store를 따로두고 filter 스토어를 따로 만든다.)

- 리듀서를 분할해서 만들고 합치는 방법을 사용할 수 있다.
  - todos만 변경하는 액션을을 처리하는 A라는 리듀서 함수를 만들고
  - filter만을 변경하는 액션을들 처리하는 B라는 리듀서 함수를 만들고
  - A와 B를 합침

### 한번에 다하는 리듀서

- reducers.js

```js
import { ADD_TODO, COMPLETE_TODO } from "./actions";

// 2. 액션이 날라왔을 때
export function todoApp(previousState, action) { 
  // 앱이 최초로 실행됬을 때 타이밍을 알려면 최초에 previousState는 undefined가 들어온다.
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return {todos: [], filter: 'SHOW_ALL'}; // 초기값
  }
  
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return {
      ...previousState, // 변하지 않은 아이(filter)
      todos:[...previousState.todos, {text: action.text, done: false}]
    };
  }
  if (action.type === COMPLETE_TODO) {
    const newTodos = [...previousState.todos];
    newTodos[action.index].done = true;
    return {...previousState, todos: newTodos }};
  }

  // 변경이 안일어났을때
  return previousState;
}
```



filter를 바꾸는 action을 추가해 보자

- Actions.js

```js
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

export const SHOW_DONE = "SHOW_DONE";
export const SHOW_ALL = "SHOW_ALL";

export const addTodo = (text) => (
   {type: ADD_TODO, text } // { type: ADD_TODO, text: text }
);

export const completeTodo = (index) => ({
  type: COMPLETE_TODO,
  index,
});

export const showDone = () => ({
  type: COMPLETE_TODO,
}); // 페이로드가 필요 없다.

export const showAll = () => ({
  type: SHOW_ALL
});
// 최초의 상태값
// ["text"]
```



이렇게 바꾸고 얘를 받는 reducers.js를 처리하자.

- reducers.js

```js


// 언제 실행 되나?
// 1. 앱이 최초로 실행될 때 => 초기 state를 만들어서 할당한다. 이런 행동을 해야한다.

import { ADD_TODO, COMPLETE_TODO, SHOW_ALL, SHOW_DONE } from "./actions";

// 2. 액션이 날라왔을 때
export function todoApp(previousState, action) { 
  // 앱이 최초로 실행됬을 때 타이밍을 알려면 최초에 previousState는 undefined가 들어온다.
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return {todos: [], filter: 'SHOW_ALL'}; // 초기값
  }
  
  
  // todos
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return [...previousState, {text: action.text, done: false}];
  } // 이것도 달라지고
  
  if (action.type === COMPLETE_TODO) {
    const newTodos = [...previousState.todos];
    newTodos[action.index].done = true;
    return {...previousState, todos: newTodos};
  } // 이것도 달라진다
  
  // filter
  if (action.type === SHOW_DONE) {
    return {...previousState, filter: "SHOW_DONE"};
  }
  
 	if (action.type === SHOW_ALL) {
    return {...previousState, filter: "SHOW_ALL"};
  }
  
  // 변경이 안일어났을때 이때만 달라지지 않는다.
  return previousState;
}
```

이렇게 바뀔 것이다. 

생각을 해보면 ADD_TODO와 COMPLETE_TODO는 todos에 관련된 아이들이고 그 밑에 SHOW_DONE과 SHOW_ALL은 filter에 관련된 것이다.



분리하는 기준은 지금 위와 같이 filter만 바뀌고 다른 아이는 안 건든다. 이렇게 나뉠 경우 분리한다는 생각이 들어야 한다.

컴포넌트 쪽도 바꾸자.

- TodoList.jsx

```js
import React, { useContext, useEffect, useState } from 'react';
import { completeTodo } from '../actions';
import ReduxContext from '../contexts/ReduxContext';

export default function TodoList() {
  const store = useContext(ReduxContext);
  const [todos, setTodos] = useState(store.getState().todos); // todos와 filter를 둘다 가지고 있는 state다

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTodos(store.getState().todos);
    })
    return () => {
      unsubscribe();
    }
  }, [store]);

  return (
  <div>
    <ul>
      {todos.map((todo,index) => {
        function click() {
          store.dispatch(completeTodo(index));
        }
        if (todo.done) {
          return  <li style={{textDecoration: "line-through"}}>{todo.text}</li>
        }
      return ( 
        <li>{todo.text}
        <button onClick={click}>done</button>
        </li>
      )
    })}
      </ul>
  </div>
  )
}
```



### 리듀서 분리 - 중요

지금 할 거는 

첫번째 방법 리듀서 분리 후 수동으로 합치기

두번째 방법 리듀서 분리 후 redux 함수로 합치기



### 첫번째 방법 수동으로 합치기



- reducers.js

```js

import { ADD_TODO, COMPLETE_TODO, SHOW_ALL, SHOW_DONE } from "./actions";

// 리듀서 분리 후 수동으로 합치기
function todos(previousState, action) { 
  if (previousState === undefined) {
    return []; // 초기값
  }
  
  
  // todos
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return [...previousState, {text: action.text, done: false}];
  }
  
  if (action.type === COMPLETE_TODO) {
    const newTodos = [...previousState];
    newTodos[action.index].done = true;
    return newTodos;
  } 


  return previousState;
}


function filter(previousState, action) { 
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return 'SHOW_ALL'; // 초기값
  }

  // filter
  if (action.type === SHOW_DONE) {
    return "SHOW_DONE";
  }
  
 	if (action.type === SHOW_ALL) {
    return  "SHOW_ALL";
  }
  
  // 변경이 안일어났을때 이때만 달라지지 않는다.
  return previousState;
}
```

이해가 되나요? 오로지 필터라는 프로퍼티 안에 있는 아이만 신경 쓰자

이제 합쳐보자.

- reducers.js

```js
import { ADD_TODO, COMPLETE_TODO, SHOW_ALL, SHOW_DONE } from "./actions";

// 리듀서 분리 후 수동으로 합치기
function todos(previousState, action) { 
  if (previousState === undefined) {
    return []; // 초기값
  }
  
  
  // todos
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return [...previousState, {text: action.text, done: false}];
  }
  
  if (action.type === COMPLETE_TODO) {
    const newTodos = [...previousState];
    newTodos[action.index].done = true;
    return newTodos;
  } 


  return previousState;
}


function filter(previousState, action) { 
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return 'SHOW_ALL'; // 초기값
  }

  // filter
  if (action.type === SHOW_DONE) {
    return "SHOW_DONE";
  }
  
 	if (action.type === SHOW_ALL) {
    return  "SHOW_ALL";
  }
  
  // 변경이 안일어났을때 이때만 달라지지 않는다.
  return previousState;
}

export function todoApp(previousState, action) {
  return {
    todos: todos(previousState.todos, action),
    filter: filter(previousState.filter, action),
  }; // state형태
}
```

이렇게 하면 에러가 난다. 요 상태에서 보면 previousState의 초기값 todoApp에 들어오는 previousState의 초기값이 undefined이다.

그래서 undefined.todos이다. 그래서 에러가 발생한다. 그래서 

```js
import { ADD_TODO, COMPLETE_TODO, SHOW_ALL, SHOW_DONE } from "./actions";

// 리듀서 분리 후 수동으로 합치기
function todos(previousState, action) { 
  if (previousState === undefined) {
    return []; // 초기값
  }
  
  
  // todos
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return [...previousState, {text: action.text, done: false}];
  }
  
  if (action.type === COMPLETE_TODO) {
    const newTodos = [...previousState];
    newTodos[action.index].done = true;
    return newTodos;
  } 


  return previousState;
}


function filter(previousState, action) { 
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return 'SHOW_ALL'; // 초기값
  }

  // filter
  if (action.type === SHOW_DONE) {
    return "SHOW_DONE";
  }
  
 	if (action.type === SHOW_ALL) {
    return  "SHOW_ALL";
  }
  
  // 변경이 안일어났을때 이때만 달라지지 않는다.
  return previousState;
}

export function todoApp(previousState = {}, action) {
  return {
    todos: todos(previousState.todos, action),
    filter: filter(previousState.filter, action),
  }; // state형태
}
```

이렇게 만든다. 그러면 잘 동작한다.

그래서 이 다음에는 todos랑 filter를 파일을 따로 만들어서 관리를 한다.



### 리듀서 분리 후 redux 함수로 합치기

리듀서를 분리하고 redux에 있는 함수로 합치는 것이다.

이게 뭐냐? combineReducers이다. 이 함수를 사용하면 합쳐진다.

```js
import { combineReducers } from 'redux';

const todoApp = combineReducers({
  todos,
  filter,
})
```

그냥 기존 사용했던 todos와 filter를 사용한다.



- reducers.js

```js
import { combineReducers } from "redux";
import { ADD_TODO, COMPLETE_TODO, SHOW_ALL, SHOW_DONE } from "./actions";

// 리듀서 분리 후 수동으로 합치기
function todos(previousState, action) { 
  if (previousState === undefined) {
    return []; // 초기값
  }
  
  
  // todos
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return [...previousState, {text: action.text, done: false}];
  }
  
  if (action.type === COMPLETE_TODO) {
    const newTodos = [...previousState];
    newTodos[action.index].done = true;
    return newTodos;
  } 


  return previousState;
}


function filter(previousState, action) { 
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return 'SHOW_ALL'; // 초기값
  }

  // filter
  if (action.type === SHOW_DONE) {
    return "SHOW_DONE";
  }
  
 	if (action.type === SHOW_ALL) {
    return  "SHOW_ALL";
  }
  
  // 변경이 안일어났을때 이때만 달라지지 않는다.
  return previousState;
}

// export function todoApp(previousState = {}, action) {
//   return {
//     todos: todos(previousState.todos, action),
//     filter: filter(previousState.filter, action),
//   }; // state형태
// }

// 리듀서 분리 후 redux 함수로 합치기

export const todoApp = combineReducers({
  todos,
  filter,
})
```

이제 파일도 분리하자.



reducers 폴더를 만들자. 그리고 reducers.js를 reducers폴더로 넣고 이름을 index.js로 바꾸자.



![image-20201230212116614](./img/Reduximg11.png)

그래서 밖에서 볼때는 reducers를 import하면 index.js를 본다.

지금 파일을 이동하고 이름을 변경해서 정상적으로 안 보일 것이니 서버를 내렸다가 올리면 된다.

store.js에서 todoApp을 reducers라는 얘한테 가져오는건데 파일이 없으니 폴더에 index.js에서 가져온다.

그리고 reducers 폴더에 todos.js 파일을 추가해 보자.

그리고 index.js에 있는 

- index.js

```js
function todos(previousState, action) { 
  if (previousState === undefined) {
    return []; // 초기값
  }
  
  
  // todos
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return [...previousState, {text: action.text, done: false}];
  }
  
  if (action.type === COMPLETE_TODO) {
    const newTodos = [...previousState];
    newTodos[action.index].done = true;
    return newTodos;
  } 


  return previousState;
}

```

이 아이를 todos.js 로 옮기고 조금 수정을 하자.

- todos.js

```js
import { ADD_TODO, COMPLETE_TODO } from "../actions";

export default function todos(previousState, action) { 
  if (previousState === undefined) {
    return []; // 초기값
  }
  
  
  // todos
  // 변경이 일어나는 로직
  if (action.type === ADD_TODO) {
    return [...previousState, {text: action.text, done: false}];
  }
  
  if (action.type === COMPLETE_TODO) {
    const newTodos = [...previousState];
    newTodos[action.index].done = true;
    return newTodos;
  } 


  return previousState;
}
```

그리고 reducers폴더에  filter.js파일을 추가하자.

index.js에서 위와 똑같이 filter 부분을 옮겨서 filter.js에서 수정하자.

- filter.js

```js
import { SHOW_ALL, SHOW_DONE } from "../actions";

export default function filter(previousState, action) { 
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return 'SHOW_ALL'; // 초기값
  }

  // filter
  if (action.type === SHOW_DONE) {
    return "SHOW_DONE";
  }
  
 	if (action.type === SHOW_ALL) {
    return  "SHOW_ALL";
  }
  
  // 변경이 안일어났을때 이때만 달라지지 않는다.
  return previousState;
}
```



그리고 index.js에서 filter와 todos를 추가하자.

- index.js

```js
import { combineReducers } from "redux";
import todos from "./todos";
import filter from "./filter";

export const todoApp = combineReducers({
  todos,
  filter,
})
```

이렇게 간단하게 되었다.

관심사대로 분리해야한다.

mobx는 Provider가 스토어 별로 생길 수 있다. 



이런 폴더 구조 요즘은 이런 스타일로 안한다. 

이건 대게 기초 단계이다. 



Redux를 안쓰고 연결 한것이다.

1. 단일 store를 만들고

2. subscribe와 getState를 이용하여

3. 변경되는 state데이터를 얻어,

4. props로 계속 아래로 전달.

- componentDidMount - subscribe
- componentWillUnmount - unsubscribe

TodoList로 가면 state로 todos라는 아이를 두고 이 아이를 subscribe연결해서 setTodos해주는 방식으로 state가 변경하면 렌더가 다시하는 이런 방식으로 처리를 했었는데 클래스에서는 componentDidMount에 subscribe 연결하고 componentWillUnmount에 unsubscribe를 연결해서 subscribe를 하면서 getState 해서 그 아이를 하위의 프롭스로 전달해주는 방식으로 되어 있었다.

이런 스타일은 이 문구를 읽자마자 한가지 떠올려야 한다. 단일 스토어를 만들고 subscibe getstate를 이용해서 변경된 state데이터를 얻어서 프롭스를 계속 아래로 전달 이런거 보면 뭐가 생각날까? 그것은 hoc 이다. hoc는 무언가를 만들어서 props로 전달한다.

hock으로 하는 방식은 props를 안쓰고 있다.

useEffect와 useState를 쓰고 있다. 2개의 차이점을 알아야 한다. 위 에 hoc는 옛날 방식이다.



## Redux를 React에 연결

- React-redux 쓰고 연결

### react-redux

- Provider 컴포넌트를 제공해준다.

이 Provider 컴포넌트가 뭐냐? 우리고 사용했던 ReduxContext에 있는 .Provider 컴포넌트이다.

그 컴포넌트를 react-redux가 직접 준다. 가장 상위에 store를 세팅해준다.

컨슈머가 필요하다.

- connect 함수를 통해 "컨테이너"를 만들어 준다.
  - 컨테이너는 스토어의 state와 dispatch를 연결한 컴포넌트에 props로 넣어주는 역할을 한다.
- 그렇다면 필요한 것은?
  - 어떤 state를 어떤 props에 연결할 것인지에 대한 정의
  - 어떤 dispatch(액션)을 어떤 props에 연결할 것인지에 대한 정의
  - 그 props를 보낼 컴포넌트를 정의(그 props를 특정 컴포넌트를 보내는 것이다.)

같이 하자.

```bash
npm i react-redux
```

기존에 index.js를 보자.



- index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import ReduxContext from './contexts/ReduxContext';


ReactDOM.render(
  <React.StrictMode>
    <ReduxContext.Provider value={store}>
      <App />
    </ReduxContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

index.js에 Provider에 value를 넣었다. value를 넣고 store를 넣었따.

import ReduxContext from './contexts/ReduxContext'; 이걸 지우고 

- Index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import {Provider} from "react-redux"


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

이렇게 명확하게 바뀐다. (setting의 전부이다.)

사용하는 쪽을 가보자.

- App.js

```js
import './App.css';
import TodoList from './components/TodoList';
import Form from './components/Form';


function App() {
    return (
      <div className="App">
        <header className="App-header">
          <TodoList />
          <Form />
        </header>
      </div>
    );
  }
  
  export default App;
```

이렇게 해주고 TodoList.jsx로 가서 전부 주석처리하고 진행하자.

기존 TodoList.jsx

- TodoList.jsx

```js
import React, { useContext, useEffect, useState } from 'react';
import { completeTodo } from '../actions';
import ReduxContext from '../contexts/ReduxContext';

export default function TodoList() {
  const store = useContext(ReduxContext);
  const [todos, setTodos] = useState(store.getState().todos); // todos와 filter를 둘다 가지고 있는 state다

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTodos(store.getState().todos);
    })
    return () => {
      unsubscribe();
    }
  }, [store]);

  return (
  <div>
    <ul>
      {todos.map((todo,index) => {
        function click() {
          store.dispatch(completeTodo(index));
        }
        if (todo.done) {
          return  <li style={{textDecoration: "line-through"}}>{todo.text}</li>
        }
      return ( 
        <li>{todo.text}
        <button onClick={click}>done</button>
        </li>
      )
    })}
      </ul>
  </div>
  )
}
```



바뀐 TodoList.jsx에서 connect hoc를 가져오자((react-redux에 있는))

```js
const TodoListContainer = connect(/* 설정 */)(todoList);
export default TodoListContainer;
```



- TodoList.jsx

```js
import React from 'react';
import { connect } from "react-redux";
// import { completeTodo } from '../actions';

function TodoList() {
  const todos = [];
  return (
  <div>
    <ul>
      {todos.map((todo,index) => {
        function click() {
          // store.dispatch(completeTodo(index));
        }
        if (todo.done) {
          return  <li style={{textDecoration: "line-through"}}>{todo.text}</li>
        }
      return ( 
        <li>{todo.text}
        <button onClick={click}>done</button>
        </li>
      )
    })}
      </ul>
  </div>
  )
}

const mapStateToProps = () => {};
const mapDispatchToProps = () => {};

const TodoListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoList);
export default TodoListContainer;
```

이렇게 초기 작성을 한다.

mapStateToProps에 인자로 들어오는게 state이다.

state가 들어와서 아래와 같이 todos로 들어오게 하고 싶다.

```js
function TodoList({todos}) {
  const todos = [];
  return (
  <div>
    <ul>
      {todos.map((todo,index) => {
        function click() {
          // store.dispatch(completeTodo(index));
        }
        if (todo.done) {
          return  <li style={{textDecoration: "line-through"}}>{todo.text}</li>
        }
      return ( 
        <li>{todo.text}
        <button onClick={click}>done</button>
        </li>
      )
    })}
      </ul>
  </div>
  )
}
```

그러면 어떻게 하나면

```js
const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  }
};
```

이렇게 들어오게 한다.



전체 TodoList.jsx

```js
import React from 'react';
import { connect } from "react-redux";
// import { completeTodo } from '../actions';

function TodoList() {
  const todos = [];
  return (
  <div>
    <ul>
      {todos.map((todo,index) => {
        function click() {
          // store.dispatch(completeTodo(index));
        }
        if (todo.done) {
          return  <li style={{textDecoration: "line-through"}}>{todo.text}</li>
        }
      return ( 
        <li>{todo.text}
        <button onClick={click}>done</button>
        </li>
      )
    })}
      </ul>
  </div>
  )
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  }
};
const mapDispatchToProps = () => {};

const TodoListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoList);
export default TodoListContainer;
```



이제 Form.jsx로 넘어가서

기존 Form.jsx

```js
import React, { useContext, useRef } from 'react';
import { addTodo } from "../actions";
import ReduxContext from '../contexts/ReduxContext';

export default function Form() {
  const store = useContext(ReduxContext);

  const inputRef = useRef();
  return (
    <div>
      <input type="text" ref={inputRef}/>
      <button onClick={click}>add</button>
    </div>
  )
  function click() {
    const todo = inputRef.current.value;
    store.dispatch(addTodo(todo))
    inputRef.current.value = "";
  }
}
```



바뀐 Form.jsx

```js
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { addTodo } from "../actions";

function Form({add}) {
  const inputRef = useRef();
  return (
    <div>
      <input type="text" ref={inputRef}/>
      <button onClick={click}>add</button>
    </div>
  )
  function click() {
    const todo = inputRef.current.value;
    add(todo);
    inputRef.current.value = "";
  }
}



const FormContainer = connect(null, (dispatch) => {
  return {
    add: (todo) => {
      dispatch(addTodo(todo));
    }
  }; // props가 리턴된다.
})(Form);

export default FormContainer;
```

이렇게 바뀐다.

Form.jsx에서 action을 보내는 것 밖에 없다. 그래서 mapStateToProps를 Null로 넣어도 상관없다.

click입장에서는 add라는 함수를 호출 한 것 뿐이다.

이때부터 유행하던 패턴이 뭐냐면 Form 함수가 가리키는 거는 사실은 redux와 관련된 로직이 없다. 부모가 준 함수를 호출하는 것 밖에 없다. 

오히려 form 컨테이너에서 리덕스와의 연결을 다 쳐리 한다.

```js

const FormContainer = connect(null, (dispatch) => {
  return {
    add: (todo) => {
      dispatch(addTodo(todo));
    }
  }; // props가 리턴된다.
})(Form);

export default FormContainer;
```

그래서 컨테이너 컴포넌트를 따로 분리하는 패턴이 나왔다.

containers 폴더를 만들자. 그리고 그 폴더안에 FormContainer.jsx 와 TodoListContainer.jsx파일을 만들자

그리고 폼에서 사용한 위에 꺼를 FormContainer.jsx로 가져가자.

- FormContainer.jsx

```js
import { connect } from "react-redux";
import { addTodo } from "../actions";
import Form from "../components/Form";

const FormContainer = connect(null, (dispatch) => {
  return {
    add: (todo) => {
      dispatch(addTodo(todo));
    }
  }; // props가 리턴된다.
})(Form);

export default FormContainer;
```

이렇게 하나의 컨테이너가 완성이 된다.

컴포넌트 입장에서는 Form.js 에서 export default Form을 하고 

```js
import { connect } from 'react-redux';
import { addTodo } from "../actions";
```

이게 필요 없어졌다. 리엑트 밖에 없다.

```js
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { addTodo } from "../actions";

function Form({add}) {
  const inputRef = useRef();
  return (
    <div>
      <input type="text" ref={inputRef}/>
      <button onClick={click}>add</button>
    </div>
  )
  function click() {
    const todo = inputRef.current.value;
    add(todo);
    inputRef.current.value = "";
  }
}

export default Form;
```

리엑트만 의존해서 리턴해주는 함수를 위에서 받아서 호출하는 역할만 한다. 

(이런 멍청한 컴포넌트 같으냐라구..)

그래서 이를 부를때는 Dumb Component 혹은 Presentational Component 라고 부른다.

그래서 이 아이는 컴포넌트는 어떻게 작성하는 거냐? 뷰에만 더 집중하는 컴포넌트가 되는 거고 

비지니스 로직이나 리덕스 로직을 담당하는 아이를 container라고 부른다. 

이런 로직을 연겨하는 아이를 만든 것이다.

이제 TodoList를 한번 container화 하는 작업을 하자.

왜 나눈 것 일까? 이렇게 생각하자 저렇게 뷰에 관련된 폼이라는 프레젠테이션 컴포넌트같은 경우 저런걸 보통 디자인 시스템화 시킨다.

그리고 관리를 잘 한다. 테스트하기에 용의하고 의존성이 없기 때문에 test를 어떻게 하나? text를 입력하고 add를 눌렸을때 add라는 함수가 호출 했는지만 체크하면 된다.

다 합쳐진거로 테스트 하면 복잡하다. 

뷰를 관리하는 사람은 뷰만 집중하고 유지보수 면에서도 좋다.

TodoList로 넘어가보자

- TodoList.jsx

```js
import React from 'react';
// import { completeTodo } from '../actions';

export default function TodoList({todos}) {
  
  return (
  <div>
    <ul>
      {todos.map((todo,index) => {
        function click() {
          // store.dispatch(completeTodo(index));
        }
        if (todo.done) {
          return  <li style={{textDecoration: "line-through"}}>{todo.text}</li>
        }
      return ( 
        <li>{todo.text}
        <button onClick={click}>done</button>
        </li>
      )
    })}
      </ul>
  </div>
  )
}


```



```js
const TodoListContainer = connect(
  (state) => ({
    todos: state.todos,
  }),
  (dispatch) => ({})
  )(TodoList);
export default TodoListContainer;
```

얘를 TodoListContainer.jsx로 옮기자

- TodoListContainer.jsx

```js
import { connect } from "react-redux";
import TodoList from "../components/TodoList"
const TodoListContainer = connect(
  (state) => ({
    todos: state.todos,
  }
  ),
  (dispatch) => ({})
  )(TodoList);
  
  export default TodoListContainer;
```

그리고 App.js에서 <TodoList />를 그대로 사용하는게 아니라     <TodoListContainer/>,  <FormContainer />를 사용해야한다.

```js
import './App.css';
import TodoListContainer from './containers/TodoListContainer';
import FormContainer from './containers/FormContainer';


function App() {
    return (
      <div className="App">
        <header className="App-header">
          <TodoListContainer/>
          <FormContainer />
        </header>
      </div>
    );
  }
  
  export default App;
```



왜냐하면 기존에는 Form을 썼다 connect를 안 탔으니까 todo가 undefined라고 떴을텐데 이제 container를 타야지만 TodoList한테 undefined가 아니라 그 데이터를 넣어줄 테니까 사용하는 입장에서는 컴포넌트를 사용하는게 아니라 컨테이너를 사용해야 한다.

TodoList.jsx를 바꿔보자.

- TodoList.jsx

```js
import React from 'react';


export default function TodoList({todos, complete}) {
  
  return (
  <div>
    <ul>
      {todos.map((todo,index) => {
        function click() {
          complete(index);
        }
        if (todo.done) {
          return  <li style={{textDecoration: "line-through"}}>{todo.text}</li>
        }
      return ( 
        <li>{todo.text}
        <button onClick={click}>done</button>
        </li>
      )
    })}
      </ul>
  </div>
  )
}
```

TodoListContainer.jsx의 connect 2번째 인자를 고치자.

```js
import { connect } from "react-redux";
import TodoList from "../components/TodoList";
import { completeTodo } from '../actions';

const TodoListContainer = connect(
  (state) => ({
    todos: state.todos,
  }),
  (dispatch) => ({
    complete: (index) => {
      dispatch(completeTodo(index));
    },
  })
  )(TodoList);
  
export default TodoListContainer;
```



자 지금까지 사용했던 connect 함수는 hoc이다. 

하지만 hoc 시대는 갔다. 앞으로는 container를 이런 식으로 잘 쓰지는 않는다.

이제 hocks로 하는 방법을 사용해 보자.

useSelector라는 훅이 있다. react-redux에서 오는 훅이다.

이것은 함수인데 함수를 넣는다. useSelector(() => {})

첫 번째 인자를 state를 넣는다.

TodoListContainer.jsx를 바꾸자.

- TodoListContainer.jsx

```js
import TodoList from "../components/TodoList";
import { completeTodo } from '../actions';
import { useDispatch, useSelector } from "react-redux";

const TodoListContainer = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  function complete(index) {
    dispatch(completeTodo(index))
  }
  return <TodoList todos={todos} complete={complete} />
}
  
export default TodoListContainer;
```

이렇게 컴포넌트를 만들듯이 만들어서 훅을 사용하고 훅에서 나온 자료를 가지고 넣어주는 역할을 한다.



이제 Form 컨테이너를 바꿔보자.

- Form.jsx

```js
import TodoList from "../components/TodoList";
import { completeTodo } from '../actions';
import { useDispatch, useSelector } from "react-redux";

const TodoListContainer = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  function complete(index) {
    dispatch(completeTodo(index))
  }
  return <TodoList todos={todos} complete={complete} />
}
  
export default TodoListContainer;
```

여기까지가 기본 리덕스이다.

보통 기본 대로 하지 않는다

