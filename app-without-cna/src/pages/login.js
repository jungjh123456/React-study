import Image from 'next/image';
import styles from '@styles/login.module.scss';

const Login = () => {
	console.log(styles);
	return (
		<div>
			<h1>Login</h1>
			<Image src="/bg_signin.png" width={400} height={534} />
		</div>
	);
};

export default Login;
