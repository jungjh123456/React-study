import { useRef } from 'react';
import { useAuthState, useLogin } from '../hooks/useAuth';
import { useRouter } from 'next/router';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const state = useAuthState();
	const login = useLogin();
	const router = useRouter();

	if (typeof window !== 'undefined') {
		const token = state.token;
		if (token !== null) {
			router.push('/');
		}
	}
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
