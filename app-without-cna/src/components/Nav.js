import Link from 'next/link';
const Nav = () => {
	return (
		<nav>
			<ul className="flex items-center justify-between p-10">
				<Link href="/">
					<a className="text-blue-500 no-underline text-accent-1 dark:text-blue-300">Home</a>
				</Link>
			</ul>
			<ul className="flex items-center justify-between space-x-4">
				<li>
					<Link href="/login">
						<a className="no-underline btn-blue">Login</a>
					</Link>
				</li>
				<li>
					<Link href="/hello">
						<a className="no-underline btn-blue">hello</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
