# Next.js

간단하게 해보자.



```bash
npx create-next-app
```

이걸 설치하면 된다.(이름을 설정하고 엔터)

들어가서 

이상태에서 npm run dev를 하자.

![image-20201230212116614](./img/next.png)

이렇게 서버사이드 렌더링이 되고 있다.

만약 index pages 폴더안에 index.js에서 복사해서 새로운 파일 home.js라고 만들고 붙여 넣기 하자.

- home.js

```js
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
```

![image-20201230212116614](./img/next1.png)

이렇게 나온다. (와우..)

만약 이상한 글자를 url뒤에 적는다면 404에러가 발생한다.그러면 한번 새로운 파일해서 404.js를 만들어 보자.

![image-20201230212116614](./img/next2.png)

이렇게 없다라고 나온다. 만약 저런 주소로 만들고 싶으면 pages안에 폴더를 만들고 해당 이름폴더를 만든다.



이렇게 그림이 그려지고 서버사이드 렌더링도 된다. 얘를 배포할때 정적인 페이지로만 html을 떨궈줄 때도 있다.



## Next.js

이제 다시 해보자.

Next.js setup하자.

```bash
npx create-next-app
```

그리고 앱 이름을 정하면 된다. app-with-cna라고 지었다.

npm run dev를 하자. 

Create-react-app은 npm start였다.

## 배포

일단 개발이 끝났다고 생각하고 배포를 해보자. 

Next.js에서 dev말고 실제 배포를 한다면 두가지 방식이 있다. 하나는 

```bash
npm run build
```

nextjs소스를 가지고 build를 한다. 

![image-20210113223141735](/Users/apple/Library/Application Support/typora-user-images/image-20210113223141735.png)

여기에 .next에 들어 있다. 이걸 알 필요 없는게 똑같이 실행한다 개념으로 사용하려면 npm run build 한 직 후에 npm start를 하면 된다. 이게 프로덕션 모드이다. 만약 수정이 생긴다면 npm run build하고 npm start를 하면 된다.

근데 노드 서버가 있어야지 npm start를 할 수 있다. 이거는 정적 웹 사이트가 아니다. 그냥 노드 서버에서 띄우는 거다. 

정적 웹 사이트로는 어떻게 만드나

npm run build하고 npx next export 하면 된다.

```bash
apple@APPLEui-MacBookPro app-with-cna % npx next export
info  - using build directory: /Users/apple/Desktop/React-study/app-with-cna/.next
info  - Copying "static build" directory
info  - No "exportPathMap" found in "next.config.js". Generating map from "./pages"
info  - Launching 7 workers
warn  - Statically exporting a Next.js application via `next export` disables API routes.
This command is meant for static-only hosts, and is not necessary to make your application static.
Pages in your application without server-side data dependencies will be automatically statically exported by `next build`, including pages powered by `getStaticProps`.
Learn more: https://err.sh/vercel/next.js/api-routes-static-export
info  - Copying "public" directory
info  - Exporting (2/2)
Export successful. Files written to /Users/apple/Desktop/React-study/app-with-cna/out

```

이렇게 나온다. 코드로 가면 out폴더가 생겼다. 여기서 2개의 의미는 index.html 과 404.html이 생긴거다. 그래서 이 out안에 잇는 걸 S3 버킷 안에 두면 된다. 다른게 html로 떨어지기 때문에 실행해 보자.

```bash
npx serve out
```

serve로 띄운 아이는 S3에 넣어도 되고 파일만 가지고 어디든 배포를 할 수 있다.  모르는 주소를 쳐도 404 잘 나온다.



또 주목해야할 부분이 있다. pages에 api라는 폴더가 있다. api라고 하는건 제공하는 bookAPI나 이런거다. 이 API는 그걸 제공하는 api이다.  api를 생성해서 넣을 수 있다. 어떻게 호출을 하나? 

api에 hello라고 치면 

![image-20210113224746022](/Users/apple/Library/Application Support/typora-user-images/image-20210113224746022.png)

JSON으로 화면에 데이터가 나온다.

![image-20210113225132512](/Users/apple/Library/Application Support/typora-user-images/image-20210113225132512.png)

한가지 차이점이 뭐냐면 html파일같은 경우 npm run build하고 npx next export 한 아이고 npx serve로 띄었기 때문에 s3같은게 돌아가고 있다.

노드 js에서 돌아가는게 아니기 때문에 애초에 API를 할수가 없다.  그래서 npx serve로 한 홈페이지에서 

![image-20210113225024927](/Users/apple/Library/Application Support/typora-user-images/image-20210113225024927.png)

이렇게 안나온다. api로는 쓸 수 없다, (정적 사이트로 만들때는 )

이게 중요한 부분이다. next export에서는 api는 사라진다고 하면 된다. 

그래서 api까지 같이 쓰고 싶을때는 npm run build npm start로 하면 된다.

근데 배포를 쉽게 하고 싶으면 versel이라는 걸로 하면 1분 ~ 2분 내로 할 수 있다.



package.json에서

```js
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
```

이렇게 되어 있다. 



요번엔 메뉴얼로 만들어 보자.

```bash
mkdir app-without-cna
cd app-without-cna
npm init -y
npm i next react react-dom
```

라고 만들어 보자.

vscode를 열고 package.json에서 

```js
"scripts": {
		"dev": "next dev",
		"build": "next build",
		"start": "next start"
	},
```

이렇게 하자.

그 다음 npm run dev 하자. 이렇게 하면 에러가 발생한다 그래서 pages 디렉토리가 없다고 한다. 그래서 root에 page폴더를 만들자.

사이트를 열면 404에러가 난다 왜냐면 아무것도 없기 때문이다. 그래서 pages 폴더에 만들자. index.js

- Index.js

```js
const Index = () => {
	return <div>Index</div>;
};

export default Index;

```

![image-20210113232932256](/Users/apple/Library/Application Support/typora-user-images/image-20210113232932256.png)

이렇게 나온다. 



또 뉴 폴더해서 blog폴더를 만들고 그 안에 index.js파일을 만들자.

```js
const Blog = () => {
	return <div>Blog</div>;
};

export default Blog;

```

이렇게 바꾸고 url로 들어가보자.

![image-20210113233152847](/Users/apple/Library/Application Support/typora-user-images/image-20210113233152847.png)

이렇게 잘 나온다. 근데 뒤에 이상한거 쓰면 404에러가 발생한다.

위 경로로 쓰고 싶다고 하는것 가능하다. 나중에 설정에서 할 수 있다.

blog에 post.js를 만들자. 그러면 이 뒤에 blog/post 이렇게 들어 갈 수 있다. 

