# MobX 

- 데코레이터를 적극 활용한다. (데코레이터는 일반 함수인데 데코레이터로 사용 가능 하다.)
  - cra에 데코레이터를 사용하는 법
  - 스토어 객체에 붙이는 데코레이터가 있고, => @observable: 관찰하다. 관찰이 가능한 아이
  - 컴포넌트에서 사용하는 데코레이터가 있다. => @observer: 관찰자(그 관찰한 가능한 아이를 관찰한다.)
- TypeScript 가 Base 인 라이브러리이다. => 타입 스크립트에서 특별하게 취급되고 있는 데코레이터를 적극 취급한다.
- Redux 와 마찬가지로, 스토어에 필요한 부분과 리액트에 필요한 부분이 있다. 
  - npm i mobs -D
  - npm i mobs-react -D
- 리덕스와 다르게 단일 스토어를 강제하진 않는다.



e -> Actions => update -> observable state -> notify => computed values -> trigger => side-effects(like render)

immutable이 강제가 아니고 객체가 변하면 notify를 한다. 관찰 가능한 아이가 notify를 해준다. 값들을 계산해서 랜더를 다시한다.

또 버튼을 클릭하면 action을 생성하고 update를 하고 다시 한다.



- mobx에서 말하는 state는 리액트 컴포넌트의 state와 다른 것(전역 state이다.)
- 리덕스보다 쉽다?
  - 리액티브 프로그래밍 > 함수형 프로그래밍
  - 간편한 비동기 처리 => 넘나 쉬워요
- 데코레이터의 적극적인 사용으로 인해 깔끔한 구성
- 단일 스토어가 아니다.
  - 스토어를 어떻게 사용지에 대한 적합한 해결을 모색해야 할 것
  - 결국 최상위 스토어를 만들고 propsfh rhddbgorksms qkdtlr
  - https://github.com/gothinkster/react-mobx-realworld-example-app
- 라이프사이클에 대한 고민

데코레이터라고 하는 문법은 클래스에서만 사용한 아이이다.

클래스를 하지 않고 함수로 하는 방법도 있다.

## 프로젝트에 Decorator 설정하기

customize-cra 가 있다. eject를 안하는게 좋다. 하면 create-react-app으로 돌아가야 할 수도 있다. ejact를 하지 않되는  거중 하나가 웹팩 cra에 내부적으로 고치기 어렵다.

그래서 eject를 하기 싫어서 customize-cra가 있다.

```bash
npm i customize-cra react-app-rewired -D
```

그리고 package.json을 바꿔보자.

```js
"scripts": {
		"start": "react-app-rewired start",
		"build": "react-app-rewired build",
		"test": "react-app-rewired test",
		"eject": "react-scripts eject"
	},
```

이렇게 바꿔보자.

rewired를 가지고 react script로 돌리겠다.

cra를 돌리기전에 업데이트 칠 만한 그런 설정을 해줘야한다. 그래서 프로젝트에 루트에 파일을 하나 만들고 config-overrides.js로 만들자. 얘를 가지다가 업데이트 치겠다는거다.

- Config-overrides.js

```js
const { override, addDecoratorsLegacy } = require('customize-cra');

module.exports = override(addDecoratorsLegacy());
```

아까 react-app-rewired가 start될때 override를 가지가서 실행을 하기 때문에 오버라이드가 된다.

데코레이터를 사용할 거면 addDecoratorsLegacy를 실행할 수 있게 도와 준다.

이제 mobx하고 mobx-react를 설치하자.

```bash
npm i mobx mobx-react
```



한번 App.js 에서 테스트 하면 이렇게 나온다.

![image-20210112170828840](/Users/apple/Library/Application Support/typora-user-images/image-20210112170828840.png)

이거는 experimentalDecorators이나 jsconfig에 tsconfig를 설치해야한다고 나온다.

이 말대로 루트 폴더에 jsconfig.json파일을 만들자.

이렇게 하면 

```js
{
	"compilerOptions": {
		"experimentalDecorators": true
	}
}
```

된다.



폴더를 하나 만들자 . src/mobx 만들고 그 안에 BookStore.js로 만들자.

