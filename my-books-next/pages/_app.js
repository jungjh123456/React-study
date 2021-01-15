import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;

// class MyApp extends React.Component {
// 	componentWillMount() {
// 		if (typeof window !== 'undefined') {
// 			const token = localStorage.getItem('token');
// 			const { router } = this.props;

// 			if (token !== null && router.pathname === '/login') {
// 				router.push('/');
// 			}
// 			if (token === null && router.pathname !== '/login') {
// 				router.push('/login');
// 			}
// 		}
// 	}
// 	render() {
// 		const { Component, pageProps } = this.props;
// 		return (
// 			<MyAppProvider.Provider value={{}}>
// 				<Component {...pageProps} />
// 			</MyAppProvider.Provider>
// 		);
// 	}
// }