그래서 예전에는 라우팅을 파일시스템으로 제공하다보면 계속 변칙적인 상황이 생긴다. 그것을 해결하는게 상당히 어려웠었다. 근데 업데이트 하면서 완전히 해소가 되었다. 

일반 리엑트에서도 다이나믹 라우팅을 배웠었다. 그래서 pages폴더안에 book폴더를 만들고 파일을 하나 만들자.

[id].js 로 만들자. 이게 할 수 있는게 book/39 이렇게 아이디 값을 쓸 수 있다. 

```js
const Book = () => {
	return <div>Book</div>;
};

export default Book;

```

이렇게 하고 예전에는 useRouter를 사용했었다. 이 아이도 마찬가지다.

withRouter를 사용해 보자.

```js
import { withRouter } from 'next/router';

const Book = (props) => {
	console.log(props);
	return <div>Book</div>;
};

export default withRouter(Book);

```

![image-20210113234634895](/Users/apple/Library/Application Support/typora-user-images/image-20210113234634895.png)

이렇게 라우터 객체가 나온다 라우터 객체를 쓰면 된다.

```js
import { withRouter } from 'next/router';

const Book = ({ router }) => {
	return <div>Book: {JSON.stringify(router.query)}</div>;
};

export default withRouter(Book);

```

이렇게 하면

![image-20210113234901334](/Users/apple/Library/Application Support/typora-user-images/image-20210113234901334.png)

이렇게 잘 나온다. 그리고 다이나믹 라우터중 url에 ?name=mark이런거 줄 수도 있다. 그냥 해보면



![image-20210113235016714](/Users/apple/Library/Application Support/typora-user-images/image-20210113235016714.png)

이렇게 쉽게 나온다. 예전에는 query-string 설치해서 했는데 이제는 이렇게 잘 나온다.

만약 book/39/1 39, 1둘다 받고 싶을때는 두가지 방법이 있다. 

둘 다 어렵지 않는다. book폴더를 만들고 이 이름을 [id] 뒤에 파일을 [comment].js로 만들자.

![image-20210113235306467](/Users/apple/Library/Application Support/typora-user-images/image-20210113235306467.png)

![image-20210113235326986](/Users/apple/Library/Application Support/typora-user-images/image-20210113235326986.png)

이렇게 폴더에 대괄호 처리를 할 수 있다. 이게 좀 명시적인 방법이다.

또 다른 방법은 특이한  이름을 쓰면 된다. 그래서 pages폴더안에 camp폴더 만들고 새로운 파일을 해서 [...slug].js 레스트파라미터같이 파일이름을 짓는다. 뭐가 들어올지 모를때 사용한다.

![image-20210113235558625](/Users/apple/Library/Application Support/typora-user-images/image-20210113235558625.png)

이렇게 만들면

![image-20210113235625186](/Users/apple/Library/Application Support/typora-user-images/image-20210113235625186.png)

404가 나오게 된다. 만약 camp/a url로 하면

![image-20210113235707270](/Users/apple/Library/Application Support/typora-user-images/image-20210113235707270.png)

slug가 a가 나오고 camp/a/b 이렇게 하면 slug [a,b]가 나온다. 안되는건 camp 하나만 안 나온다.

이거 말고 마지막 방법을 해보자. camp도 받고 싶으면 [...slug].js를 한칸더 하자 [[...slug]].js

![image-20210113235850820](/Users/apple/Library/Application Support/typora-user-images/image-20210113235850820.png)

이렇게 나온다.



![image-20210114000209126](/Users/apple/Library/Application Support/typora-user-images/image-20210114000209126.png)



> /3 vs ?name=~  
>
> /3 파람스는 옵셔널하게 정보를 전달할 때 쓰고 쿼리는 이게 있으면 정보를 처리해주는 보통 이걸 쓴다.

## useRouter

useRouter를 쓰자. React-router-dom에서 배운것 처럼 next-router 에서 useRouter 가져다 쓰면 된다.

```js
import { useRouter, withRouter } from 'next/router';

const Camp = () => {
	const router = useRouter();
	return <div>Camp: {JSON.stringify(router.query)}</div>;
};

export default Camp;

```



![image-20210114000742530](/Users/apple/Library/Application Support/typora-user-images/image-20210114000742530.png)

이렇게 잘 나온다.

useRouter쓰는게 더 깔끔하다. 

## Link

pages안에 about.js를 만들자.

```js
const About = () => {
	return (
		<div>
			<h1>About</h1>
			<a href="/">Home</a>
		</div>
	);
};

export default About;

```

이렇게 작성한다. 

그리고 링크를 클릭하면 잘 안될것이다. (깜빡인다. 로딩이 생긴다.) 그래서 next/link에서 Link를 가져오자.

```js
import Link from 'next/link';

const About = () => {
	return (
		<div>
			<h1>About</h1>
			<Link href="/">
				<a>Home</a>
			</Link>
		</div>
	);
};

export default About;

```

그러면 깜빡임 없이 잘 될 것이다. 그래서 컴포넌트로 링크 욺직이는 방법이다.

## 자바스크립트로 욺직이는 방법

기존에 보통 이동하고 싶을때 Router에 들어온 아이가 history, location, march 이렇게 들어왔었다. 그런데 이번에는 next.js는 

- index.js

```js
const Index = () => {
	const router = useRouter();
	function click(e) {
		e.preventDefault();
		router.push(e.target.href);
	}
	return (
		<div>
			<h1>Index</h1>
			<a href="/about" onClick={click}>
				About
			</a>
		</div>
	);
};

export default Index;

```

이렇게 router에다가 넣으면 된다. 링크에서는 기본적으로 문자열 기반으로 이동을 줄 수 있다. 

하다보면 localhost:3000/camp/안녕하세요 이렇게 치면 나온다. 

띄어쓰기가 있을때 slug가 잘 찍히는데 다시 이동하려면 어떻게 해야 하나 

```js
import Link from 'next/link';

const About = () => {
	return (
		<div>
			<h1>About</h1>
			<Link href={`/camp/${encodeURIComponent('안녕?')}`}>
				<a>Home</a>
			</Link>
		</div>
	);
};

export default About;

```

이렇게 보내줄 수 있다. href를 보내주면 문자열을 보내준다. 이렇게 문자열 말고 객체로도 보낼수 있다.

```js
import Link from 'next/link';

const About = () => {
	return (
		<div>
			<h1>About</h1>
			<Link
				href={{
					pathname: 'camp/[slug]',
					query: { slug: '안녕' },
				}}
			>
				<a>Home</a>
			</Link>
		</div>
	);
};

export default About;

```



![image-20210114110723214](/Users/apple/Library/Application Support/typora-user-images/image-20210114110723214.png)



그리고 이렇게 해보자.

