import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useAuthState } from '../hooks/useAuth';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const state = useAuthState();
	console.log(state);

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
