import Link from 'next/link';

const About = () => {
	return (
		<div>
			<h1>About</h1>
			<Link
				href={{
					pathname: '/about',
					query: { name: ['안녕'] },
				}}
				replace
				scroll={false}
			>
				<a>Home</a>
			</Link>
		</div>
	);
};

export default About;
