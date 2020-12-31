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
      {todos.map(todo => <ul>{todo}</ul>)}
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

