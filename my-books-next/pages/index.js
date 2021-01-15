import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState } from '../hooks/useAuth';

export default function Home() {
	const { token } = useAuthState();
	const router = useRouter();
	if (typeof window !== 'undefined') {
		if (token === null) {
			router.push('/login');
		}
	}
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
