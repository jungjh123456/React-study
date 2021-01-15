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
			const response = await fetch('/api/hello', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});
			console.log(await response.json());
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
