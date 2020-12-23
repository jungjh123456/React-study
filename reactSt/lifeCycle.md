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