- index.js

```js
import { useRouter } from 'next/router';
const Index = () => {
	const router = useRouter();
	function click(e) {
		e.preventDefault();
		router.push(e.target.href);
	}
	return (
		<div>
			<h1>Index</h1>
			<a href="/about" onClick={click}>
				About
			</a>
		</div>
	);
};

export default Index;

```

- About.js

```js
import Link from 'next/link';

const About = () => {
	return (
		<div>
			<h1>About</h1>
			<Link
				href={{
					pathname: '/about',
					query: { name: ['안녕'] },
				}}
				replace
			>
				<a>Home</a>
			</Link>
		</div>
	);
};

export default About;

```

replace 달면 뒤로가면 home으로 간다. 보통 router에 replace를 할 수도 있다. 네임으로 replace가 된 거다. 

페이지가 바뀌면서 nextjs는 항상 최상단으로 올라가는 습성이 있다. 그래서 방지로 

```js
import Link from 'next/link';

const About = () => {
	return (
		<div>
			<h1>About</h1>
			<Link
				href={{
					pathname: '/about',
					query: { name: ['안녕'] },
				}}
				replace
				scroll={false}
			>
				<a>Home</a>
			</Link>
		</div>
	);
};

export default About;

```

이렇게 scroll을 달아주면 누를때 스크롤이 안되게 할 수 있다. 

프로젝트를 한다 그러면 이렇게 안생길 수 있다. 페이지는 간소하고 공통적인 건 빼서 레이아웃같은 거로 처리 하게 된다. 그래서 프로젝트 설정을 맘데로 하고 싶을 때가 많이 생길때 도와줄 수 있는 기능들을 nextjs에서 디폴트로 제공을 해준다. 한번 해보자.

src를 만들어서 pages 폴더를 넣자. 

서버 내렸다가 다시 올려도 src 안에 있는 pages가 동작한다.

그리고 components 폴더를 만들자. 그리고 utils 하고 libs를 이 3게를 다 src 밑에 가도록 하자. 그리고 루트에다 jsconfig.json 파일을 만들자.

![image-20210114115701494](/Users/apple/Library/Application Support/typora-user-images/image-20210114115701494.png)

그리고 pages에 tsc.ts 를 만들자.

- Jsconfig.json

```js
{
	"compilerOptions": {
		"jsx": "preserve",
		"target": "es2015"
	}
}

```

이렇게 쓰도록 하자. 컴파일 옵션 말고 하고 싶었던건

components폴더에 Button.jsx를 만들자.

- Button.jsx

```js
const Button = () => <button>버튼</button>;

export default Button;

```

보통 이아이를 홈에서 가져다 쓸때 이렇게 한다.

- index.js

```js
import { useRouter } from 'next/router';
import Button from '../components/Button';
const Index = () => {
	const router = useRouter();
	function click(e) {
		e.preventDefault();
		router.push(e.target.href);
	}
	return (
		<div>
			<h1>Index</h1>
			<a href="/about" onClick={click}>
				About
			</a>
			<Button />
		</div>
	);
};

export default Index;

```

이렇게 쓴다. 그런데 상대경로로 찾을때 귀찮거나 프로젝트의 루트부분을 src에 맞쳐서 표기법을 알리아스 형식으로 변경할 수 도 있다. 일단 jsconfig.json으로 가서 compilerOptions를 만든다.

- jsconfig.json

```js
{
	"compilerOptions": {
		"baseUrl": "./src",
		"paths": {
			"@components/*": ["components/*"]
		}
	}
}
```

이렇게 설정을 하면 index.js에서 

```js
import Button from '@components/Button';
```

이렇게 변경할 수 있다.

![image-20210114120330431](/Users/apple/Library/Application Support/typora-user-images/image-20210114120330431.png)

그리고 libs도 마찬가지고 utils 폴더도 마찬가지고 hooks 폴더를 만들고 나서도 마찬가지다.

![image-20210114120439021](/Users/apple/Library/Application Support/typora-user-images/image-20210114120439021.png)

- jsconfig.json

```js
{
	"compilerOptions": {
		"baseUrl": "./src",
		"paths": {
			"@components/*": ["components/*"],
			"@styles/*": ["styles/*"],
			"@hooks/*": ["hooks/*"],
			"@libs/*": ["libs/*"],
			"@utils/*": ["utils/*"]
		}
	}
}

```

이렇게 하면 더 깔끔하게 할 수 있다.

pages를 만들 건데 이 page들에 대해서 create react app으로 만들면 페이지라는 개념은 상태에 대한 변화라고 생각했는데 여기서는 하나하나의 컴포넌트가 분리되어서 돌아가는 것처럼 보인다. 공유 한다는 느낌이 들지 않는다. 그래서 요런 경우에 store가 하나기 떄문에 쪼개는 방법을 고민하고 여러개면 합치는 방법을 고민한다. 즉 이 페이지가 분리되었기 때문에 페이지 사이에 데이터를 공유하는 것에 대해서 제공하지 않으면 복잡해 진다.

그래서 pages에 파일 하나 만들고 _app.js 를 만들어 보자.

![image-20210114124709615](/Users/apple/Library/Application Support/typora-user-images/image-20210114124709615.png)

이 앱이라는 아이는 어떤 거냐면

- _app.js

```js
const MyApp = ({ Component }) => {
	console.log('a');
	return <Component />;
};

export default MyApp;

```

이렇게 하고 홈으로 가면

![image-20210114121241679](/Users/apple/Library/Application Support/typora-user-images/image-20210114121241679.png)

요 앱이 마이앱이다. 이 안에 Index가 있다. 이상태에서 페이지를 바꾸면 

![image-20210114121334445](/Users/apple/Library/Application Support/typora-user-images/image-20210114121334445.png)

이렇게 About으로 app 밑으로 바뀌었다. app이 하는 일은 만약에 about과 index 사이에 공유되어야 할 데이터가 있다면 app에 다 두고 그걸 서로 사용할 수 있게 해야한다. 페이지가 변하더라도 간직하 고 싶은 데이터를 app에다 두고 사용하는 거다. 전역 스타일도 app에 넣어야 한다. 이게 그런 용도로 하고 있다.

app말고 또 있다 head사이에 넣고 싶을때 이런것도 할 수 있다. about에서 state를 공유 하는 것도 해보자.

이제 pages에 login.js를 만들자.



- Login.js

```js
const Login = () => (
	<div>
		<h1>Login</h1>
	</div>
);

export default Login;

```

하면 로그인 페이지가 만들어 진다.

이미지를 넣고 싶은데 어떻게 파일을 어디다 둘건지 이미 루트에 public 폴더를 만들고 그 안에 이미지파일을 넣자.

