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
