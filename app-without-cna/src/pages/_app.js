import '@styles/index.css';
import Nav from '@components/Nav';

const MyApp = ({ Component, props }) => {
	return (
		<div>
			<Nav />
			<Component {...props} />
		</div>
	);
};

export default MyApp;