![image-20210114134714677](/Users/apple/Library/Application Support/typora-user-images/image-20210114134714677.png)



```js
const Login = () => (
	<div>
		<h1>Login</h1>
		<img src="/bg_signin.png" />
	</div>
);

export default Login;

```



/ 경로가 public안에 있는거다.

![image-20210114134839011](/Users/apple/Library/Application Support/typora-user-images/image-20210114134839011.png)

이렇게 이미지가 나올 것이다.(이건 예전에 mybook만들때 찍은 이미지이다.)

대표적으로 static이미지나 favicon.ico 나 robots.txt 도 넣을 수 있다.

next.js 10 이라는 새로운 기능이 생겼다.

```js
import Image from 'next/image';

<Image ... />
```

이런게 생겼다. 그래서 한번 해보면

- login.js

```js
import Image from 'next/image';
const Login = () => (
	<div>
		<h1>Login</h1>
		<Image src="/bg_signin.png" width={400} height={534} />
	</div>
);

export default Login;

```

이렇게 하면 적용이 된다. 

img가 나온다.

![image-20210114135434721](/Users/apple/Library/Application Support/typora-user-images/image-20210114135434721.png)

src에 q=75라는 퀄리티약자이다. 

q=75가 붙은 이유는 CMS 같은거로 사용되면 optimized 될 것이다. 이런 쿼리들을 사용해서 압축을 해서 이것까지 포함해서 해준다. Image 태그는

nextjs가 10버전 이상이 아니면 이미지 태그를 쓰는 순간 사용할 수 없다. 

WebP라는 방식이 있다. 

https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types

SEO 최적화중 하나인데 유저들이 최감상 볼때 이미지 파일들을 Webp로 바꾸기만해도 80% 해소 된다. 

그래서 Image를 컴포넌트로 가져와서 사용해야한다. Robots같은 경우에 pages에 들어있는 경우도 있다. 



## Styles

- css
- css in node_modules 
- css module
- sass
- sass module
- less
- Css-in-js

### Css-in-js

Css - pages/_app.js

- _app.js

```js
import '@styles/globals.css';

const MyApp = ({ Component, props }) => {
	console.log(props);
	return <Component {...props} />;
};

export default MyApp;

```

하고 styles/globals.css에 스타일을 지정하면 전역으로 된다.

![image-20210114141604158](/Users/apple/Library/Application Support/typora-user-images/image-20210114141604158.png)

그러면 이번에는 

```bash
npm i antd
```

를 해보자.

- app.js

```js
import 'antd/dist/antd.css';
import '@styles/globals.css';

const MyApp = ({ Component, props }) => {
	console.log(props);
	return <Component {...props} />;
};

export default MyApp;

```



![image-20210114141752938](/Users/apple/Library/Application Support/typora-user-images/image-20210114141752938.png)

이렇게 antd꺼도 style이 나왔다.



그 다음에 CSS Module도 사용 가능하다. 그래서 styles에다 index.module.css 만들고

```css
.hello {
  color: red;
}
```

이걸 사용하자. 만든거를 index.css에서 보자.

```js
import { useRouter } from 'next/router';
import Button from '@components/Button';
import styles from '../styles/index.module.css';

const Index = () => {
	console.log(styles);
	const router = useRouter();
	function click(e) {
		e.preventDefault();
		router.push(e.target.href);
	}
	return (
		<div>
			<h1>Index</h1>
			<a href="/about" onClick={click}>
				About
			</a>
			<Button />
		</div>
	);
};

export default Index;
```

![image-20210114142108213](/Users/apple/Library/Application Support/typora-user-images/image-20210114142108213.png)

이렇게 나온다. 

이제 scss를 사용하자.

```bash
npm install sass
```

설치를 하고 globals_sass.scss를 스타일즈 폴더 안에 넣자.

```sass
* {
  color: aquamarine;
}
```

이렇게 하고 글로벌이니 _app.js 에 넣자.

```js
import 'antd/dist/antd.css';
import '@styles/globals.css';
import '@styles/globals_sass.scss';

const MyApp = ({ Component, props }) => {
	console.log(props);
	return <Component {...props} />;
};

export default MyApp;

```

그러면 전역으로 스타일을 적용했다. 그러면 module.scss도 할 수 있다.

styles폴더안에 login.module.scss 로 만들자.

```css
.hello {
  color: red;
}
```



그리고 로그인에서 가져오자.

```js
import Image from 'next/image';
import styles from '@styles/login.module.scss';

const Login = () => {
	console.log(styles);
	return (
		<div>
			<h1>Login</h1>
			<Image src="/bg_signin.png" width={400} height={534} />
		</div>
	);
};

export default Login;

```



![image-20210114142816183](/Users/apple/Library/Application Support/typora-user-images/image-20210114142816183.png)

그럼 이렇게 잘 나온다.

여기까지 쉽다. 

팁이 하나 있다. sass에게 옵션을 주고 있다.

- Next.config.js

```js
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
```

하지만 우리는 알리아스를 하고 있으니 안해도 된다.

## css-in-js 

한번 해보자 새로운 파일을 만들자. pages/hello.js

```js
const Hello = () => (
	<div>
		<style jsx>
			{`
				* {
					color: red;
				}
			`}
		</style>
		<p>안녕하세요</p>
	</div>
);

export default Hello;

```

![image-20210114143342010](/Users/apple/Library/Application Support/typora-user-images/image-20210114143342010.png)

이렇게 태그보면 jsx-72~~이런 식으로 나온다.

```js
const Hello = () => (
	<div>
		<style jsx>
			{`
				* {
					color: red;
				}
			`}
		</style>
		<p>안녕하세요 : scoped</p>
	</div>
);

export default Hello;

```

이 css는 이 div안에서만 유효하다. 만약 이렇게 한하고 

```js
const Hello = () => (
	<div>
		<style jsx>
			{`
				.scoped {
					color: red;
				}
			`}
		</style>
		<p className="scoped">안녕하세요 : scoped</p>
	</div>
);

export default Hello;
```

![image-20210114143609538](/Users/apple/Library/Application Support/typora-user-images/image-20210114143609538.png)

이렇게 나온다.

만약 scoped 하는 걸 index.js에 넣어도 안 될것이다. 

이것도 마찬가지로 하나 제공하는게 있는데 

```js
const Hello = () => (
	<div>
		<style jsx>
			{`
				.scoped {
					color: red;
				}
			`}
		</style>
		<p className="scoped">안녕하세요 : scoped</p>
		<style global jsx>
			{`
				.scoped {
					color: blue;
				}
			`}
		</style>
		<p className="scoped">안녕하세요 : scoped</p>
	</div>
);

export default Hello;

```

