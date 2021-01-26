# MobX 

- 데코레이터를 적극 활용한다. (데코레이터는 일반 함수인데 데코레이터로 사용 가능 하다.)
  - cra에 데코레이터를 사용하는 법
  - 스토어 객체에 붙이는 데코레이터가 있고, => @observable: 관찰하다. 관찰이 가능한 아이
  - 컴포넌트에서 사용하는 데코레이터가 있다. => @observer: 관찰자(그 관찰한 가능한 아이를 관찰한다.)
- TypeScript 가 Base 인 라이브러리이다. => 타입 스크립트에서 특별하게 취급되고 있는 데코레이터를 적극 취급한다.
- Redux 와 마찬가지로, 스토어에 필요한 부분과 리액트에 필요한 부분이 있다. 
  - npm i mobx -D
  - npm i mobx-react -D
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
		const { books, loading, error } = this.props.bookStore;
		console.log(books); // []
		return <BookList books={books} loading={loading} error={error} getBooks={this.getBooks} />;
	}

	getBooks = () => {};
}

export default BookListContainer;

```

이렇게 하고 BookStore.js 에 가서 

- BookStore.js

```js
import { observable, makeObservable, action } from 'mobx';

class BookStore {
	// 관찰할 거면 어떤 데이터를 관찰 할 건지 정해야한다.

