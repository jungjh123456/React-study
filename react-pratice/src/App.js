import logo from './logo.svg';
import './App.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Example1 from './components/Example1';
import Example2 from './components/Example2';

const App = () => {
	const musicRef = useRef();

	const [count, setCount] = useState(0);
	const [volumn, setVolumn] = useState(0);

	// console.log((musicRef.current.volume = 0.2));

	const click = () => {
		setCount(1);
		musicRef.current.play();
		if (count === 1) {
			musicRef.current.pause();
			setCount(0);
		}
	};
	const textInput = useRef();
	const copy = () => {
		console.log(textInput);
		const el = textInput.current;
		console.log(el.innerHTML);
		navigator.clipboard.writeText(el.innerText);
	};
	return (
		<div className="App">
			<header className="App-header">
				<audio controls ref={musicRef}>
					<source
						src="https://d2ynwf7n9bz2vq.cloudfront.net/bcc186b57c043c7721a5344acc741028_I always love you .mp3"
						type="audio/mpeg"
					/>
				</audio>
				<button onClick={click}>clcik</button>
				<input name="volume" type="number" value="1" />

				<div ref={textInput}>hello!ㄴㄴ</div>
				<button onClick={copy}>copy</button>
			</header>
		</div>
	);
};

export default App;