글로벌로 적용된다. 만약 글로벌로 때려박고 싶으면 global jsx를 빼서 _app.js에다가 넣은다.

- _app.js

```js
import 'antd/dist/antd.css';
import '@styles/globals.css';
import '@styles/globals_sass.scss';

const MyApp = ({ Component, props }) => {
	return (
		<>
			<style global jsx>
				{`
					.scoped {
						color: blue;
					}
				`}
			</style>
			<Component {...props} />
		</>
	);
};

export default MyApp;

```

그리고 index.js에 적용하면 잘 나올 것이다.



## nextjs + tailwindcss



tailwindcss 는 요즘 핫해진 녀석이다. 

설치를 해보자.

```bash
npm install tailwindcss@latest postcss@latest autoprefixer@latest
```

Next 10을 쓰고 있기 때문에 기존 프로젝트들은 이렇게 하면 안된다. 

그리고 다음 명령어를 치자.

```bash
npx tailwindcss init -p
```

라고 실행하자.

![image-20210114152737726](/Users/apple/Library/Application Support/typora-user-images/image-20210114152737726.png)

이렇게 2개의 파일이 생성될 것이다.

tailwind.config.js에 가서 기본 설정이 되어 있고 사용할 곳에 대해 명세가 되어 있어야 하기 때문에 넣어보자.

```js
module.exports = {
	purge: ['./src/components/**/*.js', './src/pages/**/*.js'],
	darkMode: 'media', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				'accent-1': 'orange',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};

```

media로 하면 darkmode로 할때 media로 할지 class로 할지 정하는 거다. 

다크모드는 요즘에는 media query로 할 수 잇다.

https://developer.mozilla.org/ko/docs/Web/CSS/@media/prefers-color-scheme

```js
@tailwind base;

/* Write your own custom base styles here */

/* Start purging... */
@tailwind components;
/* Stop purging. */

html,
body {
  @apply bg-gray-50 dark:bg-gray-900;
}

/* Write your own custom component styles here */
.btn-blue {
  @apply px-4 py-2 font-bold text-white bg-blue-500 rounded;
}

/* Start purging... */
@tailwind utilities;
/* Stop purging. */

/* Your own custom utilities */
```

@tailwind base, @tailwind components, @tailwind utilities;는 꼭 들어가야 한다. 이걸 styles에 index.css를 만들어서 넣자.

지금 이 행위를 하는거는 공통 설정을 가져오는거다 글로벌로

>  애플리케이션을 도커라이징 해준다는거는 최종 빌드본을 잘 말아서 넣은다음에 그 도커를 줄 수 있나

_app.js에서 글로벌로 써야하기 때문에 추가해보자.

- _app.js

```js
import '@styles/index.css';

const MyApp = ({ Component, props }) => {
	return <Component {...props} />;
};

export default MyApp;

```

실행해 보면

![image-20210114155628339](/Users/apple/Library/Application Support/typora-user-images/image-20210114155628339.png)

tw라고 되어 있으니 사용이 되니 한번 해보자. index.js에 가서 해보자.

Utility css 이다.

- index.js

```js
import Link from 'next/link';
const Index = () => {
	return (
		<div>
			<nav>
				<ul className="flex items-center justify-between">
					<Link href="/">
						<a className="text-blue-500 no-underline dark:text-blue-300">Home</a>
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default Index;

```





![image-20210114160118969](/Users/apple/Library/Application Support/typora-user-images/image-20210114160118969.png)

이렇게 나온다. 만약 dark 모드면 text-blue가 적용된다.아까 tailwind.config.js에서 설정했던 text-accent-1이렇게 하면

오랜지색으로 된다.

이름이 상당히 길어진다. 이게 왜 유행일까? 이런걸 할 수 있다 className으로 요소를 관리하겠다면 클래스이름만 바꿔주면 다시 랜더되면서 바뀔것이다. useState를 쓰면 디자인을 쓸때 용의하다.

- index.js

```js
import Link from 'next/link';
const Index = () => {
	return (
		<div>
			<nav>
				<ul className="flex items-center justify-between p-10">
					<Link href="/">
						<a className="text-accent-1 no-underline dark:text-blue-300">Home</a>
					</Link>
				</ul>
				<ul className="flex items-center justify-between space-x-4">
					<li>
						<Link href="/login">
							<a className="no-underline btn-blue">Login</a>
						</Link>
					</li>
					<li>
						<Link href="/hello">
							<a className="no-underline btn-blue">hello</a>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Index;

```



![image-20210114164410642](/Users/apple/Library/Application Support/typora-user-images/image-20210114164410642.png)

이렇게 하면 만들기 쉽다 그래서 이걸 복사해서 components폴더에 파일을 만들고 Nav.js

- Nav.js

```js
import Link from 'next/link';
const Nav = () => {
	return (
		<nav>
			<ul className="flex items-center justify-between p-10">
				<Link href="/">
					<a className="text-blue-500 no-underline text-accent-1 dark:text-blue-300">Home</a>
				</Link>
			</ul>
			<ul className="flex items-center justify-between space-x-4">
				<li>
					<Link href="/login">
						<a className="no-underline btn-blue">Login</a>
					</Link>
				</li>
				<li>
					<Link href="/hello">
						<a className="no-underline btn-blue">hello</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;

```

- index.js

```js
import Nav from '@components/Nav';
const Index = () => {
	return (
		<div>
			<Nav />
			<h1>Home</h1>
		</div>
	);
};

export default Index;

```

index.js에 있는 div 를 _app.js에 넣자.

- _app.js

```js
import '@styles/index.css';
import Nav from '@components/Nav';

const MyApp = ({ Component, props }) => {
	return (
		<div>
			<Nav />
			<Component {...props} />
		</div>
	);
};

export default MyApp;

```

그리고 index.js에서 다 빼도 된다.

한번 다크모드로 해보면

![image-20210114165607080](/Users/apple/Library/Application Support/typora-user-images/image-20210114165607080.png)

이렇게 쉽게 다크모드가 처리된다.(크롬 만세~~) 심지어 transition도 먹는다.



## next로 login구현 

```bash
npx create-next-app my-books-next
```

다시 react-next를 만들자.

pages에 login.jsx를 만들자.

- login.jsx

```js
const Login = () => {
	return (
		<div>
			<h1>Login</h1>
			<p>
				<input type="text" />
			</p>
			<p>
				<input type="password" />
			</p>
			<p>
				<button>로그인</button>
			</p>
		</div>
	);
};

export default Login;

```

이렇게 하자.

이제 간단하게 페이지 이동을 하기 위해 index.js에서

- index.js

```js
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Home</h1>
			<Link href="/login">/login</Link>
		</div>
	);
}

```

