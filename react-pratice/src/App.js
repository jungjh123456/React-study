import logo from './logo.svg';
import './App.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Example1 from './components/Example1';
import Example2 from './components/Example2';

const App = () => {
	const [state, setState] = useState({ count: 0 });

	const click = useCallback(() => {
		setState({ count: state.count + 1 });
	}, [state.count]);
	return (
		<div className="App">
			<header className="App-header">
				<h1>{state.count}</h1>
				<span>hello</span>
				<Example1 state={state} />
				<Example2 state={state} setState={setState} />
				<button onClick={click}>{state.count}</button>
			</header>
		</div>
	);
};

export default App;
