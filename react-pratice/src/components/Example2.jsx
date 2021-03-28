import React from 'react';
import Example3 from './Example3';

const Example2 = React.memo(
	({ state, setState }) => {
		return (
			<div>
				<Example3 state={state} setState={setState} />
				<h1>hellomen</h1>
			</div>
		);
	},
	(prev, next) => {
		if (prev.state.count === next.state.count) {
			return true;
		} else {
			return true;
		}
	}
);

export default Example2;