이렇게 하면 로그인을 누르면 로그인으로 돌아간다. login.jsx로 가서

```js
import { useRef } from 'react';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	return (
		<div>
			<h1>Login</h1>
			<p>
				<input type="text" ref={emailRef} />
			</p>
			<p>
				<input type="password" ref={passwordRef} />
			</p>
			<p>
				<button onClick={login}>로그인</button>
			</p>
		</div>
	);

	function login() {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		console.log(email, password);
	}
};

export default Login;

```

이렇게 하고 로그인 버튼을 누르면 콘솔에는

![image-20210115205325853](/Users/apple/Library/Application Support/typora-user-images/image-20210115205325853.png)

이렇게 잘 찍힌다. 이제 로그인을 시키자. 

여기서 무엇을 쓸 거냐면 contextApi를 쓸 것이다. 

일단  request를 요청할 것인데 보통 axios를 이용하였다. 

nextjs에서 fetchApi가 적용 되어 있다.  fetch를 해보자.

- login.jsx

```js
import { useRef } from 'react';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	return (
		<div>
			<h1>Login</h1>
			<p>
				<input type="text" ref={emailRef} />
			</p>
			<p>
				<input type="password" ref={passwordRef} />
			</p>
			<p>
				<button onClick={login}>로그인</button>
			</p>
		</div>
	);

	async function login() {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		console.log(email, password);

		// fetch
		const response = await fetch('https://api.marktube.tv/v1/me', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		console.log(await response.json());
	}
};

export default Login;

```

이렇게 하면 콘솔에는 아래와 같이 찍힐 것이다.

![image-20210115212129911](/Users/apple/Library/Application Support/typora-user-images/image-20210115212129911.png)

그래서 이걸 

```js
import {useRouter} from 'next/router';
  const router = useRouter();

	async function login() {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		console.log(email, password);

		// fetch
		const response = await fetch('https://api.marktube.tv/v1/me', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		const { token } = await response.json();
		localStorage.setItem('token', token);
		router.push('/');
	}
```

이렇게 한다.

전체 login.jsx

```js
import {useRouter} from 'next/router';
import { useRef } from 'react';

const Login = () => {
	const emailRef = useRef();
  const passwordRef = useRef();
  
  const router = useRouter();
	return (
		<div>
			<h1>Login</h1>
			<p>
				<input type="text" ref={emailRef} />
			</p>
			<p>
				<input type="password" ref={passwordRef} />
			</p>
			<p>
				<button onClick={login}>로그인</button>
			</p>
		</div>
	);

	async function login() {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		console.log(email, password);

		// fetch
		const response = await fetch('https://api.marktube.tv/v1/me', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		const { token } = await response.json();
		localStorage.setItem('token', token);
		router.push('/');
	}
};

export default Login;

```

이제 누르면 로그인이 될 것이다.

이제 어떻게 하면 되나  

```js

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const router = useRouter();

	const token = localStorage.getItem('token');

	if (token !== null) {
		router.push('/');
	}
	return (
		<div>
			<h1>Login</h1>
			<p>
				<input type="text" ref={emailRef} />
			</p>
			<p>
				<input type="password" ref={passwordRef} />
			</p>
			<p>
				<button onClick={login}>로그인</button>
			</p>
		</div>
	);
```

이렇게 하면 만약 토큰이 있으면 로그인 창으로 안가게 될 것이다.

그런데 하지만 url에 그대로 login으로 직접 가면 에러가 뜰 것이다. localStorage가 없다고 나온다. 

즉 localhost:3000/login으로 직접 들어가면 서버사이드 렌더링이 내려와야하는데 서버사이드를 login 컴포넌트를 읽다가 localStorage에서 걸린다. 노드 서버가 모른다고 한다. 서버에는 로컬 스토리지가 없다. 

대신에 클라이언트에만 로컬 스토리지가 있는 거니까 할 수 있는 방법이 이런 방법이 있다.

```js
if (window !== 'undefined') {
		const token = localStorage.getItem('token');

		if (token !== null) {
			router.push('/');
		}
	}
```

window가 undefined가 아니면 그때만 이 로직을 타게 한다. 이게 nextjs에서 가장 중요한 특징중 하나이다.

그런데 이 아이를 login컴포넌트에 두기 싫다. 그래서 공통적인 아이가 있는 _app.js로 보내자.

- _app.js

```js
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('token');

		if (token !== null && router.pathname === '/login') {
			router.push('/');
		}
		if (token === null && router.pathname !== '/login') {
			router.push('/login');
		}
	}
	return <Component {...pageProps} />;
}

export default MyApp;

```

이렇게 하면 된다.

 토큰이 있으면 url에 login해도 안가진다. 그런데 깜빡거리는 것이 보였을 것이다.

그래서 최초의 이 것이 되기 전에 되어야 한다. 라이프스타일 상 componentWillDidmount이다. 그래서 라이프사이클을 이용하려면 class로 사용해야한다.

- _app.js

```js
import React from 'react';
import '../styles/globals.css';

class MyApp extends React.Component {
	componentWillMount() {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('token');
			const { router } = this.props;

			if (token !== null && router.pathname === '/login') {
				router.push('/');
			}
			if (token === null && router.pathname !== '/login') {
				router.push('/login');
			}
		}
	}
	render() {
		const { Component, pageProps } = this.props;
		return <Component {...pageProps} />;
	}
}
export default MyApp;

```

이렇게 하면 잘 나온다. 하지만 url에 토큰이 있는데도 불구하고 로그인 페이지에 들어간다. 그러면 일단

루트에다가 contexts 폴더를 만들고 파일을 하나 만들자. 

MyAppProvider.js

```js
import React from 'react';

const MyAppProvider = React.createContext();

export default MyAppProvider;

```

이렇게 하고 MyAppProvider를 _app.js 에서 공통적으로 쓰자.

```js

import React from 'react';
import MyAppProvider from '../contexts/MyAppProvider';
import '../styles/globals.css';

class MyApp extends React.Component {
	componentWillMount() {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('token');
			const { router } = this.props;

			if (token !== null && router.pathname === '/login') {
				router.push('/');
			}
			if (token === null && router.pathname !== '/login') {
				router.push('/login');
			}
		}
	}
	render() {
		const { Component, pageProps } = this.props;
		return (
			<MyAppProvider.Provider value={{}}>
				<Component {...pageProps} />
			</MyAppProvider.Provider>
		);
	}
}
export default MyApp;

```

이렇게 바꾸자. 이제 안가지지만 살짝 보이는게 보일것이다. 

