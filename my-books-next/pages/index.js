import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Home</h1>
			<Link href="/login">/login</Link>
		</div>
	);
}
