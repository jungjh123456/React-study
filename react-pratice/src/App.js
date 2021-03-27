import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './page/MainPage';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={MainPage} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