왜 살짝 보일까? 서버 사이드에서는 이미 로그인 페이지를 렌더를 제작을 한거다. 그거를 내려준 다음에 그다음에 componentWillDidmount할때 일어났기 때문에 실제로 안보이게 할려고 하려면 지금 방법이 아니라 처음에는 안보이게 했다가 끝나면 보이게 하는 방식으로 처리를 해야한다. 

처음에 내려올때 빈 페이지를 내려줘야 한다. 다시 함수형으로 넘어가자.

- _app.js

```js
import React from 'react';
import MyAppProvider from '../contexts/MyAppProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('token');

		if (token !== null && router.pathname === '/login') {
			router.push('/');
		}
		if (token === null && router.pathname !== '/login') {
			router.push('/login');
		}
	}
}

export default MyApp;
```

이렇게 바꾸고 이제 해결을 해보자. MyAppProvider.js를 이름을 바꾸자. MyAppContext로 바꾸자.

- MyAppContext.js

```js
import React from 'react';

const MyAppContext = React.createContext();

export const MyAppProvider = ({ children }) => {
	return <MyAppContext.Provider>{children}</MyAppContext.Provider>;
};
```

이렇게 바꾸고 _app.js에 가서

- _app.js

```js
import React from 'react';
import { MyAppProvider } from '../contexts/MyAppContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('token');

		if (token !== null && router.pathname === '/login') {
			router.push('/');
		}
		if (token === null && router.pathname !== '/login') {
			router.push('/login');
		}
	}
	return (
		<MyAppProvider>
			<Component {...pageProps} />
		</MyAppProvider>
	);
}

export default MyApp;
```

이렇게 하고 value는 MyAppContext.js에 넣자.

- MyAppContext.js

```js
import { useRouter } from 'next/router';
import React from 'react';

const MyAppContext = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'START':
			return { token: null, loading: true, error: null };
		case 'SUCCESS':
			return { token: action.token, loading: false, error: null };
		case 'FAIL':
			return { token: null, loading: false, error: action.error };
		default:
			return state;
	}
};

const initialState = {
	token: null,
	loading: false,
	error: null,
};

export const MyAppProvider = ({ children }) => {
	const [state, dispatch] = useRouter(reducer, initialState);
	return <MyAppContext.Provider value={{ state, dispatch }}>{children}</MyAppContext.Provider>;
};

```

이렇게 넣고 파일 이름을 MyAppContext.js 에서 AuthContext.js로 바꾸자 그러면 나중에 BookContext.js 도 이렇게 만들면 된다.

_app.js에 가서도 바꿔 주자.

- _app.js

```js
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('token');

		if (token !== null && router.pathname === '/login') {
			router.push('/');
		}
		if (token === null && router.pathname !== '/login') {
			router.push('/login');
		}
	}
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
```

다시 AuthContext.js 로가서

```js
import React, { useReducer } from 'react';

const AuthContext = React.createContext();

export default AuthContext;

const reducer = (state, action) => {
	switch (action.type) {
		case 'START':
			return { token: null, loading: true, error: null };
		case 'SUCCESS':
			return { token: action.token, loading: false, error: null };
		case 'FAIL':
			return { token: null, loading: false, error: action.error };
		default:
			return state;
	}
};

const initialState = {
	token: null,
	loading: false,
	error: null,
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

```



그리고 hooks 폴더를 만들고 useAuth.js를 만들자.

![image-20210115230853266](/Users/apple/Library/Application Support/typora-user-images/image-20210115230853266.png)

- useAuth.js

```js
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const useAuth = () => {
	useContext(AuthContext);
};

```

이렇게 하고 AuthContext.js로 가서 

- AuthContext.js

```js
export default AuthContext;
```

이걸 추가해주자.

useAuth에 가서

- useAuth.js

```js
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const useAuth = () => {
	const authContext = useContext(AuthContext);

	return authContext.state;
};

export default useAuth;

```

이렇게 만들자. useContext를 통해서 컨텍스트 갖고 오고 state를 가져오고 이 state는 무엇일까? 그건 AuthContext.js에 있는 

```js
export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useRouter(reducer, initialState);
	return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
```

value에 있는 state이다.  그런데 useAuth에서 한  이런 느낌으로 안하고 다른 느낌으로 할 수 있다.

- useAuth.js

```js
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export const useAuthState = () => {
	const authContext = useContext(AuthContext);

	return authContext.state;
};

export const useAuthDispatch = () => {
	const authContext = useContext(AuthContext);

	return authContext.dispatch;
};

```

이렇게 가져올수 있다. 이제 어디서든 useAuthState를 호출하면 state를 가져올 수 있고 useAuthDispatch를 호출하면 dispatch를 가져 올 수 있으니 state받아오고 dispatch 액션 날릴 수 있다. 한번 해보자.

login으로 가서 해보자.

- login.jsx

```js
const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const state = useAuthState();
	console.log(state);

```

이렇게 해보자. 그러면 콘솔에는 

![image-20210115232220344](/Users/apple/Library/Application Support/typora-user-images/image-20210115232220344.png)

이렇게 찍힐 것이다. state가 나온다. 이제 로그인 할때 

- login.jsx

```js
const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const state = useAuthState();
	const dispatch = useAuthDispatch();

```

이 dispatch를 넣고 밑에서 시작할때 

```js
async function login() {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		console.log(email, password);
		try {
			dispatch({ type: 'START' });
			// fetch
			const response = await fetch('https://api.marktube.tv/v1/me', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});
			const { token } = await response.json();
			localStorage.setItem('token', token);
			router.push('/');
			dispatch({ type: 'SUCCESS', token });
		} catch (error) {
			dispatch({ type: 'FAIL', error });
		}
	}
};
```

이렇게 한다.  그래서 

- login.jsx

```js
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useAuthDispatch, useAuthState } from '../hooks/useAuth';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const state = useAuthState();
	const dispatch = useAuthDispatch();

	const router = useRouter();

	return (
		<div>
			<h1>Login : {state.loading && <span>loading...</span>}</h1>
			<p>
				<input type="text" ref={emailRef} />
			</p>
			<p>
				<input type="password" ref={passwordRef} />
			</p>
			<p>
				<button onClick={login}>로그인</button>
			</p>
		</div>
	);

	async function login() {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		console.log(email, password);
		try {
			dispatch({ type: 'START' });
			// fetch
			const response = await fetch('https://api.marktube.tv/v1/me', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});
			await sleep(1000);
			const { token } = await response.json();
			localStorage.setItem('token', token);
			router.push('/');
			dispatch({ type: 'SUCCESS', token });
		} catch (error) {
			dispatch({ type: 'FAIL', error });
		}
	}
};

export default Login;

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

```

이렇게 하고 해보자. 그러면 잘 될 것이다. 

로그인 함수로 받아보자.

- Login.jsx

