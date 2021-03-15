# LifeCycle

## state

```js
componentDidMount() {
  setinterval(() => {
    ...
  },1000)
}

componentDidMount(...args) {
  clearInterval()
}
```

## Component props, state 변경

componentWillReceiveProps
shouldComponentUpdate(얘는 다른 아이랑 다르게 return을 한다 => true/false) => true나 false에 따라서 조작 할 수 있다. (필요한 업데이트만 지원해줄려고 이것을 사용한다.)
componentWillUpdate
render
componentDidUpdate

```js
componentWillUnmount(...arg){
  console.log("comonentWillUnmount", arg)
}

componentWillReceiveProps(nextProps) {
  console.log("componentWillReceiveProps", nextProps, this.props)

  //nextProps => state를 조작하는 공간
}

shouldComponentUpdate(...args) {
  //현재의 props와 새로운 props가 완전히 다르면
  // 딮 1레벨 깊이가 아니고
  // this.props === nextProps

  // 애초에 객체가 변했을 때만 새로운 객체를 만들어서 준다.
  // 이뮤터블하게 관리하는 방침

  console.log('shouldComponentUpdate') // return이 필요하다. default값은 true이다.
  return true; // parent:, count: (nextProps, nextState)
}
```

그러면 {parent: ...} {parent: ...}

이렇게 나온다. 실제 Props

ComponentWillUpdate와 componentDidUpdate의 차이는 이 사이에서 뷰가 변한다.

변하기 전에 기억하고 변한 다음에 옛날꺼와 비교해서 처리할게 있으면 처리해 주는 일을 한다.

구체적인 케이스는 리스트가 있는데 해당 스크롤 위치를 기억할 수 있다.

## Component 에러 캐치 (componentDidCatch)

이전에는 리엑트를 사용하지 않고 웹 어플리캐이션을 사용하고 있는데 클릭 이벤트를 했는데 없는 로직을 참조하면 콘솔에 에러가 발생한다. 그 부분에만 문제만 있지만 다른 부분은 문제가 안생긴다.

리엑트같은 경우는 한군데만 빵꾸나면 모든게 다운된다.

그래서 Component 에러 캐치가 나왔다. 자바스크립트에서 문제가 있을때 알려준다. 그래서 유저한테 우회할 수 있다.

터미널에 npx create-react-app <이름> 을 해서 react를 생성해보자

create react app에서 전역에서 설치해서 하지말고 npx를 쓰자. npx는 최신 버전을 항상 사용한다.

- npm start : 개발 모드
- npm run build : 배포 모드
- npm text : 테스트 모드
- npm run eject : eject 모든것을 꺼낸다(예전에 sass를 사용할때 이것을 꺼내서 조작해야했었다.)



## 라이프사이클 이해하기

라이프사이클이 컴포넌트가 실행되거나 업데이트 되거나 제거될 때 특정한 이벤트 들이 발생합니다.

![image-20210315160344853](/Users/apple/Library/Application Support/typora-user-images/image-20210315160344853.png)

## Mount

컴포넌트가 처음 실행될 때 그것을 Mount라고 표현합니다. 컴포넌트가 시작되면 우선 context, defaultProps와 state를 저장합니다. 그 후에 componentWillMount메소드를 호출 합니다. 그리고 render로 컴포넌트를 DOM에 부착한 후 Mount가 완료된 후 componentDidMount가 호출됩니다.

componentDidMount에서는 Ajax요청하거나 비동기 로직을 위해서 사용합니다.

## Props Update

props가 업데이트 될때는 업데이트 전에 업데이트가 발생하였음을 감지하고 componentWillReceiveProps메소드가 호출됩니다. 그 후 shouldComponentUpdate, componentWillUpdate가 차례대로 호출된 후 업데이트가 완료 (render)되면 componentDidUpdate가 됩니다. 이 메소드들은 첫번째 인자로 바뀔 props에 대한 정보를 가지고 있습니다.

componentDidUpdate만 이미 업데이트 되었기 때문에 바뀌기 이전의 props에 대한 정보를 가지고 있습니다.

shouldComponentUpdate에서는 아직 render하기 전이기 때문에 return false를 하면 render을 취소할 수 있고 주로 여기서 성능 최적화를 합니다. 쓸데 없는 update가 일어나면 여기서 걸려낸다.

> componentWillUpdate에서는 state를 바꿔서는 안된다. 아직 props도 업데이트 하지 않았으므로 state를 바꾸면 또 shoudComponentUpdate가 발생한다. componentDidUpdate에서는 render가 완료 되었기 때문에 DOM에 접근할 수 있다.

1. componentWillReceiveProps
2. shouldComponentUpdate
3. componentWillUpdate
4. render
5. componentDidUpdate

### State Update

setState 호출을 통해 state가 업데이트될 때의 과정입니다. props update와 과정이 같지만, componentWillReceiveProps 메소드는 호출되지 않습니다. 그리고 메소드의 두 번째 인자로는 바뀔 state에 대한 정보를 가지고 있습니다. componentDidUpdate는 두 번째 인자로 바뀌기 이전의 state에 대한 정보를 가지고 있습니다.

1. shouldComponentUpdate
2. componentWillUpdate
3. render
4. componentDidUpdate

### Unmount

컴포넌트가 제거되는 것은 Unmount라고 표현합니다. 더는 컴포넌트를 사용하지 않을 때 발생하는 이벤트가 있습니다. **componentWillUnmount**가 그것입니다. componentDidUnmount는 없습니다. 이미 제거된 컴포넌트에서 이벤트를 발생시킬 수는 없겠죠? componentWillMount에서 주로 연결했던 이벤트 리스너를 제거하는 등의 여러 가지 정리 활동을 합니다.