```js
class BookStore {
	// 관찰할 거면 어떤 데이터를 관찰 할 건지 정해야한다.
}
```

​	// 관찰할 거면 어떤 데이터를 관찰 할 건지 정해야한다. 예전에 initalState개념이 있다. 그래서 일단 

- BookStore.js

```js
import { observable } from 'mobx';

class BookStore {
	// 관찰할 거면 어떤 데이터를 관찰 할 건지 정해야한다.
	@observable books = []; // 관찰할 아이로 정한거다.
}

export default BookStore;

```

BookStore는 가장 상위에 넣어줘야 하기 때문에 그래서 Redux의 Provider같은게 있어야 한다. 마찬가지로 react-redux에서 오는 Provider처럼 mobx에서도 Provider를 준다.

- App.js

```js

// mobx
import { Provider as MoxProvier } from 'mobx-react';
import BookStore from './mobx/BookStore';

const bookStore = new BookStore();

		<MoxProvier bookStore={bookStore}>
				<Provider store={store}>
					<ConnectedRouter history={history}>
						<Switch>
							<Route path="/add" component={Add} />
							<Route path="/signin" component={Signin} />
							<Route path="/" exact component={Home} />
							<Route component={NotFound} />
						</Switch>
					</ConnectedRouter>
				</Provider>
			</MoxProvier>
```

이렇게 한다. 어떻게 한 거냐면 스토어를 하나 만들어서  mobxProvider에다가 그 스토어를 넣어준거다. 얘를 이제 관찰자가 관찰을 해보자.

관찰해서 그 관찰한 아이를 받아다가 밑으로 넣어주는 아이를 컨테이너라고 부른다. 

컨테이너 폴더에다 MobxBookListContainer.jsx를 하나 만든다. 그리고 BookListContainer에 있는 아이를 붙여 넣는다.

```js
import React from 'react';
import BookList from '../components/BookList';

class BookListContainer extends React.Component {
	// redux 와의 연결고리
	// const books = useSelector((state) => state.books.books);
	// const loading = useSelector((state) => state.books.loading);
	// const error = useSelector((state) => state.books.error);

	// const dispatch = useDispatch();

	// const getBooks = useCallback(async () => {
	// 	dispatch(getBooksSagaStart());
	// }, [dispatch]);

	render() {
		return <BookList books={books} loading={loading} error={error} getBooks={getBooks} />;
	}
}

export default BookListContainer;
```

이 주석 단 아이들은 redux랑 관련된 아이이다.



우리가 집중해야할 부분은 여기에 있는 listcontainer하고 mobx의 store랑 연결해야한다. 그래서 class를 관찰자로 만들자.

MoxProvider에 다른 스토어를 올 수 있다. 그래서 다른 데코레이터를 하나 더 단다.@inject('booStore')

- MobxBookListContainer.jsx

```js
import { inject, observer } from 'mobx-react';
import React from 'react';
import BookList from '../components/BookList';

@inject('bookStore')
@observer
class BookListContainer extends React.Component {
	// redux 와의 연결고리
	// const books = useSelector((state) => state.books.books);
	// const loading = useSelector((state) => state.books.loading);
	// const error = useSelector((state) => state.books.error);

	// const dispatch = useDispatch();

	// const getBooks = useCallback(async () => {
	// 	dispatch(getBooksSagaStart());
	// }, [dispatch]);

	render() {
		console.log(this.props);
		return <>Hello</>;
	}
}

export default BookListContainer;

```

그리고 Home.jsx에서 BookListContainer에 연결에 있는데 바꿔주자.

![image-20210112173318472](/Users/apple/Library/Application Support/typora-user-images/image-20210112173318472.png)

그럼 콘솔에 이렇게 나온다.

- MobxBookListContainer.jsx

```js
import { inject, observer } from 'mobx-react';
import React from 'react';
import BookList from '../components/BookList';

@inject('bookStore')
@observer
class BookListContainer extends React.Component {
	// redux 와의 연결고리
	// const books = useSelector((state) => state.books.books);
	// const loading = useSelector((state) => state.books.loading);
	// const error = useSelector((state) => state.books.error);

	// const dispatch = useDispatch();

	// const getBooks = useCallback(async () => {
	// 	dispatch(getBooksSagaStart());
	// }, [dispatch]);

	render() {
		const { books } = this.props.bookStore;
		console.log(books); // []
		return (
			<div>
				<h1>Mobx Test</h1>
				<button onClick={this.addBook}>추가</button>
			</div>
		);
	}

	addBook = () => {
		this.props.bookStore.addBook({ title: '책 이름' });
	};
}

export default BookListContainer;

```