```js
import { useRef } from 'react';
import { useAuthState } from '../hooks/useAuth';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const state = useAuthState();
	const login = useLogin();

	return (
		<div>
			<h1>Login : {state.loading && <span>loading...</span>}</h1>
			<p>
				<input type="text" ref={emailRef} />
			</p>
			<p>
				<input type="password" ref={passwordRef} />
			</p>
			<p>
				<button onClick={click}>로그인</button>
			</p>
		</div>
	);

	async function click() {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		console.log(email, password);

		login(email, password);
	}
};

export default Login;

```

그리고 이걸 useAuth.js 에서 useLogin을 만들자.

- useAuth.js

```js
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useRouter } from 'next/router';
export const useAuthState = () => {
	const authContext = useContext(AuthContext);

	return authContext.state;
};

export const useAuthDispatch = () => {
	const authContext = useContext(AuthContext);

	return authContext.dispatch;
};

export const useLogin = () => {
	const dispatch = useAuthDispatch();
	const router = useRouter();
	return async (email, password) => {
		try {
			dispatch({ type: 'START' });
			// fetch
			const response = await fetch('https://api.marktube.tv/v1/me', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});
			await sleep(1000);
			const { token } = await response.json();
			localStorage.setItem('token', token);
			router.push('/');
			dispatch({ type: 'SUCCESS', token });
		} catch (error) {
			dispatch({ type: 'FAIL', error });
		}
	};
};

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

```

이렇게 만든다.

이러면 잘된다. 

그런데 만약 책을 관리하고 싶으면 책context만들고 hock을 다양한 걸 만들어서 하면 된다. 

그러면 최초 initialState에 tokendmf localStorage.getItem('token')을 넣으면 안돼나?  그러면 최초에 만들때 브라우저에 initial 토큰값을 가져다가 그걸로 reducer를 만드니까 토큰이 있다고 판단한다. 이제부터 어떻게 해야하나

- AuthContext.js

```js
const initialState = {
	token: localStorage.getItem('token'),
	loading: false,
	error: null,
};
```

이렇게 바꾸고 _app.js에서 

```js
		const token = localStorage.getItem('token')
```

이렇게 썼었는데 이렇게 쓸 필요가 없어졌다.

- _app.js

```js
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('token');

		if (token !== null && router.pathname === '/login') {
			router.push('/');
		}
		if (token === null && router.pathname !== '/login') {
			router.push('/login');
		}
	}
```

얘를 옮기자.

어디로 가나 login.jsx에서 

```js
const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const state = useAuthState();
	const login = useLogin();

	if (typeof window !== 'undefined') {
		const token = state.token;

		if (token !== null) {
			router.push('/');
		}
	}

```

이렇게 바꿔준다.

그리고 index.js도 마찬가지로

- index.js

```js
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState } from '../hooks/useAuth';

export default function Home() {
	const { token } = useAuthState();
	const router = useRouter();
	if (typeof window !== 'undefined') {
		if (token === null) {
			router.push('/login');
		}
	}
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Home</h1>
			<Link href="/login">/login</Link>
		</div>
	);
}

```

이렇게 바꿔준다.

AuthContext에 있는 initialState에서 문제가 발생한다. 그래서 만약에 window가 undefined가 아닐때만 사용 가능하도록 바꿔야한다.

- AuthContext.js

```js
const initialState = {
	token: typeof window === 'undefined' ? null : localStorage.getItem('token'),
	loading: false,
	error: null,
};
```

이렇게 바꿔준다.



## api 폴더

api 폴더는 똑같이 api/hello라는 이름으로 만들어 줄수 있다. 그런데 어떻게 호출하는지 직 접 해보자.

- Api/hello

```js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
	console.log(req);
	res.statusCode = 200;
	res.json({ name: 'John Doe' });
};

```

이러면 콘솔에 안 찍히고 서버쪽에 콘솔이 찍힐 것이다.

![image-20210116000027496](/Users/apple/Library/Application Support/typora-user-images/image-20210116000027496.png)

그래서 여러가지 방법으로 api를 만들 수 있는데 nextjs 하면서 [id].js 이렇게도 만들 수 있는데 

결국에 어떻게 분기를 태워주나 이렇게 할 수 있다.

```js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
	console.log(req.method);

	if (req.method === 'POST') {
		//...
	}

	res.statusCode = 200;
	res.json({ name: 'John Doe' });
};

```

![image-20210116000249250](/Users/apple/Library/Application Support/typora-user-images/image-20210116000249250.png)

이렇게 나온다. 이게 말그대로 서버다 express랑 비슷한 상태이다.  

예를들어서 만약 로그인에서 호출을 하는데 호출할때 useAuth에서 

- useAuth.js

```js
			const response = await fetch('/api/hello', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
      });
      console.log(await response.json())
```

이렇게만 해보면 콘솔에서 나온다.

![image-20210116000718546](/Users/apple/Library/Application Support/typora-user-images/image-20210116000718546.png)

JSON-SERVER보다 이게 훨씬 좋다. db조차 필요 없다. 

루트 폴더에 db.json을 만들고

- db.json

```js
{
	"hello": "world"
}

```



Hello.js에서

```js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { readFileSync } from 'fs';
import { join } from 'path';

export default (req, res) => {
	const path = join(process.env.PWD, 'db.json');
	console.log(process.env.PWD);
	const data = JSON.parse(readFileSync(path).toString());
	res.statusCode = 200;
	res.json(data);
};
```

이렇게 하면 로그인 버튼을 누르면

![image-20210116001638447](/Users/apple/Library/Application Support/typora-user-images/image-20210116001638447.png)

db.json에 있는것이 나온다. 만약 입력을 한다고 하면 어떻게 해야하나 한번 해보자.

```js
import { readFileSync } from 'fs';
import { join } from 'path';

export default (req, res) => {
	const path = join(process.env.PWD, 'db.json');
	console.log(process.env.PWD);
	const data = JSON.parse(readFileSync(path).toString());
	res.statusCode = 200;
	res.json(data);
};

```

얘를 복사해서



api폴더에 새로운 파일을 만들자. add.js를 만들고 갖다 붙이자.

- add.js

```js
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export default (req, res) => {
	const path = join(process.env.PWD, 'db.json');
	const data = JSON.parse(readFileSync(path).toString());
	data.name = 'Mark';
	writeFileSync(path, JSON.stringify(data));
	res.statusCode = 200;
	res.json(data);
};

```

이렇게 하고 api/add 하면

![image-20210116002014334](/Users/apple/Library/Application Support/typora-user-images/image-20210116002014334.png)

화면에도 출력이 되고 db.json에도 추가가 된다.

- db.json

```js
{"hello":"world","name":"Mark"}
```

