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