이렇게 하고 BookStore.js 에서 함수를 만들어 줘야한다. addBook이라는 함수를

- BookStore.js

```js
import { observable } from 'mobx';

class BookStore {
	// 관찰할 거면 어떤 데이터를 관찰 할 건지 정해야한다.
	@observable books = []; // 관찰할 아이로 정한거다.

	addBook = (book) => {
		console.log(book);
		this.books.push(book);
	};
}

export default BookStore;

```



그러면 콘솔에는 빈 배열이 나올 것이다. 책을 한번 출력 해보자.

MobxBookListContainer.jsx에서

```js
import { inject, observer } from 'mobx-react';
import React from 'react';
import BookList from '../components/BookList';

@inject('bookStore')
@observer
class BookListContainer extends React.Component {
	// redux 와의 연결고리
	// const books = useSelector((state) => state.books.books);
	// const loading = useSelector((state) => state.books.loading);
	// const error = useSelector((state) => state.books.error);

	// const dispatch = useDispatch();

	// const getBooks = useCallback(async () => {
	// 	dispatch(getBooksSagaStart());
	// }, [dispatch]);

	render() {
		const { books } = this.props.bookStore;
		console.log(books); // []
		return (
			<div>
				<h1>Mobx Test</h1>
				<ul>
					{books.map((book) => (
						<li>{book.title}</li>
					))}
				</ul>
				<button onClick={this.addBook}>추가</button>
			</div>
		);
	}

	addBook = () => {
		console.log(this.props.bookStore.addBook);
		this.props.bookStore.addBook({ title: '책 이름' });
	};
}

export default BookListContainer;

```

이렇게 해주었는데 추가 버튼을 눌려도 화면에 안나타난다.

왜냐하면 BookStore가 constructor에서 그냥 끝나면 안되고 아래처럼 되어야한다.

makeObservable 함수를 가져다가. constructor가 생성될때 makeObservable()이라는 함수를 추가해야한다. 새 mobx에서 이렇게 바뀌었다.



```js
import { observable, makeObservable } from 'mobx';

class BookStore {
	// 관찰할 거면 어떤 데이터를 관찰 할 건지 정해야한다.

	@observable books = []; // 관찰할 아이로 정한거다.

	constructor() {
		makeObservable(this);
	}
	addBook = (book) => {
		console.log(book);
		this.books.push(book);
	};
}

export default BookStore;

```

이렇게 하면

![image-20210112223051583](/Users/apple/Library/Application Support/typora-user-images/image-20210112223051583.png)

이렇게 추가가 된다. 

그리고 나서 한가지 아무때나 데이터를 바꿨다 해서 전부다 트래킹하면 안되고 액션을 이용해서 데코레이터를 달아둬야지 콘솔에 워닝이 안뜰꺼다. 

```js
import { observable, makeObservable, action } from 'mobx';

class BookStore {
	// 관찰할 거면 어떤 데이터를 관찰 할 건지 정해야한다.

	@observable books = []; // 관찰할 아이로 정한거다.

	constructor() {
		makeObservable(this);
	}
	@action addBook = (book) => {
		console.log(book);
		this.books.push(book);
	};
}

export default BookStore;

```

지금 books를 push를 통해서 고치고 있으니 그래서 이렇게 할때는 항상 액션을 위처럼 달아져야 한다.

3가지를 배웠다.

Provider,injectObserver와 이 스토어 안에 있는 Observerble하고 action을 배웠다. 리덕스에서 action은 뭐였져? 스테이트를 바꿀때 사용하는 거다. 

마찬가지로 observable state앞에 붙는거기 때문에 이 state를 변하게 하는거는 항상 action을 붙여줘야한다.



MobxBookListContainer.jsx를 원래 대로 돌아가 보자.