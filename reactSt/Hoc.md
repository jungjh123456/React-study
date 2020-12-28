## 상태를 가지고 있는 엘리먼트

- input
- select
- textarea
  ...
  이 있다.

input 태그에 상태가 어디에 있나? value값이 어떻게 변하는지 상태를 가지고 있다. 특정 상태가 있다. (유저의 행동에 의해서 바뀐다.)

상태를 가지고 있는 특정 엘리먼트와 그 엘리먼트를 가지고 있는 컴포넌트의 관계가 Controlled && Uncontrolled 관계이다.

엘리먼트의 상태를 누가 관리하느냐?

- 엘리먼트를 가지고 잇는 컴포넌트가 관리: Controlled
- 엘리먼트의 상태를 관리하지 않고 엘리먼트의 참조만 컴포넌트가 소유: Uncontrolled

## Controlled Component && Uncontrolled Component

<input type="text"/>이 아이와 이 input에 갖고 있는 컴포넌트간사이의 관계이다.

만약 타이핑한걸 컴포넌트가 관리하는 걸 Controlled Component이고

어떤 특정 상태일때 얻어오고 싶을 때 (signin button)을 눌렸을때 현재 input태그 값을 가지고 쓰겠다가 Uncontrolled Component 이다.

만약 클래스에 초기값을 설정하면 렌더되면서 input에 value에 this.state.email 을 넣고 콘솔로 가면 onChange가 없다고 에러가 발생한다. 그러면 onChange를 써야한다.
