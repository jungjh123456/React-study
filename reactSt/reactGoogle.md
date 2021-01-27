# react google login

```bash
npx create-react-app .
```

일단 cra 를 설정하자



그리고 

```bash
npm i react-google-login
```

이 라이브러리를 사용하자.

google 또는 시스템을 구현하는 데 약간의 시간이 걸리므로 완료 후 src 디랙토리를 이동해서 app.js에 들어가자.

```js
import GoogleLogin from 'react-google-login';

function App() {
	const responseGoogle = (response) => {
		console.log(response);
		console.log(response.profileObj);
	};
	return (
		<div>
			<GoogleLogin
				clientId=""
				buttonText="Login"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'signle_host_origin'}
			/>
		</div>
	);
}

export default App;

```

onSuccess 프롭은 성공했을때 쓰는 것이고 

Fail은 실패시 쓰는 것이다.

그리고 쿠키 정보도 줄수 있다.

쿠키 정책: 

- 웹사이트는 **쿠키**를 사용함으로써 귀하의 활동 및 선호(예: 로그인 정보, 언어, 글자 크기 및 기타 디스플레이 설정 등)를 “기억”하여 귀하가 동일한 웹사이트에 재방문하거나 동일한 웹사이트 내의 다른 페이지를 방문할 때마다 이를 재설정할 필요가 없도록 합니다.

```js
	const responseGoogle = (response) => {
		console.log(response);
		console.log(response.profileObj);
	};
```

이 응답이 맞는지 response를 확인하고 그리고 프로필 객체를 응답한다. 기본적으로 proile obj는 쿠키와 프로필에 응답한다. 이 profileObj는 이미징 모델 프로필 이름 프로필 인 모든 프로필 세부 정보를 기록한다. 

이메일 ID를 확인하고 이제 저장하고 이제 여기에서 해당 클라이언트 ID를 유지한다.

https://console.developers.google.com/

에 가서 새로운 프로젝트를 생성 후 프로젝트 이름을 적고 만들자.(선택 사항이다.)

그리고 api키를 받아서 OAUTH 동의 화면

외부 => 앱이름 (ex: test-oauth) 그리고 앱 도메인(내가 있어야 할 주소)를 써야한다. 이 서비스를 사용하므로 파일은 당분간 보관 해야한다. 도메인이 없으므로 동의를 한다. 

그래서 완료되었다고 생각하면 사용자 인증 정보에 들어가서 

api키를 생성하고 OAuth 클라이언트 ID를 만들자.

애플리케이션 유형 = 웹 애플리케이션 

하고 URL 과 승인된 리디렉션 URL은 우리가 도메인이 없으니 http://localhost:3000을 넣고 확인을 누르면 클라이언트 아이디 키를 얻을 수 있다. 그래서 그 아이디를

```js
import GoogleLogin from 'react-google-login';

function App() {
	const responseGoogle = (response) => {
		console.log(response);
		console.log(response.profileObj);
	};
	return (
		<div>
			<GoogleLogin
				clientId=""
				buttonText="Login"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'signle_host_origin'}
			/>
		</div>
	);
}

export default App;
```

이 클라이언트 아이디에 넣자.

![image-20210126234642949](/Users/apple/Library/Application Support/typora-user-images/image-20210126234642949.png)