1. componentWillUnmount

### getDerivedStateFromProps

리액트 16에서 추가된 라이프사이클입니다. props가 바뀌면 그에 따라 state도 같이 바꿔줍니다. 예를 들어 props.a가 10이고 derivedA state를 props.a의 10배로 설정해두었다면 derivedState는 기본적으로 100이 되겠죠? props.a가 11이 되었을 때 derivedA는 110으로 따라서 변경됩니다.  쓰고 싶지만 별로 안쓰인다. 



## 함수형 라이프사이클 대체하기

함수형 컴포넌트에서 라이프사이클을 대체하는 훅은 useEffect이다.

class컴포넌트 때는 라이프사이클이 컴포넌트에 중심이 맞춰져 있다. 클래스가 마운트 되려 할때 componentWillMount이고 마운트 되고 나서 componentDidMount 업데이트 되었을때 componentDidUpdate 그리고 언마운트 componentWillUnmount될때 실행 됀다.



함수 컴포넌트에서는 조금 다르게 적용한다. 특정 데이터에 대해서 라이프사이클이 진행되고 데이터는 여러개 일 수 있으므로 클래스 컴포넌트에서는 componentWillMount, componentDidMount, componentDidUpdate, componentWillUnmount를 컴포넌트 당 한 번씩만 사용했다면, useEffect는 데이터의 개수에 따라 여러 번 사용하게 됩니다.



예를 들어 hidden이라는 state가 있다고 치자 hidden이 바뀌는 것에 따라서 라이프 사이클을 정할 수 있다.

```js
useEffect(() => {
  console.log('hidden changed')
}, [hidden])
```

위 코드는 컴포넌트가 첫 렌더링 될때 한번 실행되고 다음부터는 hidden이 바뀔 때마다 실행 된다. 즉 componentDidMount와 componentDidUpdate가 합쳐진 셈이다.

componentWillUnmount의 역할도 할 수 있다. return으로 함수를 제공하면 된다.

```js
useEffect(() => {
  console.log('hidden changed')
  return () => {
    console.log('hidden이 바뀔 예정')
  }
}, [hidden])
```

데이터의 라이프 사이클이 하나로 합쳐진 셈입니다. 이것을 활용해 setTimeout한 것을 return에서 clearTimeout할 수도 있습니다.

데이터가 여러 개라면 각각의 데이터에 useEffect를 적용하면 됩니다.



```js
useEffect(() => {
  console.log('hidden changed');
}, [hidden]); 
useEffect(() => {
  console.log('shown changed');
}, [shown]); 
```

componentWillMount와 componentWillUpdate는 없어졌으므로 useEffect에 해당하는 것은 없습니다.

마운트 될때 처음 한번만 실행하고 싶다면 빈 배열을 넣어주면 됩니다. deps가 없어서 변경되는 것이 없으므로 처음 한 번만 실행되고 나서 다시는 재실행 될 일이 없습니다. 단 컴포넌트가 언마운트 될때는 return의 함수가 실행됩니다.

```js
useEffect(() => {
  console.log('mounted');
  return () => {
    console.log('unmount');
  }
}, []); 
```



반애로 컴포넌트가 리렌더링 될 때마다 실행하게 할 수도 있습니다. 두 번째 배열을 아예 안 넣으면 데이터와 관련없이 리렌더링 시 마다 실행됩니다.

```js
useEffect(() => {
  console.log('rerendered!');
});
```

만약 componentDidUpdate의 역할만 하고 싶다면 어떻게 할까? useEffect는 기본적으로 componentDidMount와 componentDidUpdate의 역할을 동시에 수행하므로 componentDidMount의 역할을 제거해야 합니다. 이를 위해서는 useRef라는 훅이 필요합니다.

useRef를 활용하면 useEffect에서 componentDidUpdate효과를 낼 수 있습니다. componentDidMount를 무시하는 방법입니다.

```js
import React, { useEffect, useRef } from 'react';
const Basic = () => {
  const mountRef = useRef(false);
  useEffect(() => {
    if (mountRef.current) {
      console.log('updated!');
    } else {
      mountRef.current = true;
    }
  });
  return <div>Basic</div>;
};
export default Basic;  
```

useEffect는 mount될 때도 한 번 실행되는데 그 때는 mountRef가 false입니다. 따라서 if문이 동작하지 않지만 else문에서 mountRef를 true로 바꾸어 놨기 때문에 다음 리렌더링때부터는 if문 내부가 실행된다.

정리하면 useRef는 그 안의 데이터가 바뀌어도 화면을 리렌더링하지 않지만 리렌더링 이후에도 데이터를 유지 시켜준다. 

shouldComponentUpdate를 대체할 수 있는 북은 React.memo이다. 

비슷한 거다 구성요소가 동일한 props에서 동일한 결과를 렌더링하는 경우 결과를 React.memo를 기억해서 성능 향상을 위해 호출에 래핑할 수 있다. 이것은 React가 컴포넌트 렌더링을 건너 뛰고 마지막으로 렌더링 된 결과를 재사용한다는 것을 의미한다.



만약 너의 컴포넌트가 어떤 프로들을 받았을때 같은 결과이면 React.memo를 기억해서 성능향상을 위해 호출에 래핑할 수 있다. 이것이 리엑트는 의미할 것이다. 컴포넌트 렌더링을 스킵하고 마지막 결과를 재사용하는 것으로...

```js
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```