	@observable books = []; // 관찰할 아이로 정한거다.
	@observable loading = false;
	@observable error = null;

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

observable 관찰할 아이를 만든다.



getBooks라는 아이는 원레 BookList가서 서버에서 데이터 받아서 주는 아이였다. 그래서 각종 미들웨어를 사용해서 getBooksSagaStart를 해서 줬었는데 이번엔 아니라 이렇게 만들어 보자.

```js
import { inject, observer } from 'mobx-react';
import React from 'react';
import BookList from '../components/BookList';
import BookService from '../services/BookService';

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
		const { books, loading, error } = this.props.bookStore;
		console.log(books); // []
		return <BookList books={books} loading={loading} error={error} getBooks={this.getBooks} />;
	}

	getBooks = async () => {
		try {
			start();
			const token = localStorage.getItem('token');
			const books = await BookService.getBooks(token);
			success(books);
		} catch (error) {
			fail(error);
		}
	};
}

export default BookListContainer;

```

이렇게 원레는 이런 함수들은 원레는  리덕스에서 가져왔었는데 지금은 store를 들고 다니기 때문에 스토어에서 꺼내오자.

```js
	getBooks = async () => {
		const { bookStore } = this.props;
		try {
			bookStore.start();
			const token = localStorage.getItem('token');
			const books = await BookService.getBooks(token);
			bookStore.success(books);
		} catch (error) {
			bookStore.fail(error);
		}
	};
```

이렇게 bookStore.start 들은 각각 BookStore에 다 있어야 한다.

BookStore에 있는 것들은 다 동기다. async가 아니라

- BookStore.js

```js
import { observable, makeObservable, action } from 'mobx';

class BookStore {
	// 관찰할 거면 어떤 데이터를 관찰 할 건지 정해야한다.

	@observable books = []; // 관찰할 아이로 정한거다.
	@observable loading = false;
	@observable error = null;

	constructor() {
		makeObservable(this);
	}
	@action addBook = (book) => {
		console.log(book);
		this.books.push(book);
	};

	@action start = () => {
		this.books = [];
		this.loading = true;
		this.error = null;
	};

	@action success = (books) => {
		this.books = books;
		this.loading = false;
		this.error = null;
	};

	@action fail = (error) => {
		this.books = [];
		this.loading = false;
		this.error = error;
	};
}

export default BookStore;

```



다시 MobxBookListContainer.jsx로 돌아가서



![image-20210112234135404](/Users/apple/Library/Application Support/typora-user-images/image-20210112234135404.png)

이렇게 잘. 들어왔다.

- MobxBookListContainer.jsx

```js
import { inject, observer } from 'mobx-react';
import React from 'react';
import BookList from '../components/BookList';
import BookService from '../services/BookService';

@inject('bookStore')
@observer
class BookListContainer extends React.Component {
	render() {
		const { books, loading, error } = this.props.bookStore;
		return <BookList books={books} loading={loading} error={error} getBooks={this.getBooks} />;
	}

	getBooks = async () => {
		const { bookStore } = this.props;
		try {
			bookStore.start();
			const token = localStorage.getItem('token');
			const books = await BookService.getBooks(token);
			bookStore.success(books);
		} catch (error) {
			bookStore.fail(error);
		}
	};
}

export default BookListContainer;

```

이제 함수형으로 만들어 보자.

데코레이터는 함수다. 

- MobxBookListContainer.jsx

```js
import { inject, observer } from 'mobx-react';
import React, { useCallback } from 'react';
import BookList from '../components/BookList';
import BookService from '../services/BookService';

// @inject('bookStore')
// @observer
// class BookListContainer extends React.Component {
// 	render() {
// 		const { books, loading, error } = this.props.bookStore;
// 		return <BookList books={books} loading={loading} error={error} getBooks={this.getBooks} />;
// 	}

// 	getBooks = async () => {
// 		const { bookStore } = this.props;
// 		try {
// 			bookStore.start();
// 			const token = localStorage.getItem('token');
// 			const books = await BookService.getBooks(token);
// 			bookStore.success(books);
// 		} catch (error) {
// 			bookStore.fail(error);
// 		}
// 	};
// }

// export default BookListContainer;

export default inject('bookStore')(
	observer(({ bookStore }) => {
		const { books, loading, error } = bookStore;
		const getBooks = useCallback(async () => {
			try {
				bookStore.start();
				const token = localStorage.getItem('token');
				const books = await BookService.getBooks(token);
				bookStore.success(books);
			} catch (error) {
				bookStore.fail(error);
			}
		}, [bookStore]);
		return <BookList books={books} loading={loading} error={error} getBooks={getBooks} />;
	})
);

// export default BookListContainer;

```

이렇게 변한다.

bookStore말고 다른 Store를 만들어 보자.

그래서 mobx폴더에 AuthStore.js를 만들자.

- AuthStore.js

```js
import { makeObservable, observable } from 'mobx';

export default class AuthStore {
	@observable token = null;
	@observable loading = false;
	@observable error = null;

	constructor() {
		makeObservable(this);
	}
}
```

그리고 BookStore처럼 해주자.

```js
import { makeObservable, observable, action } from 'mobx';

export default class AuthStore {
	@observable token = null;
	@observable loading = false;
	@observable error = null;

	constructor() {
		makeObservable(this);
	}

	@action start = () => {
		this.token = null;
		this.loading = true;
		this.error = null;
	};

	@action success = (token) => {
		this.token = token;
		this.loading = false;
		this.error = null;
	};

	@action fail = (error) => {
		this.token = null;
		this.loading = false;
		this.error = error;
	};
}

```

이제 얘를 만들어서 provider에게 넣어줘야한다.

App.js에 가서 넣어보자.



```js
import AuthStore from './mobx/AuthStore';
const authStore = new AuthStore();

<MoxProvier bookStore={bookStore} authStore={authStore}>
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

이렇게 준다. 그러면 authStore를 사용하는 쪽은 authStore를 @inject해야한다. 그래서 containers에 하나 더 만든다.

MobxSigninContainer.jsx 로 만들자.



```js
import { inject, observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Signin from '../components/Signin';
import AuthService from '../services/AuthService';

export default inject('authStore')(
	observer(({ authStore }) => {
		const { loading, error } = authStore;
		const history = useHistory();
		const signin = useCallback(
			async (email, password) => {
				try {
					authStore.start();
					const token = await AuthService.login(email, password);
					localStorage.setItem('token', token);
					authStore.success(token);
					history.push('/');
				} catch (error) {
					authStore.fail(error);
				}
			},
			[authStore, history]
		);

		return <Signin loading={loading} error={error} signin={signin} />;
	})
);

```

이렇게 하면 된다. 

자 그러면 로그인하고 이 결과물이 오니까 서비스에서 알아서 잘 처리해주니까 바꿔치기 하자. 

page에 signin가서

```js
import { Redirect } from 'react-router-dom';
import withToken from '../hocs/withToken';
import SigninContainer from '../containers/MobxSigninContainer';
import { useSelector } from 'react-redux';

function SigninPage() {
	const token = useSelector((state) => state.auth.token);
	if (token !== null) {
		return <Redirect to="/" />;
	}

	return <SigninContainer />;
}

export default SigninPage;

```

이렇게 바꿔치기 하고 다시 로그인하면 된다.

history가 사용이 안될 것이다 리덕스로 전환하고 mobx를 쓰고 있기 때문에 리덕스의 history가 useRouter의 history가 같은 동작을 보장하기 힘들어서 제대로 history를 먹을려면 App.js 만들때 만든 history를 사용해야 한다. 일단 냅두자.

토큰이 어디에 저장에 있을까? Mobx의 AuthStore에 관리하고 있다.  그래서 localStorage에서 얻어오지 말고  bookStore말고 AuthStore에서가져와야한다. 그러면 어떻게 하면 되나

- MobxBookListContainer.jsx

```js
import { inject, observer } from 'mobx-react';
import React, { useCallback } from 'react';
import BookList from '../components/BookList';
import BookService from '../services/BookService';

export default inject(
	'bookStore',
	'authStore'
)(
	observer(({ bookStore, authStore }) => {
		const { books, loading, error } = bookStore;
		const { token } = authStore;
		const getBooks = useCallback(async () => {
			try {
				bookStore.start();
				const books = await BookService.getBooks(token);
				bookStore.success(books);
			} catch (error) {
				bookStore.fail(error);
			}
		}, [bookStore, token]);
		return <BookList books={books} loading={loading} error={error} getBooks={getBooks} />;
	})
);

// export default BookListContainer;

```

이렇게 할 수 있다.  근데 새로고침하면 토큰은 App.js에 create할때 token이 create.js에 들어오고 있다. 그래서 redux에 저장된다. 그래서 mobX도 create 시점에 AuthStore가 new 될때 즉 

- AuthStore.js

```js
import { makeObservable, observable, action } from 'mobx';

export default class AuthStore {
	@observable token = null;
	@observable loading = false;
	@observable error = null;

	constructor() {
		makeObservable(this);
		this.token = localStorage.getItem('token');
	}

	@action start = () => {
		this.token = null;
		this.loading = true;
		this.error = null;
	};

	@action success = (token) => {
		this.token = token;
		this.loading = false;
		this.error = null;
	};

	@action fail = (error) => {
		this.token = null;
		this.loading = false;
		this.error = error;
	};
}

```

이렇게 생성할 때 만들어 줘야 한다.

뭔가 MobxSigninContainer에 비동기 로직이 있는게 싫다. 

BookStore로 가서

```js
import { observable, makeObservable, action } from 'mobx';
import BookService from '../services/BookService';

class BookStore {
	// 관찰할 거면 어떤 데이터를 관찰 할 건지 정해야한다.

	@observable books = []; // 관찰할 아이로 정한거다.
	@observable loading = false;
	@observable error = null;

	constructor() {
		makeObservable(this);
	}
	@action addBook = (book) => {
		console.log(book);
		this.books.push(book);
	};

	@action start = () => {
		this.books = [];
		this.loading = true;
		this.error = null;
	};

	@action success = (books) => {
		this.books = books;
		this.loading = false;
		this.error = null;
	};

	@action fail = (error) => {
		this.books = [];
		this.loading = false;
		this.error = error;
	};

	getBooks = async (token) => {
		try {
			this.start();
			const books = await BookService.getBooks(token);
			this.success(books);
		} catch (error) {
			this.fail(error);
		}
	};
}

export default BookStore;

```

이렇게 getBooks를 추가하고 

- MobxBookListContainer.jsx

```js
export default inject(
	'bookStore',
	'authStore'
)(
	observer(({ bookStore, authStore }) => {
		const { books, loading, error } = bookStore;
		const { token } = authStore;
		const getBooks = useCallback(async () => {
			bookStore.getBooks(token);
		}, [bookStore, token]);
		return <BookList books={books} loading={loading} error={error} getBooks={getBooks} />;
	})
);

```

이렇게 정리한다.



근데 다시 BookStore를 보면 액션 다는 아이는 동기 함수라고 말했었다. 그냥 동기 함수로서 하나하나를 처리하는 거 말고 async로 처리하는데 이렇게 액션을 나눠서 처리할 수도 있고 그냥 

```js
getBooks = async (token) => {
		try {
			this.books = [];
			this.loading = true;
			this.error = null;
			const books = await BookService.getBooks(token);
			this.books = books;
			this.loading = false;
			this.error = null;
		} catch (error) {
			this.books = [];
			this.loading = false;
			this.error = error;
		}
	};
```

이렇게 할 수도 있는데 warning이 뜨고 있다.  액션이라는 보장이 없다.  요 상태에서 

```js
			this.books = [];
			this.loading = true;
			this.error = null;
```

요 아이들은 액션이라는걸 구분해서 표현해 줘야 한다. 

- BookStore.js

```js
import { observable, makeObservable, runInAction } from 'mobx';
import BookService from '../services/BookService';

class BookStore {
	// 관찰할 거면 어떤 데이터를 관찰 할 건지 정해야한다.

	@observable books = []; // 관찰할 아이로 정한거다.
	@observable loading = false;
	@observable error = null;

	constructor() {
		makeObservable(this);
	}

	getBooks = async (token) => {
		try {
			runInAction(() => {
				this.books = [];
				this.loading = true;
				this.error = null;
			});
			const books = await BookService.getBooks(token);
			runInAction(() => {
				this.books = books;
				this.loading = false;
				this.error = null;
			});
		} catch (error) {
			runInAction(() => {
				this.books = [];
				this.loading = false;
				this.error = error;
			});
		}
	};
}

export default BookStore;

```

이렇게 만들 수 있다.

token이 다른 스토어에도 있는건데 일부러 authStore에  받아다가 했는데 이렇게 하지말 고 없애고 

- MobxBookListContainer.jsx

```js
import { inject, observer } from 'mobx-react';
import React from 'react';
import BookList from '../components/BookList';

export default inject('bookStore')(
	observer(({ bookStore, authStore }) => {
		const { books, loading, error, getBooks } = bookStore;
		return <BookList books={books} loading={loading} error={error} getBooks={getBooks} />;
	})
);
```

mobx같은 경우 합치는 일을 해야한다.

Mobs 폴더에 RootStore를 만든다.

```js
import AuthStore from './AuthStore';
import BookStore from './BookStore';

export default class RootStore {
	constructor() {
		this.bookStore = new BookStore(this);
		this.authStore = new AuthStore(this);
	}
}

```

이제 this를 받아서 AuthStore에서

```js
import { makeObservable, observable, action } from 'mobx';

export default class AuthStore {
	@observable token = null;
	@observable loading = false;
	@observable error = null;

	constructor(rootStore) {
		makeObservable(this);
		this.token = localStorage.getItem('token');
		this.rootStore = rootStore;
	}

	@action start = () => {
		this.token = null;
		this.loading = true;
		this.error = null;
	};

	@action success = (token) => {
		this.token = token;
		this.loading = false;
		this.error = null;
	};

	@action fail = (error) => {
		this.token = null;
		this.loading = false;
		this.error = error;
	};
}

```

이렇게 마찬가지로 BookStore에서도.



```js
import { observable, makeObservable, runInAction } from 'mobx';
import BookService from '../services/BookService';

class BookStore {
	// 관찰할 거면 어떤 데이터를 관찰 할 건지 정해야한다.

	@observable books = []; // 관찰할 아이로 정한거다.
	@observable loading = false;
	@observable error = null;

	constructor(rootStore) {
		makeObservable(this);
		this.rootStore = rootStore;
	}

	getBooks = async (token) => {
		try {
			runInAction(() => {
				this.books = [];
				this.loading = true;
				this.error = null;
			});
			const books = await BookService.getBooks(token);
			runInAction(() => {
				this.books = books;
				this.loading = false;
				this.error = null;
			});
		} catch (error) {
			runInAction(() => {
				this.books = [];
				this.loading = false;
				this.error = error;
			});
		}
	};
}

export default BookStore;

```

이렇게 하면 두개의 스토어가 루트 스토어에서 물고 있다.  이제 App.js에서 두개의 store를 안해도 되고 RootStore를 가져가면 된다.

- App.js

```js
import RootStore from './mobx/RootStore';

const rootStore = new RootStore();

	<MoxProvier {...rootStore}>
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

이렇게 한다.  MobxBookListContainer.jsx에서 BookStore에서 토큰을 가져올때

- BookStore.js

```js
import { observable, makeObservable, runInAction } from 'mobx';
import BookService from '../services/BookService';

class BookStore {
	// 관찰할 거면 어떤 데이터를 관찰 할 건지 정해야한다.

	@observable books = []; // 관찰할 아이로 정한거다.
	@observable loading = false;
	@observable error = null;

	constructor(rootStore) {
		makeObservable(this);
		this.rootStore = rootStore;
	}

	getBooks = async () => {
		try {
			runInAction(() => {
				this.books = [];
				this.loading = true;
				this.error = null;
			});
			const token = this.rootStore.authStore.token;
			const books = await BookService.getBooks(token);
			runInAction(() => {
				this.books = books;
				this.loading = false;
				this.error = null;
			});
		} catch (error) {
			runInAction(() => {
				this.books = [];
				this.loading = false;
				this.error = error;
			});
		}
	};
}

export default BookStore;

```

이렇게 토큰을 사용한다.

Redux, Mobx말고 react state management가 있다. 

Recoil이 있다.



### @observable 사용법 (mobx)

- observable(<value>) 
  - 데코레이터 없이 사용하는 방식
  - @ 없이 함수처럼 사용해서 리턴한 객체를 사용
- @observable <클래스의 프로퍼티>
  - 데코레이터로 사용하는법
  - 클래스 내부에 프로퍼티 앞에 붙여서 사용
  - 한 클래스 안에 열개의 @observable 존재



```js
import { observable } from 'mobx';

// array 에 사용
const list = observable([1, 2, 4]);

// boolean 에 사용
const isLogin = observable(true);

// literal 객체에 사용
const age = observable({
    age: 35
});

// 클래스의 멤버 변수에 데코레이터로 사용
class AgeStore {
    @observable
    private _age = 35;
}

const ageStore = new AgeStore();
```

트래킹

observable은 객체 모든 거를 관찰하겠다는거다. (옵져버 패턴)



### observer 사용법 (mobx-react)

- *observer(<컴포넌트>);*
  - *데코레이터 없이 사용하는 방식*
  - *함수 컴포넌트에 사용*

- *<컴포넌트 클래스> 에 @observer 달아서 처리*
  - *클래스 컴포넌트에 사용*



### @computed

getter라고 배운적이 있을 것이다. 클래스에서

```js
class AgeStore {
    @observable
    private _age = 35;

@computed get a() {
  return "a";
}
}

new AgeStore().a
```

라고 하면 나온다. 그래서 getter앞에 @computed 를 붙일 수 있다. 트래킹하는  observable아이가 변하면 @computed한테 영향을 줘서 변하는 아이한테 computed라고 단다.



## computed 란 ?

- *getter 에만 붙일수 있다. (setter 부르면 getter 도 실행된다.)*
- *함수가 아니라 리액티브 하다는 것에 주목*
- *실제 컴포넌트에서 사용하는 (게터)값들에 달아서 사용하면 최소 범위로 변경할 수 있기 때문에 유용하다.*
  - *40살이 넘었을때만 나이를 올리면 40살 이하일때는 재랜더링 대상이 아닌 것과 같은 경우*
  - *내부적으로 고도의 최적화 => 어떻게 ?*
    - *매번 재계산을 하지 않는다*
    - *계산에 사용할 observable 값이 변경되지 않으면 재실행하지 않음.*
    - *다른 computed 또는 reaction 에 의해 호출되지 않으면 재실행하지 않음.*
    - *observable 과 처리 방식의 차이로 인한 성능 이슈에 주목*
      - *observable 이 변했는데 computed 가 변하지 않을때 사용에 따른 차이*



@action state를 동기적으로 변경한다.

@inject와 Provider 

## Provider

- 네, 그 프로바이더가 맞습니다.
  - *네, 그래서 컨테이너라는 개념을 사용해도 좋습니다.*
- 프로바이더에 props 로 넣고, @inject 로 꺼내 쓴다고 생각하시면 됩니다.
  - *상당히 명시적이고, 편합니다.*
  - 컨테이너를 쓰지 않아도 될것 같습니다.
    - *props 로 바꿔줍니다.*
    - *this.props.store*



### mobs-react-devtools

라는 것이 있다. 이 아이는 편하게 사용할 수 있다.

