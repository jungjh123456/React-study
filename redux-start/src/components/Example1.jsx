import { useEffect, useState } from 'react';

export default function Counter() {
	const [count, setCount] = useState(0);

	function handleAlertClick() {
		setTimeout(() => {
			alert('You clicked on: ' + count);
		}, 3000);
	}
	useEffect(() => {
		setCount(count);
	}, [count]);

	const countNum = () => {
		setCount(count + 1);
	};
	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={countNum}>Click me</button>
			<button onClick={handleAlertClick}>Click me2</button>
		</div>
	);
}
